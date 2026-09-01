from uuid import UUID
from decimal import Decimal
from datetime import datetime

from pydantic import BaseModel, ConfigDict

class PaymentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    value: Decimal
    is_paid: bool
    bank_payment_id: UUID | None
    pix_payload: str | None
    expiration_date: datetime
    