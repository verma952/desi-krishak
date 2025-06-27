import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const API_URL = import.meta.env.VITE_API_URL;

const ProductCard = ({
  products: propProducts = null,
  showMyProducts = false,
  onDelete,
  showDistance = false,
  userLocation = null,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getDistanceInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const toRad = (val) => (val * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    if (!propProducts) {
      axios
        .get(`${API_URL}/api/products`)
        .then((res) => setProducts(res.data))
        .catch((err) => {
          console.error("Error fetching products:", err);
          setProducts([]);
        })
        .finally(() => setLoading(false));
    } else {
      setProducts(propProducts);
      setLoading(false);
    }
  }, [propProducts]);

  if (loading) return <p>Loading...</p>;

  if (!products || products.length === 0) {
    return (
      <p>
        {showMyProducts
          ? "You haven't listed any products yet."
          : "No products found."}
      </p>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => {
        const imageUrl =
          product.images && product.images[0]
            ? `${API_URL}/${product.images[0].replace(/\\/g, "/")}`
            : "/images/default.jpg";

        const distance =
          showDistance &&
          product.location &&
          typeof product.location.lat === "number" &&
          typeof product.location.lng === "number" &&
          userLocation
            ? getDistanceInKm(
                userLocation.latitude,
                userLocation.longitude,
                product.location.lat,
                product.location.lng
              ).toFixed(2)
            : null;

        return (
          <div className="product-card" key={product._id}>
            <img src={imageUrl} alt={product.name} />
            <div className="product-card-content">
              <h2 className="product-name">{product.productType}</h2>
              <p className="product-details">{product.details}</p>
              <p className="product-village">{product.village || "N/A"}</p>
              <p className="product-price">₹{product.price}</p>
              {distance && (
                <p className="product-distance">{distance} km away</p>
              )}
              <p className="product-date">
                {new Date(product.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <h3 className="product-seller">Seller: {product.name}</h3>
              <p className="product-contact">{product.phone || "No contact"}</p>

              {showMyProducts && (
                <button
                  className="delete-button"
                  onClick={() => onDelete?.(product._id)}
                >
                  Delete
                </button>
              )}

              {!showMyProducts && (
                <button
                 className="view-details-button"
                 onClick={() =>
                 navigate(`/product/${product._id}`, { state: { product } })
                }> View Details </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCard;
