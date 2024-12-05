import random
import aiohttp
import jose.exceptions
import phonenumbers
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta, timezone
import bcrypt

from backend.app.config import secret_key, algo
from backend.app.auth.schemas import TokenPair


TOKEN_TYPE_FIELD = "type"
ACCESS_TOKEN_TYPE = 'access'

class HttpClient:
    def __init__(self):
        self.session = aiohttp.ClientSession()

    async def close_session(self):
        await self.session.close()

    async def send_message(self, url, data):
        async with (self.session.post(url, data=data) as response):
            result = await response.json()
            return result.get("request_id")


def time_in_30_days():
    return datetime.now(timezone.utc) + timedelta(days=30)

def time_in_3_days():
    return datetime.now(timezone.utc) + timedelta(days=3)

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
    expire = time_in_3_days()
    to_encode.update({"exp": expire, "type": "access"})
    encode_jwt = jwt.encode(to_encode, key=secret_key, algorithm=algo)
    return encode_jwt

def create_refresh_token(data: dict) -> str:
    to_encode = {"id": data.get("id")}
    expire = time_in_30_days()
    to_encode.update({"exp": expire,  "type": "refresh"})
    encode_jwt = jwt.encode(to_encode, key=secret_key, algorithm=algo)
    return encode_jwt

def decode_access_token(access_token: str, token_type: str):
    try:
        token_info = jwt.decode(token=access_token, key=secret_key, algorithms=[str(algo)])
        data_now = datetime.now(timezone.utc)
        if token_type != "Baerer":
            return "Невалидный токен"
        if token_info.get("exp") <= int(data_now.timestamp()):
            return "Невалидный токен"
        if token_info.get("type") == "refresh":
            return "Невалидный токен"
        return token_info
    except jose.exceptions.JWTError:
        return "Невалидный токен"

def decode_refresh_token(jwt_token: str):
    try:
        token_info = jwt.decode(token=jwt_token, key=secret_key, algorithms=[str(algo)])
        data_now = datetime.now(timezone.utc)
        if token_info.get("exp") <= int(data_now.timestamp()):
            return "Невалидный токен"
        if token_info.get("type") == "access":
            return "Невалидный токен"
        return token_info
    except jose.exceptions.JWTError:
        return "Невалидный токен"

def create_tokens_pair(data: dict):
    acc_token = create_access_token(data)
    ref_token = create_refresh_token(data)
    return {
        "access_token": acc_token,
        "refresh_token": ref_token,
    }

def validate_token(access_token: str, token_type: str):
    if token_type != "Baerer":
        return 1
    dict_by_token = decode_access_token(access_token=access_token, token_type=token_type)
    if isinstance(dict_by_token, str):
        return 1
    if dict_by_token.get("verify_phone") is False:
        return 2
    else:
        return dict_by_token