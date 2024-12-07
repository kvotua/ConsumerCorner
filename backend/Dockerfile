FROM python:3.11-alpine AS base

FROM base AS dev
WORKDIR /backend
COPY ./ ./
RUN pip install --no-cache-dir -r /backend/requirements.txt
# RUN pip install pytest
# RUN pytest ./app/tests
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]
