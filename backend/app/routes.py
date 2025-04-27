from flask import Blueprint, jsonify, request, Response, current_app, stream_with_context
from flask_login import login_required, current_user
from bson.objectid import ObjectId
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
    def event_stream():
        while True:
            data = json.dumps(cam.latest_data)  # Proper JSON!
            yield f"data: {data}\n\n"
            time.sleep(1)

    return Response(stream_with_context(event_stream()), mimetype="text/event-stream")