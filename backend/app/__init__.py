from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
from pymongo.mongo_client import MongoClient
import certifi
from .routes import main
from .auth_routes import auth
from .user_model import User

def create_app():

    # load_dotenv()

    app = Flask(__name__)
    app.config.from_object('config.Config')

    mongo_uri = app.config.get('MONGO_URI')
    client = MongoClient(mongo_uri, tls=True, tlsCAFile=certifi.where())

    try:
        client.admin.command('ping')
        print('Successfully connected to MongoDB')
    except Exception as e:
        print(e)

    app.mongo_client = client

    db = client['FormFitness']
    users_collection = db['users']
    users_collection.create_index('email', unique=True)

    bcrypt = Bcrypt(app)
    app.bcrypt = bcrypt

    login_manager = LoginManager(app)
    login_manager.login_view = 'auth.login'

    @login_manager.user_loader
    def load_user(user_id):
        users_collection = app.mongo_client['FormFitness']['users']
        return User.get_by_id(user_id, users_collection)

    
    CORS(app, supports_credentials=True)  # Enable CORS for all domains

    # app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'  # Use 'None' with secure=True in production
    # app.config['SESSION_COOKIE_HTTPONLY'] = True
    # app.config['SESSION_COOKIE_SECURE'] = False  

    app.register_blueprint(main)
    app.register_blueprint(auth, url_prefix='/api/auth')

    return app
