import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CategoryProducts.css";

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

  return (
    <div className="category-products-page">
      <h2>Products in {readableCategory.charAt(0).toUpperCase() + readableCategory.slice(1)}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : products.length > 0 ? (
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product._id}>
              <img src={product.images[0]} alt={product.name} />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
              <p>{product.details}</p>
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
