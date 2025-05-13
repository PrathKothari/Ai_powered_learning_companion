from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/some-action', methods=['POST'])
def receive_username():
    data = request.get_json()
    username = data.get('username')

    print("✅ Got username from Node login:", username)

    # Use it for whatever logic you want
    return username

if __name__ == '__main__':
    app.run(port=5000, debug=True)