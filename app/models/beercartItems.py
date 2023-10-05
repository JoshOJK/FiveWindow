from .db import db, environment, SCHEMA, add_prefix_for_prod

class BeerCartItem(db.Model):
    __tablename__ = "beercartitems"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    beer_id = db.Column(db.String, db.ForeignKey(add_prefix_for_prod('beers.id')))
    shoppingCart_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('shoppingCarts.id')), nullable=False)


    shoppingCart = db.relationship('ShoppingCart', backref='beercartitems')


    def to_dict(self):

        return {
        'id': self.id,
        'name': self.name,
        'description': self.description,
        'abv': self.abv,
        'shoppingCart_id': self.shoppingCart_id
        }
