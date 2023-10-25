import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { deletePizza } from "../../store/pizza";
import { loadPizzaDetails } from "../../store/pizza";
import { LoadPizzas } from "../../store/pizza";
import { useModal } from "../../context/Modal";
import "../deleteBeer/deleteConfirm.css"


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
        <div id="delete-container">
            <span id='warning' class="material-symbols-outlined">warning</span>
            <h2 id="borp">Are you sure?</h2>
            <p id="delete-text">You are about to delete a menu Item!</p>
            <div id="button57-container">
                <button id="yes-button1" onClick={() => handleDelete()}>Delete</button>
                <button id="no-button1" onClick={() => closeModal()}>cancel</button>
            </div>
        </div>
    )
}

export default DeleteForm;
