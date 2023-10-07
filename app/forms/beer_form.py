from app.models import Beer
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class BeerForm(FlaskForm):
    name = StringField('name', [DataRequired()])
    description = StringField('description')
    abv = IntegerField('price', [DataRequired()])
    shoppingCart_id = IntegerField('shoppingCart')
