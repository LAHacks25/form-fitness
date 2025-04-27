from flask import Blueprint, jsonify, request, Response, current_app, stream_with_context
from camera import Camera
import cv2
import time
import json
main = Blueprint('main', __name__)

cam = Camera()

@main.route('/api/ping', methods=['GET'])
def ping():
    return jsonify({'message': 'pong from Flask!'})

def gen_frames():
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

@main.route('/api/stop_camera', methods=['GET'])
def stop_camera():
    cam.cap.release()
    return jsonify({'message': 'Camera stopped'}), 200

@main.route('/api/mongowrite', methods=['POST'])
def mongowrite():
    data = request.get_json()
    db = current_app.mongo_client['workouts']
    collection = db['workouts']
    result = collection.insert_one(data)
    
    return jsonify({'inserted_id': str(result.inserted_id)}), 201

@main.route('/api/pushup_data_stream')
def pushup_data_stream():
    def event_stream():
        while True:
            data = json.dumps(cam.latest_data)  # Proper JSON!
            yield f"data: {data}\n\n"
            time.sleep(1)

    return Response(stream_with_context(event_stream()), mimetype="text/event-stream")