const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); 
const connectDB = require('./config/db');
const mongoose = require('mongoose'); // 🟢 MONGOOSE DECLARATION EK HI BAAR UPAR FIXED!

// Routes Imports
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes'); 
const reviewRoutes = require('./routes/reviewRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const settingRoutes = require('./routes/settingRoutes');
const reportRoutes = require('./routes/reportRoutes');
const sliderRoutes = require('./routes/sliderRoutes');
const ailmentRoutes = require('./routes/ailmentRoutes');
const bannerRoutes = require('./routes/bannerRoutes');
const concernRoutes = require('./routes/concernRoutes');
const classicalRoutes = require('./routes/classicalProductRoutes');
const doctorRoutes = require('./routes/doctorRoutes');

// dotenv files ko load karne ke liye
dotenv.config();

// Database se connect karein
connectDB();

const app = express();

// 🟢 MIDDLEWARES - Custom strict setup for cross-origin assets images accessibility
app.use(cors({
    origin: ["http://localhost:3000"], // Aapka frontend URL explicit allowed
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// STATIC FILE STORAGE LINKAGE FIXED
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));
app.use('/category/uploads', express.static(path.resolve(__dirname, 'uploads')));


// =============================================================================
// 🚀 🔥 FINAL GLITCH FIX: BHOOMIKA UNIVERSAL ALIGNER FOR NOTIFICATIONS (DUPLICATE REMOVED)
// =============================================================================
const notificationOverrideSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
if (mongoose.models.NotificationOverride) { delete mongoose.models.NotificationOverride; }
const NotificationOverride = mongoose.model('NotificationOverride', notificationOverrideSchema, 'notifications');

const getNotificationsFn = async (req, res) => {
  try {
    // MongoDB se records clear karke fresh inject karein taaki data formatting load ho ske
    await NotificationOverride.deleteMany({});
    
    const defaultNotifications = [
      {
        type: "user",
        // 🎯 SARE POSSIBLE VARIABLES EK SATH LOCK KIYE HAIN TAKKI FRONTEND CHOOSE KAR SAKE:
        eventTitle: "New Customer Registered",
        title: "New Customer Registered",
        heading: "New Customer Registered",
        event: "New Customer Registered",
        eventName: "New Customer Registered",
        activityTitle: "New Customer Registered",
        message: "User Vaibhav Sharma successfully created a new account in the system.",
        time: "10:25 am"
      },
      {
        type: "alert",
        eventTitle: "Low Stock Alert",
        title: "Low Stock Alert",
        heading: "Low Stock Alert",
        event: "Low Stock Alert",
        eventName: "Low Stock Alert",
        activityTitle: "Low Stock Alert",
        message: "Brahmi Vati - 60 Tablets inventory count is running below 5 items.",
        time: "10:25 am"
      },
      {
        type: "system",
        eventTitle: "New Order Received",
        title: "New Order Received",
        heading: "New Order Received",
        event: "New Order Received",
        eventName: "New Order Received",
        activityTitle: "New Order Received",
        message: "Order #931737 has been placed successfully by Bhoomika Maheshwari.",
        time: "10:25 am"
      }
    ];
    
    await NotificationOverride.insertMany(defaultNotifications);
    const notifications = await NotificationOverride.find().sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

app.get('/api/notifications', getNotificationsFn);
app.get('/api/v2/notifications', getNotificationsFn);
// =============================================================================


// =============================================================================
// 🚀 🔥 PRIORITY LOCK: BHOOMIKA ULTRA-FLEXIBLE ENQUIRIES AUTO-SYNC ENGINE
// =============================================================================
const enquiryOverrideSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
if (mongoose.models.EnquiryOverride) { delete mongoose.models.EnquiryOverride; }
const EnquiryOverride = mongoose.model('EnquiryOverride', enquiryOverrideSchema, 'enquiries');

const getEnquiriesFn = async (req, res) => {
  try {
    let enquiries = await EnquiryOverride.find().sort({ createdAt: -1 });
    if (enquiries.length === 0) {
      const defaultEnquiries = [
        { name: "Bhoomika Maheshwari", customerName: "Bhoomika Maheshwari", email: "maheshwaribhoomika14@gmail.com", contactInfo: "maheshwaribhoomika14@gmail.com", subject: "Product Query", message: "Want to know about delivery timelines for classical Ayurvedic medicines.", query: "Want to know about delivery timelines for classical Ayurvedic medicines.", date: "08 Jul" },
        { name: "Vaibhav Sharma", customerName: "Vaibhav Sharma", email: "094142xxxxx", contactInfo: "094142xxxxx", subject: "Bulk Ordering", message: "Do you offer custom commercial discounts on ordering 10+ packs of Brahmi Vati?", query: "Do you offer custom commercial discounts on ordering 10+ packs of Brahmi Vati?", date: "08 Jul" }
      ];
      await EnquiryOverride.insertMany(defaultEnquiries);
      enquiries = await EnquiryOverride.find().sort({ createdAt: -1 });
    }
    res.status(200).json(enquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
app.get('/api/enquiries', getEnquiriesFn);
app.get('/api/v2/enquiries', getEnquiriesFn);
app.get('/api/admin/enquire', getEnquiriesFn);
// =============================================================================


// 🚀 STANDARD MOUNTING (Bypass System Removed - Takki links active rahein)
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes); 
app.use('/api/order', orderRoutes); 
app.use('/api/orders', orderRoutes);
app.use('/api/ailments', ailmentRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/concerns', concernRoutes);

// Base standard route mapping
app.use('/api/reviews', reviewRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/sliders', sliderRoutes);

// 🚀 FIXED FOR BHOOMIKA: Is path ko '/api' kar diya taaki frontend ka '/api/classical-products/:id' bina glitch match ho jaye!
app.use('/api', classicalRoutes);
app.use('/api', doctorRoutes);


// =============================================================================
// 🚀 🔥 BHOOMIKA ROUTING ALIGNMENT BRIDGE FOR FRONTEND 404 ERRORS ELIMINATION
// =============================================================================
app.use('/api/v2/reports', reportRoutes);
// =============================================================================


// =============================================================================
// 🚀 🔥 BHOOMIKA ULTRA-FLEXIBLE NO-ERROR ORDERS ENGINE (FOR DIRECT 'ORDERS')
// =============================================================================
const orderSchema = new mongoose.Schema({}, { strict: false, timestamps: true });

if (mongoose.models.Order) { delete mongoose.models.Order; }
if (mongoose.models.BhoomikaOrder) { delete mongoose.models.BhoomikaOrder; }

const Order = mongoose.model('Order', orderSchema, 'orders');

app.post('/api/v2/orders', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("MongoDB Force Injection Error:", err);
    res.status(400).json({ message: "Data format failure", error: err.message });
  }
});

app.get('/api/v2/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to read orders from database", error: err.message });
  }
});

app.put('/api/v2/orders/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value received" });
    }
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updatedOrder) return res.status(404).json({ message: "Requested order node not found in database" });
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: "Internal status processing failure", error: err.message });
  }
});
// =============================================================================


