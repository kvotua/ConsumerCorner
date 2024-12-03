from dadata import Dadata
from dotenv import load_dotenv
import os
from backend.app.config import token
from .schemas import IpSchema,CompanySchema,ErrorSchema

class INNService:
    def __init__(self):
        self.api_token = token
    def fetch_company_data(self,inn: str) -> CompanySchema or ErrorSchema:
        dadata = Dadata(self.api_token)
        result = dadata.find_by_id("party", inn)
        if not result:
            return ErrorSchema(
                status_code=404,
                message="data is not found"
            )
        company_data = result[0]['data']
        return CompanySchema(
            inn=inn,
            name=result[0]['value'],
            ogrn=company_data['ogrn'],
            address=company_data['address']['value'],
        )
    def fetch_ip_data(self,inn: str) -> IpSchema or ErrorSchema:
        dadata = Dadata(self.api_token)
        result = dadata.find_by_id("party", inn)
        if not result:
            return ErrorSchema(
                status_code=404,
                message="data is not found"
            )
        data = result[0]['data']
        fio = f'{data['fio']['surname']} {data['fio']['name']} {data['fio']['patronymic']}'
        ogrn = data['ogrn']
        address = data['address']['unrestricted_value']
        return IpSchema(
            inn=inn,
            fio=fio,
            ogrn=ogrn,
            address=address,
        )
    def validate_inn(self,inn: str) -> bool or ErrorSchema:
        if len(num) not in [10,12]:
            print(len(inn))
            return ErrorSchema(
                status_code=400,
                message="Wrong number of characters in INN"
            )
        if not inn.isdigit():
            return ErrorSchema(
                status_code=400,
                message="INN can only be their numbers"
            )
        if len(inn) == 10:
            weights = [2, 4, 10, 3, 5, 9, 4, 6, 8]
            control_digit = sum(int(inn[i]) * weights[i] for i in range(9)) % 11 % 10
            if control_digit == int(inn[9]):
                return True
            return ErrorSchema(
                status_code=400,
                message="INN is not valid"
            )
        if len(inn) == 12:
            weights_1 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]
            weights_2 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]
            control_digit_1 = sum(int(inn[i]) * weights_1[i] for i in range(10)) % 11 % 10
            control_digit_2 = sum(int(inn[i]) * weights_2[i] for i in range(11)) % 11 % 10
            if control_digit_1 == int(inn[10]) and control_digit_2 == int(inn[11]):
                return True
            return ErrorSchema(
                status_code=400,
                message="INN is not valid"
            )