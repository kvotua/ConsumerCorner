from fastapi import status
from .conftest import TestClientExtended

from tests.utils import create_user, get_me


def test_success(client: TestClientExtended) -> None:
    create_user(client)
    assert len(client.emails) == 1
    url = "http" + client.emails[0].text.split("http")[1]
    path = "/" + "/".join(url.split("/")[3:])
    response = client.get(path, follow_redirects=False)
    assert response.status_code == status.HTTP_307_TEMPORARY_REDIRECT
    user_info = get_me(client)
    assert user_info.email_verified is True


def test_wrong_token(client: TestClientExtended) -> None:
    create_user(client)
    assert len(client.emails) == 1
    url = "http" + client.emails[0].text.split("http")[1]
    path = "/" + "/".join(url.split("/")[3:])
    prefix, postfix = path.split("token=")
    path = f"{prefix}token=wrong_token"
    response = client.get(path, follow_redirects=False)
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
