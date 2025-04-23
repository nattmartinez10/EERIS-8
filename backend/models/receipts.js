const mongoose = require("mongoose");

const receiptSchema = new mongoose.Schema({
  store: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  website: { type: String },
  date: { type: Date, required: true },
  category: {
    type: String,
    enum: [
      "Groceries",
      "Restaurant",
      "Electronics",
      "Clothing",
      "Transportation",
      "Utilities",
      "Entertainment",
      "Medical",
      "Other"
    ],
    default: "Other"
  },  
  total: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Links to the user
  image: { type: String }, // base64 string
  items: [
    {
      item: String,
      price: Number
    }
  ],
  state: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model("Receipt", receiptSchema);
