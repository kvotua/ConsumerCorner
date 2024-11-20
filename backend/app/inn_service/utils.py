def validate_inn(inn: str):
    if len(inn) not in [10, 12]:
        return False

    if not inn.isdigit():
        return False


    if len(inn) == 10:
        weights = [2, 4, 10, 3, 5, 9, 4, 6, 8]
        control_digit = sum(int(inn[i]) * weights[i] for i in range(9)) % 11 % 10
        return control_digit == int(inn[9])

    if len(inn) == 12:
        weights_1 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]
        weights_2 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]
        control_digit_1 = sum(int(inn[i]) * weights_1[i] for i in range(10)) % 11 % 10
        control_digit_2 = sum(int(inn[i]) * weights_2[i] for i in range(11)) % 11 % 10

        return control_digit_1 == int(inn[10]) and control_digit_2 == int(inn[11])

    return False