from fastapi import status
from .conftest import TestClientExtended

from tests.utils import UserInfo, create_user


def test_success(client: TestClientExtended) -> None:
    create_user(client)
    assert len(client.emails) == 1


def test_dupliate_email(client: TestClientExtended) -> None:
    user_info = UserInfo()
    create_user(client, user_info=user_info)
    response = client.post("/users", json={"user": user_info.model_dump()})
    assert response.status_code == status.HTTP_409_CONFLICT


def test_wrong_email(client: TestClientExtended) -> None:
    user_info = UserInfo(email="wrong_email")
    response = client.post("/users", json={"user": user_info.model_dump()})
    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
