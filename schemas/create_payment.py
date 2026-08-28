from uuid import UUID
from decimal import Decimal
from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict

class CreatePaymentRequest(BaseModel):
    value: Decimal = Field(
        gt=0,
        max_digits=10,
        decimal_places=2
    )

class CreatePaymentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    value: Decimal
    is_paid: bool
    bank_payment_id: UUID | None
    pix_payload: str | None
    expiration_date: datetime