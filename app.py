import os

from uuid import UUID
from flask import Flask, jsonify
from dotenv import load_dotenv

from repository.database import db

load_dotenv()

app = Flask(__name__)

app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("SQLALCHEMY_DATABASE_URI")

db.init_app(app)

@app.route("/payments/pix", methods=["POST"])
def create_payment_pix():
    return jsonify({
        "message": "The payment has been created"
    })

@app.route("/payments/pix/confirmation", methods=["POST"])
def pix_confirmation():
    return jsonify({
        "message": "The payment has been confirmed"
    })

@app.route("/payments/pix/<uuid:payment_id>", methods=["GET"])
def payment_pix_page(payment_id: UUID):
    return jsonify({
        "message": "Pix payment"
    })

if __name__ == "__main__":
    app.run(debug=True)