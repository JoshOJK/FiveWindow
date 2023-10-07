from flask import Blueprint, jsonify, request
from app.models import Beer, db
from app.forms.beer_form import BeerForm
from flask_login import login_required, current_user
from app.models.shoppingCart import ShoppingCart
from app.models.beercartItems import BeerCartItem
from app.models.beer import Beer
from app.forms.beer_cart_items_form import BeerCartItemForm

beer_routes = Blueprint('beer', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


## View all beer taps
@beer_routes.route('/')
def get_all_beer():
    beers = Beer.query.all()
    results = []
    for beer in beers:
        results.append(beer.to_dict())
    return results


## Create a new beer tap
@beer_routes.route('/create', methods=['POST'])
@login_required
def create_a_beer():
    form = BeerForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        beer = Beer(
            name=form.data['name'],
            description=form.data['description'],
            abv=form.data['abv']
        )
        db.session.add(beer)
        db.session.commit()
        return beer.to_dict()
    return {'error': validation_errors_to_error_messages(form.errors)}, 401


## Update a beers details
@beer_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def edit_a_beer(id):

    form = BeerForm()

    beer = Beer.query.get(id)

    if beer:
        if current_user.isAdmin == True:
            form['csrf_token'].data = request.cookies['csrf_token']
            if form.validate_on_submit():
                beer.name = form.data['name']
                beer.description = form.data['description']
                beer.abv = form.data['abv']
                db.session.commit()
                return beer.to_dict()
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401
        return {"errors": "You must be an admin to edit beer taps"}, 401
    return {"errors": "This beer tap does not exist!"}, 404

## Delete a Beer tap
@beer_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_a_beer(id):
    beerTap = Beer.query.get(id)
    if beerTap:
        if current_user.isAdmin == True:
            db.session.delete(beerTap)
            db.commit()
            return {'Message': 'Beer Tap was successfully deleted'}
        return {'error': 'You must be an admin to delete beer taps'}, 401
    return {'error': 'Beer Tap does not exist'}, 404

## Details of a beer tap
@beer_routes.route('/<int:id>')
def get_one_beerTap(id):
    results = []

    beer = Beer.query.get(id)
    if beer:
        results.append(beer.to_dict())
        return results
    return {'error': 'Beer tap could not be found'}, 404


## Create a shopping cart
@beer_routes.route('/<int:id>/shopping-cart', methods=['POST'])
def create_user_cart(id):
    form = BeerCartItemForm()
    beer = Beer.query.get(id)
    cart = ShoppingCart.query.filter(
        ShoppingCart.cartOwner_id == current_user.id
    ).first()
    beerItem = BeerCartItem.query.filter(
        BeerCartItem.beer_id == id,
        BeerCartItem.shoppingCart_id == cart.id
    ).first()



    if beer and cart:
        if beerItem:
            form['csrf_token'].data = request.cookies['csrf_token']
            if form.validate_on_submit():
                beerItem.quantity+= form.data['quantity']
                db.session.commit()
                return beerItem.to_dict()
            else:
                form['csrf_token'].data = request.cookies['csrf_token']
                if form.validate_on_submit():
                    item = BeerCartItem(
                    beer_id=id,
                    shoppingCart_id=cart.id,
                    quantity=form.data['quantity']
                    )
                    db.session.add(item)
                    db.session.commit()
                    return item.to_dict()

    return {'errors': 'Failed to add item to your cart'}
