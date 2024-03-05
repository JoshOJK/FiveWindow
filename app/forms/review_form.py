from app.models import Review
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class ReviewForm(FlaskForm):
    review = StringField('review', [DataRequired()])
    reviewer_id = IntegerField('reviewer')
    stars = IntegerField('price', [DataRequired()])
