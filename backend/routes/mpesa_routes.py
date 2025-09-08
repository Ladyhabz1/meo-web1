# mpesa_routes.py
from flask import Blueprint, request, jsonify
import requests
from utils.mpesa_utils import get_access_token, generate_password
from config.mpesa_config import MPESA_SHORTCODE, MPESA_BASE_URL

mpesa_bp = Blueprint("mpesa", __name__)

@mpesa_bp.route("/mpesa/stkpush", methods=["POST"])
def stk_push():
    """
    Trigger an STK Push when a donor wants to donate.
    """
    data = request.get_json()
    phone = data.get("phone")
    amount = data.get("amount")

    # Access Token
    access_token = get_access_token()
    headers = {"Authorization": f"Bearer {access_token}"}

    # Password + Timestamp
    password, timestamp = generate_password()

    payload = {
        "BusinessShortCode": MPESA_SHORTCODE,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone,       # donor's phone number
        "PartyB": MPESA_SHORTCODE,
        "PhoneNumber": phone,
        "CallBackURL": "https://yourdomain.com/mpesa/callback", # must be public endpoint
        "AccountReference": "Donation",
        "TransactionDesc": "Charity Donation"
    }

    url = f"{MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest"
    response = requests.post(url, json=payload, headers=headers)

    return jsonify(response.json())

@mpesa_bp.route("/mpesa/callback", methods=["POST"])
def mpesa_callback():
    """
    Safaricom will hit this endpoint after payment
    """
    data = request.get_json()
    print("Callback from M-Pesa:", data)  # Log response
    # TODO: Save transaction details into Donation table if success
    return jsonify({"ResultCode": 0, "ResultDesc": "Callback received successfully"})







# 1️⃣ STK Push (The Kickoff)

# Think of this as you (the donor) kicking the ball to Safaricom.

# In real terms, your backend system tells Daraja (M-Pesa API):

# “Hey, please ask this donor to approve Ksh 500 payment on their phone.”

# Immediately, M-Pesa sends a pop-up prompt (the STK push) on the donor’s phone asking them to enter their M-Pesa PIN.

# 👉 Without this step, the donor would have to manually go to their phone and send money — which would be messy. The STK push automates that kickoff.

# 2️⃣ Callback (The Referee’s Whistle)

# After the donor enters their PIN, Safaricom needs to let your system know whether the transaction was successful or not.

# That’s where the callback comes in.

# Safaricom "blows the whistle" and sends the results (success, failure, amount, receipt number) back to the callback URL you gave them.

# 👉 This callback is like the final confirmation that tells you if the ball hit the net (payment successful ✅) or if it went out (payment failed ❌).

# ⚡ In Relation

# STK Push: Starts the process → asks donor to pay.

# Callback: Ends the process → informs your backend of the result.

# So, Sir, the two are like sending an invite (STK push) and then getting the RSVP reply (callback).