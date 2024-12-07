"""create

Revision ID: 315f6e084e4f
Revises: 
Create Date: 2024-11-27 16:37:11.440441

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '315f6e084e4f'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Создание таблицы comments
    op.create_table(
        'comments',
        sa.Column('id', sa.String(length=255), nullable=False),
        sa.Column('point_id', sa.String(length=255), nullable=False),
        sa.Column('text', sa.String(length=255), nullable=False),
        sa.Column('stars', sa.Integer(), nullable=False),
        sa.Column('date_added', sa.BigInteger(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )

    # Создание таблицы docs
    op.create_table(
        'docs',
        sa.Column('id', sa.String(length=255), nullable=False),
        sa.Column('point_id', sa.String(length=255), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )

    # Создание таблицы points
    op.create_table(
        'points',
        sa.Column('id', sa.String(length=255), nullable=False),
        sa.Column('enterprise_id', sa.String(length=255), nullable=False),
        sa.Column('titile', sa.String(length=255), nullable=False),
        sa.Column('address', sa.String(length=255), nullable=False),
        sa.Column('phone', sa.String(length=255), nullable=False),
        sa.Column('type_activity', sa.String(length=255), nullable=False),
        sa.Column('middle_stars', sa.Float(), nullable=False),
        sa.Column('verify_phone', sa.BigInteger(), nullable=False),
        sa.Column('date_added', sa.BigInteger(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )

    # Создание таблицы enterprises
    op.create_table(
        'enterprises',
        sa.Column('id', sa.String(length=255), nullable=False),
        sa.Column('name', sa.String(length=255), nullable=False),
        sa.Column('type', sa.String(length=255), nullable=False),
        sa.Column('creater_id', sa.String(length=255), nullable=False),
        sa.Column('inn', sa.BigInteger(), nullable=False),
        sa.Column('ogrn', sa.String(length=255), nullable=False),
        sa.Column('general_type_activity', sa.String(length=255), nullable=False),
        sa.Column('role_id', sa.String(length=255), nullable=False),
        sa.Column('date_added', sa.BigInteger(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )

    # Создание таблицы users
    op.create_table(
        'users',
        sa.Column('id', sa.String(length=255), nullable=False),
        sa.Column('phone', sa.BigInteger(), nullable=False),
        sa.Column('fio', sa.String(length=255), nullable=False),
        sa.Column('password', sa.String(length=255), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('verify_phone', sa.Boolean(), nullable=False),
        sa.Column('verify_email', sa.Boolean(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )

    # Создание таблицы imgs
    op.create_table(
        'imgs',
        sa.Column('id', sa.String(length=255), nullable=False),
        sa.Column('comment_id', sa.String(length=255), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )

    # Создание таблицы user_enterprises_role
    op.create_table(
        'user_enterprises_role',
        sa.Column('user_id', sa.String(length=255), nullable=False),
        sa.Column('enterprise_idbigint', sa.String(length=255), nullable=False),
        sa.Column('role', sa.String(length=255), nullable=False)
    )

    # Добавление внешних ключей
    op.create_foreign_key('comments_point_id_foreign', 'comments', 'points', ['point_id'], ['id'])
    op.create_foreign_key('docs_point_id_foreign', 'docs', 'points', ['point_id'], ['id'])
    op.create_foreign_key('comments_id_foreign', 'comments', 'imgs', ['id'], ['id'])
    op.create_foreign_key('points_enterprise_id_foreign', 'points', 'enterprises', ['enterprise_id'], ['id'])
    op.create_foreign_key('user_enterprises_role_user_id_foreign', 'user_enterprises_role', 'users', ['user_id'], ['id'])
def downgrade() -> None:
    # Удаление внешних ключей
    op.drop_constraint('comments_point_id_foreign', 'comments', type_='foreignkey')
    op.drop_constraint('docs_point_id_foreign', 'docs', type_='foreignkey')
    op.drop_constraint('comments_id_foreign', 'comments', type_='foreignkey')
    op.drop_constraint('points_enterprise_id_foreign', 'points', type_='foreignkey')
    op.drop_constraint('user_enterprises_role_user_id_foreign', 'user_enterprises_role', type_='foreignkey')
    op.drop_constraint('user_enterprises_role_enterprise_idbigint_foreign', 'user_enterprises_role', type_='foreignkey')

    # Удаление таблиц
    op.drop_table('user_enterprises_role')
    op.drop_table('imgs')
    op.drop_table('users')
    op.drop_table('enterprises')
    op.drop_table('points')
    op.drop_table('docs')
    op.drop_table('comments')
