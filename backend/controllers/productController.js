// backend/controllers/productController.js

const Product = require('../models/productModel');
const mongoose = require('mongoose');

exports.createProduct = async (req, res) => {
  try {
    const { 
        name, price, details, village, phone, 
        category, latitude, longitude,milkProductionLitersPerDay
    } = req.body;
    
    const userId = req.user.id;
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'You must upload at least one image.' });
    }

    if (!latitude || !longitude) {
      return res.status(400).json({ message: 'Location coordinates are missing.' });
    }
    
    const imagePaths = req.files.map(file => file.path);

    const newProduct = new Product({
      name,
      price: Number(price),
      details,
      phone,
      images: imagePaths,
      user: userId,
      village: village,
      productType: category,
      location: {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)] 
      }
    });
    
    if (milkProductionLitersPerDay) {
            newProduct.milkProductionLitersPerDay = milkProductionLitersPerDay;
      }

    const savedProduct = await newProduct.save();
    res.status(201).json({ message: 'Product created successfully!', product: savedProduct });

  } catch (error) {
    console.error('❌ Error creating product:', error);
    res.status(500).json({ message: 'Server error while creating product.', error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const { lat, lon, radius = 50, category, search } = req.query;
    let pipeline = [];
    
    if (lat && lon) {
      pipeline.push({
        $geoNear: {
          near: { type: 'Point', coordinates: [parseFloat(lon), parseFloat(lat)] },
          distanceField: 'distance',
          maxDistance: parseFloat(radius) * 1000,
          spherical: true
        }
      });
    }

    const matchStage = {};
    if (category) {
      matchStage.productType = new RegExp(`^${category}$`, 'i');
    }
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      matchStage.$or = [
        { name: searchRegex }, { productType: searchRegex },
        { village: searchRegex }, { details: searchRegex }
      ];
    }
    if (Object.keys(matchStage).length > 0) {
      pipeline.push({ $match: matchStage });
    }

    pipeline.push({
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'userDetails'
      }
    });
    pipeline.push({ $unwind: { path: '$userDetails', preserveNullAndEmptyArrays: true } });
    pipeline.push({ 
      $project: {
        _id: 1, name: 1, price: 1, details: 1, images: 1,
        phone: 1, village: 1, productType: 1, location: 1, createdAt: 1,
        distance: { $divide: [ "$distance", 1000 ] }, 
        user: { _id: '$userDetails._id', name: '$userDetails.name' } 
      }
    });
    
    const products = await Product.aggregate(pipeline);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
};

// ✅ ADD THIS ENTIRE FUNCTION (Make sure it starts with `exports.`)
/**
 * Retrieves a single product by its ID.
 */
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }
    const product = await Product.findById(id).populate('user', 'name');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ message: 'Server error while fetching product' });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }
    const products = await Product.find({ productType: new RegExp(`^${category}$`, 'i') })
      .populate('user', 'name');
    if (products.length === 0) {
      return res.status(404).json({ message: `No products found for category: ${category}` });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ message: 'Failed to fetch products by category', error });
  }
};

exports.getMyProducts = async (req, res) => {
  try {
    const userId = req.user.id;
    const products = await Product.find({ user: userId })
      .populate('user', 'name');
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching user's products:", error);
    res.status(500).json({ message: "Failed to fetch user's products", error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
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