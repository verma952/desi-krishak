// src/components/policies/Privacy.jsx

import React from 'react';
import './Policies.css'; // We'll use this new CSS file

function Privacy() {
  return (
    <div className="policy-page">
      <div className="policy-container">
        <h1>Privacy Policy / गोपनीयता नीति</h1>
        <p className="effective-date">Effective Date: September 2, 2025 / प्रभावी तिथि: 2 सितंबर, 2025</p>

        <section>
          <h2>Introduction / परिचय</h2>
          <p>
            Welcome to DesiKrishak. This Privacy Policy explains how we collect, use, and protect your personal information when you use our platform to buy and sell agricultural products.
            <br /><br />
            देसीकृषक में आपका स्वागत है। यह गोपनीयता नीति बताती है कि जब आप कृषि उत्पादों को खरीदने और बेचने के लिए हमारे प्लेटफ़ॉर्म का उपयोग करते हैं तो हम आपकी व्यक्तिगत जानकारी को कैसे एकत्र, उपयोग और संरक्षित करते हैं।
          </p>
        </section>

        <section>
          <h2>1. Information We Collect / हम कौन सी जानकारी एकत्र करते हैं</h2>
          <p>
            To provide our services, we collect the following types of information:
            <br />
            हमारी सेवाएं प्रदान करने के लिए, हम निम्नलिखित प्रकार की जानकारी एकत्र करते हैं:
          </p>
          <ul>
            <li>
              <strong>Personal Information You Provide / आपके द्वारा प्रदान की गई व्यक्तिगत जानकारी:</strong> This includes your name, phone number, email address, and village/address when you create an account or a listing.
              <br />
              इसमें आपका नाम, फ़ोन नंबर, ईमेल पता और गांव/पता शामिल है जब आप कोई खाता या लिस्टिंग बनाते हैं।
            </li>
            <li>
              <strong>Product Information / उत्पाद जानकारी:</strong> Details and photos of the products you list for sale, such as cattle, crops, or equipment.
              <br />
              बिक्री के लिए आपके द्वारा सूचीबद्ध उत्पादों का विवरण और तस्वीरें, जैसे कि पशु, फसलें, या उपकरण।
            </li>
            <li>
              <strong>Location Information / स्थान की जानकारी:</strong> We collect your device's geolocation to show you nearby products and to display your product's location to potential buyers.
              <br />
              हम आपको आस-पास के उत्पाद दिखाने और संभावित खरीदारों को आपके उत्पाद का स्थान प्रदर्शित करने के लिए आपके डिवाइस की जियोलोकेशन एकत्र करते हैं।
            </li>
          </ul>
        </section>

        <section>
          <h2>2. How We Use Your Information / हम आपकी जानकारी का उपयोग कैसे करते हैं</h2>
          <p>
            Your information is used to:
            <br />
            आपकी जानकारी का उपयोग निम्नलिखित के लिए किया जाता है:
          </p>
          <ul>
            <li>Create and manage your account. / आपका खाता बनाने और प्रबंधित करने के लिए।</li>
            <li>Display your product listings to other users. / अन्य उपयोगकर्ताओं को आपकी उत्पाद लिस्टिंग प्रदर्शित करने के लिए।</li>
            <li>Connect you with potential buyers or sellers. / आपको संभावित खरीदारों या विक्रेताओं से जोड़ने के लिए।</li>
            <li>Improve our platform and user experience. / हमारे प्लेटफ़ॉर्म और उपयोगकर्ता अनुभव को बेहतर बनाने के लिए।</li>
          </ul>
        </section>
        
        <section>
          <h2>3. How We Share Your Information / हम आपकी जानकारी कैसे साझा करते हैं</h2>
          <p>
            To facilitate transactions, some of your information is shared publicly:
            <br />
            लेन-देन को सुविधाजनक बनाने के लिए, आपकी कुछ जानकारी सार्वजनिक रूप से साझा की जाती है:
          </p>
          <ul>
            <li>
              Your phone number and village are displayed on your product listings so that interested buyers can contact you directly. We do not share your exact address.
              <br />
              आपका फ़ोन नंबर और गांव आपके उत्पाद लिस्टिंग पर प्रदर्शित होते हैं ताकि इच्छुक खरीदार आपसे सीधे संपर्क कर सकें। हम आपका सटीक पता साझा नहीं करते हैं।
            </li>
          </ul>
          <p>
            We do not sell your personal data to third parties.
            <br />
            हम आपका व्यक्तिगत डेटा तीसरे पक्ष को नहीं बेचते हैं।
          </p>
        </section>

        <section>
          <h2>4. Contact Us / हमसे संपर्क करें</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us.
            <br />
            यदि इस गोपनीयता नीति के बारे में आपके कोई प्रश्न हैं, तो कृपया हमसे संपर्क करें।
          </p>
          <p>
            <strong>Vasudev Verma</strong><br />
            Phone / फ़ोन: +91 9528539285<br />
            Address / पता: Toda, Shahpur, Agra, UP, India
          </p>
        </section>
      </div>
    </div>
  );
}

export default Privacy;