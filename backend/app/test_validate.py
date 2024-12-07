import pytest
from .inn_service.services import INNService
from .inn_service.schemas import ErrorSchema, IpSchema, CompanySchema

inn_test_service = INNService()

@pytest.mark.parametrize("inn, expected", [
    ("400889349705", True),
    ("1234567890", ErrorSchema(status_code=422, message="INN is not valid")),
    ("7743013901", True),
    ("123456789071", ErrorSchema(status_code=422, message="INN is not valid")),
    ("123456789", ErrorSchema(status_code=422, message="Wrong number of characters in INN")),
    ("123456789a", ErrorSchema(status_code=422, message="INN can only be their numbers")),
    ("390000001190", IpSchema(inn="390000001190", fio="Ничепорук Николай Владимирович" ,ogrn="304390624700102" , address="236001, Калининградская обл, г Калининград")),
    ("3901000001", CompanySchema(inn="3901000001", name="ТОВАРИЩЕСТВО С ОГАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ \"ЛЮКА\"",ogrn="1063913017750",address="Калининградская обл, г Балтийск")),
])

def test_validate_inn(inn, expected):
    if isinstance(expected, IpSchema):
        result = inn_test_service.fetch_ip_data(inn)
        assert result.inn == expected.inn
        assert result.fio == expected.fio
        assert result.ogrn == expected.ogrn
        assert result.address == expected.address
    elif isinstance(expected, CompanySchema):
        result = inn_test_service.fetch_company_data(inn)
        assert result.inn == expected.inn
        assert result.name == expected.name
        assert result.ogrn == expected.ogrn
        assert result.address == expected.address
    else:
        result = inn_test_service.validate_inn(inn)
        if isinstance(expected, bool):
            assert result is expected
        else:
            assert result.status_code == expected.status_code
            assert result.message == expected.message