from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

otp_store = {}

@app.route('/send-otp', methods=['POST'])
def send_otp():
    data = request.get_json()
    phone = data.get("phone")
    otp = str(random.randint(1000, 9999))
    otp_store[phone] = otp
    print(f"OTP for {phone} is {otp}")
    return jsonify({"message": "OTP sent successfully."})

@app.route('/verify-otp', methods=['POST'])
def verify_otp():
    data = request.get_json()
    otp = data.get("otp")
    if otp in otp_store.values():
        return jsonify({"status": "success"})
    return jsonify({"status": "fail"})

if __name__ == '__main__':
    app.run(debug=True)
