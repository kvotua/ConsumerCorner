from core.models import User
from core.types.user_id import UserIdType
from dependencies.auth.backend import authentication_backend
from dependencies.auth.user_manager import get_user_manager
from fastapi_users import FastAPIUsers

fastapi_users = FastAPIUsers[User, UserIdType](
    get_user_manager,
    [authentication_backend],
)

current_user = fastapi_users.current_user(
    active=True,
)

current_superuser = fastapi_users.current_user(
    active=True,
    superuser=True,
)
