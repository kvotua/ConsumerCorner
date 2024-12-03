import pytest
from .inn_service.services import INNService
from .inn_service.schemas import ErrorSchema

inn_test_service = INNService()

@pytest.mark.parametrize("inn, expected", [
    ("1234567897", True),
    ("1234567890", ErrorSchema(status_code=422, message="INN is not valid")),
    ("123456789012", True),
    ("123456789071", ErrorSchema(status_code=422, message="INN is not valid")),
    ("123456789", ErrorSchema(status_code=422, message="Wrong number of characters in INN")),
    ("123456789a", ErrorSchema(status_code=422, message="INN can only be their numbers")),
    ("3901000001", IpSchema(inn="3901000001", name=r"ТОВАРИЩЕСТВО С ОГАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ \"ЛЮКА\"" ,ogrn="1063913017750" , address="Калининградская обл, г Балтийск")),
    ("390000001190", CompanySchema(inn="390000001190", fio="Ничепорук Николай Владимирович",ogrn="304390624700102",address="236001, Калининградская обл, г Калининград")),
])

def test_validate_inn(inn, expected):
    result = inn_test_service.validate_inn(inn)
    if isinstance(expected, bool):
        assert result is expected
    else:
        assert result.status_code == expected.status_code
        assert result.message == expected.message