from uuid import UUID

from pydantic import BaseModel

class PixWebhookRequest(BaseModel):
    bank_payment_id: UUID