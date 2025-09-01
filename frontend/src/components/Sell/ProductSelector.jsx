// src/components/Sell/ProductSelector.js - NEW FILE
import React from 'react';
import './ProductSelector.css';

const categories = [
  { name: 'Cattle', type: 'cattle', icon: '🐄' },
  { name: 'Grains & Crops', type: 'grains', icon: '🌾' },
  { name: 'Farming Equipment', type: 'equipment', icon: '🚜' },
  { name: 'Dairy Products', type: 'dairy', icon: '🥛' },
];

const ProductSelector = ({ onSelect }) => {
  return (
    <div className="product-selector">
      <h2 className="selector-title">What are you selling?</h2>
      <div className="selector-grid">
        {categories.map((cat) => (
          <button key={cat.type} className="category-select-card" onClick={() => onSelect(cat.type)}>
            <span className="category-icon">{cat.icon}</span>
            <span className="category-name">{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductSelector;