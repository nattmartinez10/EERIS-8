const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const User = require("../models/user");

router.get("/profile", async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, position, department } = user;
    res.json({ name, position, department, email });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


router.post('/login', authController.login);

module.exports = router;
