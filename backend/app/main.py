import os
from contextlib import asynccontextmanager
from typing import AsyncIterator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from ConsumerCorner.backend.app.auth.routes import router as auth_router
from ConsumerCorner.backend.app.users.models import UserModel
from ConsumerCorner.backend.app.users.routes import router as users_router
from ConsumerCorner.backend.app.inn_service.routes import router as inn_service_router
from ConsumerCorner.backend.app.verifnum.routers import router as verifnum_router
from ConsumerCorner.backend.app.database import engine

# @asynccontextmanager
# async def lifespan(app: FastAPI) -> AsyncIterator:
#     for table in (UserModel,):
#         if not table.exists():
#             table.create_table(
#                 wait=True,
#                 read_capacity_units=1,
#                 write_capacity_units=1,
#                 billing_mode="PAY_PER_REQUEST",
#             )
#     yield

Base.metadata.create_all(bind=engine)

debug = os.getenv("DEBUG") is not None
app = FastAPI(debug=debug)#, lifespan=lifespan)
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
app.include_router(verifnum_router)

