from typing import Annotated
import re
from pydantic import BaseModel, Field, model_validator, field_validator
from email_validator import validate_email

from app.config import pattern_password, pattern_fio, example_jwt_token

class ReqID(BaseModel):
    req_id: Annotated[int, Field(
        title='The ID received after sending the number',
        examples=['1191273219673078']
    )]

class Restore(BaseModel):
    req_id: Annotated[int, Field(
        title="ID used to verify the code",
        examples=['1191273219673078'])]
    password: Annotated[str, Field(
        title='Password',
        examples=['password'])]
    
    @model_validator(mode="before")
    def check_password(cls, values):
        user_password = values.get('password')
        if re.match(pattern=pattern_password, string=user_password) is None:
            raise ValueError(
                "The password is too simple. The password must contain at least 8 characters, including letters in all cases, numbers and special characters.")

        return values
    
