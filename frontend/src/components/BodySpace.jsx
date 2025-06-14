import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './BodySpace.css';
import ProductCard from "./ProductCard";
import Container from "./smallComponents/Container";
import FeaturedCarousel from "./smallComponents/FeaturedCarousel";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
function BodySpace() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from backend
    axios.get(`${API_URL}/api/products`) // Adjust endpoint as needed
      .then((response) => {
        setProducts(response.data);
        console.log("Fetched products:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="homepage">
      {/* ✅ Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to DesiKrishak!</h1>
          <p>India's local platform for buying & selling cattle, dairy, and farming tools.</p>
          <Link to="/sell" className="cta-button">Start Selling</Link>
        </div>
      </section>

      {/* ✅ Carousel Section */}
      <FeaturedCarousel />

      {/* ✅ Category Section */}
      <section className="categories">
        <h2>Explore Categories</h2>
        <div className="category-links">
          <Link to="/products?type=cattle" className="category-tile cattle">Cattle</Link>
          <Link to="/products?type=dairy" className="category-tile dairy">Dairy Products</Link>
          <Link to="/products?type=farmingTools" className="category-tile tools">Farming Tools</Link>
          <Link to="/products?type=other" className="category-tile others">Others</Link>
        </div>
      </section>

      {/* ✅ Product Feed */}
      <section className="featured">
        <h2>Featured Products</h2>
        <Container>
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p>No products available at the moment.</p>
          )}
        </Container>
      </section>
    </div>
  );
}

export default BodySpace;
