"""create users table

Revision ID: 59f5e206e7af
Revises: 
Create Date: 2024-09-15 17:53:39.295908

"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "59f5e206e7af"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("id", sa.Uuid(), nullable=False, comment="Идентификатор"),
        sa.Column(
            "surname",
            sa.String(),
            nullable=False,
            comment="Фамилия пользователя",
        ),
        sa.Column("name", sa.String(), nullable=False, comment="Имя пользователя"),
        sa.Column(
            "patronymic",
            sa.String(),
            nullable=True,
            comment="Отчество пользователя",
        ),
        sa.Column("email", sa.String(length=320), nullable=False),
        sa.Column("hashed_password", sa.String(length=1024), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False),
        sa.Column("is_superuser", sa.Boolean(), nullable=False),
        sa.Column("is_verified", sa.Boolean(), nullable=False),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_users")),
        sa.UniqueConstraint("id", name=op.f("uq_users_id")),
    )
    op.create_index(op.f("ix_users_email"), "users", ["email"], unique=True)


def downgrade() -> None:
    op.drop_index(op.f("ix_users_email"), table_name="users")
    op.drop_table("users")
