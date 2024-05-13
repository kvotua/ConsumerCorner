from typing import Generator

import jwt
import pytest
from fastapi import status
from fastapi.testclient import TestClient

from app.main import app


@pytest.fixture
def client() -> Generator:
    with TestClient(app) as c:
        yield c


def test_success(client: TestClient) -> None:
    response = client.post(
        "/users/register",
        json={
            "user": {
                "email": "user@domain.com",
                "name": "name",
                "surname": "surname",
                "password": "password",
            }
        },
    )
    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert isinstance(data, dict)
    assert (refresh_token := response.json().get("refresh_token")) is not None
    decoded_refresh_token = jwt.decode(
        refresh_token, options={"verify_signature": False}
    )
    assert all(key in decoded_refresh_token for key in ("sub", "iat", "exp"))
    assert (access_token := response.json().get("access_token")) is not None
    decoded_access_token = jwt.decode(access_token, options={"verify_signature": False})
    assert all(key in decoded_access_token for key in ("sub", "iat", "exp"))


def test_dupliate_email(client: TestClient) -> None:
    email = "user@domain.com"
    response = client.post(
        "/users/register",
        json={
            "user": {
                "email": email,
                "name": "name",
                "surname": "surname",
                "password": "password",
            }
        },
    )
    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert isinstance(data, dict)
    assert response.json().get("refresh_token") is not None
    response = client.post(
        "/users/register",
        json={
            "user": {
                "email": email,
                "name": "another_name",
                "surname": "another_surname",
                "password": "another_password",
            }
        },
    )
    assert response.status_code == status.HTTP_409_CONFLICT
    data = response.json()
    assert isinstance(data, dict)
    assert response.json().get("detail") is not None


def test_wrong_email(client: TestClient) -> None:
    response = client.post(
        "/users/register",
        json={
            "user": {
                "email": "wrong_email",
                "name": "name",
                "surname": "surname",
                "password": "password",
            }
        },
    )
    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
