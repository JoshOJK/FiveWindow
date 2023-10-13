import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { deleteBeer } from "../../store/beer";
import { LoadBeers } from "../../store/beer";
import { useModal } from "../../context/Modal";


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
        <div className="delete-container">
            <h2 className="borp">Confirm Delete</h2>
            <p className="delete-text">Are you sure you want to remove this beer tap?</p>
            <div className="button57-container">
                <button className="yes-button1" onClick={() => handleDelete()}>YES (Delete Beer Tap)</button>
                <button className="no-button1" onClick={() => closeModal()}>NO (Keep Beer Tap)</button>
            </div>
        </div>
    )
}

export default DeleteBeerForm;
