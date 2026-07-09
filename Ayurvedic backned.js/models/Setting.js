const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
    shopName: {
        type: String,
        default: 'Bhoomika Digital Marketing & Ayurvedic'
    },
    supportEmail: {
        type: String,
        default: 'support@bhoomikaayurveda.com'
    },
    phone: {
        type: String,
        default: '+91 9876543210'
    },
    address: {
        type: String,
        default: 'Bhilwara, Rajasthan, India'
    },
    shippingCharges: {
        type: Number,
        default: 50
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Setting', settingSchema);