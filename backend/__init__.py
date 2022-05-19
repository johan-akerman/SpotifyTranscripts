from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] =  "sqlite:///database.db"
    CORS(app)
    db.init_app(app)
    from .views import main
    app.register_blueprint(main)
    return app