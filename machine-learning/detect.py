import cv2
import sys
import json
import base64
import re
import google.generativeai as genai

# Configure Gemini
genai.configure(api_key="AIzaSyBonDvxO0sTYTG4jz40Xt6JXujYEDZEWcg")

# Load image from path
image_path = sys.argv[1]
image = cv2.imread(image_path)

# Convert image to base64
_, buffer = cv2.imencode(".jpg", image)
image_base64 = base64.b64encode(buffer).decode("utf-8")

# Create prompt
prompt = {
    "role": "user",
    "parts": [
        {
            "text": (
                "You're a receipt parser. Extract a JSON object with these fields: "
                "store_name, phone, address, website, date, time, total, payment_method, "
                "line_items (list with quantity, item, price), and raw_text."
            )
        },
        {
            "inline_data": {
                "mime_type": "image/jpeg",
                "data": image_base64
            }
        }
    ]
}

model = genai.GenerativeModel("gemini-2.0-flash")
response = model.generate_content([prompt])

# Extract and validate JSON
reply = response.text
match = re.search(r"\{.*\}", reply, re.DOTALL)

if not match:
    print(json.dumps({"error": "Could not extract JSON from Gemini output"}))
    sys.exit(1)

try:
    parsed = json.loads(match.group(0))
    print(json.dumps(parsed))
except json.JSONDecodeError:
    print(json.dumps({"error": "Invalid JSON structure from Gemini output"}))


