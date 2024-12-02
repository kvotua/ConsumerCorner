from fastapi.testclient import TestClient

from .main import app

client = TestClient(app)

def test_shortlong_inn(inn):
    response = client.get(f"/inn_service/inn_info?inn={inn}")
    assert response.json() == {'status_code': 422, 'message': 'Wrong number of characters in INN'}

def test_digit_inn(inn):
    response = client.get(f"/inn_service/inn_info?inn={inn}")
    assert response.json() == {'status_code': 422, 'message': 'INN can only be their numbers'}

def test_valid_inn(inn):
    response = client.get(f"/inn_service/inn_info?inn={inn}")
    assert response.json() == {'status_code': 422, 'message': 'INN is not valid'}

test_shortlong_inn(12345)
test_shortlong_inn(12345678901)

test_digit_inn("asd123asd4")

test_valid_inn("1234567890")