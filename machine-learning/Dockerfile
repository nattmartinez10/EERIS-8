# Use official Python image
FROM python:3.12

# Set working directory
WORKDIR /app

# Copy your Python script
COPY detect.py .

# Install dependencies
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    libgl1 \
    && rm -rf /var/lib/apt/lists/*

# Install Python packages including inference-sdk
RUN pip install --no-cache-dir opencv-python pytesseract requests inference-sdk

# Default command
CMD ["python", "detect.py"]
