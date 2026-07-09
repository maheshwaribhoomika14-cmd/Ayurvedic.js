const Setting = require('../models/Setting');

// 1. GET SETTINGS (Agar pehle se koi row nahi hai toh default create karega)
// @route   GET /api/settings
const getSettings = async (req, res) => {
    try {
        let settings = await Setting.findOne();
        if (!settings) {
            // Agar database khali h toh pehli baar default row insert karega
            settings = await Setting.create({});
        }
        return res.status(200).json(settings);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// 2. UPDATE SETTINGS (With Dynamic Open / Close Operational Status Sync)
// @route   PUT /api/settings
const updateSettings = async (req, res) => {
    try {
        let settings = await Setting.findOne();
        if (!settings) {
            settings = new Setting();
        }
        
        // 🎯 BHOOMIKA REAL-TIME DB KEY MAPS: storeStatus extracted directly from body
        const { shopName, supportEmail, phone, address, shippingCharges, storeStatus } = req.body;
        
        settings.shopName = shopName || settings.shopName;
        settings.supportEmail = supportEmail || settings.supportEmail;
        settings.phone = phone || settings.phone;
        settings.address = address || settings.address;
        settings.shippingCharges = shippingCharges !== undefined ? shippingCharges : settings.shippingCharges;
        
        // Dynamic store status allocation mapping layer
        settings.storeStatus = storeStatus !== undefined ? storeStatus : settings.storeStatus;

        const updatedSettings = await settings.save();
        return res.status(200).json({ message: 'Settings updated successfully!', updatedSettings });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { getSettings, updateSettings };