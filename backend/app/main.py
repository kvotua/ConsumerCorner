import os
from contextlib import asynccontextmanager
from typing import AsyncIterator

from fastapi import FastAPI

from app.auth.routes import router as auth_router
from app.users.models import UserModel
from app.users.routes import router as users_router


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator:
    for table in (UserModel,):
        if not table.exists():
            table.create_table(
                wait=True,
                read_capacity_units=1,
                write_capacity_units=1,
                billing_mode="PAY_PER_REQUEST",
            )
    yield


debug = os.getenv("DEBUG") is not None
app = FastAPI(debug=debug, lifespan=lifespan)
app.include_router(users_router)
app.include_router(auth_router)
