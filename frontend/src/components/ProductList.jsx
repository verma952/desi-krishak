import React from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

// No major changes, just make sure to pass the distance prop through
const ProductList = ({ products, onDelete, showMyProducts }) => {
  if (!products || products.length === 0) {
    return <p className="info-message">No products found. / कोई उत्पाद नहीं मिला।</p>;
  }

  return (
    <div className="product-list-grid">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          // ✅ Pass the distance if it exists on the product object
          distance={product.distance ? product.distance.toFixed(1) : null}
          onDelete={onDelete}
          showDeleteButton={showMyProducts}
        />
      ))}
    </div>
  );
};

export default ProductList;