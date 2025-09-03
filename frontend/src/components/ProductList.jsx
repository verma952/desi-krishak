// src/components/ProductList.js

import React from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = ({ products, onDelete, showMyProducts }) => {

  // ✅ NEW: A helper function to format the distance for display
  const formatDistance = (km) => {
    if (km == null) return null; // Return null if distance doesn't exist

    if (km < 1) {
      // If less than 1 km, show in meters
      const meters = Math.round(km * 1000);
      return `${meters} m`; // e.g., "780 m"
    } else {
      // If 1 km or more, show with one decimal place
      return `${km.toFixed(1)} km`; // e.g., "15.3 km"
    }
  };

  if (!products || products.length === 0) {
    return <p className="info-message">No products found. / कोई उत्पाद नहीं मिला।</p>;
  }

  // ✅ UPDATED: Pass the formatted distance to ProductCard
  // console the distance value of each product
  console.log(products.map(p => p.distance));
  
  return (
    <div className="product-list-grid">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          distance={formatDistance(product.distance)}
          onDelete={onDelete}
          showDeleteButton={showMyProducts}
        />
      ))}
    </div>
  );
};

export default ProductList;