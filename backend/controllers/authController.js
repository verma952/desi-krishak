const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const otpStore = {}; // In-memory store for demo; use Redis in production

exports.sendOtp = async (req, res) => {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  otpStore[phone] = otp;
  console.log(`OTP for ${phone}: ${otp}`); // Send via Twilio in real use

  res.status(200).json({ message: 'OTP sent' });
};

exports.verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;
  if (otpStore[phone] !== otp) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  let user = await User.findOne({ phone });
  if (!user) {
    user = new User({ phone, isVerified: true });
    await user.save();
  }

  const token = jwt.sign({ userId: user._id, phone }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  delete otpStore[phone];

  res.status(200).json({ token, user });
};
