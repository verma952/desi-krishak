// App.js - Refactored without ProtectedRoute

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

// Context Providers
import {SearchProvider} from "./components/context/SearchContext";
import { AuthProvider } from "./components/context/AuthContext";
import SearchResults from './components/SearchResults';
// New Layout Component
import Layout from "./components/Layout";

// Page Components
import BodySpace from "./components/BodySpace";
import Sell from "./components/Sell/Sell";
import Login from "./components/Login";
import Products from "./components/Products";
import About from "./components/About";
import Profile from "./components/smallComponents/Profile";
import CategoryProducts from "./components/CategoryProducts";
import ProductDetails from "./components/smallComponents/ProductDetails";


// Policy Pages
import Terms from "./components/policies/Terms";
import Privacy from "./components/policies/Privacy";
import Refund from "./components/policies/Refund";

function App() {
  return (
    <Router>
      <AuthProvider>
        <SearchProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Main Pages */}
              <Route index element={<BodySpace />} />
              <Route path="about" element={<About />} />
              <Route path="login" element={<Login />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:category" element={<CategoryProducts />} />
              <Route path="product/:productId" element={<ProductDetails />} />
              
              {/* Unprotected Routes (for now) */}
              <Route path="sell" element={<Sell />} />
              <Route path="profile" element={<Profile />} />

              {/* Policy Pages */}
              <Route path="terms" element={<Terms />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="refund" element={<Refund />} />
              
              {/* Fallback Route */}
              <Route path="*" element={<BodySpace />} />
              </Route>
              <Route path="search" element={<SearchResults />} />
          </Routes>
        </SearchProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;