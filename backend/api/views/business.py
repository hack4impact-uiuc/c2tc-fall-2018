from flask import Blueprint
from api.models.Business import Business
from api.models.Location import Location
from api.models.OpenHours import OpenHours
from api.core import create_response, serialize_list, logger

business = Blueprint("business", __name__)

'''
@business.route("/open_businesses", methods=["GET"])
def open_businesses():
    ''
    Querystring args:   time= #### (time as 4 digit 24hr time, eg. 1430 = 2:30pm)
                        day = # (integer 0-6, where 0 is Monday)
    ''
    data = Business.objects()
    time = int(request.args.get("time"))
    day = int(request.args.get("day"))
    open_businesses = []
    for b in data:
        if int(b.open_hours[day].start) <= time && b.open_hours[day].end >= time:
            #open
            open_businesses.append(b)
    ret_data = {"businesses": open_businesses}
    return create_response(data=ret_data, message="Success", status=201)
'''

@business.route("/businesses", methods=["GET"])
def get_business():
    """
    GET function for retrieving Business objects
    """
    response = [business.to_mongo() for business in Business.objects]
    response = {"businesses" : response}
    logger.info("BUSINESSES: %s", response)
    return create_response(data = response)

@business.route("/businesses", methods=["POST"])
def create_business():
    """
    POST function for posting a hard-coded Business object for testing purposes
    """
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
