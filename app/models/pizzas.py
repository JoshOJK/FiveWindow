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

    pizzaImages = db.relationship("PizzaImage", back_populates='pizza_img', cascade="all, delete-orphan")

    def to_dict(self):
        img = [image.to_dict() for image in self.pizzaImages]

        return {
        'id': self.id,
        'name': self.name,
        'description': self.description,
        'price': self.price,
        'ingredientList': self.ingredientList,
        'image_url': img
        }
