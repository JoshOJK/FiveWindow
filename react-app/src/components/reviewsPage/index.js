import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { loadReviews } from "../../store/review";
import OpenModalButton from "../OpenModalButton";
import DeleteReviewForm from "../deleteReview";
import "./reviewsPage.css"
import UpdateReviewForm from "../updateReview";

const ReviewsPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state?.session.user);

    let reviewObject = useSelector((state) => state?.reviews);
    let reviewArray = Object.values(reviewObject);

    useEffect(() => {
		dispatch(loadReviews());
	}, [dispatch]);

    const createReview = () => {
        history.push("/reviews/create")
    }



    return (
        <div id="review-page-wrapper">
            <h1 id="review-header">Customer Reivews</h1>
            <ul id="reviews-wrapper">
                {reviewArray?.map((review) =>
                <li key={review?.id} id="single-review">
                    <div></div>
                    <div>{review?.username}</div>
                    <div>{review?.review} {review?.stars}</div>
                    {review?.reviewer?.id === sessionUser?.id && (
                        <div id="manage-review">
                            <>
                            < OpenModalButton
                            buttonText={(<div>Update</div>)}
                            modalComponent={<UpdateReviewForm reviewId={review?.id}/>} />
                            </>
                            <>
                            < OpenModalButton
                            buttonText={(<div>Delete</div>)}
                            modalComponent={<DeleteReviewForm reviewId={review?.id}/>} />
                            </>
                        </div>
                    )}

                </li>
                )}
            </ul>
        <div id="create-review-wrapper">
            <h2>Have you vistited us recently?</h2>
            <button onClick={createReview}> create a review </button>
        </div>

            <div className="footer">
            <div id="store-hours">
                <h2 id="hours-title">Brewery Hours</h2>
                <p id="hour">Monday	5:00 pm – 9:00 pm</p>
                <p id="hour">Tuesday	3:00 pm – 9:00 pm</p>
                <p id="hour">Wednesday	3:00 pm – 9:00 pm</p>
                <p id="hour">Thursday	3:00 pm – 9:00 pm</p>
                <p id="hour">Friday	12:00 pm – 11:00 pm</p>
                <p id="hour">Saturday	11:00 am – 11:00 pm</p>
                <p id="hour">Sunday	11:00 am – 8:00 pm</p>
            </div>

            <div>
            <a target="_blank" href="https://www.facebook.com/fivewindowbeerco/">
            <div className="button">
            <div className="icon">
                    <i class="fab
                    fa-facebook"></i>
                </div>
                <span>Facebook</span>
            </div>
            </a>

            <a target="_blank" href="https://www.instagram.com/fivewindowbeerco/">
            <div className="button">
                <div className="icon">
                <i class="fa-brands fa-instagram"></i>
                </div>
                <span>Instagram</span>
            </div>
            </a>


            <a target="_blank" href="https://www.yelp.com/biz/five-window-beer-co-lodi-3">
            <div className="button">
                <div className="icon">
                    <i class="fab
                    fa-yelp"></i>
                </div>
                <span>Yelp</span>
            </div>
            </a>
            </div>
            <div id="visit-us">
                <h1 id="hours-title">Visit Our Brewery</h1>
                <p id="hour">9 W. Locust St.</p>
                <p id="hour">Lodi, California 95240</p>
                <p id="hour">(209) 224-8036</p>
            </div>
        </div>
        </div>
    )
};

export default ReviewsPage;
