import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ProductDetails.css';
const API_URL = import.meta.env.VITE_API_URL;
function ProductDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  const product = state?.product;

  if (!product) {
    // If state is lost (e.g., page refresh), redirect to homepage or show fallback
    return (
      <div className="product-details">
        <p>Product details not available. Please go back to product list.</p>
        <button onClick={() => navigate('/')}>← Back to Home</button>
      </div>
    );
  }

  const {
    name,
    price,
    productType,
    subType,
    milkProductionLitersPerDay,
    details,
    phone,
    village,
    images,
    location,
    user,
  } = product;

  const openImage = (img) => setSelectedImage(img);
  const closeImage = () => setSelectedImage(null);

  const mapLink = location
    ? `https://maps.google.com/?q=${location.latitude},${location.longitude}`
    : null;

  const whatsappLink = `https://wa.me/${phone.replace(/\D/g, '')}?text=Hi, I'm interested in your product "${name}" listed on DesiKrishak.`;

  return (
    <div className="product-details">
      {/* Image Gallery */}
      <div className="images-gallery">
        {images?.map((img, i) => {
          const imageUrl = img.startsWith('http') ? img : `${API_URL}/${img.replace(/\\/g, '/')}`;
          return (
            <img key={i} src={imageUrl} alt={`Product ${i}`} onClick={() => openImage(imageUrl)} />
          );
        })}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="modal" onClick={closeImage}>
          <img src={selectedImage} alt="Zoomed" />
        </div>
      )}

      <div className="info">
        <h2>{name}</h2>
        <p><strong>Type:</strong> {productType}</p>
        {subType && <p><strong>Sub-type:</strong> {subType}</p>}
        <p><strong>Price:</strong> ₹{price}</p>
        <p><strong>Description:</strong> {details}</p>
        {productType === 'cattle' && (
          <p><strong>Milk Production:</strong> {milkProductionLitersPerDay} L/day</p>
        )}

        {/* Owner Information */}
        <div className="owner">
          <h3>Owner Info</h3>
          <p><strong>Name:</strong> {user?.name || "N/A"}</p>
          <p><strong>Email:</strong> {user?.email || "Not Provided"}</p>
          <p><strong>Phone:</strong> {phone}</p>
          <p><strong>Address:</strong> {user?.address || village}</p>
          {mapLink && (
            <p>
              <a href={mapLink} target="_blank" rel="noopener noreferrer">
                📍 View on Map
              </a>
            </p>
          )}

          <div className="action-buttons">
            <a href={`tel:${phone}`} className="call-button">📞 Call Now</a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="whatsapp-button">💬 WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
