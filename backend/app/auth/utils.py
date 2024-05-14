from typing import Any

from fastapi import Response

from .dependencies import access_security, refresh_security
from .schemas import AccessToken, RefreshToken, TokenPairSchema


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
