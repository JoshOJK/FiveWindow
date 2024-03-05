from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(username='Demo', email='demo@aa.io', password='password', isAdmin=True)
    marnie = User(username='marnie', email='marnie@aa.io', password='password', isAdmin=False)
    bobbie = User(username='bobbie', email='bobbie@aa.io', password='password', isAdmin=False)
    user1 = User(username='Clarice', email='user1@aa.io', password='password', isAdmin=False)
    user2 = User(username='Gladreal', email='user2@aa.io', password='password', isAdmin=False)
    user3 = User(username='Strider', email='user3@aa.io', password='password', isAdmin=False)
    user4 = User(username='Anakin', email='user4@aa.io', password='password', isAdmin=False)
    user5 = User(username='Luke', email='user5@aa.io', password='password', isAdmin=False)
    user6 = User(username='Wesley', email='user6@aa.io', password='password', isAdmin=False)
    user7 = User(username='Poppie', email='user7@aa.io', password='password', isAdmin=False)
    user8 = User(username='Gojo', email='user8@aa.io', password='password', isAdmin=False)
    user9 = User(username='Tanjiro', email='user9@aa.io', password='password', isAdmin=False)
    user10 = User(username='Fox', email='user10@aa.io', password='password', isAdmin=False)
    user11 = User(username='Terry', email='user11@aa.io', password='password', isAdmin=False)
    user12 = User(username='Jack Sparrow', email='user12@aa.io', password='password', isAdmin=False)
    user13 = User(username='Gimley', email='user13@aa.io', password='password', isAdmin=False)
    user14 = User(username='Erwind', email='user14@aa.io', password='password', isAdmin=False)
    user15 = User(username='Omniman', email='user15@aa.io', password='password', isAdmin=False)
    user16 = User(username='Mark Grayson', email='user16@aa.io', password='password', isAdmin=False)
    user17 = User(username='Palpatine', email='user17@aa.io', password='password', isAdmin=False)


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(user4)
    db.session.add(user5)
    db.session.add(user6)
    db.session.add(user7)
    db.session.add(user8)
    db.session.add(user9)
    db.session.add(user10)
    db.session.add(user11)
    db.session.add(user12)
    db.session.add(user13)
    db.session.add(user14)
    db.session.add(user15)
    db.session.add(user16)
    db.session.add(user17)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
