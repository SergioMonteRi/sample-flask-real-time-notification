from extensions import socketio
from services.payment_service import PaymentService
from integrations.payments.fake_bank.pix.provider import FakePixProvider


def create_payment_service() -> PaymentService:
    return PaymentService(
        pix_provider=FakePixProvider(),
        socketio=socketio
    )