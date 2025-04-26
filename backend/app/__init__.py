from flask import Flask
from flask_cors import CORS
from .routes import main

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    
    CORS(app)  # Enable CORS for all domains

    app.register_blueprint(main)

    return app
