from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from db import get_session_cycles, start_session, get_session_personas

app = Flask(__name__)
CORS(app)

app.config['UPLOAD_FOLDER'] = 'uploads'

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

id = -1

@app.route('/api/cycles', methods=['GET'])
def get_data():
    if id == -1:
        data = {'message': []}
        return jsonify(data)
    cycles = get_session_cycles(id)
    data = {'message': cycles}
    return jsonify(data)

@app.route('/api/personas', methods=['GET'])
def get_persona_data():
    if id == -1:
        data = {'message': []}
        return jsonify(data)
    personas = get_session_personas(id)
    data = {'message': personas}
    return jsonify(data)

@app.route('/api/arena', methods=['POST'])
def handle_post():
    global id
    prompt = request.form.get('text')
    file_path = ''
    if 'file' in request.files:
        file = request.files['file']
        if file.filename != '':
            if file:
                file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
                file.save(file_path)
    id = start_session()
    r = requests.post("http://localhost:8000/manager/post", 
                      json={ "text": prompt, "file": file_path, "id": id }, 
                      headers={"Content-Type": "application/json"})
    if r.status_code != 200:
        return jsonify({"message": "File and text uploaded unsuccessfully :(((("}), 200
    else:
        return jsonify({"message": "File and text uploaded successfully"}), 200


if __name__ == '__main__':
    app.run(debug=True, port=5000)