// src/components/ProductCard.js - Refactored

import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css"; // We will use the new CSS below

const API_URL = import.meta.env.VITE_API_URL;

// 1. The component now accepts a SINGLE 'product' object and other simple props.
const ProductCard = ({ product, distance, showDeleteButton = false, onDelete }) => {
  const navigate = useNavigate();

  // 2. All data fetching, state, and looping has been removed.

  if (!product) {
    return null; // Or a placeholder, but null is fine.
  }

  // Construct the image URL
  const imageUrl =
    product.images && product.images[0]
      ? `${API_URL}/${product.images[0].replace(/\\/g, "/")}`
      : "/images/default.jpg";

  // Format the creation date
  const formattedDate = new Date(product.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
  });

  const handleViewDetails = () => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={imageUrl} alt={product.name} className="product-image" />
        {distance && (
          <div className="product-distance-badge">
            📍 {distance} km away
          </div>
        )}
      </div>

      <div className="product-content">
        <p className="product-type">{product.productType}</p>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">₹{product.price.toLocaleString("en-IN")}</p>

        <div className="product-meta">
          <span className="product-location">🏡 {product.village || "N/A"}</span>
          <span className="product-date">📅 {formattedDate}</span>
        </div>

        {showDeleteButton ? (
          <button
            className="card-button delete-button"
            onClick={() => onDelete?.(product._id)}
          >
            Delete
          </button>
        ) : (
          <button className="card-button view-details-button" onClick={handleViewDetails}>
            View Details
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;