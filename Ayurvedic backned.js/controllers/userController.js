const User = require('../models/User');

// @desc    Login user & get token
// @route   POST /api/users/login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check karein ki user database mein exist karta hai ya nahi
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Galti! Yeh email registered nahi hai.' });
        }

        // 2. Check karein ki password sahi hai ya nahi
        // (Abhi hum plain-text check kar rahe hain jaisa aapne set kiya tha)
        if (user.password !== password) {
            return res.status(401).json({ message: 'Galti! Password mismatch ho raha hai.' });
        }

        // 3. Login success hone par response bhejein
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: "mock-jwt-token-xyz123" // Dashboard open karne ke liye static token passing
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// @desc    Register a new user
// @route   POST /api/users/register
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check karein ki user pehle se exist toh nahi karta
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Naya user create karein
        const user = await User.create({
            name,
            email,
            password, // Agle step mein hum isko secure/hash karenge
            role
        });

        if (user) {
            return res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                message: "User registered successfully! Ab Compass refresh kijiye."
            });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// @desc    Get all users (Testing ke liye)
// @route   GET /api/users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// @desc    Get all registered customers (Only role: 'user' for admin panel view)
// @route   GET /api/users/customers
const getCustomers = async (req, res) => {
    try {
        // Sirf unhe dhoondhein jinka role 'user' hai aur unhe naye se purane order mein sort karein
        const customers = await User.find({ role: 'user' }).sort({ createdAt: -1 });
        return res.status(200).json(customers);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// 🚨 Saare functions ko ek sath perfect export kiya (LoginUser ke sath)
module.exports = { loginUser, registerUser, getUsers, getCustomers };