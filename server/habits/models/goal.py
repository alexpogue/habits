from .base import db
from .base import ma

from marshmallow import fields


class Goal(db.Model):
    __tablename__ = 'habit_goal'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)


class GoalSchema(ma.Schema):
    id = fields.Integer()
    name = fields.String()


goal_schema = GoalSchema()
goals_schema = GoalSchema(many=True)
