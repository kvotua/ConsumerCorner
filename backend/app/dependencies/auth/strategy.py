from typing import TYPE_CHECKING, Annotated

from core.config import settings
from fastapi import Depends
from fastapi_users.authentication.strategy.db import DatabaseStrategy

from .tokens import get_access_tokens_db

if TYPE_CHECKING:
    from core.models import AccessToken
    from fastapi_users.authentication.strategy.db import AccessTokenDatabase


def get_database_strategy(
    access_token_db: Annotated[
        "AccessTokenDatabase[AccessToken]",
        Depends(get_access_tokens_db),
    ],
) -> DatabaseStrategy:
    return DatabaseStrategy(
        database=access_token_db,
        lifetime_seconds=settings.access_token.lifetime_seconds,
    )
