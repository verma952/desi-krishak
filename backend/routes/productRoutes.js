// backend/routes/productRoutes.js

const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { createProduct, getAllProducts, getMyProducts, getProductsByCategory, deleteProduct } = require("../controllers/productController");
// Import authentication middleware
const authenticate = require('../middleware/authMiddleware');

// POST route to upload product with up to 5 images
router.post("/upload",authenticate, upload.array("images", 5), createProduct);


// GET route to get all products
router.get("/", getAllProducts);
router.get("/my-products", authenticate, getMyProducts);
// GET route to get products by category
router.get("/category", getProductsByCategory); // This can be modified to filter by category if needed

router.delete('/:id', authenticate,deleteProduct);


module.exports = router;

