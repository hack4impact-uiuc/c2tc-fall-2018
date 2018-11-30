# from api.models import  Person
import pytest
from api.models.Business import Business
from tests.business_test_data import businesses
from api.views.business import save_business_to_db

# client passed from client - look into pytest for more info about fixtures
# test client api: http://flask.pocoo.org/docs/1.0/api/#test-client
def test_index(client):
    rs = client.get("/")
    print(businesses)
    assert rs.status_code == 200

def test_delete(client):
    '''
    Tests delete endpoint.
    '''
    rs = client.delete("/businesses")
    collection = Business.objects()
    assert len(collection) == 0
    assert rs.status_code == 200

def test_update(client):
    '''
    Tests update endpoint.
    '''
    pass
    rs = client.post("/businesses")
    collection = Business.objects()
    assert len(collection) > 0
    assert rs.status_code == 200

def insert_test_data(client):
    '''
    Puts test data in the db
    '''
    for business_dict in businesses:
        save_business_to_db(business_dict)

    collection = Business.objects()
    assert len(collection) == 12


def test_get_basic(client):
    '''
    Tests get endpoint (all businesses)
    '''
    assert False == True

def test_get_weekday_afternoon(client):
    '''
    Tests get endpoint (Tuesday 3:43pm)
    '''
    assert True

def test_get_weekday_morning(client):
    '''
    Tests get endpoint (Wednesday 10:00am)
    '''
    assert True

def test_get_weekend_earlymorning(client):
    '''
    Tests get endpoint (Saturday 12:30am)
    '''
    assert True

def test_get_weekday_earlymorning(client):
    '''
    Tests get endpoint (Thursday 3:12am)
    '''
    assert True
