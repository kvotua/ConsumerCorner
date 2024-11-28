import aiohttp
import random
import jwt
from config import algo, private_key_path, public_key_path

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


def encode_jwt(
    payload: dict, 
    private_key: str = private_key_path.read_text(), 
    algorithm: str = algo,
):
    encoded = jwt.encode(payload, private_key, algorithm)
    return encoded

def decode_jwt(
    token: str | bytes, 
    public_key: str = public_key_path.read_text(), 
    algorithm: str = algo,
):
    decoded = jwt.decode(token, public_key, algorithms=[algorithm])
    return decoded