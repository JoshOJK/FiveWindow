from app.models import db, environment, SCHEMA
from app.models.shoppingCart import ShoppingCart
from sqlalchemy.sql import text


def seed_shopping_carts():
    demo = ShoppingCart(
        cartOwner_id=1
        )
    marnie = ShoppingCart(
        cartOwner_id=2
        )
    bobbie = ShoppingCart(
        cartOwner_id=3
        )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


def undo_shopping_carts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.shoppingCarts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM shoppingCarts"))

    db.session.commit()
