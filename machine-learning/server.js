const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5001;

app.use(cors());
const upload = multer({ dest: "uploads/" });

app.post("/api/detect-receipt", upload.single("file"), (req, res) => {
  const localImagePath = req.file.path;
  const imageName = path.basename(localImagePath);
  const containerImagePath = `/data/${imageName}`;

  // ✅ Fix: run python script with the image path
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

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
