from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine,async_sessionmaker
from .config import db_url


engine = create_async_engine(
    url=db_url,
    echo=True,
    future=True,
    )

# async def init_db():
#     async with engine.begin() as conn:
#         await conn.run_sync(Verify.metadata.create_all)

async def get_session():
    async_session = async_sessionmaker(
        bind=engine,
        class_=AsyncSession,
        expire_on_commit=False,
        autoflush=False,
    )
    async with async_session() as session:
        yield session