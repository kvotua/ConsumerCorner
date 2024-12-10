import pytest
from fastapi.testclient import TestClient
from app.main import app
import asyncio

client = TestClient(app)

@pytest.mark.parametrize("inn, expected", [
    ("400889349705", {'detail': {'message': 'data is not found', 'status_code': 404}}),
    ("1234567890", {'detail': {'message': 'INN is not valid', 'status_code': 422}}),
    ("7743013901", {'address': 'г Москва, ул Смольная, д 24, кв 1013-1015', 'inn': '7743013901', 'name': 'ООО "ЦИТ ФОРУМ"', 'ogrn': '1037739764028'}),
    ("123456789071", {'detail': {'message': 'INN is not valid', 'status_code': 422}}),
    ("123456789", {"detail": "Wrong number of characters in INN"}),
    ("123456789a", {'detail': {'message': 'INN can only be their numbers', 'status_code': 422}}),
    ("390000001190", {"inn": "390000001190", "fio": "Ничепорук Николай Владимирович", "ogrn": "304390624700102", "address": "236001, Калининградская обл, г Калининград"}),
    ("3901000001", {"inn": "3901000001", "name": "ТОВАРИЩЕСТВО С ОГАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ \"ЛЮКА\"", "ogrn": "1063913017750", "address": "Калининградская обл, г Балтийск"}),
])

def test_validate_inn(inn, expected):
    response = client.get(f"/inn/inn_info?inn={inn}")
    assert response.json() == expected