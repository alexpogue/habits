from .base import db
from .user import User
from flask_dance.consumer.storage.sqla import OAuthConsumerMixin
from sqlalchemy.orm.collections import attribute_mapped_collection

class OAuth(OAuthConsumerMixin, db.Model):
    provider_user_id = db.Column(db.String(256), unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id))
    user = db.relationship(User,
        backref=db.backref(
            'oauth',
            collection_class=attribute_mapped_collection('provider'),
            cascade='all, delete-orphan'
        )
    )
