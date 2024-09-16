import uuid
from typing import Annotated

from bcrypt import gensalt, hashpw
from fastapi import APIRouter, Body, Depends, HTTPException, Response, Security, status
from fastapi_jwt import JwtAuthorizationCredentials

from app.auth.dependencies import access_security
from app.auth.schemas import TokenPairSchema
from app.auth.utils import generate_email_verify_link, set_token_pair
from app.users.schemas import UserId

from .dependencies import Emailer
from .models import EmailModel, UserModel
from .schemas import UserRegisterSchema, UserSchema

router = APIRouter(prefix="/users", tags=["Users"])


def email_exist(email: str) -> bool:
    result = UserModel.scan(UserModel.email.value == email, limit=1)  # type: ignore
    return len(list(result)) > 0


@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    responses={
        status.HTTP_409_CONFLICT: {},
    },
)
async def post_users_register(
    response: Response,
    user: Annotated[UserRegisterSchema, Body(embed=True)],
    emailer: Annotated[Emailer, Depends(Emailer)],
) -> TokenPairSchema:
    if email_exist(user.email):
        raise HTTPException(status.HTTP_409_CONFLICT, "Email already in use")
    user_id = UserId(str(uuid.uuid4()))
    UserModel(
        id=user_id,
        email=EmailModel(value=user.email, verified=False),
        name=user.name,
        surname=user.surname,
        password=hashpw(user.password.encode(), gensalt()).decode(),
    ).save()
    # TODO: send link for email verification
    link = generate_email_verify_link(user.email, user_id)
    emailer.send(user.email, "Подтверждение почты", f"Ссылка для подтверждения: {link}")
    return set_token_pair(response, {"id": user_id})


@router.get(
    "/me",
)
async def get_users_me(
    credentials: JwtAuthorizationCredentials = Security(access_security),
) -> UserSchema:
    try:
        model = UserModel.get(credentials.subject.get("id"))
    except UserModel.DoesNotExist:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User with this ID not found")
    return model.to_schema()
