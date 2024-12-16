#!/bin/bash

# Ожидаем, пока база данных станет доступной
echo "Ожидаем доступности PostgreSQL..."
until pg_isready -h "$1" -U "$POSTGRES_USER" -d "$POSTGRES_DB"; do
  echo "PostgreSQL не доступен, ожидаем..."
  sleep 2
done
sleep 2
# Выполняем миграции Alembic
echo "Выполняем миграции Alembic..."
alembic revision --autogenerate -m "init"
alembic upgrade head
sleep 2

# Запускаем сервер uvicorn
echo "Запуск приложения с uvicorn..."
uvicorn app.main:app --host 0.0.0.0 --port 80