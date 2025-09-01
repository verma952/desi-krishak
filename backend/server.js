// src/server.js - Refactored

// 1. IMPORTS
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Node.js path module for handling file paths

// Route Imports
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');

// 2. INITIALIZATION
const app = express();
const PORT = process.env.PORT || 5000;

// 3. MIDDLEWARE
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Middleware to parse JSON bodies

// Serve uploaded files statically
// Using path.join is safer for creating cross-platform compatible paths
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 4. API ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/chat', chatRoutes);

// 5. GLOBAL ERROR HANDLING MIDDLEWARE (NEW)
// This will catch any errors that occur in your route handlers
app.use((err, req, res, next) => {
  console.error("❌ Unhandled Error:", err.stack);
  res.status(500).send({ message: 'Something went wrong on the server!' });
});

// 6. DATABASE CONNECTION & SERVER START
const startServer = async () => {
  try {
    // The deprecated options have been removed
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1); // Exit the process with an error code
  }
};

startServer();