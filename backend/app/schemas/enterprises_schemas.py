from pydantic import BaseModel, Field, ConfigDict, model_validator
from typing import Annotated, Optional, Any
from datetime import datetime


class RegisterCompany(BaseModel):
    name: Annotated[str, Field(title="Company name",)]
    type: Annotated[str, Field(title="Type of company (sole proprietor, LLC, etc.)", examples=['ИП'])]
    inn: Annotated[str, Field(title="INN", min_length=10, max_length=12)]
    ogrn: Annotated[str, Field(title="OGRN of a legal entity", min_length=13, max_length=13)]
    address: Annotated[str, Field(title="Actual address", examples=['ул. Павлика Морозова 74, Б'])]
    general_type_activity: Annotated[str, Field(title='The main type of activity', examples=["Private enterprise"])]

    @model_validator(mode="before")
    def check_inn_ogrn(cls, values):
        type_ = values.get('type')
        if type_ not in ["ИП", "ООО", "ОАО", "ЗАО", "ПАО"]:
            raise ValueError('Invalid type enterprise')

        inn = values.get('inn')
        if inn and not inn.isdigit():
            raise ValueError('The INN must contain only numbers.')
        if len(inn) not in [10, 12]:
            raise ValueError('The must contain 10 or 12 digits')

        ogrn = values.get('ogrn')
        if ogrn and not ogrn.isdigit():
            raise ValueError('The OGRN should contain only numbers.')

        return values


class EnterpriseInfo(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: Annotated[Optional[int], Field(title="Enterprise ID", examples=[1])]
    name: Annotated[Optional[str], Field(title="Company name", examples=["Имя компании"])]
    type: Annotated[Optional[str], Field(title="Type of company (sole proprietor, LLC, etc.)", examples=["ИП"])]
    create_id: Annotated[Optional[int], Field(title="ID of the creator user", examples=[1])]
    inn: Annotated[Optional[str], Field(title="INN", examples=["390000001190"], min_length=10, max_length=12)]
    ogrn: Annotated[Optional[str], Field(title="OGRN of a legal entity", examples=['1027700132195'],min_length=13, max_length=13)]
    address: Annotated[Optional[str], Field(title="Actual address", examples=['ул. Павлика Морозова 74, Б'])]
    image_id: Annotated[Optional[str], Field(title="Image ID", examples=['5f2fcae09b58c38603442a4f'])]
    general_type_activity: Annotated[Optional[str], Field(title='The main type of activity', examples=["Private enterprise"])]
    created_at: Annotated[Optional[datetime], Field(title="The date of registration of the company in the application", examples=["2024-12-07 03:21:37.273427"])]


class ResponseSchema(BaseModel):
    status_code: Annotated[int, Field(title="Status code", examples=[200])]
    detail: Annotated[Any, Field(title="detail", examples=["OK"])]

class ImageData(BaseModel):
    id: Annotated[str, Field(title="Photo ID", examples=['5f2fcae09b58c38603442a4f'])]
    enterprise_id: Annotated[int, Field(title="Enterprise ID", examples=[1])]