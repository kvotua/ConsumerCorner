from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, Result
from backend.app.models import Users
from backend.app.users.schemas import UserSchema, ChangeUserSchema


async def get_user_by_id(session: AsyncSession, user_id: int) -> Users:
    stmt = select(Users).where(Users.id == user_id)
    result: Result = await session.execute(stmt)
    return result.scalars().first()

async def get_user_without_pass(session: AsyncSession, user_id: int):
    stmt = select(Users).where(Users.id == user_id)
    result: Result = await session.execute(stmt)
    user = result.scalars().first()
    return UserSchema(id=user.id, phone=user.phone,
                      fio=user.fio, email=user.email,
                      verify_phone=user.verify_phone, verify_email=user.verify_email
                      )

async def update_user(session: AsyncSession, user: Users, update_user_data: ChangeUserSchema):
    if user:
        if update_user_data.new_phone != user.phone:
            user.phone = update_user_data.new_phone
            user.verify_phone = False
        if update_user_data.new_email != user.email:
            user.email = update_user_data.new_email
            user.verify_email = False
        if update_user_data.new_fio != user.fio:
            user.fio = update_user_data.new_fio
    await session.commit()
    return user