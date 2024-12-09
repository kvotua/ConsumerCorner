import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

@pytest.fixture
def short_inn():
    return "123"

@pytest.fixture
def digit_inn():
    return "12345abcde"

@pytest.fixture
def valid_inn():
    return "123456789012"

def test_shortlong_inn(short_inn):
    response = client.get(f"/inn_service/inn_info?inn={short_inn}")
    assert response.json() == {'status_code': 422, 'message': 'Wrong number of characters in INN'}

def test_digit_inn(digit_inn):
    response = client.get(f"/inn_service/inn_info?inn={digit_inn}")
    assert response.json() == {'status_code': 422, 'message': 'INN can only be their numbers'}

def test_valid_inn(valid_inn):
    response = client.get(f"/inn_service/inn_info?inn={valid_inn}")
    assert response.json() == {'status_code': 422, 'message': 'INN is not valid'}
