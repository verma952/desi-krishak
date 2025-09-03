// src/components/ProductCard.js

import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const API_URL = import.meta.env.VITE_API_URL;

const ProductCard = ({ product, distance, showDeleteButton = false, onDelete }) => {
  const navigate = useNavigate();

  if (!product) {
    return null;
  }

  const imageUrl =
    product.images && product.images[0]
      ? `${API_URL}/${product.images[0].replace(/\\/g, "/")}`
      : "/images/default.jpg";

  const formattedDate = new Date(product.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
  });

  const handleViewDetails = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="product-card-revamped" onClick={handleViewDetails}>
      <div className="product-image-wrapper">
        <img src={imageUrl} alt={product.name} className="product-image" />
      </div>

      {/* ... the rest of your component remains the same ... */}
      <div className="product-info">
        <div className="product-header">
          <span className="product-type">{product.productType}</span>
          <h3 className="product-name">{product.name}</h3>
        {distance >= 0 && (
          <div className="distance-badge">
            {/* ✅ UPDATED: Display the pre-formatted distance and add the Hindi word */}
            📍 {distance} दूरी
          </div>
        )}
        </div>
        <p className="product-price">₹{product.price.toLocaleString("en-IN")}</p>
        <div className="product-meta">
          <span>🏡 {product.village || "N/A"}</span>
          <span>📅 {formattedDate}</span>
        </div>
      </div>
      
      {showDeleteButton && (
        <button
          className="delete-button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(product._id);
          }}
        >
          Delete / हटाएं
        </button>
      )}
    </div>
  );
};

export default ProductCard;