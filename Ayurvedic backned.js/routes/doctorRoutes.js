const express = require('express');
const router = express.Router();

// 🎯 Controller file ko import kijiye
const doctorController = require('../controllers/doctorController');

// 🚀 Routes mapping using Controller functions
router.get('/doctors', doctorController.getAllDoctors);
router.post('/doctors', doctorController.createDoctor);

module.exports = router;