from pathlib import Path
from dotenv import load_dotenv
import os


env_path = Path(__file__).parent / '.env'
load_dotenv(dotenv_path=env_path)

token = os.getenv('API_TOKEN_INN')
db_url = os.getenv('DATABASE_URL')
user_name = os.getenv('USER_NAME')
user_pass = os.getenv('USER_PASS')
send_from = os.getenv('SEND_FROM')
secret_key = os.getenv('SECRET_KEY')
algo = os.getenv('ALGORITHM')

example_jwt_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxNzM1OTIxMzg5LCJ0eXBlIjoicmVmcmVzaCJ9.SDZcJf2hmbnYYer5R-VZKyQL2ztSu3WgzcZ6tFojx38"