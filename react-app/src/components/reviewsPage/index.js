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

    console.log(reviewArray[0]?.createdAt)

    return (
        <div id="review-page-wrapper">
            <div id='review-header'>
            <h1 id="review-title">Customer Reivews</h1>
            {sessionUser?.id && (
                 <div id="create-review-wrapper">
                 <p id='create-review-title'>Have you vistited us recently? <button id="create-review-button" onClick={createReview}> create a review. </button></p>
             </div>
            )}
            </div>

            <ul id="reviews-wrapper">
                {reviewArray?.map((review) =>
                <li key={review?.id} id="single-review">
                    <div id='single-review-info'>
                        <div id='review-username'>{review?.reviewer?.username}</div>
                        <div id='review-stars'>
                            {Array.from({ length: review?.stars }, (_, index) => (
                            <i class="fa fa-star"></i>
                            ))}
                        </div>
                        <div id='review-date'>{review?.createdAt}</div>
                    </div>
                    <div id='review-review'>{review?.review}</div>
                    {review?.reviewer?.id === sessionUser?.id && (
                        <div id="manage-review">
                            <>
                            < OpenModalButton
                            buttonText={(<div>Edit</div>)}
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
            <div id="review-info-wrapper">
                <div id="review-info">
                <span id='filter-icon' class="material-symbols-outlined">heart_plus</span>
                    <h2 id="review-page-info">We Value Your Opinions</h2>
                    <p id="review-page-details">We display every review our customers make because we value each and every one of our customers and want them to be heard by us and our staff to improve our ability to give our customers the best experience.</p>
                </div>
                <div id="review-info">
                <span id='filter-icon' class="material-symbols-outlined">filter_alt_off</span>
                    <h2 id="review-page-info">Business-Customer Transparency</h2>
                    <p id="review-page-details">We refuse to hide our lower rated reviews to keep a level of transparency with our customers, if we didn't provide an experience up to your standards we will work out any problems to make sure your next visit is better than the last.</p>
                </div>
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
