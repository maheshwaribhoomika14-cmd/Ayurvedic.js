const Notification = require('../models/Notification');

// 1. GET ALL NOTIFICATIONS
// @route   GET /api/notifications
const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({}).sort({ createdAt: -1 });
        return res.status(200).json(notifications);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// 2. MARK ALL AS READ (Phone mein clear all karne jaisa)
// @route   PUT /api/notifications/mark-read
const markAllAsRead = async (req, res) => {
    try {
        await Notification.updateMany({ isRead: false }, { isRead: true });
        return res.status(200).json({ message: 'All notifications marked as read!' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { getNotifications, markAllAsRead };