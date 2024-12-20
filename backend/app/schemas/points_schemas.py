from pydantic import BaseModel, Field, ConfigDict, model_validator
from typing import Annotated, Optional, Any, List
from datetime import datetime, time
import re


from app.services.verify_services import validate_phone
from app.config import pattern_time
from app.services.points_services import validating_link



class RegisterPoint(BaseModel):
    title: Annotated[str, Field(title="The working name of the point", examples=["Ponarth"])]
    enterprise_id: Annotated[int, Field(title="Enterprise ID", examples=[1], ge=1)]
    address: Annotated[str, Field(title="The address of the point", examples=["г. Калининград, Киевский переулок 1"])]
    opening_time: Annotated[str, Field(title="The opening time of the point", examples=['11:00'])]
    closing_time: Annotated[str, Field(title="The closing time of the point", examples=['19:00'])]
    phone: Annotated[Optional[str], Field(title="Phone number", examples=['79219876543'], min_length=11, max_length=14, default=None)]
    type_activity: Annotated[str, Field(title="Type of activity", examples=["Продажа"])]


    @model_validator(mode="before")
    def check_model(cls, values):
        point_phone = values.get('phone')
        if point_phone:
            if point_phone and not point_phone.isdigit():
                raise ValueError('Invalid phone number')
            try:
                valid_phone = validate_phone(point_phone)
                if valid_phone is None:
                    raise ValueError("Invalid phone number")
                else:
                    values['phone'] = valid_phone
            except:
                return ValueError("Invalid phone number")
        opening_time = values.get("opening_time")
        if opening_time:
            if re.match(pattern=pattern_time, string=opening_time) is None:
                raise ValueError('Invalid time')

        closing_time = values.get("closing_time")
        if opening_time:
            if re.match(pattern=pattern_time, string=closing_time) is None:
                raise ValueError('Invalid time')

        return values


class PointInfo(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: Annotated[int, Field(title="Point ID", examples=[1])]
    enterprise_id: Annotated[int, Field(title="Enterprise ID", examples=[1])]
    title: Annotated[str, Field(title="The working name of the point", examples=["Ponarth"])]
    address: Annotated[str, Field(title='The address of the point', examples=["г. Калининград, Киевский переулок 1"])]
    opening_time: Annotated[time, Field(title="The opening time of the point", examples=["10:00"])]
    closing_time: Annotated[time, Field(title="The closing time of the point", examples=["20:00"])]
    image_id: Annotated[Optional[str], Field(title="Image ID", examples=['5f2fcae09b58c38603442a4f'])]
    documents_data: Annotated[Optional[List[str]], Field(title="Document ID", examples=[['6d75ddd59b58c3607315a11']])]
    social_data: Annotated[Optional[List[dict]], Field(title="Socials", examples=[{"social_id": 2, "link": "https://example.com", "name": "example"}])]
    phone: Annotated[Optional[str], Field(title="Phone number", examples=['79219876543'], max_length=14)]
    type_activity: Annotated[str, Field(title="Type of activity", examples=["Продажи"])]
    middle_stars: Annotated[Optional[float], Field(title="Middle stars", examples=[3.9], ge=0, lt=6, default=None)]
    verify_phone: Annotated[Optional[bool], Field(title="Has the phone number been verified", examples=[False])]
    created_at: Annotated[datetime, Field(title="The date of registration of the point in the application", examples=["2024-12-07 03:21:37.273427"])]


class ChangePointSchema(BaseModel):
    title: Annotated[Optional[str], Field(title="The working name of the point", examples=["Ponarth"], default=None)]
    address: Annotated[Optional[str], Field(title='The address of the point', examples=["г. Калининград, Киевский переулок 1"], default=None)]
    opening_time: Annotated[Optional[str], Field(title="The opening time of the point", examples=["10:00"], default=None)]
    closing_time: Annotated[Optional[str], Field(title="The closing time of the point", examples=["20:00"], default=None)]
    phone: Annotated[Optional[str], Field(title="Phone number", examples=['79219876543'], max_length=14, default=None)]
    type_activity: Annotated[Optional[str], Field(title="Type of activity", examples=["Продажи"], default=None)]

    @model_validator(mode="before")
    def check_model(cls, values):
        user_phone = values.get('phone')
        if user_phone:
            if user_phone and not user_phone.isdigit():
                raise ValueError('Invalid phone number')
            try:
                valid_phone = validate_phone(user_phone)
                if valid_phone is None:
                    raise ValueError("Invalid phone number")
            except:
                return ValueError("Invalid phone number")

        opening_time = values.get("opening_time")
        if opening_time:
            if re.match(pattern=pattern_time, string=opening_time) is None:
                raise ValueError('Invalid time')

        closing_time = values.get("closing_time")
        if opening_time:
            if re.match(pattern=pattern_time, string=closing_time) is None:
                raise ValueError('Invalid time')

        return values


class SocialAdd(BaseModel):
    point_id: Annotated[int, Field(title="Point ID", examples=[1])]
    name: Annotated[str, Field(title="")]


class ResponseSchema(BaseModel):
    status_code: Annotated[int, Field(title="Status code", examples=[200])]
    detail: Annotated[Any, Field(title="detail", examples=["OK"])]


class DocumentData(BaseModel):
    id: Annotated[str, Field(title="Document ID", examples=['5f2fcae09b58c38603442a4f'])]
    point_id: Annotated[int, Field(title="Point ID", examples=[1])]

class ImageData(BaseModel):
    id: Annotated[str, Field(title="Photo ID", examples=['5f2fcae09b58c38603442a4f'])]
    point_id: Annotated[int, Field(title="Point ID", examples=[1])]

class SocialSchema(BaseModel):
    name: Annotated[str, Field(title="Name of the social", examples=["Вконтакте"])]
    link: Annotated[str, Field(title="Link", examples=['https://vk.com/'])]

    @model_validator(mode="before")
    def check_data(cls, values):
        if validating_link(values.get("link")) is False:
            raise ValueError("Invalid link")
        return values


class SocialID(BaseModel):
    social_id: Annotated[int, Field(title="Social ID", examples=[1], ge=1)]
