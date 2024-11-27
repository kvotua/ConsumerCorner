from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from .models import Verify


engine = create_async_engine(
    url='postgresql+asyncpg://postgres:postgres@localhost:5432/ActiveVerif',
    echo=True,
    future=True,
    )

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Verify.metadata.create_all)

async def get_session():
    async_session = sessionmaker(
        bind=engine,
        class_=AsyncSession,
        expire_on_commit=False,
        autoflush=False,
    )
    async with async_session() as session:
        yield session