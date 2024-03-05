from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_reviews():
    reviews_data = [
        {"reviewer_id": 20, "review": "Enjoyed it a lot, love the atmosphere and decor.", "stars": '4', "createdAt": datetime(2020, 3, 15, 12, 0, 0)},
        {"reviewer_id": 1, "review": "Nice place, good drinks.", "stars": '4', "createdAt": datetime(2018, 6, 20, 10, 30, 0)},
        {"reviewer_id": 2, "review": "Meh, not impressed.", "stars": '2', "createdAt": datetime(2019, 8, 5, 15, 45, 0)},
        {"reviewer_id": 3, "review": "Amazing experience, highly recommended!", "stars": '5', "createdAt": datetime(2022, 1, 10, 18, 20, 0)},
        {"reviewer_id": 4, "review": "Decent drinks, average service.", "stars": '3', "createdAt": datetime(2018, 12, 1, 20, 0, 0)},
        {"reviewer_id": 5, "review": "Could be better, not worth the hype.", "stars": '2', "createdAt": datetime(2021, 5, 5, 11, 30, 0)},
        {"reviewer_id": 6, "review": "A hidden gem, must try!", "stars": '5', "createdAt": datetime(2019, 7, 25, 17, 15, 0)},
        {"reviewer_id": 7, "review": "Not bad, but nothing special either.", "stars": '3', "createdAt": datetime(2023, 2, 12, 14, 45, 0)},
        {"reviewer_id": 8, "review": "Overrated place, won't go again.", "stars": '1', "createdAt": datetime(2020, 9, 30, 9, 0, 0)},
        {"reviewer_id": 9, "review": "Great atmosphere, mediocre drinks.", "stars": '3', "createdAt": datetime(2018, 4, 3, 16, 0, 0)},
        {"reviewer_id": 10,  "review": "Pleasant surprise, exceeded expectations!", "stars": '4', "createdAt": datetime(2022, 11, 8, 13, 45, 0)},
        {"reviewer_id": 11,  "review": "Not my type, won't recommend.", "stars": '2', "createdAt": datetime(2023, 7, 17, 10, 0, 0)},
        {"reviewer_id": 12,  "review": "Service was slow, drinks were okay.", "stars": '3', "createdAt": datetime(2019, 10, 20, 19, 30, 0)},
        {"reviewer_id": 13,  "review": "Too crowded, couldn't enjoy the drinks.", "stars": '2', "createdAt": datetime(2020, 2, 5, 21, 15, 0)},
        {"reviewer_id": 14,  "review": "Unforgettable bar experience, loved it!", "stars": '5', "createdAt": datetime(2021, 8, 12, 18, 0, 0)},
        {"reviewer_id": 15,  "review": "Nothing special, won't go back.", "stars": '2', "createdAt": datetime(2018, 11, 30, 22, 30, 0)},
        {"reviewer_id": 16,  "review": "Good for a quick drink, not for a special occasion.", "stars": '3', "createdAt": datetime(2024, 3, 5, 16, 45, 0)},
        {"reviewer_id": 17,  "review": "Friendly staff, average drinks.", "stars": '3', "createdAt": datetime(2023, 9, 18, 11, 0, 0)},
        {"reviewer_id": 18,  "review": "Expected more, left disappointed.", "stars": '2', "createdAt": datetime(2019, 6, 10, 14, 15, 0)},
        {"reviewer_id": 19,  "review": "Impressive drink menu, but execution fell short.", "stars": '3', "createdAt": datetime(2020, 1, 23, 17, 30, 0)},
    ]


    for review_data in reviews_data:
        review = Review(**review_data)
        db.session.add(review)

    db.session.commit()
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
