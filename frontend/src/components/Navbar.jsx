import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useLocation } from "react-router-dom";
import './Navbar.css';
import SearchBar from './smallComponents/SearchBar';
import { AuthContext } from './context/AuthContext'; // ✅

function Navbar({ onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  const { user, logout } = useContext(AuthContext); // ✅

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <nav className='navbar'>
        <div className="navbar-logo">
          <Link to="/" className="logo-link">
            <img src="/images/desi-krishak-logo.jpg" alt="Logo" className="logo-image" />
          </Link>
        </div>

        <div className="searchbar">
          <SearchBar onSearch={onSearch} />
        </div>

        <div className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        <div className={`navbar-links ${menuOpen ? 'show' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/sell">Sell</Link>
          {user ? (
            <>
              <Link to="/profile">Profile</Link>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
