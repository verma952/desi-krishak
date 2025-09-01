// src/components/BodySpace.js - Refactored with Bilingual Labels

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './BodySpace.css';
import ProductCard from "./ProductCard";
import Loader from "./smallComponents/Loader";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function BodySpace() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchNearbyProducts(latitude, longitude);
      },
      (geoError) => {
        console.error("Geolocation error:", geoError);
        // Bilingual error message
        setError("Could not get your location. Please enable location services. / आपका स्थान प्राप्त नहीं हो सका। कृपया लोकेशन सेवाएं चालू करें।");
        setLoading(false);
      }
    );
  }, []);

  const fetchNearbyProducts = async (lat, lon) => {
    try {
      const response = await axios.get(`${API_URL}/api/products`, {
        params: { lat, lon, radius: 80 }
      });
      setProducts(response.data);
      setError(null);
    } catch (fetchError) {
      console.error("Error fetching products:", fetchError);
      // Bilingual error message
      setError("Could not load products. Please try again later. / उत्पाद लोड नहीं हो सके। कृपया बाद में पुनः प्रयास करें।");
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (loading) {
      return <Loader />;
    }
    if (error) {
      return <p className="info-message error">{error}</p>;
    }
    if (products.length > 0) {
      return (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      );
    }
    // Bilingual info message
    return <p className="info-message">No products found within 80km of your location. / आपके स्थान के 80 किमी के दायरे में कोई उत्पाद नहीं मिला।</p>;
  };

  return (
    <div className="homepage-container">
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>The Village's Own Market / गाँव का अपना बाज़ार</h1>
          <p>Buy & sell cattle, crops, and tractors directly from farmers near you. / अपने आस-पास के किसानों से सीधे पशु, फसलें और ट्रैक्टर खरीदें और बेचें।</p>
          <Link to="/sell" className="hero-cta">Post Your Ad for FREE / अपना विज्ञापन मुफ़्त में पोस्ट करें</Link>
        </div>
      </section>

      <section className="categories-section">
        <h2>Explore Categories / श्रेणियाँ देखें</h2>
        <div className="category-grid">
          {/* Updated Category Cards for better text layout */}
          <Link to="/products/cattle" className="category-card">
            🐄
            <div className="category-card-text">
              <span>Cattle</span>
              <span className="hindi-label">पशु</span>
            </div>
          </Link>
          <Link to="/products/grains" className="category-card">
            🌾
            <div className="category-card-text">
              <span>Grains & Crops</span>
              <span className="hindi-label">अनाज और फसलें</span>
            </div>
          </Link>
          <Link to="/products/vegetables" className="category-card">
            🥕
            <div className="category-card-text">
              <span>Vegetables</span>
              <span className="hindi-label">सब्जियां</span>
            </div>
          </Link>
          <Link to="/products/dairy" className="category-card">
            🥛
            <div className="category-card-text">
              <span>Dairy</span>
              <span className="hindi-label">डेयरी</span>
            </div>
          </Link>
          <Link to="/products/equipment" className="category-card">
            🚜
            <div className="category-card-text">
              <span>Equipment</span>
              <span className="hindi-label">उपकरण</span>
            </div>
          </Link>
          <Link to="/products/other" className="category-card">
            📦
            <div className="category-card-text">
              <span>Other</span>
              <span className="hindi-label">अन्य</span>
            </div>
          </Link>
        </div>
      </section>

      <section className="nearby-products-section">
        <h2>Products Near You / आपके आस-पास के उत्पाद</h2>
        <div className="products-container">
          {renderContent()}
        </div>
      </section>
    </div>
  );
}

export default BodySpace;