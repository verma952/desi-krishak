// src/components/Products.js - Refactored

import React from "react";
import { Link } from "react-router-dom";
import "./Products.css"; // We will use the new, refactored CSS

const categories = [
  {
    name: "Cattle",
    type: "cattle",
    image: "/images/buffalo.avif",
    description: "Buy and sell cows, buffaloes, goats, and more.",
  },
  {
    name: "Grains & Crops",
    type: "grains",
    image: "/images/grains.jpg", // Assuming a relevant image
    description: "Find wheat, rice, maize, and other farm produce.",
  },
  {
    name: "Farming Equipment",
    type: "equipment",
    image: "/images/farmingTools.png",
    description: "Tractors, ploughs, and other farming equipment.",
  },
  {
    name: "Dairy Products",
    type: "dairy",
    image: "/images/milkTanks.jpg",
    description: "Fresh milk, curd, paneer, and ghee direct from farms.",
  },
];

function Products() {
  return (
    <div className="products-page-container">
      <h2 className="products-page-heading">Explore All Categories</h2>
      <div className="category-grid-products">
        {categories.map((category) => (
          <div className="category-card-products" key={category.type}>
            <img className="category-image" src={category.image} alt={category.name} />
            <div className="category-info">
              <h3 className="category-name">{category.name}</h3>
              <p className="category-description">{category.description}</p>
              {/* The 'type' is already a clean slug, so we can use it directly */}
              <Link to={`/products/${category.type}`} className="view-products-btn">
                View Products
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;