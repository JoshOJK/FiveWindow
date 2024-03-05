from flask import Blueprint, jsonify, request
from app.models import Review, db
from app.forms.review_form import ReviewForm
from flask_login import login_required, current_user

review_routes = Blueprint('review', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages
##view reviews
@review_routes.route('/')
def get_all_reviews():
    results = []
    reviews = Review.query.all()
    for review in reviews:
        results.append(review.to_dict())
    return results

##delete a review
@review_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.get(id)
    if review:
        if current_user.id == review.reviewer.id:
            db.session.delete(review)
            db.session.commit()
            return {'Message': 'Review was successfully deleted'}
        return {'Error': 'You must be the owner of the review to delete it'}, 401
    return {'Error': 'Review could not be found'}, 404

##create a review
@review_routes.route('/create', methods=['POST'])
@login_required
def create_a_review():
    form = ReviewForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review(
            review=form.data['review'],
            stars=form.data['stars'],
            reviewer_id=current_user.id
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict()
    return {'error': validation_errors_to_error_messages(form.errors)}, 401

##update a review
@review_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def update_user_review(id):

    form = ReviewForm()

    review = Review.query.get(id)

    if review:
        if current_user.id == review.reviewer.id:
            form['csrf_token'].data = request.cookies['csrf_token']
            if form.validate_on_submit():
                review.review = form.data['review']
                review.stars = form.data['stars']
                db.session.commit()
                return review.to_dict()
            return {"errors": validation_errors_to_error_messages(form.errors)}, 401
        return {"errors": "USER MUST OWN THE REVIEW!!!!!"}, 401
    return {"errors": "Review mayhaps not exist?"}, 404

##get a reviews details
@review_routes.route('/<int:id>')
def get_one_review(id):
    results = []

    review = Review.query.get(id)
    if review:
        results.append(review.to_dict())
        return results
    return {'error': 'Review could not be found'}, 404
