from typing import Annotated

from bcrypt import checkpw
from fastapi import APIRouter, Body, HTTPException, Response, Security, status
from fastapi_jwt import JwtAuthorizationCredentials

from app.users.models import UserModel

from .dependencies import refresh_security
from .schemas import AccessTokenSchema, AuthSchema, TokenPairSchema
from .utils import set_access_token, set_token_pair

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post(
    "/refresh",
)
async def post_auth_refresh(
    response: Response,
    credentials: JwtAuthorizationCredentials = Security(refresh_security),
) -> AccessTokenSchema:
    access_token = set_access_token(response, credentials.subject)
    return AccessTokenSchema(access_token=access_token)


@router.post(
    "/",
)
async def post_auth(
    response: Response,
    credentials: Annotated[AuthSchema, Body(embed=True)],
) -> TokenPairSchema:
    result = list(
        UserModel.scan(
            UserModel.email.value == credentials.email,  # type: ignore
            limit=1,
        )
    )
    if len(result) == 0:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User with this email not found")
    model = result[0]
    if not checkpw(credentials.password.encode(), model.password.encode()):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Wrong password")
    return set_token_pair(response, {"id": model.id})
