const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

// @desc    Get complete dynamic analytical reports summary
// @route   GET /api/reports/stats
const getReportStats = async (req, res) => {
    try {
        // 1. Live Products and Registered Customers Count
        const totalProducts = await Product.countDocuments();
        const totalCustomers = await User.countDocuments({ role: 'user' });

        // 2. Total Active Orders (Jo Cancelled nahi hain unka live count)
        const totalOrders = await Order.countDocuments({ status: { $ne: 'Cancelled' } });

        // 3. Live Sales Revenue Aggregation Pipeline
        const salesData = await Order.aggregate([
            {
                $match: { status: { $ne: 'Cancelled' } }
            },
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: '$totalAmount' }
                }
            }
        ]);

        const totalSales = salesData.length > 0 ? salesData[0].totalSales : 0;

        // Frontend ko fully computed dynamic object return karein
        return res.status(200).json({
            totalProducts,
            totalCustomers,
            totalOrders,
            totalSales,
            generatedAt: new Date()
        });
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { getReportStats };