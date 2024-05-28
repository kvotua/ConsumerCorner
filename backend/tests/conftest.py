from typing import Generator, Any

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient
from app.users.dependencies import IEmailer, Emailer
from pydantic import BaseModel

from app.main import UserModel, app


class Mail(BaseModel):
    to: str
    subject: str
    text: str


class TestClientExtended(TestClient):
    emails: list[Mail]

    def __init__(self, app: FastAPI) -> None:
        super().__init__(app)
        self.emails = []

    def __enter__(self) -> "TestClientExtended":
        super().__enter__()
        return self

    def __exit__(self, *args: Any) -> None:
        super().__exit__()


@pytest.fixture
def client() -> Generator:
    for model in (UserModel,):
        if model.exists():
            model.delete_table()
    with TestClientExtended(app) as client:

        class EmailerMock(IEmailer):
            @staticmethod
            def send(to: str, subject: str, text: str) -> None:
                client.emails.append(Mail(to=to, subject=subject, text=text))

        app.dependency_overrides[Emailer] = EmailerMock
        yield client
