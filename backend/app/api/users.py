from core.config import settings
from core.schemas.user import UserRead, UserUpdate
from fastapi import APIRouter

from .fastapi_users_router import fastapi_users

router = APIRouter(
    prefix=settings.api.v1.users,
    tags=["Users"],
)


# /me
# /{id}
router.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
)
