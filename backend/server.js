require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// Import routes
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const productRoutes = require('./routes/productRoutes');
const chatRoutes = require('./routes/chatRoutes');

// // Import auth routes
const authRoutes = require('./routes/authRoutes');



const userRoutes = require('./routes/userRoutes'); // or wherever your file is
app.use('/api/users', userRoutes);
// Middleware
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/chat', chatRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB Atlas');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('❌ MongoDB connection error:', error);
});
