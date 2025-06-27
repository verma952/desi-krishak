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

exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }

    const regexCategory = new RegExp(`^${category}$`, 'i'); // Case-insensitive match
    const products = await Product.find();
    // Filter products by category
    const filteredProducts = products.filter(product => product.productType && product.productType.match(regexCategory));

    if (filteredProducts.length === 0) {
      return res.status(404).json({ message: `No products found for category: ${category}` });
    }
    // If you want to return the filtered products instead of all products
    res.status(200).json(filteredProducts);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ message: 'Failed to fetch products by category', error });
  }
};

// Note: Ensure that the Product model is correctly defined in productModel.js

exports.deleteProduct = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ Now available thanks to auth middleware
    const productId = req.params.id;

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
