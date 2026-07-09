const Enquiry = require('../models/Enquiry');

// 1. CREATE NEW ENQUIRY (User side ke liye)
// @route   POST /api/enquiries
const createEnquiry = async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;
        const enquiry = await Enquiry.create({ name, email, phone, subject, message });
        return res.status(201).json({ message: 'Enquiry submitted successfully!', enquiry });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// 2. GET ALL ENQUIRIES (Admin panel ke liye)
// @route   GET /api/enquiries
const getEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
        return res.status(200).json(enquiries);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { createEnquiry, getEnquiries };