from typing import Any, Literal
from fastapi_jwt.jwt_backends.abstract_backend import BackendException

from fastapi import Response, HTTPException, status
from pydantic import EmailStr

from .dependencies import access_security, refresh_security, email_security
from .schemas import AccessToken, RefreshToken, TokenPairSchema
from app.users.schemas import UserId


def set_access_token(response: Response, subject: dict[str, Any]) -> AccessToken:
    access_token = access_security.create_access_token(subject)
    access_security.set_access_cookie(response, access_token)
    return AccessToken(access_token)


def set_refresh_token(response: Response, subject: dict[str, Any]) -> RefreshToken:
    refresh_token = refresh_security.create_refresh_token(subject)
    refresh_security.set_refresh_cookie(response, refresh_token)
    return RefreshToken(refresh_token)


def set_token_pair(response: Response, subject: dict[str, Any]) -> TokenPairSchema:
    refresh_token = set_refresh_token(response, subject)
    access_token = set_access_token(response, subject)
    return TokenPairSchema(refresh_token=refresh_token, access_token=access_token)


def generate_email_verify_link(email: EmailStr, user_id: UserId) -> str:
    token = email_security.create_access_token({"email": email, "id": user_id})
    # TODO: env var
    return f"http://localhost:8000/auth/verify?token={token}"


def decode_email_token(token: str) -> dict[Literal["id", "email"], str]:
    try:
        result = email_security.jwt_backend.decode(token, email_security.secret_key)
        # raise ValueError(result)
        if result is None or "subject" not in result:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Can't decode token"
            )
        subject = result["subject"]
        if "id" not in subject or "email" not in subject:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Wrong sub"
            )
        return subject
    except BackendException as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e))
