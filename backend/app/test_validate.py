import pytest
from inn_service.services import INNService
from inn_service.schemas import ErrorSchema

inn_test_service = INNService()

@pytest.mark.parametrize("inn, expected", [
    ("1234567897", True),  # Valid 10-digit INN
    ("1234567890", ErrorSchema(422, "INN is not valid")),  # Invalid 10-digit INN
    ("123456789012", True),  # Valid 12-digit INN
    ("123456789011", ErrorSchema(422, "INN is not valid")),  # Invalid 12-digit INN
    ("123456789", ErrorSchema(422, "Wrong number of characters in INN")),  # Invalid length
    ("123456789a", ErrorSchema(422, "INN can only be their numbers")),  # Non-digit characters
    ("1234567890123", ErrorSchema(422, "Wrong number of characters in INN")),  # Invalid length
])

def test_validate_inn(inn, expected):
    result = inn_test_service.validate_inn(inn)
    if isinstance(expected, bool):
        assert result is expected
    else:
        assert result.status_code == expected.status_code
        assert result.message == expected.message