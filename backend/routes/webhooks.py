from flask import jsonify, Blueprint, request
from pydantic import ValidationError

from schemas.pix_webhook import PixWebhookRequest
from services.factories import create_payment_service

webhook_bp = Blueprint("webhook", __name__)

@webhook_bp.route("/webhooks/pix", methods=["POST"])
def pix_webhook():
    try:
        webhook_data = PixWebhookRequest.model_validate(
            request.json
        )
    except ValidationError as e:
        return jsonify({
            "error": "Invalid PIX webhook data",
            "details": e.errors()
        }), 400

    payment_service = create_payment_service()

    payment = payment_service.confirm_payment(
        bank_payment_id=webhook_data.bank_payment_id
    )

    if payment is None:
        return jsonify({
            "error": "Payment not found"
        }), 404

    return jsonify({
        "status": "ok"
    }), 200