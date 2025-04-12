from flask import Flask, request, jsonify
from flask_cors import CORS
from functions import generate_task_plan

app = Flask(__name__)
CORS(app)

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

if __name__ == '__main__':
    app.run(debug=True)