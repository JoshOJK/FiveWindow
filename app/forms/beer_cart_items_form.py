from app.models import BeerCartItem
from flask_wtf import FlaskForm
from wtforms import IntegerField

class BeerCartItemForm(FlaskForm):
    quantity = IntegerField('quantity')
