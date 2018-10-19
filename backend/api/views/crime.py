from flask import Blueprint
from api.models.Crime import Crime
from api.core import create_response, serialize_list, logger

crime = Blueprint("crime", __name__)

@crime.route("/crimes", methods=["GET"])
def get_crime():
    logger.info("CRIMES: %s", Crime.objects())
    return create_response(data = Crime.objects())

@crime.route("/crimes", methods=["POST"])
def create_crime():
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