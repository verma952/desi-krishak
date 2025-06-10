const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// GET user profile by email
router.get('/profile', async (req, res) => {
  const { email } = req.query;

  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT update user profile by email
router.put('/profile', async (req, res) => {
  const { email, name, phone, address } = req.body;

  try {
    const updated = await User.findOneAndUpdate(
      { email },
      { name, phone, address },
      { new: true, upsert: true } // upsert allows auto-creating user if not exist
    );

    res.json(updated);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});


module.exports = router;
