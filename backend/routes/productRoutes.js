// backend/routes/productRoutes.js

const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { createProduct, getAllProducts, getMyProducts } = require("../controllers/productController");
// Import authentication middleware
const authenticate = require('../middleware/authMiddleware');

// POST route to upload product with up to 5 images
router.post("/upload",authenticate, upload.array("images", 5), createProduct);


// GET route to get all products
router.get("/", getAllProducts);
router.get("/my-products", authenticate, getMyProducts);

module.exports = router;

