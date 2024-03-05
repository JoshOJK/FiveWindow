from .db import db, environment, SCHEMA, add_prefix_for_prod

class PizzaImage(db.Model):
    __tablename__ = 'pizzaImages'

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    pizza_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('pizzas.id')))
    pizzaImg = db.Column(db.String, nullable=False)

    pizza_img = db.relationship("Pizza", back_populates="pizzaImages")

    def to_dict(self):

        return {
            "pizzaImg" : self.pizzaImg
        }
