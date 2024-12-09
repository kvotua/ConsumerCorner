import os
from contextlib import asynccontextmanager

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from backend.app.api.v1.verify_routes import router as verify_router
from backend.app.services.auth_bearer import JWTBearer
from backend.app.api.v1.users_routes import router as users_router
from backend.app.api.v1.inn_routes import router as inn_service_router
from backend.app.core.databases.postgresdb import create_tables
from backend.app.api.v1.enterprises_routes import router as enterprises_router
from backend.app.api.v1.reviews_routes import router as reviews_router
from backend.app.api.v1.mongo_routes import router as mongodb_router
from backend.app.api.v1.points_routes import router as point_router
from backend.app.api.v1.auth_routes import router as auth_router


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


app.include_router(auth_router)
app.include_router(verify_router)
app.include_router(inn_service_router)
app.include_router(users_router)
app.include_router(enterprises_router)
app.include_router(point_router)
app.include_router(reviews_router)
app.include_router(mongodb_router)