import asyncio
import contextlib
from os import getenv

from core.auth.user_manager import UserManager
from core.models import db_helper
from core.models.user import User
from core.schemas.user import UserCreate
from dependencies.auth.user_manager import get_user_manager
from dependencies.auth.users import get_users_db
from fastapi_users.exceptions import UserAlreadyExists

get_users_db_context = contextlib.asynccontextmanager(get_users_db)
get_users_manager_context = contextlib.asynccontextmanager(get_user_manager)

default_surname = "Admin"
default_name = "Admin"
default_email = getenv("DEFAULT_SUPERUSER_EMAIL", "admin@admin.com")
default_password = getenv("DEFAULT_SUPERUSER_PASSWORD", "admin")
default_is_active = True
default_is_superuser = True
default_is_verified = True


async def create_user(
    user_manager: UserManager,
    user_create: UserCreate,
) -> User:
    user = await user_manager.create(user_create=user_create, safe=False)
    return user


async def create_superuser(
    name: str = default_name,
    surname: str = default_surname,
    email: str = default_email,
    password: str = default_password,
    is_active: bool = default_is_active,
    is_superuser: bool = default_is_superuser,
    is_verified: bool = default_is_verified,
):
    user_create = UserCreate(
        name=name,
        surname=surname,
        email=email,
        password=password,
        is_active=is_active,
        is_superuser=is_superuser,
        is_verified=is_verified,
    )

    try:
        async with db_helper.session_factory() as session:
            async with get_users_db_context(session) as users_db:
                async with get_users_manager_context(users_db) as user_manager:
                    return await create_user(
                        user_manager=user_manager,
                        user_create=user_create,
                    )
    except UserAlreadyExists:
        pass


if __name__ == "__main__":
    asyncio.run(create_superuser())
