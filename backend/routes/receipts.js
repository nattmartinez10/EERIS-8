const express = require("express");
const router = express.Router();
const Receipt = require("../models/receipts");
const User = require("../models/user");

// POST: Create receipt
router.post("/", async (req, res) => {
  const { store, phone, address, website, date, total, paymentMethod, email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const newReceipt = new Receipt({
      store,
      phone,
      address,
      website,
      date,
      total,
      paymentMethod,
      uploadedBy: user._id,
      image: req.body.image
    });
    console.log("🖼️ Image length received:", req.body.image?.length);
    const saved = await newReceipt.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Error saving receipt:", err);
    res.status(500).json({ message: "Error saving receipt" });
  }
});
// GET: Fetch all receipts for a user by email
router.get("/", async (req, res) => {
    const { email } = req.query;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const receipts = await Receipt.find({ uploadedBy: user._id }).sort({ date: -1 });
      res.status(200).json(receipts);
    } catch (err) {
      console.error("❌ Error fetching receipts:", err);
      res.status(500).json({ message: "Error fetching receipts" });
    }
  });
  
  
module.exports = router;

