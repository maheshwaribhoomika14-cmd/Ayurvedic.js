const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        unique: true,
        trim: true
    },
   
    // 🚀 NEW FIELD ADDED: General Ailments carousel ke product tracking counter data ko strict save karne ke liye
    count: {
        type: String,
        required: [true, 'Product count tracking string is required'],
        trim: true
    },

    // 🚨 MULTI-IMAGE LOGIC ADDED BY DEV: Desktop se Ctrl/Shift daba kar jo multiple images choose karenge, wo is array packet mein save hongi
    images: {
        type: [String], // Frontend se aane wale saari images ke Base64 buffer strings ka packet array yahan save hoga
        default: [] // By default yeh ek khali array rahega jab tak multiple images na dali jayein
    },

    image: {
        type: String, // Frontend se aane wale product image ka link URL string yahan save hoga
        default: 'https://cdn-icons-png.flaticon.com/512/824/824688.png' // Agar image nahi daali toh default leaf icon set ho jayega
    },
    status: {
        type: String,
        default: 'Active' // By default status Active rahega jo table mein kaam aayega
    }
}, {
    timestamps: true // Isse createdAt aur updatedAt automatically manage ho jayenge
});

module.exports = mongoose.model('Category', categorySchema);