from flask import Blueprint, request
from api.models.Business import Business
from api.models.Location import Location
from api.models.OpenHours import OpenHours
from api.core import create_response, serialize_list, logger
from api.scrapers.open_businesses import business_scrape

business = Blueprint("business", __name__)


@business.route("/businesses", methods=["GET"])
def open_businesses():
    """
    Querystring args:   time= #### (time as 4 digit 24hr time, eg. 1430 = 2:30pm)
                        day = # (integer 0-6, where 0 is Monday)

    Gets a list of businesses that are open at the time specified in the
    querystring.
    """
    data = Business.objects()
    time = int(request.args.get("time", default=-1))
    day = int(request.args.get("day", default=-1))
    if time == -1 or day == -1:
        return get_business()
    p_day = day - 1
    if p_day == -1:
        p_day = 6
    open_businesses = []
    for b in data:
        curr_day = get_open_business_day(b, day)
        prev_day = get_open_business_day(b, p_day)
        if curr_day == None:
            continue
        if int(curr_day.start) <= time and int(curr_day.end) >= time:
            # open
            open_businesses.append(b.to_mongo())
        elif prev_day != None and prev_day.is_overnight and int(curr_day.end) >= time:
            open_businesses.append(b.to_mongo())
    ret_data = {"businesses": open_businesses}
    return create_response(data=ret_data, message="Success", status=201)


def get_open_business_day(business, day):
    """
    Helper function which returns 'day' dictionary of corresponding day for
    given business dictionary. If the day is not found, returns None.
    """
    if len(business.open_hours) == 0:
        return None
    for open_day in business.open_hours:
        if open_day.day == day:
            return open_day
    return None


@business.route("/all_businesses", methods=["GET"])
def get_business():
    """
    GET function for retrieving Business objects
    """
    response = [business.to_mongo() for business in Business.objects]
    response = {"businesses": response}
    logger.info("BUSINESSES: %s", response)
    return create_response(
        data=response, status=200, message="Returning all businesses."
    )


@business.route("/businesses", methods=["POST"])
def scrape_businesses():
    """
    POST function which scrapes data from business_scrape() method in
    open_businesses.py scraper and stores them in the businesses db collection.
    Should be run maybe once a month.
    """
    try:
        data = business_scrape()
        delete_business_collection()
        for business_id in data.keys():
            save_business_to_db(data[business_id])
        return create_response(status=200, message="success!")
    except requests.exceptions.HTTPError:
        return create_response(status=500, message="HTTPError")
    except requests.exceptions.Timeout:
        return create_response(status=500, message="Connection timed out")
    except Exception as e:
        return create_response(status=500, message="Exception raised: " + repr(e))


def save_business_to_db(business_dict):
    """
    Helper function to save python dict object representing a business db entry
    to an actual mongoDB object. Gracefully handles missing hours attribute by
    replacing it with an empty list.
    """
    location = Location(
        city=business_dict["location"].get("city"),
        country=business_dict["location"].get("country"),
        address1=business_dict["location"].get("address1"),
        state=business_dict["location"].get("state"),
        zip_code=business_dict["location"].get("zip_code"),
    )
    open_hours = []
    hours_struct = business_dict.get("hours")
    if hours_struct != None:
        hours_data = hours_struct[0].get("open")
        if hours_data != None:
            for hours in hours_data:
                new_hours = OpenHours(
                    start=hours["start"],
                    end=hours["end"],
                    is_overnight=hours["is_overnight"],
                    day=hours["day"],
                )
                open_hours.append(new_hours)
    business = Business.objects.create(
        name=business_dict.get("name"),
        yelp_id=business_dict.get("yelp_id"),
        image_url=business_dict.get("image_url"),
        display_phone=business_dict.get("display_hours"),
        location=location,
        open_hours=open_hours,
        latitude=business_dict.get("latitude"),
        longitude=business_dict.get("longitude"),
    )
    business.save()


@business.route("/businesses", methods=["DELETE"])
def clear_businesses():
    """
    DELETE method which wraps the delete business collection function as
    an API endpoint.
    """
    try:
        count = delete_business_collection()
        return create_response(
            status=200, message="Success! Deleted " + str(count) + " records."
        )
    except Exception as e:
        return create_response(
            status=500, message="Could not clear collection: " + repr(e)
        )


def delete_business_collection():
    """
    Helper function to delete phone collection in db.
    """
    count = len(Business.objects())
    for business in Business.objects():
        business.delete()
    return count
