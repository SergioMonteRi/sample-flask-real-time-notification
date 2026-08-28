import qrcode
from uuid import uuid7
from decimal import Decimal

from schemas.pix_payment_provider_response import PixPaymentProviderResponse

from .payload import generate_pix_payload
from integrations.payments.pix_provider import PixProvider

class FakePixProvider(PixProvider):

    def create_payment(self,value: Decimal) -> PixPaymentProviderResponse:
        bank_payment_id = uuid7()

        pix_payload = generate_pix_payload(
            bank_payment_id=bank_payment_id,
            value=value
        )

        return PixPaymentProviderResponse(
            bank_payment_id= bank_payment_id,
            pix_payload= pix_payload
        )
    