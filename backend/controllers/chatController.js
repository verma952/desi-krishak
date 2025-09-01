// backend/controllers/chatController.js - Updated with Detailed Procedures

// --- UPDATED AND MORE DETAILED RESPONSES ---
const responses = {
  greeting: {
    en: [
      "Hello! Welcome to DesiKrishak. You can ask me questions like 'how to sell a cow' or 'how to buy a tractor'.", 
      "Hi there! I can help you with buying or selling. What would you like to know?"
    ],
    hi: [
      "नमस्ते! देसीकृषक में आपका स्वागत है। आप मुझसे 'गाय कैसे बेचें' या 'ट्रैक्टर कैसे खरीदें' जैसे सवाल पूछ सकते हैं।", 
      "नमस्कार! मैं खरीदने या बेचने में आपकी मदद कर सकता हूँ। आप क्या जानना चाहेंगे?"
    ]
  },
  sell: {
    en: [
      "Here is the procedure to sell and upload a product:\n1. Click the 'Sell' button in the menu.\n2. Choose the category for your product (e.g., Cattle).\n3. Fill in the details like name, price, and a good description.\n4. Tap to upload up to 5 clear photos.\n5. Enter your village and phone number.\n6. Click 'Submit Ad'. It's completely free!"
    ],
    hi: [
      "उत्पाद बेचने और अपलोड करने की प्रक्रिया यहां दी गई है:\n1. मेनू में 'Sell / बेचें' बटन पर क्लिक करें।\n2. अपने उत्पाद के लिए श्रेणी चुनें (जैसे, पशु)।\n3. नाम, कीमत और अच्छा विवरण भरें।\n4. 5 स्पष्ट तस्वीरें अपलोड करने के लिए टैप करें।\n5. अपना गांव और फोन नंबर दर्ज करें।\n6. 'Submit Ad' पर क्लिक करें। यह बिल्कुल मुफ़्त है!"
    ]
  },
  buy: {
    en: [
      "Here is how you can buy a product:\n1. Use the search bar or browse the categories on the homepage.\n2. Click on any product you are interested in to see its details.\n3. On the product page, you will see the seller's village and phone number.\n4. Use the 'Call' or 'WhatsApp' button to contact the seller directly and make a deal."
    ],
    hi: [
      "आप इस तरह से उत्पाद खरीद सकते हैं:\n1. होमपेज पर सर्च बार का उपयोग करें या श्रेणियां ब्राउज़ करें।\n2. जिस उत्पाद में आपकी रुचि है, उसके विवरण देखने के लिए उस पर क्लिक करें।\n3. उत्पाद पेज पर, आपको विक्रेता का गांव और फोन नंबर दिखाई देगा।\n4. सीधे विक्रेता से संपर्क करने और सौदा करने के लिए 'Call' या 'WhatsApp' बटन का उपयोग करें।"
    ]
  },
  price: {
    en: [
      "You can find the price for each item on its product card. All prices are set by the sellers themselves. If you wish to negotiate, please contact the seller directly using the contact details on the product's page."
    ],
    hi: [
      "आप प्रत्येक वस्तु की कीमत उसके उत्पाद कार्ड पर देख सकते हैं। सभी कीमतें स्वयं विक्रेताओं द्वारा निर्धारित की जाती हैं। यदि आप मोलभाव करना चाहते हैं, तो कृपया उत्पाद के पेज पर दिए गए संपर्क विवरण का उपयोग करके सीधे विक्रेता से संपर्क करें।"
    ]
  },
  fallback: {
    en: [
      "I'm sorry, I don't have the answer to that. You can ask me things like 'how to sell', 'how to buy', or 'what is the price of products?'.", 
      "I am still learning. Please try a simpler question about buying or selling on DesiKrishak."
    ],
    hi: [
      "मुझे क्षमा करें, मेरे पास इसका उत्तर नहीं है। आप मुझसे 'कैसे बेचें', 'कैसे खरीदें', या 'उत्पादों की कीमत क्या है?' जैसी बातें पूछ सकते हैं।", 
      "मैं अभी सीख रहा हूँ। कृपया देसीकृषक पर खरीदने या बेचने के बारे में एक सरल प्रश्न पूछने का प्रयास करें।"
    ]
  }
};

// --- UPDATED INTENTS WITH MORE KEYWORDS ---
const intents = [
  {
    name: 'greeting',
    keywords: ['hello', 'hi', 'hey', 'namaste', 'namaskar', 'hai'],
  },
  {
    name: 'sell',
    // Added 'upload' and 'photo' to this intent
    keywords: ['sell', 'post', 'ad', 'list', 'bechna', 'dalna', 'upload', 'photo'],
  },
  {
    name: 'buy',
    keywords: ['buy', 'purchase', 'find', 'kharidna', 'lena', 'cow', 'tractor', 'wheat'],
  },
  {
    name: 'price',
    keywords: ['price', 'cost', 'rate', 'daam', 'kimat', 'bhav'],
  }
];

// --- NO CHANGES NEEDED TO THE MAIN LOGIC ---
exports.chatHandler = (req, res) => {
  const { message, language = 'en' } = req.body;
  const lowerMsg = message.toLowerCase();

  let matchedIntent = null;

  for (const intent of intents) {
    if (intent.keywords.some(keyword => lowerMsg.includes(keyword))) {
      matchedIntent = intent.name;
      break;
    }
  }

  if (!matchedIntent) {
    matchedIntent = 'fallback';
  }

  const possibleResponses = responses[matchedIntent][language];
  const response = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
  
  setTimeout(() => {
    res.json({ response });
  }, 1200);
};