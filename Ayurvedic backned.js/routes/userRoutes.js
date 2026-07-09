const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Hashing ke liye code layout trigger
const User = require('../models/User'); // User model reference layer scan

// Aapne controllers mein jo login function banaya hai use check kar lena
const { loginUser } = require('../controllers/userController'); 

// =========================================================================
// 🚀 🔥 BHOOMIKA NEW INDEPENDENT REGISTER ENDPOINT (INJECTED SAFELY)
// Isse aapka purana niche wala login code bilkul disturb nahi hoga!
// =========================================================================
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required!" });
        }

        // 1. Email check karenge ki unique h ya nahi
        let userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: "User already registered with this email!" });
        }

        // 2. Security ke liye Password hash karenge
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. New User Object create karke save karenge
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        return res.status(201).json({ success: true, message: "User account created successfully!" });

    } catch (error) {
        console.error("Register process error stack:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
});


// 🚨 LINEAR ROUTE: Yeh exact '/login' path handle karega (Aapka Original Code Unchanged)
router.post('/login', loginUser);

module.exports = router;