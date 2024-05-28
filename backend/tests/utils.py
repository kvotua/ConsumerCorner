from typing import Optional

import httpx
from fastapi import status
from fastapi.testclient import TestClient
from pydantic import BaseModel


class UserInfo(BaseModel):
    email: str = "user@domain.com"
    name: str = "name"
    surname: str = "surname"
    password: str = "password"


class UserGetMeInfo(BaseModel):
    email: str
    email_verified: bool
    name: str
    surname: str


class Tokens(BaseModel):
    access: str
    refresh: str


class User(BaseModel):
    info: UserInfo
    tokens: Tokens


def assert_tokens_pair(response: httpx.Response) -> Tokens:
    tokens: dict = response.json()
    assert isinstance(tokens, dict)
    refresh_token = tokens.get("refresh_token")
    access_token = tokens.get("access_token")
    assert access_token is not None
    assert refresh_token is not None
    assert response.cookies.get("refresh_token_cookie") is not None
    assert response.cookies.get("access_token_cookie") is not None
    return Tokens(access=access_token, refresh=refresh_token)


def create_user(client: TestClient, user_info: Optional[UserInfo] = None) -> User:
    if user_info is None:
        user_info = UserInfo()
    response = client.post("/users", json={"user": user_info.model_dump()})
    assert response.status_code == status.HTTP_201_CREATED
    tokens = assert_tokens_pair(response)
    return User(info=user_info, tokens=tokens)


def get_me(client: TestClient) -> UserGetMeInfo:
    response = client.get("/users/me")
    assert response.status_code == status.HTTP_200_OK
    data: dict = response.json()
    assert isinstance(data, dict)
    email = data.pop("email")
    user_info = UserGetMeInfo(
        **data,
        email=email.get("value"),
        email_verified=email.get("verified"),
    )
    return user_info
