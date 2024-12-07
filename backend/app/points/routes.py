from fastapi import APIRouter, HTTPException, Depends, Body, Header, Path
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Annotated

from backend.app.auth.utils import validate_token
from backend.app.users.schemas import NewUserSchema
from backend.app.database import get_session
from backend.app.models import Users
from backend.app.config import example_jwt_token


router = APIRouter(prefix="/points", tags=["Points"])