import React, { useState, useRef } from 'react';
import SubTypeField from './SubTypeField';
import CattleExtras from './CattleExtras';
import ImageUploader from './ImageUploader';
import LocationPicker from '../smallComponents/LocationPicker';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
function ProductForm({ category, onReset }) {
    const [formData, setFormData] = useState({
        farmerName: '',
        productType: category,
        subType: '',
        village: '',
        location: null, // Initially null
        price: '',
        phone: '',  
        details: '',
        imageFiles: [],
        milkProductionLitersPerDay: ''
      });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (files) => {
    setFormData((prev) => ({ ...prev, imageFiles: files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = ['farmerName', 'productType', 'village', 'location', 'price', 'details'];
    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill in the ${field}`);
        return;
      }
    }

    // Validate images count
    if (!formData.imageFiles || formData.imageFiles.length < 2 || formData.imageFiles.length > 5) {
      alert("Please upload between 2 and 5 images.");
      return;
    }

    // For cattle, check milk production input
    if (formData.productType === 'cattle' && !formData.milkProductionLitersPerDay) {
      alert('Please enter milk production (liters per day)');
      return;
    }

    try {
      const formDataToSend = new FormData();

      // Append form fields
      formDataToSend.append('name', formData.farmerName);
      formDataToSend.append('productType', formData.productType);
      formDataToSend.append('subType', formData.subType || '');
      formDataToSend.append('village', formData.village);
      formDataToSend.append('location', JSON.stringify(formData.location));

      formDataToSend.append('price', formData.price);
      formDataToSend.append('details', formData.details);
      formDataToSend.append('phone', formData.phone);

      if (formData.productType === 'cattle') {
        formDataToSend.append('milkProductionLitersPerDay', formData.milkProductionLitersPerDay);
      }

      // Append images
      formData.imageFiles.forEach((file) => {
        formDataToSend.append('images', file);
      });
      // Log formData for 
       for (let pair of formDataToSend.entries()) {
             console.log(`${pair[0]}: ${pair[1]}`);
          }   
      const token = localStorage.getItem('token');
          if (!token) {
           alert('You must be logged in to submit a product.');
           return;
          }
          
      // Log the token for debugging
          console.log('Sending token:', token);

      const response = await fetch(`${API_URL}/api/products/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });


      const data = await response.json();

      if (response.ok) {
        alert('Product submitted successfully!');
        // Reset the form and notify parent to reset category
        setFormData({
          farmerName: '',
          productType: category,
          subType: '',
          village: '',
          location: null,
          price: '',
          phone: '',
          details: '',
          imageFiles: [],
          milkProductionLitersPerDay: '',
        });
        if (fileInputRef.current) fileInputRef.current.value = ''; // reset file input if you pass this ref down to ImageUploader
        onReset(); // tell parent to reset category so form disappears
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      alert('Server error: ' + error.message);
    }
  };


    const handleGetCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData((prev) => ({
          ...prev,
          location: { lat: latitude, lng: longitude },
        }));
        alert("📍 Location set successfully!");
      },
      (error) => {
        alert("❌ Unable to fetch location. Please allow location access.");
        console.error("Geolocation error:", error);
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <input
        name="farmerName"
        placeholder="Farmer Name"
        value={formData.farmerName}
        onChange={handleChange}
        required
      />
      <SubTypeField category={category} subType={formData.subType} onChange={handleChange} />
      {category === 'cattle' && (
        <CattleExtras milkProductionLitersPerDay={formData.milkProductionLitersPerDay} onChange={handleChange} />

      )}
      <input
        name="village"
        placeholder="Village"
        value={formData.village}
        onChange={handleChange}
        required
      />

       {/*select the location on map.  */}
        
        <div style={{ marginBottom: "1rem" }}>
        <LocationPicker
          location={formData.location}
          onLocationChange={(loc) => setFormData((prev) => ({ ...prev, location: loc }))}
        />
          <button
            type="button"
            onClick={handleGetCurrentLocation}
            style={{
              marginTop: '0.5rem',
              padding: '0.5rem 1rem',
              border: 'none',
              backgroundColor: '#007bff',
              color: '#fff',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
 >
    📍 Get Current Location
  </button>
</div>



      <input
        name="price"
        placeholder="Price (in INR)"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <input type='tel' 
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
        />
    
      <textarea
        name="details"
        placeholder="Details (max 500 chars)"
        value={formData.details}
        onChange={handleChange}
        maxLength={500}
        required
      />
      <ImageUploader onUpload={handleImageUpload} ref={fileInputRef} />
      <button type="submit">Submit</button>
      <button type="button" onClick={onReset}>Reset</button>
    </form>
  );
}

export default ProductForm;
