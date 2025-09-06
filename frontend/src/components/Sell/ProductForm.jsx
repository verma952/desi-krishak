// src/components/ProductForm/ProductForm.js

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductForm.css';
import LoginModal from '../Login/LoginModal';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Make sure this object is defined or imported correctly in your actual file
const PLACEHOLDER_EXAMPLES = {
  dairy: { name: "e.g., Fresh Milk, Paneer / दूध, पनीर", details: "Write about purity, quantity, fat content..." },
  'farming tools': { name: "e.g., Tractor, Rotavator / ट्रैक्टर, रोटावेटर", details: "Write about model, condition, brand..." },
  cattle: { name: "e.g., Sahiwal Cow / साहीवाल गाय", details: "Write about age, breed, milk yield..." },
  crops: { name: "e.g., Wheat, Sugarcane / गेहूं, गन्ना", details: "Write about variety, quantity..." },
  default: { name: "e.g., Product Name / उत्पाद का नाम", details: "Write a detailed description..." },
};

// Assuming these helper functions are also defined or imported in your file
const getCurrentLocation = () => { /* ... implementation ... */ };
const sanitizeInput = (input) => input.replace(/<[^>]*>/g, '');


const ProductForm = ({ category, onBack }) => {
  // ✨ THIS IS THE FIX ✨
  // This line acts as a guard. If the category prop is invalid (e.g., undefined),
  // the component will stop rendering here and return nothing, preventing the crash.
  if (!category) {
    return null;
  }

  const navigate = useNavigate();
  const formRef = useRef(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [locationStatus, setLocationStatus] = useState('idle');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  // This line is now safe because the guard above ensures `category` is a valid string.
  const placeholders = PLACEHOLDER_EXAMPLES[category.toLowerCase()] || PLACEHOLDER_EXAMPLES.default;

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };
  
  // This is the function that is called when the user clicks the location button
  const handleGetLocation = async () => {
    // 1. Update the UI to show that location is being fetched
    setLocationStatus('fetching');
    try {
      // 2. Call the helper function to get the actual coordinates
      const coords = await getCurrentLocation();
      
      // 3. If successful, save the coordinates and update the UI
      setCoordinates(coords);
      setLocationStatus('success');
    } catch (error) {
      // 4. If it fails, update the UI to an error state and show an alert
      setLocationStatus('error');
      setCoordinates(null);
      alert(error.message);
    }
  };

  // This is a helper function that directly uses the browser's Geolocation API
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      // First, check if the browser supports geolocation at all
      if (!navigator.geolocation) {
        return reject(new Error('Geolocation is not supported by your browser.'));
      }

      // If supported, ask for the user's current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // SUCCESS: The browser found the location.
          // We "resolve" the promise with the latitude and longitude.
          resolve({ 
            lat: position.coords.latitude, 
            lng: position.coords.longitude 
          });
        },
        (err) => {
          // ERROR: The user may have blocked the request, or the service failed.
          // We "reject" the promise with the error message.
          return reject(new Error(`Location Error: ${err.message}`));
        }
      );
    });
  };

  const submitFormData = async () => {
    const token = localStorage.getItem('desiKrishak_token');
    if (!token) {
      setIsLoginModalOpen(true);
      return;
    }

    if (!formRef.current) return;
    const formData = new FormData(formRef.current);

    formData.append('category', category);
    formData.append('latitude', coordinates.lat);
    formData.append('longitude', coordinates.lng);

    formData.set('name', sanitizeInput(formData.get('name')));
    formData.set('details', sanitizeInput(formData.get('details')));
    formData.set('village', sanitizeInput(formData.get('village')));

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/upload`, {
        method: 'POST',
        body: formData,
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        alert('Product submitted successfully!');
        if (onBack) onBack();
      } else {
        if (response.status === 401) {
          localStorage.removeItem('desiKrishak_token');
          setIsLoginModalOpen(true);
        } else {
          const errorData = await response.json();
          alert(`Submission failed: ${errorData.message}`);
        }
      }
    } catch (error) {
      alert(`An error occurred: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coordinates) {
      alert('Please set your location first. / कृपया पहले अपनी लोकेशन सेट करें।');
      return;
    }

    const phoneInput = formRef.current.phone.value;
    if (!/^\d{10}$/.test(phoneInput)) {
      alert('Please enter a valid 10-digit phone number. / कृपया एक वैध 10-अंकीय फ़ोन नंबर दर्ज करें।');
      return;
    }
    
    const token = localStorage.getItem('desiKrishak_token');
    if (!token) {
      setIsLoginModalOpen(true);
    } else {
      submitFormData();
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
    <>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={() => {
          setIsLoginModalOpen(false);
          alert('Login Successful! Submitting your ad now...');
          submitFormData();
        }}
      />

      <form className="simple-product-form" onSubmit={handleSubmit} ref={formRef}>
        <h2 className="form-title">
          Product Details / प्रोडक्ट की जानकारी
          <span className="category-highlight">{category}</span>
        </h2>
        
        <div className="form-group">
          <label htmlFor="name">🏷️ Product Name / उत्पाद का नाम</label>
          <input type="text" id="name" name="name" placeholder={placeholders.name} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="price">₹ Price / क़ीमत</label>
          <input type="number" id="price" name="price" placeholder="e.g., 50000" required />
        </div>
         {category.toLowerCase() === 'cattle' && (
        <div className="form-group">
          <label htmlFor="milkProduction">🥛 Milk Per Day (Liters) / दूध प्रतिदिन (लीटर में)</label>
          <input
            type="number"
            id="milkProduction"
            name="milkProductionLitersPerDay" // This name MUST match your schema field
            placeholder="e.g., 15"
            required
            step="0.1" // Allows decimal values for liters
          />
        </div>
      )}
        <div className="form-group">
          <label htmlFor="details">📝 Description / विवरण</label>
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
    </>
  );
};

export default ProductForm;