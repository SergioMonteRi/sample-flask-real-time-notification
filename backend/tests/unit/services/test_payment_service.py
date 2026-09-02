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

@pytest.fixture
def pix_provider():
    pix_provider = Mock()

    pix_provider.create_payment.return_value = Mock(
        bank_payment_id=uuid7(),
        pix_payload="pix-payload-test"
    )

    return pix_provider

@pytest.fixture
def socketio():
    return Mock()

@pytest.fixture
def payment_service(pix_provider, socketio):
    return PaymentService(
        pix_provider=pix_provider,
        socketio=socketio
    )

@pytest.fixture
def payment_data():
    def _payment_data(
        is_paid: bool = False,
        expiration_date: datetime | None = None,
    ):
        if expiration_date is None:
            expiration_date = (
                datetime.now(timezone.utc)
                + timedelta(minutes=30)
            )

        return Payment(
            value=250.50,
            is_paid=is_paid,
            bank_payment_id=uuid7(),
            pix_payload="pix-payload-test",
            expiration_date=expiration_date
        )

    return _payment_data
    


class TestPaymentService:
    @pytest.mark.unit
    def test_create_pix_payment(self, payment_service, pix_provider):
        new_payment_value = 250.50

        with patch("services.payment_service.db.session") as db_session:
            payment = payment_service.create_pix_payment(
                value=new_payment_value
            )

        assert payment.bank_payment_id == pix_provider.create_payment.return_value.bank_payment_id
        assert payment.pix_payload == "pix-payload-test"
        assert payment.value == new_payment_value

        pix_provider.create_payment.assert_called_once_with(
            value=new_payment_value
        )

        db_session.add.assert_called_once_with(payment)
        db_session.commit.assert_called_once()


    @pytest.mark.unit
    def test_create_pix_payment_sets_expiration_date(self, payment_service):
        new_payment_value = 250.50

        before = datetime.now(timezone.utc)

        with patch("services.payment_service.db.session") as db_session:
            payment = payment_service.create_pix_payment(
                value=new_payment_value
            )

        after = datetime.now(timezone.utc)

        assert (
            before + timedelta(minutes=30) 
            <= payment.expiration_date 
            <= after + timedelta(minutes=30)
        )


    @pytest.mark.unit
    def test_confirm_payment_not_found(self, payment_service):
        with patch("services.payment_service.db.session") as db_session:
            db_session.scalar.return_value = None

            with pytest.raises(PaymentNotFoundError):
                payment_service.confirm_payment(
                    bank_payment_id=uuid7()
                )


    @pytest.mark.unit
    def test_confirm_payment_expired(self, payment_service, payment_data):
        payment = payment_data(
            expiration_date=datetime.now(timezone.utc) - timedelta(hours=1)
        )

        with patch("services.payment_service.db.session") as db_session:
            db_session.scalar.return_value = payment

            with pytest.raises(PaymentExpiredError):
                payment_service.confirm_payment(
                    bank_payment_id=payment.bank_payment_id
                )

        assert payment.is_paid is False
        db_session.commit.assert_not_called()


    @pytest.mark.unit
    def test_confirm_payment_already_paid(self, payment_service, socketio, payment_data):
        payment = payment_data(is_paid=True)

        with patch("services.payment_service.db.session") as db_session:
            db_session.scalar.return_value = payment

            paid_payment = payment_service.confirm_payment(
                bank_payment_id=payment.bank_payment_id
            )

        assert paid_payment is payment
        assert paid_payment.is_paid is True

        db_session.commit.assert_not_called()
        socketio.emit.assert_not_called()


    @pytest.mark.unit
    def test_confirm_payment_success(self, payment_service, socketio, payment_data):
        payment = payment_data()

        with patch("services.payment_service.db.session") as db_session:
            db_session.scalar.return_value = payment

            paid_payment = payment_service.confirm_payment(
                bank_payment_id=payment.bank_payment_id
            )

        assert paid_payment is payment
        assert paid_payment.is_paid is True

        db_session.commit.assert_called_once()

        socketio.emit.assert_called_once_with(
            "payment-confirmed",
            {
                "payment_id": str(paid_payment.id)
            },
            to=f"payment:{paid_payment.id}"
        )



