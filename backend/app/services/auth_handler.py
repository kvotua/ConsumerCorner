from typing import Dict
import jwt
from datetime import datetime, timedelta, timezone
from app.config import secret_key, algo
from fastapi import Request


def sign_jwt(data: dict) -> str:
    payload = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(days=3)
    payload.update({"exp": expire, "type": "access"})
    return jwt.encode(payload, secret_key, algorithm=algo)

def sing_email_jwt(user_id: int, email: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=10)
    payload = {
        "id": user_id,
        "email": email,
        "exp": expire,
        "type": "email_token",
    }
    return jwt.encode(payload, secret_key, algorithm=algo)

def decode_jwt(token: str) -> dict:
    try:
        decoded_token = jwt.decode(token, secret_key, algorithms=[algo])
        data_now = datetime.now(timezone.utc)
        if decoded_token.get("exp") <= int(data_now.timestamp()):
            return {}
        if decoded_token.get("type") != "access":
            return {}
        return decoded_token
    except:
        return {}

def decode_jwt_with_verify(token: str) -> dict:
    try:
        decoded_token = jwt.decode(token, secret_key, algorithms=[algo])
        data_now = datetime.now(timezone.utc)
        if decoded_token.get("exp") <= int(data_now.timestamp()):
            return {}
        if decoded_token.get("type") != "access":
            return {}
        if decoded_token.get("verify_phone") == False:
            raise {}
        return decoded_token
    except:
        return {}

def decode_email_token(token: str):
    try:
        decoded_token = jwt.decode(token, secret_key, algorithms=[algo])
        data_now = datetime.now(timezone.utc)
        if decoded_token.get("exp") <= int(data_now.timestamp()):
            return "Срок жизни ссылки истёк"
        if decoded_token.get("type") != "email_token":
            return "Невалидная ссылка"
        return decoded_token
    except:
        return "Невалидная ссылка"

def get_token_data_verify(request: Request):
    headers = request.headers
    token_list = headers.get("authorization").split()
    return decode_jwt_with_verify(token_list[1])

def get_token_data(request: Request):
    headers = request.headers
    token_list = headers.get("authorization").split()
    return decode_jwt(token_list[1])

def sing_refresh_jwt(data: dict) -> str:
    payload = {
        "id": data.get("id"),
        "type": "refresh",
        "exp": datetime.now(timezone.utc) + timedelta(days=30),
    }
    return jwt.encode(payload, secret_key, algorithm=algo)

def decode_refresh_jwt(token: str) -> dict:
    try:
        decoded_token = jwt.decode(token, secret_key, algorithms=[algo])
        data_now = datetime.now(timezone.utc)
        if decoded_token.get("exp") <= int(data_now.timestamp()):
            return {}
        if decoded_token.get("type") != "refresh":
            return {}
        return decoded_token
    except:
        return {}

def set_token_pair(data: dict) -> Dict[str, str]:
    return {
        "access_token": sign_jwt(data),
        "refresh_token": sing_refresh_jwt(data)
    }