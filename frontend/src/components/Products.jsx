import React from "react";
import { Link } from "react-router-dom";
import "./Products.css";

const categories = [
  {
    name: "Cattle",
    image: "/images/buffalo.avif",
    description: "Buy cows, buffaloes, goats and more.",
  },
  {
    name: "Dairy Products",
    image: "/images/milkTanks.jpg",
    description: "Milk, curd, paneer, ghee and fresh farm produce.",
  },
  {
    name: "Farming Tools",
    image: "/images/farmingTools.png",
    description: "Tractors, ploughs, sprinklers and other farming equipment.",
  },
  {
    name: "Others",
    image: "/images/product-jpeg-500x500.webp",
    description: "Miscellaneous agricultural products and goods.",
  },
];

function Products() {
  return (
    <div className="products-container">
      <h2>Explore Categories</h2>
      <div className="category-grid">
        {categories.map((category, index) => (
          <div className="category-card" key={index}>
            <img src={category.image} alt={category.name} />
            <div className="category-info">
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <Link
                to={`/products/${category.name.toLowerCase().replace(/\s+/g, "")}`}
                className="view-btn"
              >
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
