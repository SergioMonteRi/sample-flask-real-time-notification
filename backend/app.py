import os

from flask import Flask
from dotenv import load_dotenv

from repository.database import db
from extensions import socketio


load_dotenv()

def create_app():
    app = Flask(__name__)

    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv(
        "SQLALCHEMY_DATABASE_URI"
    )

    db.init_app(app)
    socketio.init_app(app)

    from models.payment import Payment

    from routes.pix import pix_bp
    from routes.webhooks import webhook_bp

    from sockets import payment as payment_socket

    app.register_blueprint(pix_bp)
    app.register_blueprint(webhook_bp)

    return app

app = create_app()

if __name__ == "__main__":
    socketio.run(app, debug=True)