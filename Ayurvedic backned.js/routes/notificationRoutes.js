const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification'); // Aapka Notification model

// =========================================================================
// 🚀 REAL-TIME FETCH ENDPOINT - URL: http://localhost:5000/api/v2/notifications
// =========================================================================
router.get('/', async (req, res) => {
    try {
        // Direct database queries - Agar DB khali h toh [] response jayega
        const activeAlerts = await Notification.find({}).sort({ createdAt: -1 });
        return res.status(200).json(activeAlerts);
    } catch (error) {
        console.error("Database pipeline error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;