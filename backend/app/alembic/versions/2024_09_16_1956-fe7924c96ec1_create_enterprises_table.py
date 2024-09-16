"""create enterprises table

Revision ID: fe7924c96ec1
Revises: 94f3fdd6ac21
Create Date: 2024-09-16 19:56:49.968129

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "fe7924c96ec1"
down_revision: Union[str, None] = "94f3fdd6ac21"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "enterprises",
        sa.Column("id", sa.Uuid(), nullable=False, comment="Идентификатор"),
        sa.Column("name", sa.String(), nullable=False, comment="Название компании"),
        sa.Column("type", sa.String(), nullable=False, comment="Тип компании"),
        sa.Column("user_id", sa.UUID(), nullable=False),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["users.id"],
            name=op.f("fk_enterprises_user_id_users"),
            ondelete="cascade",
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_enterprises")),
        sa.UniqueConstraint("id", name=op.f("uq_enterprises_id")),
    )


def downgrade() -> None:
    op.drop_table("enterprises")
