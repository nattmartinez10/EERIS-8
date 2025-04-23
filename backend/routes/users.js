const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user");

// Create a new user
router.post("/", async (req, res) => {
  try {
    const { email, password, name, position, department, role } = req.body;

    // Validate required fields
    if (!email || !password || !name || !position || !department) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      position,
      department,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully." });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
