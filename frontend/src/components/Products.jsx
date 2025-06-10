import React from "react";
import "./Products.css";

const categories = [
  {
    name: "Cattle",
    image: "src/assets/images/buffalo.avif", // Replace with your actual image paths
    description: "Buy cows, buffaloes, goats and more.",
  },
  {
    name: "Dairy Products",
    image: "src/assets/images/milkTanks.jpg",
    description: "Milk, curd, paneer, ghee and fresh farm produce.",
  },
  {
    name: "Farming Tools",
    image: "src/assets/images/farmingTools.png",
    description: "Tractors, ploughs, sprinklers and other farming equipment.",
  },
  {
    name: "Others",
    image: "src/assets/images/product-jpeg-500x500.webp",
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
              <button className="view-btn">View Products</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
