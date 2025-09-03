import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "./Profile.css";
import ProductList from "../ProductList";
import Loader from "./Loader";

const API_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
    const { user, login, logout } = useContext(AuthContext);

    // ✅ EDIT MODE STATE: Controls whether the form is editable or not
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
            // Sync profile state if user context changes
            setProfile({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                address: user.address || "",
            });
            fetchUserProducts();
        }
    }, [user]);

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

    const handleDelete = async (productId) => {
        if (window.confirm("Are you sure you want to delete this product? / क्या आप वाकई इस उत्पाद को हटाना चाहते हैं?")) {
            try {
                const token = localStorage.getItem("token");
                await axios.delete(`${API_URL}/api/products/${productId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
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
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem("token");
            const res = await axios.put(`${API_URL}/api/users/profile`, profile, {
                headers: { Authorization: `Bearer ${token}` },
            });
            
            const updatedUser = res.data.user || res.data;
            login(updatedUser, token);

            setMessage("Profile updated successfully!");
            setIsEditing(false); // ✅ EDIT MODE: Turn off edit mode on success
            setTimeout(() => setMessage(""), 4000);
        } catch (err) {
            setError("Failed to update profile.");
            setTimeout(() => setError(""), 4000);
        } finally {
            setIsSubmitting(false);
        }
    };

    // ✅ EDIT MODE: New handler to cancel editing
    const handleCancel = () => {
        // Reset form to original user data
        setProfile({
            name: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
            address: user.address || "",
        });
        setIsEditing(false);
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
                <div className="profile-form-card">
                    <h2>Your Profile / आपकी प्रोफ़ाइल</h2>
                    <form onSubmit={handleSubmit} className="profile-form">
                        <div className="form-group">
                            <label htmlFor="name">Full Name / पूरा नाम</label>
                            <input type="text" id="name" name="name" value={profile.name} onChange={handleChange} disabled={!isEditing} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email / ईमेल</label>
                            <input type="email" id="email" name="email" value={profile.email} disabled />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number / फ़ोन नंबर</label>
                            <input type="tel" id="phone" name="phone" value={profile.phone} onChange={handleChange} disabled={!isEditing} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address / पता</label>
                            <textarea id="address" name="address" value={profile.address} onChange={handleChange} disabled={!isEditing}></textarea>
                        </div>
                        
                        {/* ✅ EDIT MODE: Conditionally render buttons */}
                        <div className="form-actions">
                            {isEditing ? (
                                <>
                                    <button type="submit" className="action-btn save-btn" disabled={isSubmitting}>
                                        {isSubmitting ? 'Saving...' : 'Save Changes / बदलाव सेव करें'}
                                    </button>
                                    <button type="button" className="action-btn cancel-btn" onClick={handleCancel}>
                                        Cancel / कैंसिल
                                    </button>
                                </>
                            ) : (
                                <button type="button" className="action-btn edit-btn" onClick={() => setIsEditing(true)}>
                                    Edit Profile / प्रोफ़ाइल एडिट करें
                                </button>
                            )}
                        </div>
                        
                        {message && <p className="success-message">{message}</p>}
                        {error && <p className="error-message">{error}</p>}
                    </form>
                    <button className="logout-btn" onClick={handleLogout}>Logout / लॉगआउट</button>
                </div>

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