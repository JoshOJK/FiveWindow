import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { deleteBeer } from "../../store/beer";
import { LoadBeers } from "../../store/beer";
import { useModal } from "../../context/Modal";
import "./deleteConfirm.css"


const DeleteBeerForm = ({ beerId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal()






    const handleDelete = () => {
        const deletedBeer = dispatch(deleteBeer(beerId))
        if (deletedBeer) {
            dispatch(LoadBeers())
            closeModal()
            history.push('/beer')
        }
    }

    return (
        <div id="delete-container">
            <span id='warning' class="material-symbols-outlined">warning</span>
            <h2 id="borp">Are you sure?</h2>
            <p id="delete-text">You are about to delete a beer tap!</p>
            <div id="button57-container">
                <button id="yes-button1" onClick={() => handleDelete()}>Delete</button>
                <button id="no-button1" onClick={() => closeModal()}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteBeerForm;
