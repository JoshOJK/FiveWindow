from app.models import PizzaImage
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.api.aws_helper import ALLOWED_EXTENSIONS
from flask_wtf.file import FileField, FileAllowed, FileRequired

class PizzaImageForm(FlaskForm):
    pizza_id = IntegerField('PizzaItem')
    url = FileField('url', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