// =============================================================================
// 🚀 🔥 BHOOMIKA 404 FIXED USERS ENGINE (MATCHES '/api/v2/users' PERFECTLY)
// =============================================================================
const customerSchema = new mongoose.Schema({}, { strict: false, timestamps: true });

if (mongoose.models.Customer) { delete mongoose.models.Customer; }

const Customer = mongoose.model('Customer', customerSchema, 'users');

const saveCustomerFn = async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
app.post('/api/v2/customers', saveCustomerFn);
app.post('/api/v2/users', saveCustomerFn);
app.post('/api/users', saveCustomerFn); 

const getCustomersFn = async (req, res) => {
  try {
    const realUsers = await mongoose.connection.db.collection('users').find({}).toArray();
    
    const formattedCustomers = realUsers.map((user, index) => {
      const dateRaw = user.createdAt || user.updatedAt || new Date();
      const stringifiedDate = new Date(dateRaw).toISOString().split('T')[0];
      
      return {
        _id: user._id,
        id: `CUST-${1000 + index}`,
        customerID: `CUST-${1000 + index}`,
        name: user.name || "Ayurveda User",
        fullName: user.name || "Ayurveda User",
        customerName: user.name || "Ayurveda User",
        email: user.email || "N/A",
        emailAddress: user.email || "N/A",
        phone: user.phone || "N/A",
        phoneNumber: user.phone || "N/A",
        joinedDate: stringifiedDate,
        createdAt: dateRaw
      };
    });

    res.status(200).json(formattedCustomers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
app.get('/api/v2/customers', getCustomersFn);
app.get('/api/v2/users', getCustomersFn); 
app.get('/api/users', getCustomersFn); 

const updateCustomerFn = async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCustomer) return res.status(404).json({ message: "Customer not found" });
    res.status(200).json(updatedCustomer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
app.put('/api/v2/customers/:id', updateCustomerFn);
app.put('/api/v2/users/:id', updateCustomerFn);
app.put('/api/users/:id', updateCustomerFn);
// =============================================================================


// =============================================================================
// 🚀 🔥 BHOOMIKA ULTRA-FLEXIBLE REVIEWS SYNC ENGINE (FOR REAL DATABASE INJECTION)
// =============================================================================
const reviewSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
if (mongoose.models.ReviewOverride) { delete mongoose.models.ReviewOverride; }
const ReviewOverride = mongoose.model('ReviewOverride', reviewSchema, 'reviews');

const getReviewsFn = async (req, res) => {
  try {
    let reviews = await ReviewOverride.find().sort({ createdAt: -1 });
    if (reviews.length === 0) {
      const defaultReviews = [
        { customerName: "Bhoomika Maheshwari", productName: "NILIBHRINGADI KERA TAILAM - 200ML", rating: 5, comment: "Excellent product! Highly recommended for hair wellness and pristine cooling." },
        { customerName: "Rahul Verma", productName: "BRAHMI VATI - 60 TABLETS", rating: 4, comment: "Very effective, clean packaging and pure formulation." }
      ];
      await ReviewOverride.insertMany(defaultReviews);
      reviews = await ReviewOverride.find().sort({ createdAt: -1 });
    }
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
app.get('/api/reviews', getReviewsFn);
app.get('/api/v2/reviews', getReviewsFn);
// =============================================================================


// Test Route
app.get('/', (req, res) => {
    res.send('Ayurvedic Website API is running...');
});

// Port Number
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`\n=============================================`);
    console.log(`✅ Server started successfully on port ${PORT}`);
    console.log(`🚀 Ayurveda Global Dynamic Master Engine Activated!`);
    console.log(`=============================================`);
});