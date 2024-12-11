import random
import aiohttp
import phonenumbers
from datetime import datetime, timedelta, timezone
import bcrypt
import asyncio

class HttpClient:
    def __init__(self):
        self.loop = asyncio.get_event_loop() if asyncio.get_event_loop() is not None else asyncio.new_event_loop()
        self.session = aiohttp.ClientSession(loop=self.loop)

    async def close_session(self):
        await self.session.close()

    async def send_message(self, url, data):
        try:
            async with self.session.post(url, data=data) as response:
                result = await response.json()
                return result.get("request_id")
        except:
            return None

httpclient = HttpClient()

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

def hash_password(password: str) -> bytes:
    salt = bcrypt.gensalt()
    pwd_bytes: bytes = password.encode()
    return bcrypt.hashpw(pwd_bytes, salt)

def validate_password(password: str, hashed_password: bytes) -> bool:
    return bcrypt.checkpw(
        password.encode(),
        hashed_password=hashed_password,
    )