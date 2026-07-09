const express = require('express');
const router = express.Router();
const { getSlides, createSlide } = require('../controllers/sliderController');

// 🟢 GET: http://localhost:5000/api/sliders
router.get('/', getSlides);

// 🔐 POST: http://localhost:5000/api/sliders/add
router.post('/add', createSlide);

module.exports = router;