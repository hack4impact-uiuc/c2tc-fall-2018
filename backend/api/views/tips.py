from flask import Blueprint, request, jsonify
from api.models.Tips import Tips
from api.core import create_response, serialize_list, logger
import json

tips = Blueprint("tips", __name__)


@tips.route("/tips", methods=["GET"])
def get_all_tips():
    """
    GET function for retrieving Tips objects
    """
    response = [tips.to_mongo() for tips in Tips.objects]
    response = {"tips": response}
    logger.info("TIPS: %s", response)
    return create_response(data=response)

@tips.route("/tips", methods=["POST"]) 
def create_tip():
    data = request.get_json()
    tips = Tips.objects.create(
        title = data["title"],
        content = data["content"],
        latitude = 0.0,
        longitude = 0.0,
        category = "Test",
    )
    tips.save()
    return create_response(message="success!")

@tips.route("/tips", methods=["DELETE"])
def clear_tips():
    """
    DELETE method which wraps the clear tips function as
    an API endpoint.
    """
    try:
        count = delete_tips_collection()
        return create_response(
            status=200, message="Success! Deleted " + str(count) + " records."
        )
    except Exception as e:
        return create_response(
            status=500, message="Could not clear collection: " + repr(e)
        )


def delete_tips_collection():
    """
    Helper function to delete phone collection in db.
    """
    result = Tips.objects().delete()
    return result

