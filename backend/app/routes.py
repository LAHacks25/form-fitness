from flask import Blueprint, jsonify, request, Response, current_app, stream_with_context
from flask_login import login_required, current_user
from bson.objectid import ObjectId
from camera import Camera
import cv2
import time
import json

main = Blueprint('main', __name__)
exercise = 'pushups'  # Default exercise
cam = None  # Global variable, initially None

@main.route('/api/ping', methods=['GET'])
def ping():
    return jsonify({'message': 'pong from Flask!'})

def gen_frames():
    global cam
    if cam is None:
        return  # No camera to stream from
    for frame in cam:
        success, jpeg = cv2.imencode('.jpg', frame)
        if not success:
            continue
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' +
               jpeg.tobytes() + b'\r\n')

@main.route('/api/video_feed')
def video_feed():
    global cam
    if cam is None:
        cam = Camera(0, exercise)  # Instantiate only when first accessed
    return Response(
        gen_frames(),
        mimetype='multipart/x-mixed-replace; boundary=frame'
    )

@main.route('/api/stop_camera', methods=['GET'])
def stop_camera():
    global cam
    if cam is not None:
        cam.cap.release()
        cam = None  # Clear the cam object
        return jsonify({'message': 'Camera stopped'}), 200
    else:
        return jsonify({'message': 'Camera not running'}), 400

@main.route('/api/mongowrite', methods=['POST'])
@login_required
def mongowrite():
    data = request.get_json()

    workout_id = ObjectId()

    workout = {
        '_id': workout_id,
        'title': data.get('title'),
        'date':  data.get('date'),
        'exercises': data.get('exercises', []),
    }
    users = current_app.mongo_client['FormFitness']['users']
    users.update_one(
        {'_id': ObjectId(current_user.id)},
        {'$set': {f'workouts.{workout_id}': workout}}
    )
    
    return jsonify({'inserted_id': str(workout_id)}), 201

@main.route('/api/mongoget', methods=['GET'])
@login_required
def mongoget():
    users = current_app.mongo_client['FormFitness']['users']
    user_doc = users.find_one(
        {'_id': ObjectId(current_user.id)},
        {'workouts': 1}
    )
    workouts_map = user_doc.get('workouts', {})
    workouts = []
    for _id, wk in workouts_map.items():
       workouts.append({
            'id': str(wk['_id']),      # ensure id is a string
            'title': wk['title'],
            'date': wk['date'],        # you stored date as ISO string
            'exercises': wk.get('exercises', [])
        })
    return jsonify(workouts=workouts), 200

@main.route('/api/pushup_data_stream')
def pushup_data_stream():
    global cam
    def event_stream():
        while True:
            if cam is not None:
                data = json.dumps(cam.latest_data)  # Proper JSON!
                yield f"data: {data}\n\n"
            else:
                yield f"data: {json.dumps({'error': 'Camera not active'})}\n\n"
            time.sleep(1)

    return Response(stream_with_context(event_stream()), mimetype="text/event-stream")

@main.route('/api/send_string', methods=['POST'])
def receive_string():
    global exercise
    data = request.get_json()
    if not data or 'message' not in data:
        return jsonify({'error': 'No message provided'}), 400

    received_message = data['message']
    exercise = received_message
    valid_exercises = ['pushups', 'legraise', 'shoulderpress']
    print(received_message)

    if received_message not in valid_exercises:
        return jsonify({'error': 'Invalid exercise'}), 400

    # Do something with the message if needed
    # For example, log it or trigger something
    current_app.logger.info(f"Received message: {received_message}")

    return jsonify({'message': f"Received: {received_message}"}), 200
