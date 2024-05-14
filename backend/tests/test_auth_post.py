import httpx
from fastapi import status
from fastapi.testclient import TestClient

from tests.utils import UserInfo, assert_tokens_pair, create_user


def auth_raw(client: TestClient, email: str, password: str) -> httpx.Response:
    return client.post(
        "/auth", json={"credentials": {"email": email, "password": password}}
    )


def test_success(client: TestClient) -> None:
    user = create_user(client)
    response = auth_raw(client, user.info.email, user.info.password)
    assert response.status_code == status.HTTP_200_OK
    assert_tokens_pair(response)


def test_wrong_email_format(client: TestClient) -> None:
    response = auth_raw(client, "wrong_email_format", "password")
    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


def test_email_not_exist(client: TestClient) -> None:
    response = auth_raw(client, "not@exist.com", "password")
    assert response.status_code == status.HTTP_404_NOT_FOUND


def test_wrong_password(client: TestClient) -> None:
    user = create_user(client, user_info=UserInfo(password="password"))
    response = auth_raw(client, user.info.email, "wrong_password")
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
