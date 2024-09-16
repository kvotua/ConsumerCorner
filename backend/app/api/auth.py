from core.config import settings
from core.schemas.user import UserCreate, UserRead
from dependencies.auth import authentication_backend
from fastapi import APIRouter

from .fastapi_users_router import fastapi_users

router = APIRouter(
    prefix=settings.api.v1.auth,
    tags=["Auth"],
)


# /login
# /logout
router.include_router(
    router=fastapi_users.get_auth_router(
        backend=authentication_backend,
        requires_verification=settings.access_token.email_verification,
    ),
)


# / register
router.include_router(
    router=fastapi_users.get_register_router(
        user_schema=UserRead,
        user_create_schema=UserCreate,
    ),
)


# /request-verify-token
# /verify
router.include_router(
    router=fastapi_users.get_verify_router(
        user_schema=UserRead,
    ),
)


# /forgot-password
# /reset-password
router.include_router(
    router=fastapi_users.get_reset_password_router(),
)
