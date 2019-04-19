import requests
from flask import Blueprint
from api.core import create_response, serialize_list, logger

auth = Blueprint("auth", __name__)

auth_server_host = "http://localhost:8000/"

@auth.route("/register", methods=["POST"])
def register():
    """
    GET function for retrieving Police Station objects
    """
    print("BEGINNING OF /REGISTER")
    data = request.get_json()
    new_user_data = {}
    new_user_data["email"] = data.get(email, "")
    new_user_data["password"] = data.get(password, "")
    new_user_data["role"] = data.get(role, "")
    print("data: ", data)

    print("BFORE POST TO THE AUTH SERVER")
    res = requests.post(auth_server_host + "/register/", json=new_user_data)
    print("AFTER POST TO THE AUTH SERVER")
    return create_response(message=res.text)
