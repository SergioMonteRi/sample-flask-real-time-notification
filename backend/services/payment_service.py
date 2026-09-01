from uuid import UUID
from decimal import Decimal
from datetime import datetime, timedelta, timezone

from sqlalchemy import select
from flask_socketio import SocketIO

from models.payment import Payment
from repository.database import db
from integrations.payments.pix_provider import PixProvider

from exceptions.payment import (
    PaymentNotFoundError,
    PaymentExpiredError
)

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

        new_payment = Payment(
            value=value,
            expiration_date=expiration_date,
            bank_payment_id=pix_payment.bank_payment_id,
            pix_payload=pix_payment.pix_payload
        )

        try:
            db.session.add(new_payment)
            db.session.commit()
        except Exception:
            db.session.rollback()
            raise

        return new_payment

    def confirm_payment(self, bank_payment_id: UUID) -> Payment | None:
        stmt = select(Payment).where(
            Payment.bank_payment_id == bank_payment_id
        )

        payment = db.session.scalar(stmt)

        if payment is None:
            raise PaymentNotFoundError()

        if payment.is_paid:
            return payment

        if payment.expiration_date <= datetime.now(timezone.utc):
            raise PaymentExpiredError()

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

    def get_payment_by_id(
    self,
    payment_id: UUID
    ) -> Payment | None:
        stmt = select(Payment).where(
            Payment.id == payment_id
        )

        return db.session.scalar(stmt)