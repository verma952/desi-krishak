// src/components/ProductDetails.js - Refactored

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './ProductDetails.css';
import Loader from './Loader'; // Assuming you have a Loader component

const API_URL = import.meta.env.VITE_API_URL;

function ProductDetails() {
  const { productId } = useParams(); // 1. Get product ID from the URL
  const { state } = useLocation();
  const navigate = useNavigate();

  const [product, setProduct] = useState(state?.product || null); // Use passed state initially if available
  const [loading, setLoading] = useState(!state?.product); // Start loading if no initial data
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0); // Index of the main image

  useEffect(() => {
    // 2. Fetch data if we don't have it, ensuring the page works on refresh
    if (!product) {
      fetch(`${API_URL}/api/products/${productId}`)
        .then(res => {
          if (!res.ok) throw new Error('Product not found');
          return res.json();
        })
        .then(data => {
          setProduct(data);
          setError(null);
        })
        .catch(err => {
          console.error("Fetch error:", err);
          setError("Could not load product details. It may have been removed.");
        })
        .finally(() => setLoading(false));
    }
  }, [productId, product]);

  if (loading) return <Loader />;
  if (error) return <p className="error-message">{error}</p>;
  if (!product) return null; // Should be handled by loading/error states

  const { name, price, productType, details, phone, village, images, location, user } = product;

  // 3. Corrected Google Maps link
  const mapLink = location ? `https://maps.google.com/?q=${location.latitude},${location.longitude}` : null;
  const whatsappLink = `https://wa.me/91${phone.replace(/\D/g, '')}?text=Hi, I'm interested in your product "${name}" listed on DesiKrishak.`;
  const mainImageUrl = images && images.length > 0 ? `${API_URL}/${images[activeImage].replace(/\\/g, '/')}` : "/images/default.jpg";

  return (
    <div className="product-details-container">
      <div className="product-details-grid">
        {/* Left Column: Image Gallery */}
        <div className="gallery-container">
          <div className="main-image-wrapper">
            <img src={mainImageUrl} alt={name} />
          </div>
          <div className="thumbnail-wrapper">
            {images?.map((img, index) => (
              <img
                key={index}
                src={`${API_URL}/${img.replace(/\\/g, '/')}`}
                alt={`Thumbnail ${index + 1}`}
                className={index === activeImage ? 'active' : ''}
                onClick={() => setActiveImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Product Information */}
        <div className="info-container">
          <p className="product-type-label">{productType}</p>
          <h1 className="product-title">{name}</h1>
          <p className="product-price-details">₹{price.toLocaleString('en-IN')}</p>
          
          <div className="details-section">
            <h3>Description</h3>
            <p>{details}</p>
          </div>

          <div className="details-section owner-info">
            <h3>Seller Information</h3>
            <p><strong>Name:</strong> {user?.name || "N/A"}</p>
            <p><strong>Location:</strong> 🏡 {village}</p>
            {mapLink && (
              <a href={mapLink} target="_blank" rel="noopener noreferrer" className="map-link">
                📍 View on Map
              </a>
            )}
          </div>
          
          <div className="action-buttons">
            <a href={`tel:${phone}`} className="call-button">📞 Call Now</a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="whatsapp-button">💬 WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;