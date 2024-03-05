import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { deleteUserReviews } from "../../store/review";
import { loadReviews } from "../../store/review";
import { useModal } from "../../context/Modal";
import "../deleteBeer/deleteConfirm.css"


const DeleteReviewForm = ({ reviewId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal()






    const handleDelete = () => {
        const deletedReview = dispatch(deleteUserReviews(reviewId))
        if (deletedReview) {
            dispatch(loadReviews())
            closeModal()
            history.push('/reviews')
        }
    }

    return (
        <div id="delete-container">
            <span id='warning' class="material-symbols-outlined">warning</span>
            <h2 id="borp">Are you sure?</h2>
            <p id="delete-text">You are about to delete your review!</p>
            <div id="button57-container">
                <button id="yes-button1" onClick={() => handleDelete()}>Delete</button>
                <button id="no-button1" onClick={() => closeModal()}>cancel</button>
            </div>
        </div>
    )
}

export default DeleteReviewForm;
