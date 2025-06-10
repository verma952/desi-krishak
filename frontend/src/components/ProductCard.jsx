import React, { useEffect, useState } from "react";
import './ProductCard.css';
import axios from "axios"; // ensure axios is installed
function ProductCard({ showMyProducts = false }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = showMyProducts
          ? "http://localhost:5000/api/products/my-products"
          : "http://localhost:5000/api/products";

        const config = showMyProducts
          ? { headers: { Authorization: `Bearer ${token}` } }
          : {};

        const res = await axios.get(url, config);
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, [showMyProducts]);


  return (
    <div className="card-grid">
      {products.map((item) => (
        <div className="product-card" key={item._id}>
          <div className="card-header">
           <img 
                 src={`http://localhost:5000/${item.images?.[0]}`}
                alt={item.name} 
                className="product-image"
                />
          </div>
          <div className="card-body">
            <p className="card-location"><strong>Village:</strong> {item.village}</p>
            <p className="card-price"><strong>Price:</strong> ₹{item.price}</p>
            {item.productType === "cattle" && (
              <p><strong>Milk/Day:</strong> {item.milkProductionLitersPerDay} L</p>
            )}
            <p className="card-details">{item.details}</p>
            <p><strong>Owner:</strong> {item.name}</p>
            <p><strong>Contact:</strong> {item.phone}</p>
          </div>
          <div className="card-footer">
            <button className="view-btn">Check In</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductCard;
