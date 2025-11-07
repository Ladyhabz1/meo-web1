"""add user_id to donations

Revision ID: 53d82f5bfd80
Revises: <previous_revision>
Create Date: 2025-09-14 11:XX:XX.XXXXXX
"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '53d82f5bfd80'
down_revision = '17b2c15d922e'  # 👈 your previous migration ID
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('donations', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(
            'fk_donations_user_id',  # 👈 give it a name
            'users',
            ['user_id'],
            ['id']
        )


def downgrade():
    with op.batch_alter_table('donations', schema=None) as batch_op:
        batch_op.drop_constraint(
            'fk_donations_user_id',  # 👈 use the same name
            type_='foreignkey'
        )
        batch_op.drop_column('user_id')
