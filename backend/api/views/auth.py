import pdb
import requests
from flask import Blueprint, request
from api.core import create_response, serialize_list, logger, invalid_model_helper
from api.models.User import User
from datetime import datetime

auth = Blueprint("auth", __name__)

auth_server_host = "http://localhost:8000/"

def invalid_register_data(user_data):
    return invalid_model_helper(user_data, ["email", "password", "net_id", "anon", "username"])

def invalid_login_data(user_data):
    return invalid_model_helper(user_data, ["email", "password"])

# Expects a post body that has email, password, net_id, anon, and username fields
@auth.route("/register", methods=["POST"])
def register():
    client_data = request.get_json()
    if invalid_register_data(client_data):
        return create_response(
            message="Missing required information to register!",
            status=422,
            data={"status": "fail"},
        )

    our_response, _ = auth_helper("register", "email", "password", "role")

    if our_response.status_code != 200:
        return create_response(
            message="Missing required info!", status=422, data={"status": "fail"}
        )
    user = User.objects.create(
        net_id=client_data["net_id"],
        username=client_data["username"],
        verified=False,
        anon=client_data["anon"],
        karma=0,
        posted_tips=[],
        date_created=datetime.now(),
    )
    user.save()
    return our_response



@auth.route("/login", methods=["POST"])
def login():
    client_data = request.get_json()
    if invalid_login_data(client_data):
        return create_response(
            message="Missing required information to login!",
            status=422,
            data={"status": "fail"},
        )
    return auth_helper("login", "email", "password")


def auth_helper(endpoint, *properties):
    properties = list(properties)
    user_input = request.get_json()

    auth_post_data = {}
    for prop in properties:
        if prop not in user_input:
            return create_response(
                message="Missing required info!", status=422, data={"status": "fail"}
            )
        auth_post_data[prop] = user_input[prop]

    auth_server_response = requests.post(
        auth_server_host + endpoint, json=auth_post_data
    )
    response_body = auth_server_response.json()

    if "token" not in response_body:
        return create_response(
            message=response_body["message"], status=auth_server_response.status_code
        )
    else:
        jwt_token = response_body["token"]
        our_response_body = {"token": jwt_token}
        return create_response(
            message=response_body["message"],
            status=auth_server_response.status_code,
            data=our_response_body,
        )
