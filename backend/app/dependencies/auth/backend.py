from core.auth.transport import bearer_transport
from fastapi_users.authentication import AuthenticationBackend

from .strategy import get_database_strategy

authentication_backend = AuthenticationBackend(
    name="access-tokens-db",
    transport=bearer_transport,
    get_strategy=get_database_strategy,
)
