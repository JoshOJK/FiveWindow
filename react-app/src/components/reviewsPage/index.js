import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { loadReviews } from "../../store/review";
import "./reviewsPage.css"

const ReviewsPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state?.session.user);

    let reviewObject = useSelector((state) => state?.reviews);
    let reviewArray = Object.values(reviewObject);
    console.log(reviewArray)

    useEffect(() => {
		dispatch(loadReviews());
	}, [dispatch]);



    return (
        <div id="review-page-wrapper">
            <p>Hello From Reviews!!</p>
            <ul id="reviews-wrapper">
                {reviewArray?.map((review) =>
                <li key={review?.id} id="single-review">
                    <div></div>
                    <div>{review?.username}</div>
                    <div>{review?.review}</div>
                </li>
                )}
            </ul>
        </div>
    )
};

export default ReviewsPage;
