from .db import db, environment, SCHEMA, add_prefix_for_prod

class Pizza(db.Model):
    __tablename__ = "pizzas"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    ingredientList = db.Column(db.String, nullable=False)
    pizzaImg = db.Column(db.String, nullable=False)

    def to_dict(self):

        return {
        'id': self.id,
        'name': self.name,
        'description': self.description,
        'price': self.price,
        'ingredientList': self.ingredientList,
        'pizzaImg': self.pizzaImg
        }
