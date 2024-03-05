from app.models import Pizza
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError


class PizzaForm(FlaskForm):
    name = StringField('name', [DataRequired()])
    description = StringField('description')
    ingredientList = StringField('ingredientList', [DataRequired()])
    price = IntegerField('price', [DataRequired()])
