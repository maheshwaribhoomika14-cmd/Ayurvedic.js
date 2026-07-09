const express = require('express');
const router = express.Router();

// Controller ke functions ko safely import kiya
const { getOrders, updateOrderStatus } = require('../controllers/orderController');

// 1. Saare orders read karne ke liye (GET)
router.get('/', getOrders);

// 2. Order ka status update karne ke liye (PUT)
router.put('/:id/status', updateOrderStatus);

// 🚨 SABSE IMPORTANT LINE: Isko export karna bilkul mat bhoolna
module.exports = router;