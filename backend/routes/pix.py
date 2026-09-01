from uuid import UUID
from flask import jsonify, Blueprint, request
from pydantic import ValidationError
from sqlalchemy import select

from repository.database import db
from models.payment import Payment
from schemas.get_payment_response import PaymentResponse
from schemas.confirm_payment import ConfirmPaymentRequest
from schemas.create_payment import CreatePaymentRequest, CreatePaymentResponse

from services.factories import create_payment_service

pix_bp = Blueprint("pix", __name__)

@pix_bp.route("/payments/pix", methods=["POST"])
def create_pix_payment():
    data = request.json

    try:
        create_payment_data = CreatePaymentRequest.model_validate(data)
    except ValidationError as e:
        return jsonify({
            "error": "Invalid pix payment creation data",
            "details": e.errors()
        }), 400

    payment_service = create_payment_service()

    payment_data = payment_service.create_pix_payment(
        value=create_payment_data.value
    )

    payment_response = CreatePaymentResponse.model_validate(payment_data)

    return jsonify({
        "message": "The payment has been created",
        "payment": payment_response.model_dump(mode="json")
    }), 201

@pix_bp.route("/payments/pix/<uuid:payment_id>", methods=["GET"])
def get_pix_payment_by_id(payment_id: UUID):
    payment_service = create_payment_service()

    payment = payment_service.get_payment_by_id(
        payment_id=payment_id
    )

    if payment is None:
        return jsonify({
            "error": "Payment not found"
        }), 404

    payment_response = PaymentResponse.model_validate(payment)

    return jsonify(
        payment_response.model_dump(mode="json")
    )

@pix_bp.route("/payments/pix/confirmation", methods=["POST"])
def pix_confirmation():
    try:
        request_data = ConfirmPaymentRequest.model_validate(
            request.json
        )
    except ValidationError as e:
        return jsonify({
            "error": "Invalid confirm payment data",
            "details": e.errors()
        }), 400

    payment_service = create_payment_service()

    payment = payment_service.confirm_payment(
        bank_payment_id=request_data.bank_payment_id
    )

    if payment is None:
        return jsonify({
            "error": "Payment not found"
        }), 404

    return jsonify({
        "message": "The payment has been confirmed"
    }), 200
