from typing import Any, Literal
import random
import aiohttp
from fastapi_jwt.jwt_backends.abstract_backend import BackendException
import phonenumbers
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta, timezone

from fastapi import Response, HTTPException, status
from pydantic import EmailStr

from .dependencies import access_security, refresh_security, email_security
from .schemas import AccessToken, RefreshToken, TokenPairSchema
from backend.app.config import secret_key, algo



class HttpClient:
    def __init__(self):
        self.session = aiohttp.ClientSession()

    async def close_session(self):
        await self.session.close()

    async def send_message(self, url, data):
        async with (self.session.post(url, data=data) as response):
            result = await response.json()
            return result.get("request_id")


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

def generate_code():
    code = ''.join(random.sample('0123456789', k=5))
    return code

def generate_text(code):
    return f'Кoд для верификации: {code}'

def validate_phone(phone):
    valid = phonenumbers.parse(phone, 'RU')
    if phonenumbers.is_valid_number(valid):
        valid_phone = ''
        for i in phonenumbers.format_number(valid, phonenumbers.PhoneNumberFormat.INTERNATIONAL):
            if i.isdigit():
                valid_phone += i
        return valid_phone

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(days=30)
    to_encode.update({"exp": expire})
    encode_jwt = jwt.encode(to_encode, key=secret_key, algorithm=algo)
    return encode_jwt