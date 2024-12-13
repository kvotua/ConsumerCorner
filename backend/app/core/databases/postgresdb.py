from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from app.config import db_url
from app.models.models import Base
from app.models.verify_models import Verification
from datetime import datetime, timedelta


engine = create_async_engine(
    url=str(db_url),
    echo=False,
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
        await session.close()

async def delete_verify_session(session: AsyncSession):
    threshold_date = datetime.utcnow() - timedelta(days=30)
    await session.execute(
        Verification.__table__.delete().where(Verification.created_at < threshold_date)
    )
    await session.commit()