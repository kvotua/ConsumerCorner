from dadata import Dadata
from .config import token

def fetch_company_data(inn: str):
    dadata = Dadata(token)
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

def fetch_ip_data(inn: str):
    dadata = Dadata(token)
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