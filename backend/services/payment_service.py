from uuid import UUID
from decimal import Decimal
from datetime import datetime, timedelta, timezone

from sqlalchemy import select
from flask_socketio import SocketIO

from models.payment import Payment
from repository.database import db
from integrations.payments.pix_provider import PixProvider

class PaymentService:
    def __init__(self, pix_provider: PixProvider, socketio: SocketIO):
        self.pix_provider = pix_provider
        self.socketio = socketio

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

    @staticmethod
    def confirm_payment(self, bank_payment_id: UUID) -> Payment | None:
        stmt = select(Payment).where(
            Payment.bank_payment_id == bank_payment_id
        )

        payment = db.session.scalar(stmt)

        if payment is None:
            return None

        if payment.is_paid:
            return payment

        payment.is_paid = True

        try:
            db.session.commit()
        except Exception:
            db.session.rollback()
            raise

        self.socketio.emit(
            "payment-confirmed",
            {
                "payment_id": str(payment.id)
            },
            to=f"payment:{payment.id}"
        )

        return payment
