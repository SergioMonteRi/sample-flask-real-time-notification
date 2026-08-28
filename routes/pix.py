from datetime import datetime, timedelta

from uuid import UUID
from flask import jsonify, Blueprint, request
from pydantic import ValidationError

from repository.database import db
from integrations.payments.fake_bank.pix.provider import FakePixProvider
from services.payment_service import PaymentService
from schemas.create_payment import CreatePaymentRequest, CreatePaymentResponse

pix_bp = Blueprint("pix", __name__)

@pix_bp.route("/payments/pix", methods=["POST"])
def create_payment_pix():
    data = request.json

    try:
        create_payment_data = CreatePaymentRequest.model_validate(data)
    except ValidationError as e:
        return jsonify({
            "error": "Invalid pix payment creation data",
            "details": e.errors()
        }), 400

    pix_provider = FakePixProvider()
    payment_service = PaymentService(pix_provider=pix_provider)

    payment_data = payment_service.create_pix_payment(
        value=create_payment_data.value
    )

    try:
        db.session.add(payment_data)
        db.session.commit()
    except Exception:
        db.session.rollback()
        raise

    payment_response = CreatePaymentResponse.model_validate(payment_data)

    return jsonify({
        "message": "The payment has been created",
        "payment": payment_response.model_dump(mode="json")
    }), 201

@pix_bp.route("/payments/pix/confirmation", methods=["POST"])
def pix_confirmation():
    return jsonify({
        "message": "The payment has been confirmed"
    }), 200

@pix_bp.route("/payments/pix/<uuid:payment_id>", methods=["GET"])
def payment_pix_page(payment_id: UUID):
    return jsonify({
        "message": "pix payment",
        "payment_id": str(payment_id)
    }), 200