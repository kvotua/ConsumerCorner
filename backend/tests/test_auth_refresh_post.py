from fastapi import status
from fastapi.testclient import TestClient

from tests.utils import create_user


def test_success_from_cookie(client: TestClient) -> None:
    create_user(client)
    response = client.post("/auth/refresh")
    data: dict = response.json()
    assert isinstance(data, dict)
    assert data.get("access_token") is not None


def test_no_refresh_token(client: TestClient) -> None:
    assert client.cookies.get("refresh_token_cookie") is None
    response = client.post("/auth/refresh")
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_wrong_refresh_token(client: TestClient) -> None:
    client.cookies.set("refresh_token_cookie", "wrong_value")
    response = client.post("/auth/refresh")
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
