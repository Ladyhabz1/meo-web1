# mpesa_utils.py
import requests, base64, datetime
from requests.auth import HTTPBasicAuth
from mpesa_config import MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET, MPESA_SHORTCODE, MPESA_PASSKEY, MPESA_BASE_URL

def get_access_token():
    """
    Get access token from Safaricom Daraja
    """
    url = f"{MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials"
    response = requests.get(url, auth=HTTPBasicAuth(MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET))
    access_token = response.json()['access_token']
    return access_token

def generate_password():
    """
    Generate Mpesa Password (shortcode+passkey+timestamp -> base64 encoded)
    """
    timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    data_to_encode = MPESA_SHORTCODE + MPESA_PASSKEY + timestamp
    encoded = base64.b64encode(data_to_encode.encode())
    return encoded.decode('utf-8'), timestamp
