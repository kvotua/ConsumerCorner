import pytest
from app.services.inn_services import INNService
from app.schemas.inn_schemas import IpSchema, CompanySchema
from fastapi import HTTPException

inn_test_service = INNService()

@pytest.mark.parametrize("inn, expected", [
    ("400889349705", True),
    ("1234567890", HTTPException(status_code=422, detail={'status_code':422,'message':'INN is not valid'})),
    ("7743013901", True),
    ("123456789071", HTTPException(status_code=422, detail={'status_code':422,'message':'INN is not valid'})),
    ("123456789", HTTPException(status_code=422, detail="Wrong number of characters in INN")),
    ("123456789a", HTTPException(status_code=422, detail={'status_code':422,'message':'INN can only be their numbers'})),
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
        if isinstance(expected, bool):
            result = inn_test_service.validate_inn(inn)
            assert result is expected
        else:
            with pytest.raises(HTTPException) as result:
                inn_test_service.validate_inn(inn)
            assert result.value.status_code == expected.status_code
            assert result.value.detail == expected.detail