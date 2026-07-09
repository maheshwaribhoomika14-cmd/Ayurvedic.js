const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getMiddleBanner, saveMiddleBanner } = require('../controllers/bannerController');

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `banner_${Date.now()}_${file.originalname}`)
});
const upload = multer({ storage });

router.get('/middle', getMiddleBanner);
router.post('/middle/save', upload.single('image'), saveMiddleBanner);

module.exports = router;