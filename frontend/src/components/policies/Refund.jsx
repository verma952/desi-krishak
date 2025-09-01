// src/components/policies/Refund.jsx

import React from 'react';
import './Policies.css'; // Uses the same CSS as the Privacy page

function Refund() {
  return (
    <div className="policy-page">
      <div className="policy-container">
        <h1>Refund & Return Policy / रिफंड और वापसी नीति</h1>
        <p className="effective-date">Effective Date: September 2, 2025 / प्रभावी तिथि: 2 सितंबर, 2025</p>

        <section>
          <h2>1. Our Role as a Platform / एक प्लेटफॉर्म के रूप में हमारी भूमिका</h2>
          <p>
            DesiKrishak is a classifieds platform that connects local buyers and sellers. We do not participate in, process payments for, or handle the delivery of any transaction. All agreements and transactions are made directly between the buyer and the seller.
            <br /><br />
            देसीकृषक एक क्लासिफाइड प्लेटफॉर्म है जो स्थानीय खरीदारों और विक्रेताओं को जोड़ता है। हम किसी भी लेन-देन में भाग नहीं लेते, भुगतान की प्रक्रिया नहीं करते, या डिलीवरी को संभालते नहीं हैं। सभी समझौते और लेन-देन सीधे खरीदार और विक्रेता के बीच किए जाते हैं।
          </p>
        </section>

        <section>
          <h2>2. Refunds and Returns / रिफंड और वापसी</h2>
          <p>
            Because we do not handle financial transactions, **DesiKrishak cannot issue any refunds**. All matters related to returns, exchanges, or refunds must be handled directly between the buyer and the seller according to the terms they agree upon.
            <br /><br />
            क्योंकि हम वित्तीय लेन-देन को नहीं संभालते हैं, **देसीकृषक कोई रिफंड जारी नहीं कर सकता है**। वापसी, विनिमय, या रिफंड से संबंधित सभी मामले खरीदार और विक्रेता के बीच सीधे उनके द्वारा सहमत शर्तों के अनुसार संभाले जाने चाहिए।
          </p>
        </section>

        <section>
          <h2>3. Advice for Buyers / खरीदारों के लिए सलाह</h2>
          <p>
            To ensure a safe purchase, we strongly recommend that you:
            <br />
            एक सुरक्षित खरीद सुनिश्चित करने के लिए, हम दृढ़ता से अनुशंसा करते हैं कि आप:
          </p>
          <ul>
            <li>
              <strong>Inspect Before Buying / खरीदने से पहले निरीक्षण करें:</strong> Always meet the seller in person to inspect the product (especially livestock and equipment) before making any payment.
              <br />
              कोई भी भुगतान करने से पहले उत्पाद (विशेष रूप से पशुधन और उपकरण) का निरीक्षण करने के लिए हमेशा विक्रेता से व्यक्तिगत रूप से मिलें।
            </li>
            <li>
              <strong>Clarify Policy with Seller / विक्रेता से नीति स्पष्ट करें:</strong> Discuss the seller’s return or refund policy directly with them before you complete the purchase.
              <br />
              खरीद पूरी करने से पहले विक्रेता की वापसी या रिफंड नीति पर सीधे उनसे चर्चा करें।
            </li>
          </ul>
        </section>

        <section>
          <h2>4. Responsibility of Sellers / विक्रेताओं की जिम्मेदारी</h2>
          <p>
            Sellers are expected to be honest and transparent in their listings. This includes providing accurate descriptions, clear photos, and communicating their personal return/refund policy to the buyer.
            <br /><br />
            विक्रेताओं से अपेक्षा की जाती है कि वे अपनी लिस्टिंग में ईमानदार और पारदर्शी रहें। इसमें सटीक विवरण, स्पष्ट तस्वीरें प्रदान करना और खरीदार को अपनी व्यक्तिगत वापसी/रिफंड नीति बताना शामिल है।
          </p>
        </section>

        <section>
          <h2>5. Dispute Support / विवाद सहायता</h2>
          <p>
            While DesiKrishak does not mediate disputes between users, we are committed to maintaining a trustworthy community. If you believe a user is acting fraudulently or violating our terms, please report them to us through our contact channels. We will investigate and take appropriate action, which may include suspending or banning the user's account.
            <br /><br />
            हालांकि देसीकृषक उपयोगकर्ताओं के बीच विवादों में मध्यस्थता नहीं करता है, हम एक भरोसेमंद समुदाय बनाए रखने के लिए प्रतिबद्ध हैं। यदि आपको लगता है कि कोई उपयोगकर्ता धोखाधड़ी कर रहा है या हमारी शर्तों का उल्लंघन कर रहा है, तो कृपया हमारे संपर्क चैनलों के माध्यम से हमें रिपोर्ट करें। हम जांच करेंगे और उचित कार्रवाई करेंगे, जिसमें उपयोगकर्ता के खाते को निलंबित करना या प्रतिबंधित करना शामिल हो सकता है।
          </p>
        </section>
      </div>
    </div>
  );
}

export default Refund;