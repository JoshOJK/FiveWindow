from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String(500), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    reviewer_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )


    reviewer = db.relationship("User", back_populates="reviews")

    def to_dict(self):
        formatted_created_at = self.createdAt.strftime("%d %b %Y")

        return {
        'id': self.id,
        'review': self.review,
        'stars': self.stars,
        'reviewer': self.reviewer.to_dict(),
        'createdAt': formatted_created_at
        }

    def no_owner(self):
        formatted_created_at = self.createdAt.strftime("%d %b %Y")

        return {
            "id": self.id,
            "reviewer_id": self.reviewer_id,
            "review": self.review,
            "stars": self.stars,
            "createdAt": formatted_created_at
        }
