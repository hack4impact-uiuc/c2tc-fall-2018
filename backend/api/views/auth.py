import requests
from flask import Blueprint, request
from api.core import create_response, serialize_list, logger

auth = Blueprint("auth", __name__)

auth_server_host = "http://localhost:8000/"

@auth.route("/register", methods=["POST"])
def register():
    return auth_helper("register", "email", "password", "role")


@auth.route("/login", methods=["POST"])
def login():
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
