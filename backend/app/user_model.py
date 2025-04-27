from flask_login import UserMixin
from bson.objectid import ObjectId

class User(UserMixin):
    def __init__(self, user_data):
        self.id = str(user_data['_id'])
        self.email = user_data['email']
        self.workout = user_data['workouts']

    @staticmethod
    def get_by_email(email, users_collection):
        user_data = users_collection.find_one({'email': email})
        return User(user_data) if user_data else None
    
    @staticmethod
    def get_by_id(user_id, users_collection):
        try:
            user_data = users_collection.find_one({'_id': ObjectId(user_id)})
            return User(user_data) if user_data else None
        except:
            return None
    