from abc import ABC, abstractmethod
from decimal import Decimal

from schemas.pix_payment_provider_response import PixPaymentProviderResponse

class PixProvider(ABC):

    @abstractmethod
    def create_payment(
        self,
        value: Decimal
    ) -> PixPaymentProviderResponse:
        ...