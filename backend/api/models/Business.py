from mongoengine.fields import (
    StringField,
    ListField,
    EmbeddedDocumentField,
    EmbeddedDocumentListField
)
from api.models.Location import Location
from api.models.OpenHours import OpenHours
import mongoengine
from mongoengine import EmbeddedDocument

# DynamicDocument allows for unspecified fields to be put in as well
class Business(mongoengine.DynamicDocument):
    """Business Document Schema"""

    name = StringField(required = True)
    yelp_id = StringField(required = True, unique = True)
    location = EmbeddedDocumentField(Location)
    image_url = StringField()
    display_phone = StringField()
    open_hours = EmbeddedDocumentListField(OpenHours)


