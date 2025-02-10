from ultralytics import YOLO

model = YOLO("yolov11n.pt")
results = model.train(data="path/to/dataset.yaml", epochs=50, imgsz=640)