const mongoose = require("mongoose");

const receiptSchema = new mongoose.Schema({
  store: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  website: { type: String },
  date: { type: Date, required: true },
  total: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Links to the user
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model("Receipt", receiptSchema);
