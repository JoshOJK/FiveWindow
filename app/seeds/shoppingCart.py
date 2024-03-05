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
    },
    {
        'cartOwner_id': 4
    },
    {
        'cartOwner_id': 5
    },
    {
        'cartOwner_id': 6
    },
      {
        'cartOwner_id': 7
    },
    {
        'cartOwner_id': 8
    },
    {
        'cartOwner_id': 9
    },
     {
        'cartOwner_id': 10
    },
    {
        'cartOwner_id': 11
    },
    {
        'cartOwner_id': 12
    },
    {
        'cartOwner_id': 13
    },
    {
        'cartOwner_id': 14
    },
    {
        'cartOwner_id': 15
    },
      {
        'cartOwner_id': 16
    },
    {
        'cartOwner_id': 17
    },
    {
        'cartOwner_id': 18
    },
    {
        'cartOwner_id': 19
    },
    {
        'cartOwner_id': 20
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
