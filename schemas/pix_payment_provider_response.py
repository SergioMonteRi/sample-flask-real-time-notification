from uuid import UUID

from pydantic import BaseModel


class PixPaymentProviderResponse(BaseModel):
    bank_payment_id: UUID
    pix_payload: str