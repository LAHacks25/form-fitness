from flask import Blueprint, request, jsonify, current_app, session
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from bson.objectid import ObjectId
from .user_model import User

auth = Blueprint('auth', __name__)
bcrypt = Bcrypt()

# Register route
@auth.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # Extract user data
    email = data.get('email')
    password = data.get('password')

    # Get the MongoDB connection from app
    users_collection = current_app.mongo_client['FormFitness']['users']
    
    # Check if email already exists
    if users_collection.find_one({'email': email}):
        return jsonify({'error': 'Email already registered'}), 400
    
    # Hash password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    
    # Create user document
    new_user = {
        'email': email,
        'password': hashed_password,
    }
    
    # Insert user
    result = users_collection.insert_one(new_user)
    
    # Create user object and log in
    new_user['_id'] = result.inserted_id
    user = User(new_user)
    login_user(user)
    
    return jsonify({
        'message': 'Registration successful',
        'user_id': str(result.inserted_id),
        'email': email,
    }), 201

@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    users_collection = current_app.mongo_client['FormFitness']['users']

    user_data = users_collection.find_one({'email': email})

    if user_data and bcrypt.check_password_hash(user_data['password'], password):
        user = User(user_data)
        login_user(user)

        return jsonify({
            'message': "Login successful",
            'user_id': str(user_data['_id']),
            'email': user_data['email'],
            'username': user_data['username']
        }), 200
    else:
        return jsonify({
            'error': 'Invalid email or password'
        }), 401
    
@auth.route('/logout', methods=['GET'])
def logout():
    logout_user()
    return jsonify({
        'message': "Logout successful"
    }), 200

@auth.route('/profile', methods=['GET'])
@login_required
def profile():
    return jsonify({
        'id': current_user.id,
        'email': current_user.email,
        'username': current_user.username,
    })

@auth.route('/update_profile', methods=['PUT'])
@login_required
def update_profile():
    data = request.get_json()

    users_collection = current_app.mongo_client['FormFitness']['users']

    updates = {}

    if 'username' in data:
        updates['username'] = data['username']
    
    # Add other fields you want to allow updating
    
    if updates:
        users_collection.update_one(
            {'_id': ObjectId(current_user.id)},
            {'$set': updates}
        )

    return jsonify({'message': 'Profile updated successfully'}), 200