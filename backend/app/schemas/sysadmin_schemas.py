from pydantic import BaseModel, Field
from typing import Annotated

class SysAdminLogin(BaseModel):
    login: Annotated[str, Field(title="System admin login", examples=["login"])]
    password: Annotated[str, Field(title="System admin password", examples=["password"])]