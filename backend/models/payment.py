from uuid import UUID, uuid7
from datetime import datetime
from decimal import Decimal

from sqlalchemy import Numeric, Text
from sqlalchemy.orm import Mapped, mapped_column

from repository.database import Base
from custom_types.uuid import UUIDType
from custom_types.utc_datetime import UTCDateTime

class Payment(Base):
    __tablename__ = "payment"

    id: Mapped[UUID] = mapped_column(
        UUIDType(),
        primary_key=True,
        default=uuid7
    )

    value: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False
    )

    is_paid: Mapped[bool] = mapped_column(
        default=False,
        nullable=False
    )

    bank_payment_id: Mapped[UUID | None] = mapped_column(
        UUIDType(),
        nullable=True
    )

    pix_payload: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    expiration_date: Mapped[datetime] = mapped_column(
        UTCDateTime(),
        nullable=False
    )

