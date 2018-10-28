from flask import Blueprint
from api.models.Crime import Crime
from api.core import create_response, serialize_list, logger

crime = Blueprint("crime", __name__)

@crime.route("/crimes", methods=["GET"])
def get_crime():
    """
    GET function for retrieving Crime objects
    """
    response = [crime.to_mongo() for crime in Crime.objects]
    response = {"crimes" : response}
    logger.info("CRIMES: %s", response)
    return create_response(data = response)

@crime.route("/crimes", methods=["POST"])
def create_crime():
    """
    POST function for posting a hard-coded Crime object for testing purposes
    """
    crime = Crime.objects.create(
        incident_id="1",
        incident_type_primary="Peeing in public",
        incident_description="Self explanatory",
        address_1="Outside Shreyas's apartment",
        city="Champaign",
        state="IL",
        latitude=100.1,
        longitude=200.2,
        hour_of_day=23,
        day_of_week="Monday",
        parent_incident_type="Disturbing the peace"
    )
    crime.save()

    return create_response(message="success!")

@crime.route("/scrape_crimes", methods=["POST"])
def scrape_crimes():
    crime_data = 
