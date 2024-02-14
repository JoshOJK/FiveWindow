import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateReview, loadReviewDetail, loadReviews } from "../../store/review";
import { useModal } from "../../context/Modal";
import "./updateReviewModal.css"

const UpdateReviewForm = ({reviewId}) => {
    const dispatch = useDispatch();
	const currentReview = useSelector((state) => state?.reviews[reviewId]);
	const history = useHistory();
	const [review, setReview] = useState(currentReview?.review);
	const [stars, setStars] = useState(currentReview?.stars);
	const [errors, setErrors] = useState({});
	const [submitted, setSubmitted] = useState(false);
    const { closeModal } = useModal();

	useEffect(() => {
		dispatch(loadReviews());
	}, [dispatch]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const errors = {};
		if (review.length < 10)
			errors.review = "Review text must be greater than 10 characters.";
		if (review.length > 250)
			errors.review = "Review text must be 250 characters or less.";
		if (!stars) errors.stars = "Star rating is required";
		if (stars > 5 || stars < 1)
			errors.stars = "Star rating must be between 1 and 5! ";
		setErrors(errors);

		if (Object.values(errors).length === 0) {
			setSubmitted(true);
			const reviewData = {
				review,
				stars,
			};

			try {
				await dispatch(
					updateReview(reviewId, reviewData)
				).then(async () => {
					await dispatch(loadReviews());
                    closeModal()
				});
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
        <div id="update-review-Lord">
    <section className="create-review-container">
      <h1 id="edit-review-header">EDIT REVIEW</h1>
  <form onSubmit={handleSubmit} className="create-review-form">
    <div className="form-group">
      <textarea
        type="text"
        id="review"
        placeholder="How was your experience"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className={`input-field ${errors.review ? "error" : ""}`}
      />
      {errors.review && <p className="error-message">{errors.review}</p>}
    </div>

    <div className="form-group-update">
      <div className="stars-update">

            <span className="stars-text-update">
                Select your rating
            </span>
            <div id='just-stars'>
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
        </div>
        {errors.stars && <p className="error-message">{errors.stars}</p>}
    </div>
    <button
      type="submit"
      className="create-review-btn"
      disabled={submitted}
    >
      Update Review
    </button>
  </form>
</section>
</div>
  )



}

export default UpdateReviewForm;
