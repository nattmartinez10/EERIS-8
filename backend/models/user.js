const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'employee'],
    default: 'employee'
  },
  name: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
