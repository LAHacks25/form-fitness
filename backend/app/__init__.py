from flask import Flask
from flask_cors import CORS
from .routes import main
from pymongo.mongo_client import MongoClient
import certifi

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    uri = "mongodb+srv://formFitness:FormFitness123!@formfitness.p71zpfs.mongodb.net/?retryWrites=true&w=majority&appName=FormFitness"
    client = MongoClient(uri, tls=True, tlsCAFile=certifi.where())

    try:
        client.admin.command('ping')
        print('Successfully connected to MongoDB')
    except Exception as e:
        print(e)
    
    CORS(app)  # Enable CORS for all domains

    app.register_blueprint(main)

    return app
