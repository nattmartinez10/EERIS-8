import React, { useState } from "react";
import "../styling/uploadExpense.css"; 

const ReceiptUpload = () => {
  const [image, setImage] = useState(null);

  //Function to handle image upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file); // Create a preview URL
      setImage(imageURL);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Upload New Expense</h2>

      {/* Image Upload */}
      <div className="section">
        <label className="label">Receipt Image</label>
        <input type="file" accept="image/*" className="file-input" onChange={handleImageChange} />
        {image && <img src={image} alt="Uploaded Receipt" className="preview" />}
      </div>

      {/* Extracted Receipt Information */}
      <div className="grid">
        <div>
          <label className="label">Store Name</label>
          <input type="text" className="input-box" readOnly />
        </div>
        <div>
          <label className="label">Phone Number</label>
          <input type="text" className="input-box" readOnly />
        </div>
        <div>
          <label className="label">Address</label>
          <input type="text" className="input-box" readOnly />
        </div>
        <div>
          <label className="label">Website</label>
          <input type="text" className="input-box" readOnly />
        </div>
        <div>
          <label className="label">Date</label>
          <input type="text" className="input-box" readOnly />
        </div>
        <div>
          <label className="label">Time</label>
          <input type="text" className="input-box" readOnly />
        </div>
        <div className="full-width">
          <label className="label">Itemized Description</label>
          <textarea className="input-box" rows="3" readOnly></textarea>
        </div>
        <div>
          <label className="label">Total Payment</label>
          <input type="text" className="input-box" readOnly />
        </div>
        <div>
          <label className="label">Payment Method</label>
          <input type="text" className="input-box" readOnly />
        </div>
        <div>
          <label className="label">Owner of Receipt</label>
          <input type="text" className="input-box" readOnly />
        </div>
        <div className="full-width">
          <label className="label">Expense Category</label>
          <select className="input-box">
            <option value="">Select Category</option>
            <option value="Travel">Travel</option>
            <option value="Meals">Meals</option>
            <option value="Office Supplies">Office Supplies</option>
            <option value="Utilities">Utilities</option>
            <option value="Auto Repairing">Auto Repairing</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Training">Training</option>
            <option value="Transportation">Transportation</option>
          </select>
        </div>
        <div className="full-width">
          <label className="label">Additional Notes</label>
          <textarea className="input-box" rows="2"></textarea>
        </div>
      </div>

      {/* Submit Button */}
      <button className="submit-button">Submit Expense</button>
    </div>
  );
};

export default ReceiptUpload;
