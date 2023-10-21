from app.models import db, environment, SCHEMA
from app.models.shoppingCart import ShoppingCart
from sqlalchemy.sql import text

shopping_cart_data = [
    {
        'cartOwner_id': 1
    },
    {
        'cartOwner_id': 2
    },
    {
        'cartOwner_id': 3
    }
]

def seed_shopping_carts():
    for userCart in shopping_cart_data:
        cart = ShoppingCart(**userCart)
        db.session.add(cart)
        db.session.commit()


def undo_shopping_carts():
    carts = ShoppingCart.query.all()
    for cart in carts:
        db.session.delete(cart)
    db.session.commit()

if __name__ == "__main__":
    seed_shopping_carts()

    undo_shopping_carts()

# def seed_shopping_carts():
#     demo = ShoppingCart(
#         cartOwner_id=1
#         )
#     marnie = ShoppingCart(
#         cartOwner_id=2
#         )
#     bobbie = ShoppingCart(
#         cartOwner_id=3
#         )

#     db.session.add(demo)
#     db.session.add(marnie)
#     db.session.add(bobbie)
#     db.session.commit()


# def undo_shopping_carts():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.shoppingCarts RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM shoppingCarts"))

#     db.session.commit()
