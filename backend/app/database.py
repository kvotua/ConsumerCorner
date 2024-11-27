from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
from pathlib import Path
from sqlalchemy import text
import os

env_path = Path(__file__).parent / '.env'
load_dotenv(dotenv_path=env_path)
DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

try:
    with engine.connect() as connection:
        result = connection.execute(
            text("SELECT table_schema, table_name FROM information_schema.tables"))

        # Получаем все таблицы
        tables = result.fetchall()
        if tables:
            print("Таблицы в базе данных:")
            for table in tables:
                # Используем индексы для доступа к значениям
                print(f"Схема: {table[0]}, Таблица: {table[1]}")
        else:
            print("Таблицы не найдены.")
except Exception as e:
    print(f"Ошибка подключения: {e}")

