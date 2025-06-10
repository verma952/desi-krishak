const Product = require('../models/productModel');

exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      details,
      location,
      productType,
      milkProductionLitersPerDay,
      phone,
      village,
      subType,
    } = req.body;

    if (!phone) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    let milkProduction = undefined;
    if (productType === 'cattle' && milkProductionLitersPerDay) {
      const milkValue = Number(milkProductionLitersPerDay);
      if (!isNaN(milkValue)) {
        milkProduction = milkValue;
      }
    }

    const parsedLocation = typeof location === 'string' ? JSON.parse(location) : location;
    const imagePaths = req.files.map((file) => file.path);

    // 🔥 Attach user from authenticated token
    const userId = req.user.id || req.user._id;

    const product = new Product({
      name,
      price,
      details,
      location: parsedLocation,
      productType,
      subType,
      milkProductionLitersPerDay: milkProduction,
      phone,
      village,
      images: imagePaths,
      user: userId, // 👈 Add this line
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Failed to create product', error });
  }
};


exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products', error });
  }
};


exports.getMyProducts = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user ID is stored in req.user by auth middleware
    const products = await Product.find({ user: userId });
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching user products:', error);
    res.status(500).json({ message: 'Failed to fetch user products', error });
  }
}
// Note: Ensure that the Product model is correctly defined in productModel.js