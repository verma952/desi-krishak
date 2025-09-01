// src/components/Navbar.js - Refactored

import React, { useState, useEffect, useRef, useContext } from 'react';
import { NavLink, Link } from "react-router-dom"; // Use NavLink for active styles
import './Navbar.css'; // We will use the new CSS below
import SearchBar from './smallComponents/SearchBar';
import { AuthContext } from './context/AuthContext';

function Navbar({ onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { user } = useContext(AuthContext);

  // This effect closes the mobile menu when the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menu on navigation
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className='navbar-header' ref={menuRef}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img src="/images/desi-krishak-logo.jpg" alt="Desi Krishak Logo" />
        </Link>

        <div className="searchbar-container">
          <SearchBar onSearch={onSearch} />
        </div>

        {/* Hamburger Menu Icon */}
        <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">
          {/* A simple SVG for the hamburger icon is better than text */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <nav className={`navbar-links ${menuOpen ? 'show' : ''}`}>
          <NavLink to="/" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/products" onClick={closeMenu}>Products</NavLink>
          <NavLink to="/about" onClick={closeMenu}>About</NavLink>
          {user ? (
            <NavLink to="/profile" onClick={closeMenu}>Profile</NavLink>
          ) : (
            <NavLink to="/login" onClick={closeMenu}>Login</NavLink>
          )}
          {/* Special styling for the "Sell" button */}
          <NavLink to="/sell" className="sell-button" onClick={closeMenu}>
            Sell
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;