from .base import db
from .base import ma

from marshmallow import fields


class Goal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    entries = db.relationship('GoalEntry', back_populates='goal')


class GoalSchema(ma.Schema):
    id = fields.Integer()
    name = fields.String()
    entries = fields.Nested('GoalEntrySchema', many=True, exclude=('goal_id',))


goal_schema = GoalSchema()
goals_schema = GoalSchema(many=True)
