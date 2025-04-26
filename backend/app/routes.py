from flask import Blueprint, jsonify, request

main = Blueprint('main', __name__)

@main.route('/api/ping', methods=['GET'])
def ping():
    return jsonify({'message': 'pong from Flask!'})