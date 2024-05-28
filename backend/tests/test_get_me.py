from fastapi import status
from fastapi.testclient import TestClient

from tests.utils import create_user, get_me


def test_success(client: TestClient) -> None:
    user = create_user(client)
    user_info = get_me(client)
    assert user_info.email == user.info.email
    assert user_info.email_verified is False
    assert user_info.name == user.info.name
    assert user_info.surname == user.info.surname


def test_no_access_token(client: TestClient) -> None:
    client.cookies.delete("access_token_cookie")
    response = client.get("/users/me")
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
