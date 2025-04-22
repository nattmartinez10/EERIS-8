# Use official Python image
FROM python:3.12

# Set working directory
WORKDIR /app

# Copy your Python script
COPY detect.py .

# Install system dependencies for OpenCV image handling
RUN apt-get update && apt-get install -y \
    libgl1 \
    && rm -rf /var/lib/apt/lists/*

# Install required Python packages
RUN pip install --no-cache-dir opencv-python google-generativeai

# Default command (will be overridden when run with image path)
CMD ["python", "detect.py"]

