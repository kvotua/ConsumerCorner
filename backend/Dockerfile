FROM python:3.11-alpine AS base


FROM base AS dev
WORKDIR /app
RUN pip install poetry
COPY ./pyproject.toml ./poetry.lock ./
RUN poetry install --only main
COPY ./app ./app
CMD poetry run fastapi dev app/main.py --host 0.0.0.0 --port ${PORT:-8000}


FROM base AS requirements-stage
WORKDIR /tmp
RUN pip install poetry
COPY ./pyproject.toml ./poetry.lock ./
RUN poetry export -f requirements.txt --output requirements.txt --without-hashes

FROM base AS prod
WORKDIR /app
COPY --from=requirements-stage /tmp/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir --upgrade -r ./requirements.txt
COPY ./app ./app
CMD fastapi run app/main.py --port ${PORT:-8000}
