const User = require('../models/user');
const bcrypt = require('bcryptjs'); // make sure it's installed

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const redirectTo = user.role === 'admin' ? '/admin/dashboard' : '/employee-dashboard';

    return res.status(200).json({ message: 'Login successful', role: user.role, redirectTo });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: 'Server error' });
  }
};
