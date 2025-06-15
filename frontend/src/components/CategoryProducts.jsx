import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CategoryProducts.css";
import { useLocation } from "react-router-dom";

const URL = import.meta.env.VITE_API_URL;
function CategoryProducts() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
  const [distance, setDistance] = useState(null);
 const userLocation = useLocation();
  

  return (
    <div className="category-products-page">
      <h2>Products in {readableCategory.charAt(0).toUpperCase() + readableCategory.slice(1)}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : products.length > 0 ? (
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product._id}>
             <img
              src={
                product.images && product.images[0]
                  ? `${URL}/${product.images[0].replace(/\\/g, '/')}`  // normalize Windows paths too
                  : "/images/default.jpg"
              }
              alt={product.name}
/>

              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
              <p>{product.details}</p>
              <p className="product-village">
                Village: {product.village ? product.village : "Not specified"}
              </p>
              <p className="product-category">Category: {product.category}</p>
              {product.showMyProducts && (
                <p className="product-label">Your Listing</p>
              )}
              {/* get the current distance from the user to the product in real time */}
              {/* village */}
            <div className="product-distance">
              <p>Distance from you:</p>
              {(() => {
                const location = product.location;
                if (location && userLocation.state && userLocation.state.userLocation) {
                  const userLat = userLocation.state.userLocation.latitude;
                  const userLng = userLocation.state.userLocation.longitude;
                  const productLat = location.latitude;
                  const productLng = location.longitude;

                  // Calculate distance using Haversine formula
                  const R = 6371; // Radius of the Earth in km
                  const dLat = (productLat - userLat) * (Math.PI / 180);
                  const dLng = (productLng - userLng) * (Math.PI / 180);
                  const a =
                    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(userLat * (Math.PI / 180)) *
                      Math.cos(productLat * (Math.PI / 180)) *
                      Math.sin(dLng / 2) *
                      Math.sin(dLng / 2);
                  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                  const distance = R * c; // Distance in km

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
              {/* phone number for direct contact */}
              <p className="product-contact">
                Contact: {product.phone ? product.phone : "Not provided"}
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
