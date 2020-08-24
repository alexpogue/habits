from .base import db
from .base import ma

from marshmallow import fields

from flask_dance.consumer.storage.sqla import OAuthConsumerMixin
from flask_login import UserMixin

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    handle = db.Column(db.String(256), unique=True)
    name = db.Column(db.String(256))
    email = db.Column(db.String(256), unique=True)

#class OAuth(OAuthConsumerMixin, db.Model):
#    user_id = db.Column(db.Integer, db.ForeignKey(User.id))
#    user = db.relationship(User)

class UserSchema(ma.Schema):
    id = fields.Integer()

user_schema = UserSchema()
users_schema = UserSchema(many=True)
