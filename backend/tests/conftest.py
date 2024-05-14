from typing import Generator

import pytest
from fastapi.testclient import TestClient

from app.main import UserModel, app


@pytest.fixture
def client() -> Generator:
    for model in (UserModel,):
        if model.exists():
            model.delete_table()
    with TestClient(app) as c:
        yield c
