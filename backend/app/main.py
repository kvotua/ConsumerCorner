import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.verify_routes import router as verify_router
from app.api.v1.password_routes import router as password_router
from app.api.v1.users_routes import router as users_router
from app.api.v1.profile_routes import router as profile_routes
from app.api.v1.inn_routes import router as inn_service_router
from app.api.v1.enterprises_routes import router as enterprises_router
from app.api.v1.comments_routes import router as comments_router
from app.api.v1.mongo_routes import router as mongodb_router
from app.api.v1.points_routes import router as point_router
from app.api.v1.auth_routes import router as auth_router
from app.api.v1.sysadmin_routes import router as sysadmin_router

from .logger.config import setup_logging

setup_logging()

debug = os.getenv("DEBUG") is not None
app = FastAPI(debug=debug)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# routes
app.include_router(auth_router)
app.include_router(profile_routes)
app.include_router(password_router)
app.include_router(verify_router)
app.include_router(inn_service_router)
app.include_router(users_router)
app.include_router(enterprises_router)
app.include_router(point_router)
app.include_router(comments_router)
app.include_router(mongodb_router)
app.include_router(sysadmin_router)