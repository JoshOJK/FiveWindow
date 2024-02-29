import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createPizza, createPizzaImage } from "../../store/pizza";
import './createPizza.css'


const NewPizza = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState();
  const [ingredientList, setIngredientList] = useState('')
  const [url, setUrl] = useState('')
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const updateName = (e) => setName(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);
  const updateIngredientList = (e) => setIngredientList(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();



    const errors = {};
    if (!ingredientList) errors.ingredientList = 'Ingredient List is required*'
    if (!price) errors.price = 'Price is required*'
    if (!description) errors.description = "description is required*";
    if (!name) errors.name = "Name is required*"


    if (Object.values(errors).length === 0) {
      setSubmitted(true);
      const pizzaData = {
        name,
        description,
        price,
        ingredientList,
      };

      try {
        const createdPizza = await dispatch(createPizza(pizzaData));
        if(createdPizza) {
          if(url) {
            let pizzaId = createdPizza.id
            const formData = new FormData();
            formData.append("url", url)
            await dispatch(createPizzaImage(formData, pizzaId))
          }
          history.push(`/pizza`)
        }
      } catch (error) {
        console.error("Error creating review:", error);
        if (error instanceof Response) {
          const responseJson = await error.json();
          console.error("Server response:", responseJson);
        }
      }
    }
  };

  return (
    <section className="create-pizza-container">
      <h2 className="form-heading">Create a new Pizza for the menu</h2>
      <form onSubmit={handleSubmit} className="create-pizza-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={updateName}
            className={`input-field ${errors.name ? "error" : ""}`}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            id="description"
            placeholder="Enter description"
            value={description}
            onChange={updateDescription}
            className={`input-field ${errors.description ? "error" : ""}`}
          />
          {errors.description && <p className="error-message">{errors.description}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="price">price</label>
          <input
            type="number"
            id="price"
            placeholder="Enter price"
            value={price}
            onChange={updatePrice}
            className={`input-field ${errors.price ? "error" : ""}`}
          />
          {errors.price && <p className="error-message">{errors.price}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="ingredientList">Ingredient List</label>
          <textarea
            type="text"
            id="ingredientList"
            placeholder="Enter ingredients"
            value={ingredientList}
            onChange={updateIngredientList}
            className={`input-field ${errors.ingredientList ? "error" : ""}`}
          />
          {errors.ingredientList && <p className="error-message">{errors.ingredientList}</p>}
        </div>

        <h2 className="form-heading">
          Add an image of the new menu item
        </h2>
        <div className="form-group">
          <label htmlFor="pizzaImg">Pizza Img</label>
          <input
            type="file"
            accept='image/png, image/jpeg, image/jpg'
            placeholder="Image URL"
            onChange={(e) => {
              setUrl(e.target.files[0])
            }}
            className={`input-field ${errors.url ? "error" : ""}`}
          />
          {errors.url && <p className="error-message">{errors.url}</p>}
        </div>
        <button
          type="submit"
          className="create-pizza-btn"
          disabled={submitted}
        >
          Publish Menu Item
        </button>
      </form>
    </section>
  );
}

export default NewPizza;
