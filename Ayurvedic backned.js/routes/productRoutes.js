const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 🚀 FIXED: Agar uploads folder nahi bana hai, toh use auto-create karega
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// 🚀 FIXED: Multer Disk Storage Setup taaki binary files asli folder mein save hon aur file.path generate ho!
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Files uploads folder mein jayengi
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Strict instantiation grid configuration
const upload = multer({ storage: storage });

// Controller imports
const { 
    addProduct, 
    getProducts, 
    getProductById, // 🚀 CONNECTED: Master Controller Binding for Concerns Sub-Array
    updateProduct, 
    deleteProduct,
    searchProducts
} = require('../controllers/productController');

// =========================================================================
// 🚀 🔥 BHOOMIKA ROOT UNIQUE SEARCH PATH (HIGH PRIORITY ROUTE OVERRIDE)
// Isko baaki saare routes ke HAMESHA sabse upar rakhna hai taaki ID route se conflict na ho
// =========================================================================
router.get('/search/global/query', searchProducts);

// 🚀 --- PRODUCT ENDPOINT ROUTINGS (FIXED MULTIPART PACKETS) ---

// 🎯 1. INTEGRATED ACTION HANDLER: Pure payload base64 JSON structure handler
router.post('/add', async (req, res) => {
    try {
        const Product = require('../models/Product'); // Model references loading handles securely
        
        const { 
            name, 
            price, 
            description, 
            image, 
            images, 
            category, 
            alignment,
            vendor,
            sku,
            availability,
            tags 
        } = req.body;

        const newProduct = new Product({
            name,
            price,
            description,
            image,  // Main single cover image base64 string fallback
            images, // Multiple images ka array automatic save ho jayega MongoDB document tree mein
            category,
            alignment: alignment ? alignment.trim() : "",
            vendor: vendor ? vendor.trim() : 'Kottakkal Arya Vaidya Sala',
            sku: sku ? sku.trim() : 'AK-A001',
            availability: availability ? availability.trim() : 'Available',
            tags: Array.isArray(tags) ? tags : []
        });

        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Backend error while adding product:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// 2. Fallback router layer for pure /api/products hit (keeping original controller bindings untouched)
router.post('/', upload.any(), addProduct); 

// 3. Saare Products Fetch karne ke liye (GET -> /api/products)
router.get('/', getProducts);

// 🎯 4. Single Product Fetch karne ke liye (GET -> /api/products/:id) - BHOOMIKA INTEGRATION SIGNATURE
// Purane controller bypassing middleware logic ko hata kar controller engine bind kar diya h
router.get('/:id', getProductById); 

// 5. Product Update karne ke liye (PUT -> /api/products/:id)
router.put('/:id', upload.any(), updateProduct); // Ab edit mode mein bhi files actual folders mein capture hongi

// 6. Product Delete karne ke liye (DELETE -> /api/products/:id)
router.delete('/:id', deleteProduct);

// 🚨 Router export logic lock
module.exports = router;