from dadata import Dadata
from dotenv import load_dotenv
import os
from .schemas import IpSchema,CompanySchema

class INNService:
    def __init__(self,env_path: str):
        load_dotenv(dotenv_path=env_path)
        self.api_token = os.getenv("API_TOKEN_INN")
    def fetch_company_data(self,inn: str) -> CompanySchema:
        dadata = Dadata(self.api_token)
        result = dadata.find_by_id("party", inn)
        if not result:
            return None

        company_data = result[0]['data']
        return CompanySchema(
            inn=inn,
            name=result[0]['value'],
            ogrn=company_data['ogrn'],
            kpp=company_data['kpp'],
            address=company_data['address']['value'],
        )

    def fetch_ip_data(self,inn: str) -> IpSchema:
        dadata = Dadata(self.api_token)
        result = dadata.find_by_id("party", inn)
        data = result[0]['data']
        fio = f'{data['fio']['surname']} {data['fio']['name']} {data['fio']['patronymic']}'
        ogrn = data['ogrn']
        address = data['address']['unrestricted_value']
        return IpSchema(
            fio=fio,
            ogrn=ogrn,
            address=address,
        )

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