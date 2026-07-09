const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['order', 'stock', 'enquiry', 'user'],
        required: true
    },
    isRead: {
        type: Boolean,
        default: false // By default naya notification unread rahega
    }
}, {
    timestamps: true // Isse notification ka exact time pata chalega
});

module.exports = mongoose.model('Notification', notificationSchema);