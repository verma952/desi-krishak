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
  const [userLocation, setUserLocation] = useState(null);

  // Haversine formula to calculate distance
  const getDistanceInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const toRad = (val) => (val * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Get user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      },
      (error) => {
        console.error("Geolocation error:", error);
        setUserLocation(null);
      }
    );
  }, []);

  // Fetch products
  useEffect(() => {
    axios
      .get(`${API_URL}/api/products`)
      .then((response) => {
        const allProducts = response.data;

        if (userLocation) {
          const nearby = allProducts.filter((product) => {
            if (
              product.location &&
              typeof product.location.lat === "number" &&
              typeof product.location.lng === "number"
            ) {
              const distance = getDistanceInKm(
                userLocation.latitude,
                userLocation.longitude,
                product.location.lat,
                product.location.lng
              );
              return distance <= 80; // ✅ Only show if within 80 km
            }
            return false;
          });

          setProducts(nearby);
        } else {
          setProducts([]); // or set allProducts if fallback needed
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [userLocation]);

  return (
    <div className="homepage">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to DesiKrishak!</h1>
          <p>India's local platform for buying & selling cattle, dairy, and farming tools.</p>
          <Link to="/sell" className="cta-button">Upload Your Product</Link>
        </div>
      </section>

      <FeaturedCarousel />

      <section className="categories">
        <h2>Explore Categories</h2>
        <div className="category-links">
          <Link to="/products?type=cattle" className="category-tile cattle">Cattle</Link>
          <Link to="/products?type=dairy" className="category-tile dairy">Dairy Products</Link>
          <Link to="/products?type=farmingTools" className="category-tile tools">Farming Tools</Link>
          <Link to="/products?type=other" className="category-tile others">Others</Link>
        </div>
      </section>

      <section className="featured">
        <h2>Your Nearby Products</h2>
        <Container>
          {products.length > 0 ? (
            <ProductCard products={products} userLocation={userLocation} />
          ) : (
            <p>No nearby products available.</p>
          )}
        </Container>
      </section>
    </div>
  );
}

export default BodySpace;
