import React from 'react';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section brand">
          <h3>DesiKrishak</h3>
          <p>Empowering Farmers. Connecting Buyers.</p>
        </div>

        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/sell">Sell</a></li>
            <li><a href="#categories">Categories</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/refund">Refund Policy</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h4>Contact Us</h4>
          <p>Email: support@desikrishak.in</p>
          <p>Phone: +91 98765 43210</p>
        </div>

        <div className="footer-section social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com/desikrishak" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/desikrishak" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://www.twitter.com/desikrishak" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://www.linkedin.com/company/desikrishak" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          </div>
        </div>

      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} DesiKrishak. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
