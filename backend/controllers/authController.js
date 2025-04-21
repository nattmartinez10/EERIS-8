const User = require('../models/user');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password }); // In production, hash passwords!
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    // Simulate a redirect URL for frontend
    const redirectTo = user.role === 'admin' ? '/admin-dashboard' : '/employee-dashboard';

    return res.status(200).json({ message: 'Login successful', role: user.role, redirectTo });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};
