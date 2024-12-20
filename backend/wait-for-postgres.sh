#!/bin/bash

echo "Ожидаем доступности PostgreSQL..."
until pg_isready -h "postgres" -U "$POSTGRES_USER" -d "$POSTGRES_DB"; do
  echo "PostgreSQL не доступен, ожидаем..."
  sleep 2
done
sleep 2
echo "Выполняем миграции Alembic..."
alembic revision --autogenerate -m "init"
alembic upgrade head
sleep 2

echo "Запуск приложения с uvicorn..."
uvicorn app.main:app --host 0.0.0.0 --port 80