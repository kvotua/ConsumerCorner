from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from .config import db_url
from .models import Base, Points
from sqlalchemy.future import select


engine = create_async_engine(
    url=str(db_url),
    echo=True,
    future=True,
    )

async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    await engine.dispose()

async def get_session():
    async_session = async_sessionmaker(
        bind=engine,
        class_=AsyncSession,
        expire_on_commit=False,
        autoflush=False,
        autocommit=False,
    )
    async with async_session() as session:
        yield session


# class Database:
#     def __init__(self):
#         self.engine = engine
#         self.SessionLocal = get_session()
#
#     async def get_points(self, create_id: int) -> list:
#         async with self.SessionLocal as session:
#             result = await session.execute(select(Points).where(Points.create_id == create_id))
#             return session.execute(result)
#
#     async def get_user(self, user_id: int) -> User:
#         """Получить одного пользователя по ID"""
#         async with self.SessionLocal() as session:
#             result = await session.execute(select(User).filter(User.id == user_id))
#             return result.scalars().first()
#
#     async def get_users(self) -> List[User]:
#         """Получить всех пользователей"""
#         async with self.SessionLocal() as session:
#             result = await session.execute(select(User))
#             return result.scalars().all()
#
#     async def create_user(self, name: str, age: int) -> User:
#         """Создать нового пользователя"""
#         new_user = User(name=name, age=age)
#         async with self.SessionLocal() as session:
#             session.add(new_user)
#             await session.commit()
#             return new_user
#
#     async def update_user(self, user_id: int, name: str, age: int) -> User:
#         """Обновить информацию о пользователе"""
#         async with self.SessionLocal() as session:
#             user = await session.get(User, user_id)
#             if user:
#                 user.name = name
#                 user.age = age
#                 await session.commit()
#                 return user
#             return None
#
#     async def delete_user(self, user_id: int) -> bool:
#         """Удалить пользователя"""
#         async with self.SessionLocal() as session:
#             user = await session.get(User, user_id)
#             if user:
#                 await session.delete(user)
#                 await session.commit()
#                 return True
#             return False