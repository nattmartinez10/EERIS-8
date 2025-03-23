import cv2
import sys
import json
import pytesseract
import numpy as np
import re
from inference_sdk import InferenceHTTPClient

image_path = sys.argv[1]

# Roboflow Inference SDK Client
CLIENT = InferenceHTTPClient(
    api_url="https://detect.roboflow.com",
    api_key="4BIAlJEANijIAgpunwvJ"
)

# Run inference using new model
result = CLIENT.infer(image_path, model_id="receipt-detection-9exb2/2")

if "predictions" not in result or not result["predictions"]:
    print(json.dumps({"error": "No receipt detected"}))
    sys.exit(0)

image = cv2.imread(image_path)
pred = result["predictions"][0]
x, y, w, h = pred["x"], pred["y"], pred["width"], pred["height"]
x1, y1 = int(x - w / 2), int(y - h / 2)
x2, y2 = int(x + w / 2), int(y + h / 2)
cropped = image[y1:y2, x1:x2]

gray = cv2.cvtColor(cropped, cv2.COLOR_BGR2GRAY)
text = pytesseract.image_to_string(gray)
lines = [line.strip() for line in text.splitlines() if line.strip()]

# Debug print (stderr to not interfere with JSON output)
print("--- OCR Output ---", file=sys.stderr)
print(text, file=sys.stderr)
print("-------------------", file=sys.stderr)

def extract(pattern, text, group=1):
    match = re.search(pattern, text, re.IGNORECASE)
    return match.group(group) if match else ""

info = {
    "store_name": lines[0] if lines else "",
    "phone": extract(r"(\d{3}-\d{3}-\d{4})", text),
    "address": extract(r"(\d{1,5}\s(?:[A-Za-z]+\s){1,4}(?:Ave|Avenue|St|Street|Rd|Road|Blvd|Boulevard|Dr|Drive))", text),
    "website": extract(r"([a-zA-Z0-9.-]+\.(?:com|net|org|edu|gov|info|biz))", text),
    "date": extract(r"(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})", text),
    "time": extract(r"(\d{1,2}:\d{2}(?:\s?[APMapm]{2})?)", text),
    "total": extract(r"(?i)TOTAL\s*[:\-]?\s*\$?(\d+\.\d{2})", text),
    "payment_method": extract(r"(Visa|Cash|MasterCard|Credit Card|Debit|Amex)", text),
    "line_items": []
}

# Flexible line item pattern with optional parentheses around quantity
line_item_pattern = re.compile(r"^\s*\(?([0-9]+)\)?\s+(.*?)\s+\$([0-9]+\.[0-9]{2})\s*$")

for line in lines:
    match = line_item_pattern.match(line)
    if match:
        quantity = match.group(1)
        item_name = match.group(2)
        price = match.group(3)
        info["line_items"].append({
            "quantity": quantity,
            "item": item_name,
            "price": price
        })

info["raw_text"] = text
print(json.dumps(info))



