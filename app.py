import os

from flask import Flask
from dotenv import load_dotenv

from repository.database import db


load_dotenv()

def create_app():
    app = Flask(__name__)

    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv(
        "SQLALCHEMY_DATABASE_URI"
    )

    db.init_app(app)

    from routes.pix import pix_bp

    app.register_blueprint(pix_bp)

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)