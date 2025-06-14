import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductCard.css";

const API_URL = import.meta.env.VITE_API_URL;

const ProductCard = ({ products: propProducts = null, showMyProducts = false }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products only if no products prop is passed (e.g. for Home)
  useEffect(() => {
    if (!propProducts) {
      axios
        .get(`${API_URL}/api/products`)
        .then((res) => {
          setProducts(res.data);
        })
        .catch((err) => {
          console.error("Error fetching products:", err);
          setProducts([]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setProducts(propProducts);
      setLoading(false);
    }
  }, [propProducts]);

  if (loading) return <p>Loading...</p>;

  if (!products || products.length === 0) {
    return <p>{showMyProducts ? "You haven't listed any products yet." : "No products found."}</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div className="product-card" key={product._id}>
         <img
          src={
            product.images && product.images[0]
              ? `${API_URL}/${product.images[0].replace(/\\/g, '/')}`  // normalize Windows paths too
              : "/images/default.jpg"
          }
          alt={product.name}
        />

          <h3>{product.name}</h3>
          <p>₹{product.price}</p>
          <p>{product.details}</p>
          {showMyProducts && (
            <p className="product-label">Your Listing</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
