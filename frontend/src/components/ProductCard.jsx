import React from "react";
import "./ProductCard.css"; // Optional CSS

const ProductCard = ({ products = [], showMyProducts = false }) => {
  if (!products || products.length === 0) {
    return <p>{showMyProducts ? "You haven't listed any products yet." : "No products found."}</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div className="product-card" key={product._id}>
          <img
            src={product.images && product.images[0] ? product.images[0] : "/images/default.jpg"}
            alt={product.name}
          />
          <h3>{product.name}</h3>
          <p>₹{product.price}</p>
          <p>{product.details}</p>
          {showMyProducts && (
            <p className="product-label">Your Listing</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
