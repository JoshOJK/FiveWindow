import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createFwbcReview } from "../../store/review";
import './createReview.css'


const NewReview = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [review, setReview] = useState("");
    const [stars, setStars] = useState();

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const updateReview = (e) => setReview(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};
        if (!stars) errors.stars = 'Set a star rating*'
        if (stars < 1 || stars > 5) errors.stars = "Must be between 1-5 stars*"
        if (!review) errors.review = "Write a review*"
        if (review.length < 20) errors.review = "Must have more than 20 characters*"
        setErrors(errors);


        if (Object.values(errors).length === 0) {
          setSubmitted(true);
          const reviewData = {
            review,
            stars,
          };

          try {
            const createdReview = await dispatch(
              createFwbcReview(reviewData)
            );
            if (createdReview) {
              history.push(`/reviews`);
            }
          } catch (error) {
            console.error("Error creating review:", error);
            if (error instanceof Response) {
              const responseJson = await error.json();
              console.error("Server response:", responseJson);
            }
          }
        }
      };

      return (
            <div id="review-Lord">
        <section className="create-review-container">
      <h2 className="form-heading-for-review">CREATE A REVIEW</h2>
      <form onSubmit={handleSubmit} className="create-review-form">
        <div className="form-group">
          <textarea
            type="text"
            id="review"
            placeholder="How was your experience"
            value={review}
            onChange={updateReview}
            className={`input-field ${errors.review ? "error" : ""}`}
          />
          {errors.review && <p className="error-message">{errors.review}</p>}
        </div>

        <div className="form-group-stars">

				<span className="stars-text">
					Select your rating
				</span>

        <div className="stars">
					{[5, 4, 3, 2, 1].map((star) => (
						<div
						    key={star}
						    className={`star ${
							    star <= stars ? "filled" : ""
						    }`}
						    onClick={() => setStars(star)}>
							    <span class="material-symbols-outlined" id="review-star-actl">star</span>
					    </div>
									))}

        </div>
            {errors.stars && <p className="error-message">{errors.stars}</p>}
        </div>
        <button
          type="submit"
          className="create-review-btn"
          disabled={submitted}
        >
          Create Review
        </button>
      </form>
    </section>
    </div>
      )


}

export default NewReview;
