from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, Result
from app.models.models import Users
from app.schemas.users_schemas import UserSchema, ChangeUserSchema
from app.services.verify_services import validate_phone
from app.services.users_services import validate_fio, validate_email_address


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
    try:
        new_phone = validate_phone(update_user_data.new_phone)
    except Exception as e:
        new_phone = None  # Если произошла ошибка, не устанавливаем новый телефон

    if user:
        if new_phone is not None and new_phone != user.phone:
            user.phone = new_phone
            user.verify_phone = False

        new_email = validate_email_address(update_user_data.new_email)
        if new_email is not None and new_email != user.email:
            user.email = new_email
            user.verify_email = False

        new_fio = validate_fio(update_user_data.new_fio)
        if new_fio is not None and new_fio != user.fio:
            user.fio = new_fio

        await session.commit()
    return user