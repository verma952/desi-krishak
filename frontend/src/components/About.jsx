import React from 'react';
import './About.css';

function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-text">
          <h2>About desiKrishak</h2>
          <p>
            desiKrishak is a digital marketplace built to empower rural farmers and local sellers by bringing their products directly to buyers. Whether it's quality cattle, fresh dairy items, or essential farming tools, our platform makes buying and selling simple, secure, and efficient.
          </p>
          <p>
            We aim to bridge the gap between traditional agriculture and modern technology — enabling farmers to get fair prices and buyers to access authentic, trustworthy local products with just a few clicks.
          </p>
          <p>
            Our goal is to create a sustainable ecosystem where local communities thrive through transparency, technology, and trust.
          </p>
        </div>
        <div className="about-image">
          <img src="/images/about-farming.jpg" alt="DesiKrishak Farming" />
        </div>
      </div>
    </section>
  );
}

export default About;
