import React, { useState } from 'react';
import { X } from 'lucide-react';
import receiptImage from "../assets/receiptImage.jpg"; 


function ViewExpense({ onClose }) {
  const [isImageModalOpen, setImageModalOpen] = useState(false);

  const toggleImageModal = () => {
    setImageModalOpen(!isImageModalOpen);
  };

  const lineItems = [
    '1x Groceries - $50.00',
    '1x Electronics - $80.00',
    '1x Household Items - $20.00',
    '1x Furniture - $200.00',
    '1x Clothing - $75.00',
    '1x Tools - $40.00',
    '1x Toys - $30.00',
    '1x Stationery - $15.00',
  ];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: '#f4f8fb',
          borderRadius: '12px',
          padding: '24px',
          width: '90%',
          maxWidth: '600px',
          position: 'relative',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <button
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: '#666',
          }}
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <img
          src={receiptImage}
          alt="Mock Receipt"
          style={{ width: '100%', height: '150px', borderRadius: '8px', border: '1px solid #ddd', objectFit: 'cover', cursor: 'pointer' }}
          onClick={toggleImageModal}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: '#0077A3' }}>Details:</h2>
              <p><strong>Store Name:</strong> Walmart</p>
              <p><strong>Phone:</strong> (123) 456-7890</p>
              <p><strong>Address:</strong> 123 Main St, City, State, ZIP</p>
              <p><strong>Website:</strong> <a href="https://www.walmart.com" target="_blank" rel="noopener noreferrer">www.walmart.com</a></p>
              <p><strong>Date & Time:</strong> 2025-02-13 14:30</p>
              <p><strong>Payment Method:</strong> Credit Card</p>
              <p><strong>Total Payment:</strong> $150.00</p>
              <p><strong>Status:</strong> Reviewed</p>
              <p><strong>Collected By:</strong> John Doe (JD)</p>
            </div>
          </div>

          <div style={{ flex: 1, backgroundColor: '#E6F4F1', padding: '8px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', height: '260px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0077A3' }}>Line Items:</h2>
            {lineItems.map((item, index) => (
              <div key={index} style={{ backgroundColor: 'white', padding: '8px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
                {item}
              </div>
            ))}
          </div>
        </div>

        {isImageModalOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1100,
            }}
            onClick={toggleImageModal}
          >
            <img
              src={receiptImage}
              alt="Full Receipt"
              style={{ maxWidth: '90%', maxHeight: '90%', borderRadius: '8px' }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewExpense;
