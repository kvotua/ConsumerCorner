from core.models import User
from core.schemas.user import UserRegisterSchema
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession


async def create_user(
    session: AsyncSession,
    user_create: UserRegisterSchema,
) -> User:
    user = User(**user_create.model_dump())
    session.add(user)
    await session.commit()
    await session.refresh(user)
    return user


async def get_user(
    session: AsyncSession,
    user_id: str,
) -> User | None:
    return await session.get(User, user_id)


async def get_all_users(
    session: AsyncSession,
) -> list[User]:
    stmt = select(User).order_by(User.id)
    result = await session.scalars(stmt)
    return result.all()
