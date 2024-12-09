from pathlib import Path
from dotenv import load_dotenv
import os
from .CriticalError import CriticalError

env_path = Path(__file__).parent.parent / '.env'
if (not os.path.isfile(env_path)):
    raise CriticalError("File .env not found!")
load_dotenv(dotenv_path=env_path)

token = os.getenv('API_TOKEN_INN')
db_url = os.getenv('DATABASE_URL')
mongodb_url = os.getenv('MONGODB_URL')
mongodb_user = os.getenv('MONGO_USER')
mongodb_password = os.getenv('MONGO_PASSWORD')
mongodb_db = os.getenv('MONGO_DB')
user_name = os.getenv('USER_NAME')
user_pass = os.getenv('USER_PASS')
send_from = os.getenv('SEND_FROM')
secret_key = os.getenv('SECRET_KEY')
algo = os.getenv('ALGORITHM')

example_jwt_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxNzM1OTIxMzg5LCJ0eXBlIjoicmVmcmVzaCJ9.SDZcJf2hmbnYYer5R-VZKyQL2ztSu3WgzcZ6tFojx38"