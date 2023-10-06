from .db import db, environment, SCHEMA, add_prefix_for_prod

class Beer(db.Model):
    __tablename__ = "beers"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    abv = db.Column(db.Integer, nullable=False)

    beerincart = db.relationship('BeerCartItem', backref='beers')

    def to_dict(self):

        return {
        'id': self.id,
        'name': self.name,
        'description': self.description,
        'abv': self.abv
        }
