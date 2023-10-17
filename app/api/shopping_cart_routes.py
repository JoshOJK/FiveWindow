from app.models.shoppingCart import ShoppingCart
from flask import Blueprint, jsonify, request
from app.models import ShoppingCart, db
from flask_login import login_required, current_user

cart_routes = Blueprint('cart', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


## Initialize shopping cart
@cart_routes.route('/create', methods=['POST'])
def create_a_create():
    cart = ShoppingCart(
        cartOwner_id=current_user.id
    )
    db.session.add(cart)
    db.session.commit()
    return cart.to_dict()


@cart_routes.route('/')
def get_a_cart():
    cart = ShoppingCart.query.filter(
        ShoppingCart.cartOwner_id == current_user.id
    ).first()

    return cart.to_dict()
