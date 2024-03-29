import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updatePizza, loadPizzaDetails } from "../../store/pizza";
import { useModal } from "../../context/Modal";
import { LoadPizzas } from "../../store/pizza";
import "./editPizzaModal.css"




const UpdateForm = ({ pizzaId }) => {
    // const { pizzaId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const pizza = useSelector((state) => state.pizza[pizzaId])
    const [validSubmit, setValidSubmit] = useState(false)
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();


    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        ingredientList: "",
    })


    useEffect(() => {
        if (pizza) {
            setData({
                name: pizza.name,
                description: pizza.description,
                price: pizza.price,
                ingredientList: pizza.ingredientList,
            });
        } else {
            dispatch(loadPizzaDetails(pizzaId))
                .then((data) => {
                    setData({
                        nane: data.name,
                        description: data.description,
                        price: data.price,
                        ingredientList: data.ingredientList,
                    });
                })
                .catch((err) => console.error(err));
        }
    }, [dispatch, pizzaId, pizza]);

    const handleStringData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value

        })
    }

    const handleNumberData = (e) => {
        setData({
            ...data,
            [e.target.name]: parseInt(e.target.value),
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = {};
        if (!data.name) {
            errors.name = "Name is required";
        }
        if (!data.description) {
            errors.description = "description is required"
        }
        if (!data.price) {
            errors.price = "price is required"
        }
        if (!data.ingredientList) {
            errors.ingredientList = "ingredientList is required"
        }
        // if (!data.pizzaImg) {
        //     errors.pizzaImg = "pizzaImg is required"
        // }

        setErrors(errors)

        if (Object.values(errors).length === 0) {
            setValidSubmit(true);


            try {

                dispatch(updatePizza(pizzaId, data))
                .then(() => {
                dispatch(LoadPizzas())
                closeModal()
                })

            } catch(error) {
                console.error('Could not update your menu Item:', error)
            }


        }
    }



    return (
        <div>
        <section id="edit-pizza-container">
            <h1 id="edit-pizza-header">Update your Pizza</h1>
            <form onSubmit={handleSubmit} id="edit-pizza-form">
                <div id="general-info">
                    <div id="form-group">
                        <input
                            className={`input-field ${errors.name ? 'error' : ''}`}
                            type="string"
                            name="name"
                            placeholder="name"
                            value={data.name}
                            onChange={handleStringData} />
                            {errors.name && (
                                <p className='error-message'>{errors.name}*</p>
                            )}

                    </div>
                    <div id="form-group">
                        <input
                            className={`input-field ${errors.description ? 'error' : ''}`}
                            type="string"
                            name="description"
                            placeholder="description"
                            value={data.description}
                            onChange={handleStringData} />
                            {errors.description && (
                                <p className='error-message'>{errors.description}*</p>
                            )}
                    </div>
                    <div id="form-group">
                        <input
                            className={`input-field ${errors.couprice ? 'error' : ''}`}
                            type="number"
                            placeholder="price"
                            name="price"
                            value={data.price}
                            onChange={handleNumberData} />
                         {errors.price && (
                                <p className='error-message'>{errors.price}*</p>
                            )}
                    </div>
                    <div id="form-group">
                        <input
                            className={`input-field ${errors.ingredientList ? 'error' : ''}`}
                            type="string"
                            name="ingredientList"
                            placeholder="ingredientList"
                            value={data.ingredientList}
                            onChange={handleStringData} />
                             {errors.ingredientList && (
                                <p className='error-message'>{errors.ingredientList}*</p>
                            )}
                    </div>

                    {/* <div id="form-group">

                        <input
                            className={`input-field ${errors.pizzaImg ? 'error' : ''}`}
                            type="string"
                            name="pizzaImg"
                            placeholder="pizzaImg"
                            value={data.pizzaImg}
                            onChange={handleStringData} />
                             {errors.pizzaImg && (
                                <p className='error-message'>{errors.pizzaImg}*</p>
                            )}

                    </div> */}
                </div>
                <button type="submit" disabled={validSubmit} id="edit-pizza-btn" >Update Pizza</button>
            </form>
        </section>
        </div>
    )
}

export default UpdateForm;
