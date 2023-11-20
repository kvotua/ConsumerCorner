from pydantic.functional_validators import AfterValidator
from typing import Annotated


def check_OGRN(ogrn: str) -> str:
    assert ogrn.isdigit(), f"{ogrn} is not a number"
    assert len(ogrn) == 13, f"{ogrn} length MUST be 13"
    assert int(ogrn[:-1]) % 11 % 10 == int(ogrn[-1]), f"{ogrn} is not a valid OGRN"
    return ogrn


OGRN = Annotated[str, AfterValidator(check_OGRN)]
