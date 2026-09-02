import pytest 

from datetime import datetime, timezone, timedelta
from unittest.mock import Mock, patch

from uuid import uuid7

from services.factories import PaymentService
from models.payment import Payment

from exceptions.payment import (
    PaymentNotFoundError,
    PaymentExpiredError
)

class TestPaymentService:
    @pytest.mark.unit
    def test_create_pix_payment(self):
        pix_provider = Mock()

        pix_provider.create_payment.return_value = Mock(
            bank_payment_id=uuid7(),
            pix_payload="pix-payload-test"
        )

        socketio = Mock()

        payment_service = PaymentService(
            pix_provider=pix_provider,
            socketio=socketio
        )

        new_payment_value = 250.50

        with patch("services.payment_service.db.session") as db_session:
            payment_data = payment_service.create_pix_payment(
                value=new_payment_value
            )

        assert payment_data.bank_payment_id == pix_provider.create_payment.return_value.bank_payment_id
        assert payment_data.pix_payload == "pix-payload-test"
        assert payment_data.value == new_payment_value

        pix_provider.create_payment.assert_called_once_with(
            value=new_payment_value
        )

        db_session.add.assert_called_once_with(payment_data)
        db_session.commit.assert_called_once()


    @pytest.mark.unit
    def test_create_pix_payment_sets_expiration_date(self):
        pix_provider = Mock()

        pix_provider.create_payment.return_value = Mock(
            bank_payment_id=uuid7(),
            pix_payload="pix-payload-test"
        )

        socketio = Mock()

        payment_service = PaymentService(
            pix_provider=pix_provider,
            socketio=socketio
        )

        new_payment_value = 250.50

        before = datetime.now(timezone.utc)

        with patch("services.payment_service.db.session") as db_session:
            payment_data = payment_service.create_pix_payment(
                value=new_payment_value
            )

        after = datetime.now(timezone.utc)

        assert before + timedelta(minutes=30) <= payment_data.expiration_date <= after + timedelta(minutes=30)


    @pytest.mark.unit
    def test_confirm_payment_not_found(self):
        pix_provider = Mock()
        socketio = Mock()

        payment_service = PaymentService(
            pix_provider=pix_provider,
            socketio=socketio
        )

        with patch("services.payment_service.db.session") as db_session:
            db_session.scalar.return_value = None

            with pytest.raises(PaymentNotFoundError):
                payment_service.confirm_payment(
                    bank_payment_id=uuid7()
                )


    @pytest.mark.unit
    def test_confirm_payment_expired(self):
        pix_provider = Mock()

        pix_provider.create_payment.return_value = Mock(
            bank_payment_id=uuid7(),
            pix_payload="pix-payload-test"
        )

        socketio = Mock()

        payment_service = PaymentService(
            pix_provider=pix_provider,
            socketio=socketio
        )

        payment_data = Payment(
            value=250.50,
            is_paid=False,
            bank_payment_id=uuid7(),
            pix_payload="pix-payload-test",
            expiration_date=datetime.now(timezone.utc) - timedelta(hours=1)
        )

        with patch("services.payment_service.db.session") as db_session:
            db_session.scalar.return_value = payment_data

            with pytest.raises(PaymentExpiredError):
                payment_service.confirm_payment(
                    bank_payment_id=payment_data.bank_payment_id
                )


    @pytest.mark.unit
    def test_confirm_payment_already_paid(self):
        pix_provider = Mock()

        socketio = Mock()

        payment_service = PaymentService(
            pix_provider=pix_provider,
            socketio=socketio
        )

        payment_data = Payment(
            value=250.50,
            is_paid=True,
            bank_payment_id=uuid7(),
            pix_payload="pix-payload-test",
            expiration_date=datetime.now(timezone.utc) + timedelta(minutes=30)
        )

        with patch("services.payment_service.db.session") as db_session:
            db_session.scalar.return_value = payment_data

            paid_payment = payment_service.confirm_payment(
                bank_payment_id=payment_data.bank_payment_id
            )

        assert paid_payment is payment_data
        assert paid_payment.is_paid is True

        db_session.commit.assert_not_called()
        socketio.emit.assert_not_called()


    @pytest.mark.unit
    def test_confirm_payment_success(self):
        pix_provider = Mock()
        
        socketio = Mock()

        payment_service = PaymentService(
            pix_provider=pix_provider,
            socketio=socketio
        )

        payment_data = Payment(
            value=250.50,
            is_paid=False,
            bank_payment_id=uuid7(),
            pix_payload="pix-payload-test",
            expiration_date=datetime.now(timezone.utc) + timedelta(minutes=30)
        )

        with patch("services.payment_service.db.session") as db_session:
            db_session.scalar.return_value = payment_data

            paid_payment = payment_service.confirm_payment(
                bank_payment_id=payment_data.bank_payment_id
            )

        assert paid_payment is payment_data
        assert paid_payment.is_paid is True

        db_session.commit.assert_called_once()

        socketio.emit.assert_called_once_with(
            "payment-confirmed",
            {
                "payment_id": str(paid_payment.id)
            },
            to=f"payment:{paid_payment.id}"
        )



