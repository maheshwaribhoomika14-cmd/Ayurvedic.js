const express = require('express');
const router = express.Router();
const { getProductsByCategory, addClassicalProduct } = require('../controllers/classicalProductController');

// Route to get products by category name (e.g., /api/classical/arishtam)
router.get('/:categoryName', getProductsByCategory);

// Route to add a product
router.post('/add', addClassicalProduct);

module.exports = router;