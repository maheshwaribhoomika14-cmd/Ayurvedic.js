const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Product model se product ka naam uthane ke liye
        required: [true, 'Review must belong to a product']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // User model se customer ka naam uthane ke liye
        required: [true, 'Review must belong to a user']
    },
    rating: {
        type: Number,
        required: [true, 'Please add a rating between 1 and 5'],
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: [true, 'Please add a comment/review text'],
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);