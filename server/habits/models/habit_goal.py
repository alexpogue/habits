from .base import db
from .base import ma

from marshmallow import fields


class HabitGoal(db.Model):
    __tablename__ = 'habit_goal'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)


class HabitGoalSchema(ma.Schema):
    id = fields.Integer()
    name = fields.String()


habit_goal_schema = HabitGoalSchema()
habit_goals_schema = HabitGoalSchema(many=True)
