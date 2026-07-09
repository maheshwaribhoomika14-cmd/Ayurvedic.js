const express = require('express');
const router = express.Router();
const multer = require('multer'); // 🚨 1. Multer require kiya

// 🚨 2. Multer Configuration (Jahan images save hoti hain)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Aapke folder ka naam jahan photos jati hain
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'cat_' + uniqueSuffix + '_' + file.originalname);
  }
});
const upload = multer({ storage: storage });

const { 
    addCategory, 
    getCategories, 
    updateCategory, 
    deleteCategory 
} = require('../controllers/categoryController');

// Routes
router.post('/add', upload.array('images', 10), addCategory); // Add mein pehle se hoga
router.get('/', getCategories);

// Single category fetch
router.get('/:id', async (req, res) => {
    // ... aapka existing logic ...
});

// 🚨 3. FIXED UPDATE ROUTE: Isme upload.array('images', 10) add kar diya h
router.put('/:id', upload.array('images', 10), updateCategory);

router.delete('/:id', deleteCategory);

module.exports = router;