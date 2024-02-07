const LOAD_REVIEWS = "Reviews/LOAD_REVIEWS";
const CREATE_REVIEW = "Reviews/CREATE_REVIEW";
const DELETE_REVIEW = "Reviews/DELETE_REVIEW";
const UPDATE_REVIEW = "Reviews/UPDATE_REVIEW";
const REVIEW_DETALS = "Reviews/REVIEW_DETAILS"


const createReview = (review) => ({
  type: CREATE_REVIEW,
  review,
});

const fetchReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews,
});

const updateUserReview = (review) => ({
  type: UPDATE_REVIEW,
  review,
});

const deleteUserReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId,
});

const loadReviewDetails = (review) => ({
  type: REVIEW_DETALS,
  review,
})



export const createFwbcReview = (reviewData) => async (dispatch) => {
  const res = await fetch(`/api/reviews/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewData),
  });

  if (res.ok) {
    const reviewData = await res.json();
    dispatch(createReview(reviewData));
    return reviewData;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const loadReviews = () => async (dispatch) => {
  const res = await fetch(`/api/reviews`);
  if (res.ok) {
    const reviews = await res.json();
    dispatch(fetchReviews(reviews));
    return res;
  }
};

export const loadReviewDetail = (reviewId) => async (dispatch) => {
  const res = await fetch(`/api/review/${reviewId}`)

  if(res.ok) {
      const details = await res.json();
      dispatch(loadReviewDetails(details))
      return res;
  }
}

export const deleteUserReviews = (reviewId) => async (dispatch) => {
  const res = fetch(`/api/reviews/${reviewId}/delete`, {
    method: "DELETE",
  });

  if (!res.ok) {
    return "Review couldn't be removed";
  }
  dispatch(deleteUserReview(reviewId));
};

export const updateReview = (reviewId, reviewData) => async (dispatch) => {
  const res = fetch(`/api/reviews/${reviewId}/edit`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewData)
  });

  if (res.ok) {
    const updatedReview = await res.json();
    dispatch(updateUserReview(updatedReview));
    return updatedReview;
  }
};


const reviewReducer = (state = {}, action) => {
  let newState = { ...state };

  switch (action.type) {
    case LOAD_REVIEWS:
      newState = {}
      action.reviews.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;
    case REVIEW_DETALS:
      newState[action.review.id] = action.review
      return newState;
    case CREATE_REVIEW:
      newState[action.review.id] = action.review;
      return newState;
    case UPDATE_REVIEW:
      newState[action.review.id] = action.review;
      return newState;
    case DELETE_REVIEW:
      delete newState[action.reviewId];
      return newState;
    default:
      return state;
  }
};

export default reviewReducer;
