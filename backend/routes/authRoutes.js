const express = require("express");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/userModel");

const otpStore = {}; // Temporary in-memory OTP store

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Route to send OTP
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;

  const mailOptions = {
    from: '"DesiKrishak OTP" <vasudevverma0786@gmail.com>',
    to: email,
    subject: "Your OTP for DesiKrishak Login.",
    text: `Hi ${userName}, Welcome to **DesiKrishak**, India’s trusted platform to buy & sell cattle, dairy products, and farming tools.
    We’re excited to have you onboard! 🚜🌾Your One-Time Password (OTP) for login is:🔐 ${OTP} 
    This OTP is valid for 5 minutes. Please do not share it with anyone.
    .
    .
    If you didn’t request this, you can safely ignore this email.

    Thanks for joining us,
    The DesiKrishak Team
    📍 Toda, Shahpur, Agra, Uttar Pradesh
    📞 +91-952859285
    📧 [developervasu91@gmail.com](mailto:developervasu91@gmail.com)

    Follow us:
    YouTube: [Vasu\_Developer](https://www.youtube.com/@Vasu_developer)
    Instagram: [@vasu\_developer](https://instagram.com/vasu_developer)
`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("❌ Email error:", error);
    res.status(500).json({ error: "Failed to send OTP email" });
  }
});

router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp)
    return res.status(400).json({ error: "Email and OTP are required" });

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
      { expiresIn: "30d" }
    );

    res.json({ success: true, token, user });
  } else {
    res.status(401).json({ error: "Invalid OTP" });
  }
});

module.exports = router;
