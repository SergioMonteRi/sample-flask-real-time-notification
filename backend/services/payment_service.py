from decimal import Decimal
from datetime import datetime, timedelta, timezone

from models.payment import Payment
from integrations.payments.pix_provider import PixProvider

class PaymentService:
    def __init__(self, pix_provider: PixProvider):
        self.pix_provider = pix_provider

    def create_pix_payment(self, value: Decimal) -> Payment:
        expiration_date = (
            datetime.now(timezone.utc) 
            + timedelta(minutes=30)
        )

        pix_payment = self.pix_provider.create_payment(
            value=value
        )
          
        return Payment(
            value=value,
            expiration_date=expiration_date,
            bank_payment_id=pix_payment.bank_payment_id,
            pix_payload=pix_payment.pix_payload
        )