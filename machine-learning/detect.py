import cv2
import sys
import json
import base64
import re
import google.generativeai as genai

# Configure Gemini
genai.configure(api_key="AIzaSyBonDvxO0sTYTG4jz40Xt6JXujYEDZEWcg")

# Allowed values
ALLOWED_CATEGORIES = {
    "Groceries", "Restaurant", "Electronics", "Clothing",
    "Transportation", "Utilities", "Entertainment", "Medical", "Other"
}

ALLOWED_PAYMENT_METHODS = {
    "Cash", "Credit Card", "Debit Card", "Mobile Payment", "Other"
}

# Helper to normalize Gemini's output to match allowed options
def normalize_choice(value, allowed_set):
    for choice in allowed_set:
        if value.strip().lower() == choice.lower():
            return choice
    return "Other"

# Load image from path
image_path = sys.argv[1]
image = cv2.imread(image_path)

# Convert image to base64
_, buffer = cv2.imencode(".jpg", image)
image_base64 = base64.b64encode(buffer).decode("utf-8")

# Gemini prompt
prompt = {
    "role": "user",
    "parts": [
        {
            "text": (
                "You are a receipt parser. Extract a JSON object with these fields: "
                "store_name, phone, address, website, date, time, total, payment_method, "
                "line_items (list of objects with quantity, item, price), "
                "category (choose one from: Groceries, Restaurant, Electronics, Clothing, "
                "Transportation, Utilities, Entertainment, Medical, Other), and raw_text. "
                "Payment method must be one of: Cash, Credit Card, Debit Card, Mobile Payment, Other."
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

# Send prompt to Gemini
model = genai.GenerativeModel("gemini-2.0-flash")
response = model.generate_content([prompt])

# Extract JSON from Gemini response
reply = response.text
match = re.search(r"\{.*\}", reply, re.DOTALL)

if not match:
    print(json.dumps({"error": "Could not extract JSON from Gemini output"}))
    sys.exit(1)

try:
    parsed = json.loads(match.group(0))

    # Normalize category and payment method
    parsed["category"] = normalize_choice(parsed.get("category", ""), ALLOWED_CATEGORIES)
    parsed["payment_method"] = normalize_choice(parsed.get("payment_method", ""), ALLOWED_PAYMENT_METHODS)

    print(json.dumps(parsed))

except json.JSONDecodeError:
    print(json.dumps({"error": "Invalid JSON structure from Gemini output"}))
