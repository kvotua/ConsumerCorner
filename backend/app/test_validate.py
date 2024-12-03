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
    ("3901000019", IpSchema(inn="3901000019", name="ЕВГЕНИЙ БЕЗРОДНЫЙ ИЧП" ,ogrn="1163926065742" , address="Калининградская обл, г Балтийск, ул Ушакова, д 21, кв 30",)),
    ("3901000026", IpSchema(inn="3901000026", name=r"ИНДИВИДУАЛЬНОЕ (СЕМЕЙНОЕ) ЧАСТНОЕ ПРЕДПРИЯТИЕ (С ПРИВЛЕЧЕНИЕМ НАЕМНОГО ТРУДА) \"БАЛТИЕЦ\"" ,ogrn="1123926013617" , address="Калининградская обл, г Балтийск, ул Чехова, зд 11" ,)),
    ("3901000033", IpSchema(inn="3901000033", name=r"ИЧП \"ТАМАНЬ\"" ,ogrn="1073917009088" , address="Калининградская обл, г Балтийск, Гвардейский б-р, д 14, кв 54" ,)),
    ("3901000040", IpSchema(inn="3901000040", name="ИЧП КОНУНГ" ,ogrn="1113926030041", address="Калининградская обл, г Балтийск, Гвардейский б-р, д 15, кв 59",)),
    ("3901000065", IpSchema(inn="3901000065", name=r"ПК \"РИФ\"" ,ogrn="1073913001887", address="Калининградская обл, г Балтийск, ул Гагарина, д 14",)),
    ("3901000072", IpSchema(inn="3901000072", name=r"ООО \"РУСАЛКА\"" ,ogrn="1023902095062", address="Калининградская обл, г Балтийск, ул Гагарина, д 10",)),
    ("390000001190", CompanySchema(inn="390000001190", fio="Ничепорук Николай Владимирович",ogrn="304390624700102",address="236001, Калининградская обл, г Калининград")),
    ("390000001659", CompanySchema(inn="390000001659", fio="Долганов Сергей Николаевич",ogrn="304390534200071",address="236001, Калининградская обл, г Калининград")),
    ("390000002074", CompanySchema(inn="390000002074", fio="Вердян Цовик Шмидтовна",ogrn="304391736601680",address="Калининградская обл, Правдинский р-н, поселок Белый Яр")),
    ("390000002606", CompanySchema(inn="390000002606", fio="Верриер Гонсалес Дела Пенья Эрнесто None",ogrn="322390000006144",address="236001, Калининградская обл, г Калининград")),
    ("390000002780", CompanySchema(inn="390000002780", fio="Брабандер Владимир Иванович",ogrn="305390500105982",address="236001, Калининградская обл, г Калининград")),
])

def test_validate_inn(inn, expected):
    result = inn_test_service.validate_inn(inn)
    if isinstance(expected, bool):
        assert result is expected
    else:
        assert result.status_code == expected.status_code
        assert result.message == expected.message