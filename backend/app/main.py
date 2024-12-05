import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.auth.routes import router as auth_router
from backend.app.users.routes import router as users_router
from backend.app.inn_service.routes import router as inn_service_router
from backend.app.database import create_tables, Base
from backend.app.enterprises.routes import router as enterprises_router

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