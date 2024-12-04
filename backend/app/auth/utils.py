from typing import Any, Literal
import random
import aiohttp
import jose.exceptions
import phonenumbers
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta, timezone
import bcrypt

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

def hash_password(password: str) -> bytes:
    salt = bcrypt.gensalt()
    pwd_bytes: bytes = password.encode()
    return bcrypt.hashpw(pwd_bytes, salt)

def validate_password(password: str, hashed_password: bytes) -> bool:
    return bcrypt.checkpw(
        password.encode(),
        hashed_password=hashed_password,
    )

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(days=30)
    to_encode.update({"exp": expire})
    encode_jwt = jwt.encode(to_encode, key=secret_key, algorithm=algo)
    return encode_jwt

def decode_access_token(jwt_token: str):
    try:
        token_info = jwt.decode(token=jwt_token, key=secret_key, algorithms=[str(algo)])
        return token_info
    except jose.exceptions.JWTError:
        return "Signature verification failed"