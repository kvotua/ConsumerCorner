from typing import Optional

from fastapi import status
from fastapi.testclient import TestClient
from pydantic import BaseModel


class UserInfo(BaseModel):
    email: str = "user@domain.com"
    name: str = "name"
    surname: str = "surname"
    password: str = "password"


class Tokens(BaseModel):
    access: str
    refresh: str


class User(BaseModel):
    info: UserInfo
    tokens: Tokens


def create_user(client: TestClient, user_info: Optional[UserInfo] = None) -> User:
    if user_info is None:
        user_info = UserInfo()
    response = client.post("/users", json={"user": user_info.model_dump()})
    assert response.status_code == status.HTTP_201_CREATED

    tokens: dict = response.json()
    assert isinstance(tokens, dict)

    refresh_token = tokens.get("refresh_token")
    access_token = tokens.get("access_token")
    assert access_token is not None
    assert refresh_token is not None
    assert response.cookies.get("refresh_token_cookie") is not None
    assert response.cookies.get("access_token_cookie") is not None

    return User(
        info=user_info, tokens=Tokens(access=access_token, refresh=refresh_token)
    )
