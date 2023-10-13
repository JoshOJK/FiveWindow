import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createBeer } from "../../store/beer";
import "./createBeer.css"


const NewBeer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const beer = useSelector((state) => state.beer)
  const [name, setName] = useState("");
  const [description, setDescription] = useState('');
  const [abv, setAbv] = useState();
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const updateName = (e) => setName(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateAbv = (e) => setAbv(e.target.value);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!abv) errors.abv = 'Abv is required*'
    if (!description) errors.description = "description is required*";
    if (!name) errors.name = "Name is required*"

      setErrors(errors);


    if (Object.values(errors).length === 0) {
      setSubmitted(true);
      const beerData = {
        name,
        description,
        abv,
      };

      try {
        const createdBeer = await dispatch(
          createBeer(beerData)
        );
        if (createdBeer) {
          history.push(`/beer`);
        }
      } catch (error) {
        console.error("Error creating review:", error);
        if (error instanceof Response) {
          const responseJson = await error.json();
          console.error("Server response:", responseJson);
        }
      }
    }
}



    return (
        <section className="create-beer-container">
          <h2 className="form-heading">Create a new Beer to be on tap</h2>
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
              <label htmlFor="abv">Abv</label>
              <input
                type="integer"
                id="abv"
                placeholder="Enter abv %"
                value={abv}
                onChange={updateAbv}
                className={`input-field ${errors.abv ? "error" : ""}`}
              />
              {errors.abv && <p className="error-message">{errors.abv}</p>}
            </div>
            <button
              type="submit"
              className="create-beer-btn"
              disabled={submitted}
            >
              Publish New Beer Tap
            </button>
          </form>
        </section>
      );
  };

export default NewBeer;
