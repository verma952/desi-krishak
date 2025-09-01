// src/components/Profile.jsx - Refactored

import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "./Profile.css";
import ProductList from "../ProductList"; // ✅ Use the ProductList component
import Loader from "./Loader";

const API_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
    const { user, login, logout } = useContext(AuthContext); // Get logout from context
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState({ name: "", phone: "", address: "" });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (user?.email) {
            setProfile({
                name: user.name || "",
                email: user.email,
                phone: user.phone || "",
                address: user.address || "",
            });
            fetchUserProducts();
        }
    }, [user]);

    const fetchUserProducts = async () => {
        // ... (fetchUserProducts logic remains the same)
    };

    const handleDelete = async (productId) => {
        // ... (handleDelete logic remains the same)
    };
    
    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        try {
            const token = localStorage.getItem("token");
            const res = await axios.put(`${API_URL}/api/users/profile`, profile, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage("Profile updated successfully! / प्रोफ़ाइल सफलतापूर्वक अपडेट हो गई!");
            login(res.data.user, token); // Update context with new profile
        } catch (err) {
            setError("Failed to update profile. / प्रोफ़ाइल अपडेट करने में विफल।");
        }
    };

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout? / क्या आप वाकई लॉगआउट करना चाहते हैं?")) {
            logout(); // Use logout from context
        }
    };

    if (!user) return <p>Please login to view your profile. / अपनी प्रोफ़ाइल देखने के लिए कृपया लॉग इन करें।</p>;

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

                        <button type="submit" className="update-btn">Update Profile / प्रोफ़ाइल अपडेट करें</button>
                        
                        {message && <p className="success-message">{message}</p>}
                        {error && <p className="error-message">{error}</p>}
                    </form>
                    <button className="logout-btn" onClick={handleLogout}>Logout / लॉगआउट</button>
                </div>

                {/* Right Column: My Listings */}
                <div className="my-listings-section">
                    <h2>My Listings / मेरी लिस्टिंग</h2>
                    {loading ? (
                        <Loader />
                    ) : (
                        // ✅ Correctly use ProductList to display the products
                        <ProductList products={products} onDelete={handleDelete} showMyProducts={true} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;