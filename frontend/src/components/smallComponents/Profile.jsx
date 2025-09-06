import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "./Profile.css";
import ProductList from "../ProductList";
import Loader from "./Loader";

const API_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
  const { user, updateUser, logout } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      fetchUserProducts();
    }
  }, [user]);

  const fetchUserProducts = async () => {
    setLoadingProducts(true);
    try {
      const token = localStorage.getItem("desiKrishak_token");
      const response = await axios.get(`${API_URL}/api/products/my-products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching user products:", err);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const token = localStorage.getItem("desiKrishak_token");
        await axios.delete(`${API_URL}/api/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts((prevProducts) =>
          prevProducts.filter((p) => p._id !== productId)
        );
      } catch (err) {
        console.error("Failed to delete product:", err);
        alert("Failed to delete product. Please try again.");
      }
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setError("");
    setMessage("");
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("desiKrishak_token");
      const res = await axios.put(`${API_URL}/api/users/profile`, profile, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedUserData = res.data.user || res.data;
      updateUser(updatedUserData);
      setProfile(updatedUserData);

      setMessage("Profile updated successfully!");
      setIsEditing(false);
      setTimeout(() => setMessage(""), 4000);
    } catch (err) {
      setError("Failed to update profile.");
      setTimeout(() => setError(""), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    // Reset fields back to current user context values
    setProfile({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  if (!user) {
    return <p>Please login to view your profile.</p>;
  }

  return (
    <div className="profile-page-container">
      <div className="profile-grid">
        {/* === PROFILE CARD === */}
        <div className="profile-form-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
            </div>
            <h2 className="profile-name">{profile.name}</h2>
            <p className="profile-email">{profile.email}</p>
          </div>

          <div className="profile-body">
            {isEditing ? (
              /* --- EDITING MODE --- */
              <div className="profile-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name / पूरा नाम</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number / फ़ोन नंबर</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address / पता</label>
                  <textarea
                    id="address"
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            ) : (
              /* --- VIEWING MODE --- */
              <div className="profile-details">
                <div className="detail-item">
                  <span className="detail-icon">📞</span>
                  <div className="detail-text">
                    <span className="detail-label">Phone / फ़ोन</span>
                    <span className="detail-value">
                      {profile.phone || "Not provided"}
                    </span>
                  </div>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">📍</span>
                  <div className="detail-text">
                    <span className="detail-label">Address / पता</span>
                    <span className="detail-value">
                      {profile.address || "Not provided"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* --- ACTION BUTTONS --- */}
            <div className="form-actions">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    className="action-btn save-btn"
                    onClick={handleSave}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    className="action-btn cancel-btn"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="action-btn edit-btn"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile / प्रोफ़ाइल एडिट करें
                </button>
              )}
            </div>

            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}

            <button className="logout-btn" onClick={handleLogout}>
              Logout / लॉगआउट
            </button>
          </div>
        </div>

        {/* === MY LISTINGS CARD === */}
        <div className="my-listings-section">
          <h2>My Listings / मेरी लिस्टिंग</h2>
          <div className="product-list-container">
            {loadingProducts ? (
              <Loader />
            ) : (
              <ProductList
                products={products}
                onDelete={handleDelete}
                showMyProducts={true}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
