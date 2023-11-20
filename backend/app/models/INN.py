from pydantic.functional_validators import AfterValidator
from typing import Annotated


def check_INN(inn: str) -> str:
    assert inn.isdigit(), f"{inn} is not a number"
    assert len(inn) in (10, 12), f"{inn} length MUST be 10 or 12"
    if len(inn) == 10:
        weights = [2, 4, 10, 3, 5, 9, 4, 6, 8]
        control_sum = 0
        for i in range(len(weights)):
            control_sum += int(inn[i]) * weights[i]
        assert int(inn[-1]) == control_sum % 11 % 10, f"{inn} is not a valid INN"
    else:
        weights1 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]
        control_sum1 = 0
        for i in range(len(weights1)):
            control_sum1 += int(inn[i]) * weights1[i]
        assert int(inn[-2]) == control_sum1 % 11 % 10, f"{inn} is not a valid INN"

        weights2 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]
        control_sum2 = 0
        for i in range(len(weights2)):
            control_sum2 += int(inn[i]) * weights2[i]
        assert int(inn[-1]) == control_sum2 % 11 % 10, f"{inn} is not a valid INN"
    return inn


INN = Annotated[str, AfterValidator(check_INN)]
