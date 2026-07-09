const Review = require('../models/Review');

// @desc    Get all reviews for Admin Panel
// @route   GET /api/reviews
const getReviews = async (req, res) => {
    try {
        // .populate se user ka naam aur product ka naam dono sath mein load ho jayenge
        const reviews = await Review.find({})
            .populate('user', 'name email')
            .populate('product', 'name')
            .sort({ createdAt: -1 });

        return res.status(200).json(reviews);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a review (Optional Admin Control)
// @route   DELETE /api/reviews/:id
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        await Review.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: 'Review deleted successfully by Admin!' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { getReviews, deleteReview };