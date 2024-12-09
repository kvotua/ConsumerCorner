import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .auth.routes import router as auth_router
from .users.routes import router as users_router
from .inn_service.routes import router as inn_service_router
from .database import create_tables, Base
from .enterprises.routes import router as enterprises_router
from .mongodb.routes import router as mongodb_router

from .logger.config import setup_logging

setup_logging()

@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_tables()
    yield


debug = os.getenv("DEBUG") is not None
app = FastAPI(debug=debug, lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(inn_service_router)
app.include_router(users_router)
app.include_router(auth_router)
app.include_router(enterprises_router)
app.include_router(mongodb_router)