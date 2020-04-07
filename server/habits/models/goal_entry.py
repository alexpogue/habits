from .base import db
from .base import ma

from marshmallow import fields


class GoalEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    occurred_date = db.Column(db.Date, nullable=False)
    goal_id = db.Column(db.Integer, db.ForeignKey('goal.id'))
    goal = db.relationship('Goal', back_populates='entries')


class GoalEntrySchema(ma.Schema):
    id = fields.Integer()
    occurred_date = fields.Date()
    goal_id = fields.Integer()


goal_entry_schema = GoalEntrySchema()
goal_entries_schema = GoalEntrySchema(many=True)
