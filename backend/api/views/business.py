from flask import Blueprint
from api.models.Business import Business
from api.models.Location import Location
from api.models.OpenHours import OpenHours
from api.core import create_response, serialize_list, logger

business = Blueprint("business", __name__)

@business.route("/businesses", methods=["GET"])
def get_business():
    logger.info("BUSINESSES: %s", Business.objects())
    return create_response(data = Business.objects())

@business.route("/businesses", methods=["POST"])
def create_business():
    location = Location(city="Champaign", country="USA", address1="addy1", state="IL", zip_code="12345")
    
    open_hours = OpenHours(start="0000", end="1111", is_overnight=True, day=3)    

    business = Business.objects.create(
        name="McDonalds", 
        yelp_id="asdasd", 
        image_url="asdasd.com", 
        display_phone="12345555"
    )
    business.location = location
    business.open_hours = [open_hours]
    business.save()

    return create_response(message="success!")