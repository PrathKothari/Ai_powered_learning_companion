from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from functions import generate_task_plan, text_summariser_personalised_learning

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

if __name__ == '__main__':
    app.run(debug=True)