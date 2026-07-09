const express = require('express');
const router = express.Router();
const ailmentController = require('../controllers/ailmentController'); // Controller import kiya
const multer = require('multer');
const path = require('path');

// Multer Disk Storage Configuration (For Image Uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, 'ailment_' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Routes mappings link to Controller functions
router.get('/', ailmentController.getAllAilments);
router.post('/add', upload.single('image'), ailmentController.addAilment);
router.delete('/:id', ailmentController.deleteAilment);

module.exports = router;