from flask import Blueprint, request, jsonify
from api.models.Tips import Tips
from api.models.User import User
from api.core import create_response, serialize_list, logger
from datetime import datetime
from bson.objectid import ObjectId
import json
from Constants import UPVOTE, DOWNVOTE

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


@tips.route("/tips/<user_id>", methods=["GET"])
def get_tips_by_user(user_id):
    """
    GET function for retrieving Tips objects posted by a certain user
    """
    user = User.objects.get(id=user_id)
    posted_tips = (user.to_mongo())["posted_tips"]
    posted_tips_list = [
        Tips.objects.get(id=str(tips)).to_mongo() for tips in posted_tips
    ]
    return create_response(data={"tips": posted_tips_list})


@tips.route("/tips_category/<category>", methods=["GET"])
def get_tips_by_category(category):
    """
    GET function for retrieving Tips objects in a certain category
    """
    response = [tips.to_mongo() for tips in Tips.objects if tips.category == category]
    response = {"tips": response}
    return create_response(data=response)


@tips.route("/tips_upvotes/<tips_id>", methods=["GET"])
def get_tip_upvotes(tips_id):
    """
    GET function for retrieving Tips objects by tip id
    """
    tip = Tips.objects.get(id=tips_id)
    tips_upvotes = (tips.to_mongo())["upvotes"]
    tips_upvotes_list = [
        User.objects.get(id=str(user)).to_mongo() for user in tips_upvotes
    ]
    response = {"upvotes": tips_upvotes_list}
    return create_response(data=response)


@tips.route("/tips_downvotes/<tips_id>", methods=["GET"])
def get_tip_downvotes(tips_id):
    """
    GET function for retrieving all User objects that have downvoted a tip
    """
    tip = Tips.objects.get(id=tips_id)
    tips_downvotes = (tips.to_mongo())["downvotes"]
    tips_downvotes_list = [
        User.objects.get(id=str(user)).to_mongo() for user in tips_downvotes
    ]
    response = {"upvotes": tips_downvotes_list}
    return create_response(data=response)


@tips.route("/tips/verified", methods=["GET"])
def get_verified_tips():
    """
    GET function for retrieving all tips that are verified
    """
    response = [tip.to_mongo() for tip in Tips.objects if tip.verified == True]
    response = {"verified_tips": response}
    return create_response(data=response)


@tips.route("/tips", methods=["POST"])
def create_tip():
    """
    POST function for creating a new Tips object
    """
    data = request.get_json()
    tips = Tips.objects.create(
        title=data["title"],
        content=data["content"],
        author=ObjectId(data["user_id"]),
        posted_time=datetime.now(),
        verified=False,
        latitude=data["latitude"],
        longitude=data["longitude"],
        category=data["category"],
    )
    tips.save()
    user = User.objects.get(id=data["user_id"])
    posted_tips = (user.to_mongo())["posted_tips"]
    posted_tips.append(ObjectId(tips.id))
    user.update(posted_tips=posted_tips)
    return create_response(message="success!")


@tips.route("/tips/<tips_id>", methods=["PUT"])
def edit_tip(tips_id):
    """
    PUT function for editing Tips objects
    """
    data = request.get_json()
    tip = Tips.objects.get(id=tips_id)
    if "title" in data:
        tip.title = data["title"]
    if "content" in data:
        tip.content = data["content"]
    if "verified" in data:
        tip.verified = data["verified"]
    if "latitude" in data:
        tip.latitude = data["latitude"]
    if "longitude" in data:
        tip.longitude = data["longitude"]
    if "category" in data:
        tip.category = data["category"]
    tip.save()
    return create_response(message="success!")


@tips.route("/tips/<id>/verify", methods=["PUT"])
def update_verified(id):
    """
    PUT function for changing the tip's verified status
    """
    tip = Tips.objects.get(id=id)
    if request.args.get("verified") == "True":
        tip.update(verified=True)
        return create_response(message="success!")
    if request.args.get("verified") == "False":
        tip.update(verified=False)
        return create_response(message="success!")
    return create_response(
        message="query string not recognized, it must be either True or False"
    )


@tips.route("/tips_votes", methods=["PUT"])
def change_vote():
    """
    PUT function for changing a user's upvote or downvote
    """
    data = request.get_json()
    tip = Tips.objects.get(id=data["tips_id"])
    if data["vote_type"] == UPVOTE:
        if ObjectId(data["user_id"]) in tip.to_mongo()["upvotes"]:
            tip.update(pull__upvotes=ObjectId(data["user_id"]))
        else:
            tip_upvotes = tip.to_mongo()["upvotes"]
            tip_upvotes.append(ObjectId(data["user_id"]))
            tip.update(upvotes=tip_upvotes)
            if ObjectId(data["user_id"]) in tip.to_mongo()["downvotes"]:
                tip.update(pull__downvotes=ObjectId(data["user_id"]))

    if data["vote_type"] == DOWNVOTE:
        if ObjectId(data["user_id"]) in tip.to_mongo()["downvotes"]:
            tip.update(pull__downvotes=ObjectId(data["user_id"]))
        else:
            tip_downvotes = tip.to_mongo()["downvotes"]
            tip_downvotes.append(ObjectId(data["user_id"]))
            tip.update(downvotes=tip_downvotes)
            if ObjectId(data["user_id"]) in tip.to_mongo()["upvotes"]:
                tip.update(pull__upvotes=ObjectId(data["user_id"]))
    return create_response(message="success!")


@tips.route("/tips/<tips_id>", methods=["DELETE"])
def delete_tips_by_id(tips_id):
    """
    DELETE function for deleting a tips object by id
    """
    for tips in Tips.objects:
        if tips_id == str(tips.id):
            user = User.objects.get(id=str(tips.author))
            posted_tips = (user.to_mongo())["posted_tips"]
            posted_tips.remove(ObjectId(tips.id))
            user.update(posted_tips=posted_tips)
            tips.delete()
            return create_response(message="success!")
    return create_response(message="Tip not found")


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
    Helper function to delete tips collection in db.
    """
    result = Tips.objects().delete()
    return result