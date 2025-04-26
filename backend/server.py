from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import model  # Import your script that generates output

app = Flask(__name__)
CORS(app)  # Allow requests from your frontend

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/get-output', methods=['GET'])
def get_output():
    global output
    return jsonify({'output': output})

@app.route('/upload', methods=['POST'])
def upload_image():
    global output
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400
    
    image = request.files['image']
    if image.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    image_path = os.path.join(UPLOAD_FOLDER, image.filename)
    image.save(image_path)
    
    output = model.run(image_path, chosen_model)

    return jsonify({'message': 'Image uploaded successfully', 'filename': image.filename}), 200

@app.route('/choose-model', methods=['POST'])
def choose_model():
    global chosen_model
    chosen_model = request.get_json().get("model")
    print(chosen_model)
    return jsonify({'model': chosen_model})

app.run(host='0.0.0.0', port=5174, debug=True)  # Change port if needed