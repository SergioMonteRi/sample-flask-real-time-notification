from uuid import UUID

from pydantic import BaseModel

class ConfirmPaymentRequest(BaseModel):
    bank_payment_id: UUID
