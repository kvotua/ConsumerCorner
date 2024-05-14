from fastapi import status
from fastapi.testclient import TestClient

from tests.utils import create_user


def test_success(client: TestClient) -> None:
    user = create_user(client)
    response = client.get("/users/me")
    assert response.status_code == status.HTTP_200_OK
    data: dict = response.json()
    assert isinstance(data, dict)
    email = data.get("email")
    assert isinstance(email, dict)
    assert email.get("value") == user.info.email
    assert email.get("verified") is False
    assert data.get("name") == user.info.name
    assert data.get("surname") == user.info.surname


def test_no_access_token(client: TestClient) -> None:
    client.cookies.delete("access_token_cookie")
    response = client.get("/users/me")
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
