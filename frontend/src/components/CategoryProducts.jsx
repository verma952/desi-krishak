import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import "./CategoryProducts.css";

const URL = import.meta.env.VITE_API_URL;

// Helper function to calculate distance using Haversine formula
const getDistanceInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of Earth in km
  const toRad = (value) => (value * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

function CategoryProducts() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userLocation = useLocation();

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const res = await axios.get(`${URL}/api/products/category?category=${category}`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching category products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [category]);

  const readableCategory = category.replace(/([a-z])([A-Z])/g, "$1 $2");

  return (
    <div className="category-products-page">
      <h2>
        Products in {readableCategory.charAt(0).toUpperCase() + readableCategory.slice(1)}
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : products.length > 0 ? (
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product._id}>
              <img
                src={
                  product.images && product.images[0]
                    ? `${URL}/${product.images[0].replace(/\\/g, "/")}`
                    : "/images/default.jpg"
                }
                alt={product.name}
              />

              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
              <p>{product.details}</p>
              <p className="product-village">
                Village: {product.village || "Not specified"}
              </p>
              <p className="product-category">Category: {product.category}</p>

              {product.showMyProducts && (
                <p className="product-label">Your Listing</p>
              )}

              {/* Distance calculation */}
              <div className="product-distance">
                <p>Distance from you:</p>
                {(() => {
                  const location = product.location;
const userLoc = userLocation?.state?.userLocation;
if (
  location &&
  typeof location.lat === "number" &&
  typeof location.lng === "number" &&
  userLoc &&
  typeof userLoc.latitude === "number" &&
  typeof userLoc.longitude === "number"
) {
  const distance = getDistanceInKm(
    userLoc.latitude,
    userLoc.longitude,
    location.lat,
    location.lng
  );
  return <span>{distance.toFixed(2)} km</span>;
}

                  return <span>Not available</span>;
                })()}
              </div>

              <p className="product-date">
                {new Date(product.timestamp).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p className="product-contact">
                Contact: {product.phone || "Not provided"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No {readableCategory} products are available right now.</p>
      )}
    </div>
  );
}

export default CategoryProducts;
