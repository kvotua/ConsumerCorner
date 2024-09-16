import logging
from typing import TYPE_CHECKING, Optional

from core.config import settings
from core.models import User
from core.types.user_id import UserIdType
from fastapi_users import BaseUserManager, UUIDIDMixin

if TYPE_CHECKING:
    from fastapi import Request


log = logging.getLogger(__name__)


class UserManager(UUIDIDMixin, BaseUserManager[User, UserIdType]):
    reset_password_token_secret = settings.access_token.reset_password_token_secret
    verification_token_secret = settings.access_token.verification_token_secret

    async def on_after_register(
        self,
        user: User,
        request: Optional["Request"] = None,
    ):
        log.warning(
            "User %r has registered.",
            user.id,
        )

    async def on_after_request_verify(
        self,
        user: User,
        token: str,
        request: Optional["Request"] = None,
    ):
        log.warning(
            "Verification requested for user %r. Verification token: %r",
            user.id,
            token,
        )

        protocol = "https" if settings.app_mode == "prod" else "http"
        link = f"{protocol}://{settings.app_url}/auth/verify?token={token}"

        log.warning("Email verification link: %s", link)
        # TODO: send email

    # async def on_after_forgot_password(

    #     self,
    #     user: User,
    #     token: str,
    #     request: Optional["Request"] = None,
    # ):
    #     log.warning(
    #         "User %r has forgot their password. Reset token: %r",
    #         user.id,
    #         token,
    #     )
