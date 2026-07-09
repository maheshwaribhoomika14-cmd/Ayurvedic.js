const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// 🚀 Controller se saare functions import kiye (getProductById ko bhi safely include kar liya h)
const { 
  getConcerns, 
  addConcern, 
  updateConcern, 
  deleteConcern, 
  getProductById 
} = require('../controllers/concernController');

// Multer Disk Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, 'concern-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// ==========================================
// 🛠️ ENDPOINTS MAPPING
// ==========================================

// 1. Get All Concerns
router.get('/', getConcerns);

// 2. Add New Concern - 🚀 FIXED: upload.any() use karenge taaki unexpected field error na aaye
router.post('/add', upload.any(), addConcern); 

// 3. Edit/Update Existing Concern - 🚀 FIXED: upload.any() dynamic product fields ko easily accept karega
router.put('/update/:id', upload.any(), updateConcern); 

// 4. Delete Concern
router.delete('/delete/:id', deleteConcern);

// 5. 🚀 NEW ENDPOINT: Specific nested product ko ID se fetch karne ke liye pipeline map kar di h
router.get('/product/:productId', getProductById);

module.exports = router;