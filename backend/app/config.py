from pathlib import Path
from dotenv import load_dotenv
import os
from .errors.EnvError import EnvError


env_path = Path(__file__).parent.parent / '.env'
if (not os.path.isfile(env_path)):
    raise EnvError("File .env not found!")
load_dotenv(dotenv_path=env_path)

token = os.getenv('API_TOKEN_INN')
db_url = os.getenv('DATABASE_URL')
mongodb_url = os.getenv('MONGODB_URL')
mongodb_user = os.getenv('MONGO_USER')
mongodb_password = os.getenv('MONGO_PASSWORD')
mongodb_db = os.getenv('MONGO_DB')

api_key = os.getenv('API_KEY')
campaign_id = os.getenv('CAMPAIGN_ID')

secret_key = os.getenv('SECRET_KEY')
algo = os.getenv('ALGORITHM')
from_email = os.getenv('FROM_EMAIL')
email_password = os.getenv('EMAIL_PASSWORD')
email_host = os.getenv("EMAIL_HOST")
example_jwt_token = os.getenv("EXAMPLE_JWT")
sysadmin_login = os.getenv("SYS_ADMIN_LOGIN")
sysadmin_password = os.getenv("SYS_ADMIN_PASSWORD")
pattern_password = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};\'":\\|,.<>?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};\'":\\|,.<>?]{8,}$'
pattern_fio = r'^[А-ЯЁ][а-яё]{2,} [А-ЯЁ][а-яё]{2,}( [А-ЯЁ][а-яё]+)?$'
pattern_time = r'^(?:[01]\d|2[0-3]):[0-5]\d$'

