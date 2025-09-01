const express = require('express');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/userModel');

const otpStore = {}; // Temporary in-memory OTP store

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// ... (keep all your imports and transporter setup)

router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

  otpStore[email] = { otp, expires: otpExpires }; // Using your in-memory store for now

  try {
    const mailOptions = {
      from: '"DesiKrishak" <support@desikrishak.com>',
      to: email,
      //  Bilingual subject
      subject: 'Your DesiKrishak OTP / आपका देसीकृषक OTP',
      
      //  Bilingual plain text fallback
      text: `Your OTP for DesiKrishak is: ${otp}. It is valid for 10 minutes. / देसीकृषक के लिए आपका OTP है: ${otp}। यह 10 मिनट के लिए वैध है।`,
      
      //  Bilingual HTML body
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #264653;">Welcome to DesiKrishak! / देसीकृषक में आपका स्वागत है!</h2>
          <p>
            Thank you for joining our community. Please use the following One-Time Password (OTP) to log in. The code is valid for 10 minutes.
            <br>
            हमारे समुदाय में शामिल होने के लिए धन्यवाद। लॉग इन करने के लिए कृपया निम्नलिखित वन-टाइम पासवर्ड (OTP) का उपयोग करें। यह कोड 10 मिनट के लिए वैध है।
          </p>
          <p style="font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #2a9d8f; margin: 20px 0; text-align: center;">
            ${otp}
          </p>
          <p>
            If you did not request this code, you can safely ignore this email.
            <br>
            यदि आपने यह कोड अनुरोध नहीं किया है, तो आप इस ईमेल को सुरक्षित रूप से अनदेखा कर सकते हैं।
          </p>
          <hr style="border: none; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #777;">
            The DesiKrishak Team / देसीकृषक टीम<br>
            Ghaziabad, Uttar Pradesh, India / गाजियाबाद, उत्तर प्रदेश, भारत
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'OTP sent to your email.' });
  } catch (error) {
    console.error('❌ Email error:', error);
    res.status(500).json({ error: 'Failed to send OTP email.' });
  }
});

// ... (keep the rest of your auth routes file)

router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ error: 'Email and OTP are required' });

  const storedData = otpStore[email];

  if (storedData && storedData.otp === otp) {
    if (new Date() > storedData.expires) {
      delete otpStore[email];
      return res.status(401).json({ error: 'OTP has expired. Please request a new one.' });
    }

    delete otpStore[email]; // OTP is valid and used

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ success: true, token, user });
  } else {
    res.status(401).json({ error: 'Invalid OTP' });
  }
});

module.exports = router;
