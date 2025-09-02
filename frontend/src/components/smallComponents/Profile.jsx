// src/components/Profile.jsx - Updated & Enhanced

import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "./Profile.css";
import ProductList from "../ProductList";
import Loader from "./Loader"; // Assuming Loader is in smallComponents

const API_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
    const { user, login, logout } = useContext(AuthContext);

    // ✅ ENHANCEMENT: Initialize profile state directly from the user context
    const [profile, setProfile] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        address: user?.address || "",
    });

    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false); // ✅ ENHANCEMENT: For form submission state
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        // Fetch products only when the user is available
        if (user?.email) {
            fetchUserProducts();
        }
    }, [user]); // Effect still depends on user, which is correct

    // ✅ ENHANCEMENT: Completed the fetchUserProducts function
    const fetchUserProducts = async () => {
        setLoadingProducts(true);
        try {
            const token = localStorage.getItem("token");
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

    // ✅ ENHANCEMENT: Completed the handleDelete function
    const handleDelete = async (productId) => {
        if (window.confirm("Are you sure you want to delete this product? / क्या आप वाकई इस उत्पाद को हटाना चाहते हैं?")) {
            try {
                const token = localStorage.getItem("token");
                await axios.delete(`${API_URL}/api/products/${productId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                // Remove the deleted product from the local state to update the UI instantly
                setProducts((prevProducts) => prevProducts.filter((p) => p._id !== productId));
            } catch (err) {
                console.error("Failed to delete product:", err);
                alert("Failed to delete product. Please try again.");
            }
        }
    };
    
    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setIsSubmitting(true); // ✅ ENHANCEMENT: Set submitting state to true

        try {
            const token = localStorage.getItem("token");
            const res = await axios.put(`${API_URL}/api/users/profile`, profile, {
                headers: { Authorization: `Bearer ${token}` },
            });
            
            // The API should return the updated user object
            const updatedUser = res.data.user || res.data;
            login(updatedUser, token); // Update context with the new profile

            setMessage("Profile updated successfully! / प्रोफ़ाइल सफलतापूर्वक अपडेट हो गई!");

            // ✅ ENHANCEMENT: Clear the message after 4 seconds
            setTimeout(() => setMessage(""), 4000);

        } catch (err) {
            setError("Failed to update profile. / प्रोफ़ाइल अपडेट करने में विफल।");
             // ✅ ENHANCEMENT: Clear the error after 4 seconds
            setTimeout(() => setError(""), 4000);
        } finally {
            setIsSubmitting(false); // ✅ ENHANCEMENT: Revert submitting state
        }
    };

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout? / क्या आप वाकई लॉगआउट करना चाहते हैं?")) {
            logout();
        }
    };

    if (!user) {
        return <p>Please login to view your profile. / अपनी प्रोफ़ाइल देखने के लिए कृपया लॉग इन करें।</p>;
    }

    return (
        <div className="profile-page-container">
            <div className="profile-grid">
                {/* Left Column: Profile Form */}
                <div className="profile-form-card">
                    <h2>Your Profile / आपकी प्रोफ़ाइल</h2>
                    <form onSubmit={handleSubmit} className="profile-form">
                        <div className="form-group">
                            <label htmlFor="name">Full Name / पूरा नाम</label>
                            <input type="text" id="name" name="name" value={profile.name} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email / ईमेल</label>
                            <input type="email" id="email" name="email" value={profile.email} disabled />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number / फ़ोन नंबर</label>
                            <input type="tel" id="phone" name="phone" value={profile.phone} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address / पता</label>
                            <textarea id="address" name="address" value={profile.address} onChange={handleChange}></textarea>
                        </div>

                        {/* ✅ ENHANCEMENT: Button now shows submitting state */}
                        <button type="submit" className="update-btn" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving... / सहेज रहा है...' : 'Update Profile / प्रोफ़ाइल अपडेट करें'}
                        </button>
                        
                        {message && <p className="success-message">{message}</p>}
                        {error && <p className="error-message">{error}</p>}
                    </form>
                    <button className="logout-btn" onClick={handleLogout}>Logout / लॉगआउट</button>
                </div>

                {/* Right Column: My Listings */}
                <div className="my-listings-section">
                    <h2>My Listings / मेरी लिस्टिंग</h2>
                    {loadingProducts ? (
                        <Loader />
                    ) : (
                        <ProductList products={products} onDelete={handleDelete} showMyProducts={true} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;