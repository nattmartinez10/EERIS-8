const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config(); // Load .env

// ✅ Import routes
const authRoutes = require("./routes/auth");
const receiptRoutes = require("./routes/receipts");


const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json()); // for parsing JSON bodies
const upload = multer({ dest: "uploads/" });

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ API's
app.use("/api/auth", authRoutes);
app.use("/api/receipts", receiptRoutes);

// ✅ ML Receipt Detection Endpoint
app.post("/api/detect-receipt", upload.single("file"), (req, res) => {
  const localImagePath = req.file.path;
  const imageName = path.basename(localImagePath);
  const containerImagePath = `/data/${imageName}`;

  const dockerCmd = `docker run --rm -v ${path.resolve("uploads")}:/data receipt-detector python detect.py ${containerImagePath}`;

  exec(dockerCmd, (err, stdout, stderr) => {
    fs.unlinkSync(localImagePath); // delete temp file

    if (err) {
      console.error("❌ Docker run error:", err);
      console.error(stderr);
      return res.status(500).json({ error: "Docker-based receipt detection failed." });
    }

    try {
      const parsed = JSON.parse(stdout);
      res.json(parsed);
    } catch (parseErr) {
      console.error("❌ JSON parse error:", parseErr);
      console.error("Raw output:", stdout);
      res.status(500).json({ error: "Invalid JSON from detection script." });
    }
  });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
