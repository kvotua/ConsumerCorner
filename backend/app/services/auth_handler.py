from typing import Dict
import jwt
from datetime import datetime, timedelta, timezone
from backend.app.config import secret_key, algo


def sign_jwt(data: dict) -> str:
    payload = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(days=3)
    payload.update({"exp": expire, "type": "access"})
    return jwt.encode(payload, secret_key, algorithm=algo)

def decode_jwt_for_verify(token: str) -> dict:
    try:
        decoded_token = jwt.decode(token, secret_key, algorithms=[algo])
        data_now = datetime.now(timezone.utc)
        if decoded_token.get("exp") <= int(data_now.timestamp()):
            return None
        if decoded_token.get("type") != "access":
            return None
        return decoded_token
    except:
        return {}

def decode_jwt(token: str) -> dict:
    try:
        decoded_token = jwt.decode(token, secret_key, algorithms=[algo])
        data_now = datetime.now(timezone.utc)
        if decoded_token.get("exp") <= int(data_now.timestamp()):
            return None
        if decoded_token.get("type") != "access":
            return None
        if decoded_token.get("verify_phone") is True:
            return None
        return decoded_token
    except:
        return {}

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