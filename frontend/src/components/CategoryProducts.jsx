// src/components/CategoryProducts.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductList from './ProductList';
import Loader from './smallComponents/Loader';
import { getDistanceInKm } from '../utils/location'; // Import our utility function

const API_URL = import.meta.env.VITE_API_URL;

function CategoryProducts() {
  const { category } = useParams(); // Get category from URL (e.g., "cattle")
  const [products, setProducts] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Get user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (geoError) => {
        console.error("Geolocation error:", geoError);
        setError("Could not get your location to calculate distances. / दूरी की गणना के लिए आपका स्थान प्राप्त नहीं हो सका।");
        setLoading(false);
      }
    );
  }, []);

  // 2. Fetch products when category or location is available
  useEffect(() => {
    if (!category) return;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_URL}/api/products`, {
          params: { category } // Use the backend's efficient category filter
        });

        let productsWithDistance = response.data;

        // 3. If we have the user's location, calculate the distance for each product
        if (userLocation) {
          productsWithDistance = response.data.map(product => {
            if (product.location?.coordinates) {
              const distance = getDistanceInKm(
                userLocation.latitude,
                userLocation.longitude,
                product.location.coordinates[1], // Latitude
                product.location.coordinates[0]  // Longitude
              );
              return { ...product, distance };
            }
            return product;
          }).sort((a, b) => a.distance - b.distance); // Sort by closest
        }
        
        setProducts(productsWithDistance);
      } catch (err) {
        console.error("Error fetching category products:", err);
        setError("Failed to load products for this category. / इस श्रेणी के लिए उत्पाद लोड करने में विफल।");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, userLocation]);

  return (
    <div className="category-products-page">
      <h2 className="category-title">
        {category.charAt(0).toUpperCase() + category.slice(1)} Products / उत्पाद
      </h2>

      {loading && <Loader />}
      {error && <p className="info-message error">{error}</p>}
      {!loading && !error && <ProductList products={products} />}
    </div>
  );
}

export default CategoryProducts;