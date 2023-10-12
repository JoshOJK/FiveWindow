from flask import Blueprint, jsonify, request
from app.models import Pizza, db
from app.forms.pizza_form import PizzaForm
from flask_login import login_required, current_user

pizza_routes = Blueprint('pizza', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


##get all Pizzas
@pizza_routes.route('/')
def get_all_pizzas():
    results = []
    pizzas = Pizza.query.all()
    for pizza in pizzas:
        results.append(pizza.to_dict())
    return results

## Delete a pizza
@pizza_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_one_pizza(id):
    pizza = Pizza.query.get(id)
    if pizza:
        if current_user.isAdmin == True:
            db.session.delete(pizza)
            db.session.commit()
            return {'Message': 'Pizza was successfully deleted'}
        return {'error': 'You must be an admin to delete menu items'}, 401
    return {'error': 'Menu item does not exist'}, 404


## Create a Pizza
@pizza_routes.route('/create', methods=['POST'])
@login_required
def create_a_pizza():
    form = PizzaForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        pizza = Pizza(
            name=form.data['name'],
            description=form.data['description'],
            price=form.data['price'],
            ingredientList=form.data['ingredientList'],
            pizzaImg=form.data['pizzaImg']
        )
        db.session.add(pizza)
        db.session.commit()
        return pizza.to_dict()
    return {'error': validation_errors_to_error_messages(form.errors)}, 401

## Update a Pizza
@pizza_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def update_one_pizza(id):

    form = PizzaForm()

    pizza = Pizza.query.get(id)

    if pizza:
        if current_user.isAdmin == True:
            form['csrf_token'].data = request.cookies['csrf_token']
            if form.validate_on_submit():
                pizza.description = form.data['description']
                pizza.ingredientList = form.data['ingredientList']
                pizza.name = form.data['name']
                pizza.price = form.data['price']
                pizza.pizzaImg = form.data['pizzaImg']
                db.session.commit()
                return pizza.to_dict()
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401
        return {"errors": "You must be an admin to edit menu items"}, 401
    return {"errors": "This menu item does not exist!"}, 404


## Get details of a specific Pizza
@pizza_routes.route('/<int:id>')
def get_one_pizza(id):
    results = []

    pizza = Pizza.query.get(id)
    if pizza:
        results.append(pizza.to_dict())
        return results
    return {'error': 'Menu Item could not be found'}, 404
