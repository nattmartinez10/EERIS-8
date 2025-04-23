const express = require("express");
const router = express.Router();
const Receipt = require("../models/receipts");
const User = require("../models/user");

// POST: Create receipt
router.post("/", async (req, res) => {
  const { store, phone, address, website, date, total, paymentMethod, email } =
    req.body;

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
      image: req.body.image,
      items: req.body.items,
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

    const receipts = await Receipt.find({ uploadedBy: user._id }).sort({
      date: -1,
    });
    res.status(200).json(receipts);
  } catch (err) {
    console.error("❌ Error fetching receipts:", err);
    res.status(500).json({ message: "Error fetching receipts" });
  }
});
// GET: Fetch all receipts
router.get("/all", async (req, res) => {
  try {
    const receipts = await Receipt.find().populate("uploadedBy", "name");
    res.json(receipts);
  } catch (err) {
    console.error("❌ Error fetching all receipts:", err);
    res.status(500).json({ message: "Error fetching receipts" });
  }
});

// PUT /api/receipts/:id/state
router.put("/:id/state", async (req, res) => {
  const { state } = req.body;

  if (!["approved", "rejected", "pending"].includes(state)) {
    return res.status(400).json({ message: "Invalid state" });
  }

  try {
    const updated = await Receipt.findByIdAndUpdate(
      req.params.id,
      { state },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error("❌ Error updating receipt state:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
