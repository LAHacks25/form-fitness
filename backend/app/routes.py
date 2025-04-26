from flask import Blueprint, jsonify, request, Response, current_app
from camera import Camera
import cv2

main = Blueprint('main', __name__)

@main.route('/api/ping', methods=['GET'])
def ping():
    return jsonify({'message': 'pong from Flask!'})

def gen_frames():
    cam = Camera()
    for frame in cam:
        success, jpeg = cv2.imencode('.jpg', frame)
        if not success:
            continue
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' +
               jpeg.tobytes() + b'\r\n')

@main.route('/api/video_feed')
def video_feed():
    return Response(
        gen_frames(),
        mimetype='multipart/x-mixed-replace; boundary=frame'
    )

@main.route('/api/mongowrite', methods=['POST'])
def mongowrite():
    data = request.get_json()
    db = current_app.mongo_client['workouts']
    collection = db['workouts']
    result = collection.insert_one(data)
    
    return jsonify({'inserted_id': str(result.inserted_id)}), 201

