from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from functions import generate_task_plan, text_summariser_personalised_learning
import requests

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024  #100MB

@app.route('/task', methods=['POST'])
def generate_guidance():
    data = request.get_json()
    task = data.get("task")
    technique = data.get("technique")

    if not task or not technique:
        return jsonify({"error": "Both 'task' and 'technique' fields are required."}), 400

    try:
        result = generate_task_plan(task, technique)
        return jsonify({"result": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/summarize', methods=['POST'])
def upload_file():
    file = request.files.get('file')
    task = request.form.get('task')
    interest = request.form.get('interest')
    question = request.form.get('question')

    if not file or not task or not interest or not question:
        return jsonify({'error': 'File, task, interest, and question are required'}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    try:
        result = text_summariser_personalised_learning(task, interest, filepath, question)
        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'error': f'Error during file processing: {str(e)}'}), 500

NODE_SERVER_URL = 'http://localhost:3001/api/auth/login'

'''@app.route('/login', methods=['POST'])
def login():
     print("🔔 Received login request")
     data = request.json
     print("📦 Data:", data)
     if not data or not data.get('username') or not data.get('password'):
         return jsonify({'error': 'Missing username or password'}), 400
     try:
         response = requests.post(NODE_SERVER_URL, json=data)
         print("📡 Sent to Node.js, Status:", response.status_code)
         print("📨 Raw Response:", response.text)
         if response.status_code == 200:
             result = response.json()
             return jsonify({'message': 'Login successful', 'username': result.get('username')})
         else:
            return jsonify({'error': response.text}), response.status_code
     except Exception as e:
         print("🔥 Exception:", str(e))
         return jsonify({'error': str(e)}), 500
'''

@app.route('/api/some-action', methods=['POST'])
def receive_username():
    data = request.get_json()
    username = data.get('username')

    print("✅ Got username from Node login:", username)

    # Use it for whatever logic you want
    return username

    app.run(port=5000, debug=True)
    
if __name__ == '__main__':
    app.run(debug=True)