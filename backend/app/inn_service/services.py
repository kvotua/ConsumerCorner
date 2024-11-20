from dadata import Dadata
from .config import token

class INNService:
    def __init__(self,token):
        self.token = token
    def fetch_company_data(self,inn: str) -> dict:
        dadata = Dadata(self.token)
        result = dadata.find_by_id("party", inn)
        if not result:
            return None

        company_data = result[0]['data']
        return {
            "inn": inn,
            "name": result[0]['value'],
            "ogrn": company_data['ogrn'],
            "kpp": company_data['kpp'],
            "address": company_data['address']['value'],
        }

    def fetch_ip_data(self,inn: str) -> dict:
        dadata = Dadata(self.token)
        result = dadata.find_by_id("party", inn)
        data = result[0]['data']
        fio = f'{data['fio']['surname']} {data['fio']['name']} {data['fio']['patronymic']}'
        ogrn = data['ogrn']
        address = data['address']['unrestricted_value']
        all_info = {
            'fio': fio,
            'ogrn': ogrn,
            'address': address
        }
        return(all_info)

    def validate_inn(self,inn: str) -> bool:
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