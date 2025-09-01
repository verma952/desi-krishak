// src/components/Sell/ProductForm.jsx - Redesigned for Simplicity

import React, { useState } from 'react';
import './ProductForm.css'; // We will use the new, simpler CSS

const ProductForm = ({ category, onBack }) => {
  const [formData, setFormData] = useState({ /* ... your form state ... */ });
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5); // Limit to 5 images
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', { category, ...formData });
    alert('Product submitted successfully! / प्रोडक्ट सफलतापूर्वक सबमिट हो गया!');
  };

  return (
    <form className="simple-product-form" onSubmit={handleSubmit}>
      <h2 className="form-title">
        Product Details / प्रोडक्ट की जानकारी
        <span className="category-highlight">{category}</span>
      </h2>

      {/* --- Product Details Section --- */}
      <div className="form-group">
        <label htmlFor="name">🏷️ Product Name / उत्पाद का नाम</label>
        <input type="text" id="name" name="name" placeholder="e.g., Sahiwal Cow / साहीवाल गाय" required />
      </div>

      <div className="form-group">
        <label htmlFor="price">₹ Price / क़ीमत</label>
        <input type="number" id="price" name="price" placeholder="e.g., 50000" required />
      </div>

      <div className="form-group">
        <label htmlFor="details">📝 Description / विवरण</label>
        <textarea id="details" name="details" placeholder="Write about age, breed, quality... / उम्र, नस्ल, गुणवत्ता के बारे में लिखें..." required></textarea>
      </div>
      
      {/* --- Photo Upload Section --- */}
      <div className="form-group">
        <label>📷 Upload Photos / फ़ोटो अपलोड करें</label>
        <div className="file-uploader-simple">
          <input type="file" id="images" name="images" onChange={handleImageChange} multiple accept="image/png, image/jpeg" />
          <p>Tap here to select up to 5 photos</p>
          <p>5 फ़ोटो चुनने के लिए यहां टैप करें</p>
        </div>
        <div className="image-previews">
          {imagePreviews.map((src, index) => (
            <img key={index} src={src} alt={`Preview ${index + 1}`} />
          ))}
        </div>
      </div>
      
      {/* --- Contact & Location Section --- */}
      <div className="form-group">
        <label htmlFor="village">📍 Village/City / गांव/शहर</label>
        <input type="text" id="village" name="village" placeholder="e.g., Rampur, Ghaziabad" required />
      </div>

      <div className="form-group">
        <label htmlFor="phone">📞 Phone Number / फ़ोन नंबर</label>
        <input type="tel" id="phone" name="phone" placeholder="Your 10-digit mobile number" required />
      </div>
      
      {/* --- Action Buttons --- */}
      <div className="form-actions-simple">
        <button type="button" className="back-button" onClick={onBack}>Back / वापस</button>
        <button type="submit" className="submit-button">Submit Ad / विज्ञापन सबमिट करें</button>
      </div>
    </form>
  );
};

export default ProductForm;