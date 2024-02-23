from pydantic import BaseModel, Field, EmailStr


class ProprietorBase(BaseModel):
    name: str = Field(min_length=1)
    surname: str = Field(min_length=1)
    login: str = Field(min_length=6)
    password: str = Field(min_length=6)
    email: EmailStr
