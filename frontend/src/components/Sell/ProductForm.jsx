import React, { useState } from 'react';
import './ProductForm.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ✅ NEW: A map to hold dynamic placeholder examples for each category.
const PLACEHOLDER_EXAMPLES = {
  dairy: {
    name: "e.g., Fresh Milk, Paneer / दूध, पनीर",
    details: "Write about purity, quantity, fat content... / शुद्धता, मात्रा, फैट के बारे में लिखें...",
  },
  'farming tools': {
    name: "e.g., Tractor, Rotavator, Fawda / ट्रैक्टर, रोटावेटर, फावड़ा",
    details: "Write about model, condition, brand, usage hours... / मॉडल, स्थिति, ब्रांड, कितने घंटे चला है...",
  },
  cattle: {
    name: "e.g., Sahiwal Cow, Murrah Buffalo / साहीवाल गाय, मुर्रा भैंस",
    details: "Write about age, breed, milk yield, health... / उम्र, नस्ल, दूध की मात्रा, स्वास्थ्य...",
  },
  crops: {
    name: "e.g., Wheat, Sugarcane / गेहूं, गन्ना",
    details: "Write about variety, quantity (in quintals), quality... / किस्म, मात्रा (क्विंटल में), गुणवत्ता...",
  },
  default: {
    name: "e.g., Product Name / उत्पाद का नाम",
    details: "Write a detailed description of your product... / अपने उत्पाद का विस्तृत विवरण लिखें...",
  },
};


// Helper function to get location (remains unchanged)
const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(new Error('Geolocation is not supported by your browser.'));
    }
    navigator.geolocation.getCurrentPosition(
      (position) => resolve({ lat: position.coords.latitude, lng: position.coords.longitude }),
      (err) => reject(new Error(`Location Error: ${err.message}`))
    );
  });
};

const ProductForm = ({ category, onBack }) => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [locationStatus, setLocationStatus] = useState('idle');

  // ✅ NEW: Select the correct placeholder based on the category prop.
  // We use toLowerCase() to make the match case-insensitive.
  const placeholders = PLACEHOLDER_EXAMPLES[category.toLowerCase()] || PLACEHOLDER_EXAMPLES.default;


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleGetLocation = async () => {
    setLocationStatus('fetching');
    try {
      const coords = await getCurrentLocation();
      setCoordinates(coords);
      setLocationStatus('success');
    } catch (error) {
      setLocationStatus('error');
      setCoordinates(null);
      alert(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coordinates) {
      alert('कृपया पहले अपनी लोकेशन सेट करें। (Please set your location first.)');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const data = new FormData(e.target);
      data.append('category', category);
      data.append('latitude', coordinates.lat);
      data.append('longitude', coordinates.lng);

      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to post an ad.');
        setIsSubmitting(false);
        return;
      }
      
      const response = await fetch(`${API_BASE_URL}/api/products/upload`, {
        method: 'POST',
        body: data,
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        alert('Product submitted successfully!');
        if (onBack) onBack();
      } else {
        const errorData = await response.json();
        alert(`Submission failed: ${errorData.message}`);
      }
    } catch (error) {
      alert(`An error occurred: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getLocationButtonText = () => {
    switch (locationStatus) {
      case 'fetching': return 'पता लग रहा है...';
      case 'success': return 'लोकेशन मिल गयी ✓';
      case 'error': return 'फिर कोशिश करें';
      default: return '📍 लोकेशन सेट करें';
    }
  };

  return (
    <form className="simple-product-form" onSubmit={handleSubmit}>
      <h2 className="form-title">
        Product Details / प्रोडक्ट की जानकारी
        <span className="category-highlight">{category}</span>
      </h2>

      <div className="form-group">
        <label htmlFor="name">🏷️ Product Name / उत्पाद का नाम</label>
        {/* ✅ UPDATED: Using the dynamic placeholder */}
        <input type="text" id="name" name="name" placeholder={placeholders.name} required />
      </div>

      <div className="form-group">
        <label htmlFor="price">₹ Price / क़ीमत</label>
        <input type="number" id="price" name="price" placeholder="e.g., 50000" required />
      </div>

      <div className="form-group">
        <label htmlFor="details">📝 Description / विवरण</label>
        {/* ✅ UPDATED: Using the dynamic placeholder */}
        <textarea id="details" name="details" placeholder={placeholders.details} required></textarea>
      </div>
      
      <div className="form-group">
        <label>📷 Upload Photos / फ़ोटो अपलोड करें</label>
        <div className="file-uploader-simple">
            <input type="file" id="images" name="images" onChange={handleImageChange} multiple accept="image/png, image/jpeg" required/>
            <p>Tap here to select up to 5 photos</p>
            <p>5 फ़ोटो चुनने के लिए यहां टैप करें</p>
        </div>
        <div className="image-previews">
            {imagePreviews.map((src, index) => (
                <img key={index} src={src} alt={`Preview ${index + 1}`} />
            ))}
        </div>
      </div>

      <div className="form-group">
        <label>🗺️ Product Location / उत्पाद की लोकेशन</label>
        <p className="location-info">
          अपने विज्ञापन के लिए अपनी वर्तमान GPS लोकेशन सेट करें।
          <br/>
          (Set your current GPS location for the ad.)
        </p>
        <button 
          type="button" 
          className={`location-button ${locationStatus}`}
          onClick={handleGetLocation}
          disabled={locationStatus === 'fetching' || locationStatus === 'success'}
        >
          {getLocationButtonText()}
        </button>
      </div>

      <div className="form-group">
        <label htmlFor="village">📍 Village/City / गांव/शहर</label>
        <input type="text" id="village" name="village" placeholder="e.g., Rampur, Ghaziabad" required />
      </div>
      <div className="form-group">
        <label htmlFor="phone">📞 Phone Number / फ़ोन नंबर</label>
        <input type="tel" id="phone" name="phone" placeholder="Your 10-digit mobile number" required />
      </div>

      <div className="form-actions-simple">
        <button type="button" className="back-button" onClick={onBack}>Back / वापस</button>
        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Ad / विज्ञापन सबमिट करें'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;