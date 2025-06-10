import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React, { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Terms from "./components/policies/Terms";
import Privacy from "./components/policies/Privacy";
import Refund from "./components/policies/Refund";
import BodySpace from "./components/BodySpace";
import Sell from "./components/Sell/Sell";
import Login from "./components/Login";
import Products from "./components/Products";
import About from "./components/About";
import Loader from "./components/smallComponents/Loader";
import ChatBot from "./components/ChatBox/ChatBox";
import Profile from "./components/smallComponents/Profile";
import { SearchProvider } from "./components/context/SearchContext";
import { AuthProvider } from "./components/context/AuthContext";

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 1.5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  
  return (
    <Router>
    <SearchProvider>
    <Navbar />
    <Routes>
      <Route path="/" element={loading ? <Loader/>:<BodySpace />} />
  
      <Route path="/sell" element={loading ? <Loader/>:
       <AuthProvider>
      <Sell />
        </AuthProvider>} />

      <Route path = "/login" element={loading ? <Loader/>:<Login />} />
      <Route path="/products" element={loading ? <Loader/>:<Products />} />
      <Route path="/about" element={loading ? <Loader/>:<About/>} />
      <Route path="/buy" element={loading ? <Loader/>:<BodySpace />} />
      <Route path="/profile" element={loading ? <Loader/>:<Profile />}/>
      <Route path="/terms" element={loading ? <Loader/>:<Terms />} />
      <Route path="/privacy" element={loading ? <Loader/>:<Privacy />} />
      <Route path="/refund" element={loading ? <Loader/>:<Refund />} />
      <Route path="*" element={loading ? <Loader/>:<BodySpace />} />
    </Routes>
      <ChatBot></ChatBot>
    <Footer />
    </SearchProvider>
    </Router>
  )
}

export default App
