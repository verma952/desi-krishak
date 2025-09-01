// backend/controllers/productController.js - Refactored

const Product = require('../models/productModel'); // Ensure this file is correct
const mongoose = require('mongoose'); // Needed for some Mongoose types

// ❗ IMPORTANT: You must add a '2dsphere' index to the location field in your productModel.js
// Example in schema: location: { type: { type: String, enum: ['Point'], default: 'Point' }, coordinates: [Number] }
// And in your model file: productSchema.index({ location: '2dsphere' });

// Our new, smart function that handles all filters with one query
// backend/controllers/productController.js

// ... (keep all other functions like createProduct, getMyProducts, etc.)

// Replace the old getAllProducts with this new one
exports.getAllProducts = async (req, res) => {
  try {
    const { lat, lon, radius, category, search } = req.query;
    const query = {};

    // Location filter (no changes here)
    if (lat && lon && radius) {
      query.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lon), parseFloat(lat)],
          },
          $maxDistance: parseFloat(radius) * 1000,
        },
      };
    }

    // Category filter (no changes here)
    if (category) {
      query.productType = new RegExp(`^${category}$`, 'i');
    }

    // ✅ The search logic is now smarter
    if (search) {
      const searchRegex = new RegExp(search, 'i'); // Case-insensitive regex
      // Use $or to find a match in any of these fields
      query.$or = [
        { name: searchRegex },
        { productType: searchRegex },
        { village: searchRegex },
        { details: searchRegex }
      ];
    }

    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
};
// This function is for your explicit category page only and uses the same logic
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.query; // Use req.query for consistency
    if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }
    const products = await Product.find({ productType: new RegExp(`^${category}$`, 'i') });
    if (products.length === 0) {
      return res.status(404).json({ message: `No products found for category: ${category}` });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ message: 'Failed to fetch products by category', error });
  }
};


// Other controller functions (create, getMy, delete)
exports.createProduct = async (req, res) => {
  // ... (Your code here, no changes needed)
};

exports.getMyProducts = async (req, res) => {
  // ... (Your code here, no changes needed)
};

exports.deleteProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(productId)) { // Security check for valid ID
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete this product" });
    }

    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product", error });
  }
};