// src/components/ProductDetails.js

import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './ProductDetails.css';
import Loader from './Loader';
import { getDistance } from "../../utils/distance";
import { getCurrentLocation } from "../../utils/location";

const API_URL = import.meta.env.VITE_API_URL;

function ProductDetails() {
  const { productId } = useParams();
  const { state } = useLocation();
  
  const [product, setProduct] = useState(state?.product || null);
  const [loading, setLoading] = useState(!state?.product);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    const fetchProductAndDistance = async () => {
      try {
        let productData = product;
        if (!productData) {
          const response = await fetch(`${API_URL}/api/products/${productId}`);
          if (!response.ok) throw new Error('Product not found');
          productData = await response.json();
          setProduct(productData);
        }

        const userLocation = await getCurrentLocation();

        if (productData.location?.coordinates) {
          const calculatedDistance = getDistance(
            userLocation.lat,
            userLocation.lon,
            productData.location.coordinates[1],
            productData.location.coordinates[0]
          );
          setDistance(calculatedDistance);
        }
        setError(null);
      } catch (err) {
        console.error("Fetch error:", err);
        // ✅ HINDI ADDED
        setError("प्रोडक्ट की जानकारी लोड नहीं हो सकी। हो सकता है इसे हटा दिया गया हो। (Could not load product details. It may have been removed.)");
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndDistance();
  }, [productId, product]);

  if (loading) return <Loader />;
  if (error) return <p className="error-message">{error}</p>;
  if (!product) return null;

  const { name, price, productType, details, phone, village, images, location, user } = product;
  
  const mapLink = location?.coordinates
    ? `https://www.google.com/maps/search/?api=1&query=${location.coordinates[1]},${location.coordinates[0]}`
    : null;
    
  const whatsappLink = `https://wa.me/91${phone.replace(/\D/g, '')}?text=Hi, I'm interested in your product "${name}" listed on DesiKrishak.`;
  const mainImageUrl = images?.length > 0 ? `${API_URL}/${images[activeImage].replace(/\\/g, '/')}` : "/images/default.jpg";

  return (
    <div className="details-page-container">
      <div className="details-grid">
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

        <div className="info-container">
          <span className="product-type-label">{productType}</span>
          <h1 className="product-title">{name}</h1>
          
          {distance && (
            <p className="product-distance">
              {/* ✅ HINDI ADDED */}
              📍 आपकी लोकेशन से करीब <strong>{distance} km</strong> दूर
            </p>
          )}

          <p className="product-price-details">₹{price.toLocaleString('en-IN')}</p>
          
          <div className="info-section">
            {/* ✅ HINDI ADDED */}
            <h3>Description / विवरण</h3>
            <p className="product-description">{details}</p>
          </div>

          <div className="info-section">
            {/* ✅ HINDI ADDED */}
            <h3>Seller Information / विक्रेता की जानकारी</h3>
            <div className="seller-details">
              {/* ✅ HINDI ADDED */}
              <p><strong>Seller / विक्रेता:</strong> {user?.name || "N/A"}</p>
              <p><strong>Location / जगह:</strong> 🏡 {village}</p>
              {mapLink && (
                <a href={mapLink} target="_blank" rel="noopener noreferrer" className="map-link">
                  {/* ✅ HINDI ADDED */}
                  View on Map / नक्शे पर देखें
                </a>
              )}
            </div>
          </div>
          
          <div className="action-buttons">
            {/* ✅ HINDI ADDED */}
            <a href={`tel:${phone}`} className="call-button">📞 Call Seller / फोन करें</a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="whatsapp-button">💬 Chat on WhatsApp / व्हाट्सएप करें</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;