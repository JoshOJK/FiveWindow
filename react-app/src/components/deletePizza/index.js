import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { deletePizza } from "../../store/pizza";
import { loadPizzaDetails } from "../../store/pizza";
import { LoadPizzas } from "../../store/pizza";
import { useModal } from "../../context/Modal";


const DeleteForm = ({ pizzaId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal()






    const handleDelete = () => {
        const deletedPizza = dispatch(deletePizza(pizzaId))
        if (deletedPizza) {
            dispatch(LoadPizzas())
            closeModal()
            history.push('/pizza')
        }
    }

    return (
        <div className="delete-container">
            <h2 className="borp">Confirm Delete</h2>
            <p className="delete-text">Are you sure you want to remove this menu item?</p>
            <div className="button57-container">
                <button className="yes-button1" onClick={() => handleDelete()}>YES (Delete Menu Item)</button>
                <button className="no-button1" onClick={() => closeModal()}>NO (Keep Menu Item)</button>
            </div>
        </div>
    )
}

export default DeleteForm;
