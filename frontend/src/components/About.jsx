// src/components/About.jsx - Refactored

import React from 'react';
import './About.css';
import { FaBullseye, FaLink, FaHandshake } from 'react-icons/fa'; // Example icons

function About() {
  return (
    <div className="about-page">
      <div className="about-container">
        {/* Left Column: Text Content */}
        <div className="about-text-content">
          <h2 className="about-heading">
            About DesiKrishak / देसीकृषक के बारे में
          </h2>
          <p>
            DesiKrishak is a digital marketplace built to empower rural farmers by bringing their products directly to buyers. We aim to bridge the gap between traditional agriculture and modern technology.
            <br /><br />
            देसीकृषक एक डिजिटल बाज़ार है जिसे ग्रामीण किसानों को उनके उत्पादों को सीधे खरीदारों तक पहुंचाकर सशक्त बनाने के लिए बनाया गया है। हमारा उद्देश्य पारंपरिक कृषि और आधुनिक तकनीक के बीच की खाई को पाटना है।
          </p>
          
          <div className="our-values">
            <div className="value-item">
              <FaBullseye className="value-icon" />
              <div className="value-text">
                <h4>Our Mission / हमारा मिशन</h4>
                <p>To provide fair prices for farmers and authentic local products for buyers. / किसानों को उचित मूल्य और खरीदारों को प्रामाणिक स्थानीय उत्पाद प्रदान करना।</p>
              </div>
            </div>
            <div className="value-item">
              <FaLink className="value-icon" />
              <div className="value-text">
                <h4>Direct Connection / सीधा संबंध</h4>
                <p>Connecting communities by removing middlemen and fostering direct trade. / बिचौलियों को हटाकर और सीधे व्यापार को बढ़ावा देकर समुदायों को जोड़ना।</p>
              </div>
            </div>
            <div className="value-item">
              <FaHandshake className="value-icon" />
              <div className="value-text">
                <h4>Trust & Transparency / विश्वास और पारदर्शिता</h4>
                <p>Building a sustainable ecosystem based on technology and trust. / प्रौद्योगिकी और विश्वास पर आधारित एक स्थायी पारिस्थितिकी तंत्र का निर्माण।</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="about-image-wrapper">
          <img src="/images/about-farming.jpg" alt="A farmer in a field" />
        </div>
      </div>
    </div>
  );
}

export default About;