// backend/routes/productRoutes.js - Refactored

const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { 
  createProduct, 
  getAllProducts, // This will be our new, smart function
  getProductById,
  getMyProducts,
  getProductsByCategory, // Keeping this for explicit category page
  deleteProduct 
} = require("../controllers/productController");
const authenticate = require('../middleware/authMiddleware');

// POST route to upload product with up to 5 images
router.post("/upload", authenticate, upload.array("images", 5), createProduct);
 

// GET route to get all products, with optional search, category, and location filters
router.get("/", getAllProducts);

// GET route to get products by a specific category
router.get("/category", getProductsByCategory); 

// GET route to get my products
router.get("/my-products", authenticate, getMyProducts);
// GET route to get a product by ID
router.get("/:id", getProductById);

// DELETE a product
router.delete('/:id', authenticate, deleteProduct);

module.exports = router;