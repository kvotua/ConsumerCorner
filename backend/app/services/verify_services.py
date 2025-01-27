import random
import smtplib
from email.utils import make_msgid
import aiohttp
import phonenumbers
from datetime import datetime, timedelta, timezone
import bcrypt
import asyncio
import uuid
from email.mime.text import  MIMEText
from app.config import from_email, email_password, email_host

class HttpClient:
    def __init__(self):
        self.loop = asyncio.get_event_loop() if asyncio.get_event_loop() is not None else asyncio.new_event_loop()
        self.session = aiohttp.ClientSession(loop=self.loop)

    async def close_session(self):
        await self.session.close()

    async def send_message(self, url, data):
        async with self.session.post(url, data=data) as response:
            result = await response.json()
            return result

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        await self.close_session()

httpclient = HttpClient()


class SendEmail:
    def __init__(self,
                 email: str = from_email,
                 password: str = email_password,
                 email_host: str = email_host,
        ):
        self.email = email
        self.server = smtplib.SMTP(host=email_host, port=587)
        try:
            self.server.starttls()
            self.server.login(email, password=password)
        except smtplib.SMTPAuthenticationError:
            raise Exception("Authentication error. Check your email and password.")
        except Exception as e:
            raise Exception(f"Failed to connect to the SMTP server: {e}")

    def send_message(self, to_send: str, token: str):
        msg = MIMEText(f"Your verification link: {token}", 'plain', 'utf-8')
        msg['Message-ID'] = make_msgid()
        msg['Subject'] = "Mail verification"
        msg['From'] = self.email
        msg['To'] = to_send
        try:
            self.server.sendmail(
                from_addr=self.email,
                to_addrs=[to_send],
                msg=msg.as_string(),
            )
        except Exception as e:
            raise Exception(f"Error sending the message: {e}")

    def close(self):
        try:
            self.server.quit()
        except Exception as e:
            raise Exception(f"Session closing error: {e}")

sendemail = SendEmail()


def time_in_30_days():
    return datetime.now(timezone.utc) + timedelta(days=30)

def time_in_3_days():
    return datetime.now(timezone.utc) + timedelta(days=3)

def generate_code():
    code = ''.join(random.sample('0123456789', k=5))
    return code

def generate_session():
    return str(uuid.uuid4())

def generate_text(code):
    return f'Кoд для верификации: {code}'

def validate_phone(phone):
    valid = phonenumbers.parse(phone, 'RU')
    if phonenumbers.is_valid_number(valid):
        valid_phone = ''
        for i in phonenumbers.format_number(valid, phonenumbers.PhoneNumberFormat.NATIONAL):
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