#!/bin/bash 

echo "Wait available PostgreSQL..."
until pg_isready -h "postgres" -U "$POSTGRES_USER" -d "$POSTGRES_DB"; do
  echo "PostgreSQL not available, waiting..."
  sleep 2
done
sleep 2

echo "Creating .pgpass file..."
echo "postgres:5432:$POSTGRES_DB:$POSTGRES_USER:$POSTGRES_PASSWORD" > ./.pgpass

chmod 0600 ./.pgpass
export PGPASSFILE="./.pgpass"

echo "Removing invalid migration entry from alembic_version..."
psql -h postgres -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "DELETE FROM alembic_version;"

echo "Generating new migration for model update..."
alembic revision --autogenerate -m "update model"

echo "Applying migrations..."
alembic upgrade head

echo "Run app with uvicorn..."
uvicorn app.main:app --host 0.0.0.0 --port 80
