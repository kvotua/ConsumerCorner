FROM python:3.11-alpine AS base
RUN apk add --no-cache bash postgresql-client

FROM base AS dev
WORKDIR /backend

COPY ./ ./ 
RUN mkdir -p /backend/alembic/versions

RUN pip install --no-cache-dir -r /backend/requirements.txt
RUN pip install alembic
RUN pip install pytest

RUN pytest

COPY ./wait-for-postgres.sh /backend/wait-for-postgres.sh
RUN sed -i 's/\r//' /backend/wait-for-postgres.sh
RUN chmod +x /backend/wait-for-postgres.sh

CMD ["bash", "/backend/wait-for-postgres.sh"]