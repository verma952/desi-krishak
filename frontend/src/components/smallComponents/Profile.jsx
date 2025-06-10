import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "./Profile.css";
import ProductCard from "../ProductCard";
const Profile = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, login } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch profile from backend when user.email available
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/api/users/profile?email=${user.email}`)
        .then((res) => {
          setProfile(res.data);
        })
        .catch(() => {
          // User might not exist yet, keep defaults
          setProfile({ ...profile, email: user.email });
        });
    }
      fetchUserProducts();
  }, [user]);

   const fetchUserProducts = async () => {
      try {
        const token = localStorage.getItem('token'); // Or use cookies
        const response = await axios.get('http://localhost:5000/api/products/my-products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching user products:', error);
      } finally {
        setLoading(false);
      }
    };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!profile.email || !profile.email.includes("@")) {
      setError("Please enter a valid email");
      setMessage("");
      return;
    }

    setError("");

    axios
      .put("http://localhost:5000/api/users/profile", profile)
      .then((res) => {
        setMessage("Profile updated successfully!");
        login(res.data); // update context with fresh profile from DB
      })
      .catch(() => {
        setError("Failed to update profile");
        setMessage("");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    login(null);
    setMessage("Logged out successfully!");
  };

  if (!user) return <p>Please login to view your profile.</p>;


  return (
    <>
    <div className="profile-card">
      <h2>Your Profile</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <label>
          Full Name
          <input
            type="text"
            name="name"
            value={profile.name || ""}
            onChange={handleChange}
            placeholder="Full Name"
          />
        </label>

        <label>
          Phone Number
          <input
            type="text"
            name="phone"
            value={profile.phone || ""}
            onChange={handleChange}
            placeholder="Phone Number"
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={profile.email || ""}
            onChange={handleChange}
            placeholder="Email"
            disabled // Usually don't allow email to be changed after login
          />
        </label>

        <label>
          Address
          <input
            type="text"
            name="address"
            value={profile.address || ""}
            onChange={handleChange}
            placeholder="Address"
          />
        </label>

        <button type="submit">Update Profile</button>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>

      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
    <div className="profile-page">
      <h1>My Listings</h1>
      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>You haven't listed any products yet.</p>
      ) : <ProductCard showMyProducts={true} />
      }
    </div>
    </>
  );
};

export default Profile;
