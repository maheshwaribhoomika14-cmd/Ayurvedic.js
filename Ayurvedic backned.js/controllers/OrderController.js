const Order = require('../models/Order');

// 1. GET ALL ORDERS (With Full Product Details populated)
// @route   GET /api/orders
const getOrders = async (req, res) => {
    try {
        // .populate('items.product') lagane se product ki details (name, price) live load ho jayengi
        const orders = await Order.find({})
            .populate('items.product')
            .sort({ createdAt: -1 });
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// 2. UPDATE ORDER STATUS (Pending -> Processing -> Delivered)
// @route   PUT /api/orders/:id/status
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status || order.status;
        const updatedOrder = await order.save();

        return res.status(200).json({ message: 'Order status updated successfully!', updatedOrder });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { getOrders, updateOrderStatus };

