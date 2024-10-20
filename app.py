from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

app.config['UPLOAD_FOLDER'] = './uploads'

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {'message': 'Hello from Flask API!'}
    return jsonify(data)

@app.route('/api/arena', methods=['POST'])
def handle_post():
    prompt = [request.form.get('text')]
    if 'file' in request.files:
        file = request.files['file']
        if file.filename != '':
            if file:
                file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
                file.save(file_path)
                prompt.append(file_path)
    r = requests.post("http://localhost:8000/manager/post", 
                      json={ "text": prompt }, 
                      headers={"Content-Type": "application/json"})
    if r.status_code != 200:
        print("ALERT ALERT ALERT ERROR")
    else:
        print("BAD BAD BAD BAD BAD INVALID FORMAT")


if __name__ == '__main__':
    app.run(debug=True, port=5000)