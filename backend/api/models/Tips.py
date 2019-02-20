from mongoengine.fields import (
    StringField,
    IntField,
    DateTimeField,
    FloatField,
    EmbeddedDocumentField,
    ObjectIdField,
    ListField,
)
import mongoengine
from api.models.User import User
from datetime import datetime


# DynamicDocument allows for unspecified fields to be put in as well
class Tips(mongoengine.DynamicDocument):
    """Tips Document Schema"""

    title = StringField(required=True)
    content = StringField(required=True)
    author = ObjectIdField()
    posted_time = DateTimeField(default=datetime.now())
    latitude = FloatField(required=True)
    longitude = FloatField(required=True)
    category = StringField(required=True)
    upvotes = ListField(ObjectIdField())
    downvotes = ListField(ObjectIdField())
