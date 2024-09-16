import os
from contextlib import asynccontextmanager
from typing import AsyncIterator

from actions.create_user import create_superuser
from api import router

from core.config import settings
from core.models import db_helper
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import ORJSONResponse


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator:
    await create_superuser()

    yield
    # shutdown
    await db_helper.dispose()


debug = os.getenv("DEBUG") is not None
app = FastAPI(
    default_response_class=ORJSONResponse,
    lifespan=lifespan,
    docs_url="/api/docs",
    openapi_url="/api/openapi.json",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(router, prefix=settings.api.prefix)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host=settings.run.host,
        port=settings.run.port,
        reload=True,
    )
