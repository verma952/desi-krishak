// src/components/Footer.jsx - Refactored

import React from 'react';
import { Link } from 'react-router-dom'; // ✅ Use Link for internal navigation
import './Footer.css';
import { FaWhatsapp, FaYoutube, FaFacebook } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">

        {/* Column 1: Brand & Mission */}
        <div className="footer-column about">
          <Link to="/" className="footer-logo">
            <img src="/images/desi-krishak-logo.jpg" alt="Desi Krishak Logo" />
            <span>DesiKrishak</span>
          </Link>
          <p className="mission-statement">
            A simple and trusted digital marketplace for Indian farmers. / भारतीय किसानों के लिए एक सरल और भरोसेमंद डिजिटल बाज़ार।
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-column links">
          <h4>Quick Links / त्वरित लिंक</h4>
          <ul>
            <li><Link to="/">Home / होम</Link></li>
            <li><Link to="/products">Products / उत्पाद</Link></li>
            <li><Link to="/sell">Sell / बेचें</Link></li>
            <li><Link to="/about">About Us / हमारे बारे में</Link></li>
          </ul>
        </div>

        {/* Column 3: Support & Legal */}
        <div className="footer-column links">
          <h4>Support / सहायता</h4>
          <ul>
            <li><Link to="/terms">Terms of Service / सेवा की शर्तें</Link></li>
            <li><Link to="/privacy">Privacy Policy / गोपनीयता नीति</Link></li>
            <li><Link to="/refund">Refund Policy / वापसी नीति</Link></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom-bar">
        <p>© {currentYear} DesiKrishak. All Rights Reserved.</p>
        <div className="social-media-links">
          {/* Use 'a' tags for external links */}
          <a href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
          <a href="https://youtube.com/your-channel" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
          <a href="https://facebook.com/your-page" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;