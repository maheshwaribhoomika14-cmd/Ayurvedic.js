const express = require('express');
const router = express.Router();
// 🎯 BHOOMIKA REAL MODEL IMPORT
const Enquiry = require('../models/Enquiry'); 

// =========================================================================
// 🚀 FETCH ALL LIVE ENQUIRIES - URL: http://localhost:5000/api/v2/enquiries
// =========================================================================
router.get('/', async (req, res) => {
    try {
        // MongoDB se saari customer inquiries automatic date wise collect karega
        const allEnquiries = await Enquiry.find({}).sort({ createdAt: -1 });
        return res.status(200).json(allEnquiries);
    } catch (error) {
        console.error("Enquiry fetch pipeline error:", error);
        return res.status(500).json({ success: false, message: "Server database error", error: error.message });
    }
});

module.exports = router;