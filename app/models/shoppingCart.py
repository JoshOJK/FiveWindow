from .db import db, environment, SCHEMA, add_prefix_for_prod

class ShoppingCart(db.Model):
    __tablename__ = "shoppingCarts"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    cartOwner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    cartOwner = db.relationship('User', back_populates='shoppingCart')
    # parent = relationship("Parent", backref="children")  # only on the child class
    # child = relationship("child", backref="parent")  # only on the parent class

    def to_dict(self):
        beerItems_list = [beeritem.to_dict() for beeritem in self.beercartitems]
        return {
        'id': self.id,
        'cartOwner_id': self.cartOwner_id,
        'beerItems': beerItems_list
        }
