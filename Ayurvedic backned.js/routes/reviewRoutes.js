const express = require('express');
const router = express.Router();
const { getReviews, deleteReview } = require('../controllers/reviewController');
// 🎯 BHOOMIKA REAL MODEL IMPORT: Toggle logic direct model update ke liye scan karega
const Review = require('../models/Review');

// Admin ke liye saare reviews dekhne ka route (Aapka Original Code Unchanged)
router.get('/', getReviews);

// =========================================================================
// 🚀 🔥 BHOOMIKA NEW LIVE MODERATION TOGGLE ENDPOINT (INJECTED SAFELY)
// URL: PUT http://localhost:5000/api/v2/reviews/:id
// Isse admin panel se Active/Pending status database mein switch ho sakega!
// =========================================================================
router.put('/:id', async (req, res) => {
    try {
        const { approved } = req.body;
        
        // Find review from MongoDB cluster and update its boolean parameter
        const updatedReview = await Review.findByIdAndUpdate(
            req.params.id, 
            { approved }, 
            { new: true }
        );
        
        if (!updatedReview) {
            return res.status(404).json({ success: false, message: "Review node not found in database!" });
        }

        return res.status(200).json({ success: true, data: updatedReview });
    } catch (error) {
        console.error("Review moderation status pipeline error:", error);
        return res.status(500).json({ success: false, message: "Server stream failure", error: error.message });
    }
});

// Kisi abusive ya galat review ko admin panel se delete karne ka route (Aapka Original Code Unchanged)
router.delete('/:id', deleteReview);

module.exports = router;