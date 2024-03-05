from flask import Blueprint, jsonify, request
from app.models import Pizza, PizzaImage, db
from app.forms.pizza_form import PizzaForm
from app.forms.pizza_image_form import PizzaImageForm
from flask_login import login_required, current_user
from .aws_helper import (
    upload_file_to_s3, get_unique_filename, remove_file_from_s3)

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
    pizzaImage = PizzaImage.query.get(id)

    if pizza:
        if current_user.isAdmin == True:
            pizzaUrl = pizzaImage.pizzaImg
            deleted = remove_file_from_s3(pizzaUrl)
            print(deleted)
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

##create pizza image
@pizza_routes.route("/<int:id>/image", methods=["POST"])
@login_required
def upload_image(id):
        pizza = Pizza.query.get(id)

        form = PizzaImageForm()
        if pizza:
            form['csrf_token'].data = request.cookies['csrf_token']
            if form.validate_on_submit():
                image = form.data["url"]
                image.filename = get_unique_filename(image.filename)
                upload = upload_file_to_s3(image)
                print(upload)

                if "url" not in upload:
                    return {'errors': [upload]}
                url = upload["url"]
                pizza_image = PizzaImage(pizza_id=id, pizzaImg=url)
                db.session.add(pizza_image)
                db.session.commit()
                return pizza_image.to_dict()
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401
        return {'errors': 'This pizza does not exist'}, 404

##delete pizza image
@pizza_routes.route('/<int:id>/image/delete', methods=['DELETE'])
@login_required
def delete_pizza_image(id):
    pizzaImage = PizzaImage.query.get(id)

    if pizzaImage:
        pizzaImg = PizzaImage.pizzaImg
        deleted = remove_file_from_s3(pizzaImage)
        print(deleted)
        db.session.delete(pizzaImg)
        db.session.commit()
    return {'errors': 'Pizza image does not exist'}, 404
