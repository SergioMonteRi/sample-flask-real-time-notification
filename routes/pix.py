from uuid import UUID
from flask import jsonify, Blueprint


pix_bp = Blueprint("pix", __name__)

@pix_bp.route("/payments/pix", methods=["POST"])
def create_payment_pix():
    return jsonify({
        "message": "The payment has been created"
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