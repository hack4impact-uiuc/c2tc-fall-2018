# from api.models import  Person
import pytest
from api.models.Business import Business
from tests.business_test_data import businesses

# client passed from client - look into pytest for more info about fixtures
# test client api: http://flask.pocoo.org/docs/1.0/api/#test-client
def test_index(client):
    rs = client.get("/")
    print(businesses)
    assert rs.status_code == 200


def test_basic():
    assert True
