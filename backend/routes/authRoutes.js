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

// Route to send OTP
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;

  const mailOptions = {
    from: '"AgroHaat OTP" <vasudevverma0786@gmail.com>',
    to: email,
    subject: 'Your OTP for AgroHaat Login',
    text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP sent to ${email}: ${otp}`);
    res.json({ message: 'OTP sent to email' });
  } catch (error) {
    console.error('❌ Email error:', error);
    res.status(500).json({ error: 'Failed to send OTP email' });
  }
});

router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ error: 'Email and OTP are required' });

  if (otpStore[email] === otp) {
    delete otpStore[email];

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email });
    }

    //  Create real token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({ success: true, token, user });
  } else {
    res.status(401).json({ error: 'Invalid OTP' });
  }
});


module.exports = router;
