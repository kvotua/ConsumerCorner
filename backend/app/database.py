from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
#from config import db_url
from models import Base

db_url='postgresql+asyncpg://postgres:postgres@localhost:5432/ActiveVerif'

engine = create_async_engine(
    url=db_url,
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