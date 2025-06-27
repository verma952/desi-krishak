import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard";
import "./CategoryProducts.css";

const URL = import.meta.env.VITE_API_URL;

function CategoryProducts() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Unable to fetch location:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    axios
      .get(`${URL}/api/products/category?category=${category}`)
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error("Error fetching category products:", err);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [category]);

  const readableCategory = category.replace(/([a-z])([A-Z])/g, "$1 $2");

  return (
    <div className="category-products-page">
      <h2>
        Products in {readableCategory.charAt(0).toUpperCase() + readableCategory.slice(1)}
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ProductCard
          products={products}
          showDistance={true}
          userLocation={userLocation}
        />
      )}
    </div>
  );
}

export default CategoryProducts;
