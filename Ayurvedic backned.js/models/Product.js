const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add product name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please add product description']
    },
    price: {
        type: Number,
        required: [true, 'Please add product price'],
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category',                      
        required: false // 🚨 FIXED: Ab category select na hone par bhi database save block nahi karega
    },
    
    // 🚀 🔥 BHOOMIKA, YEH NAYI ALIGNMENT FIELD CODES INJECT HO GAYI HAI
    alignment: {
        type: String,
        required: [true, 'Please select an ailment alignment'],
        trim: true,
        default: ''
    },

    stock: {
        type: Number,
        required: false, // 🚨 FIXED: Kyunki aapke form mein stock input nahi hai, isey optional kar diya h
        default: 10 // Ek default standard value set kar di h taaki out of stock na dikhaye
    },
    
    // BACKEND FALLBACKS FOR IMAGE CAROUSELS: Single string image backup support (Main Cover Image)
    image: {
        type: String,
        default: ''
    },

    // 🚀 MULTIPLE IMAGES SCHEMATIC ARRAY: Store dynamic thumbnails carousel array string paths smoothly
    images: {
        type: [String],
        required: false,
        default: []
    },

    /* 🚀 NEW SCHEMATIC EXTRA METADATA ATTRIBUTES FOR DETAIL PAGE DYNAMICS */
    vendor: {
        type: String,
        default: 'Kottakkal Arya Vaidya Sala'
    },
    sku: {
        type: String,
        default: 'AK-A001'
    },
    availability: {
        type: String,
        default: 'Available'
    },
    tags: {
        type: [String],
        required: false,
        default: []
    },

    /* NEW AYURVEDIC ATTRIBUTES */
    dosage: {
        type: String,
        trim: true,
        default: ''
    },
    usage: {
        type: String,
        trim: true,
        default: ''
    },
    indications: {
        type: String,
        trim: true,
        default: ''
    }
}, {
    timestamps: true // Auto-manages createdAt and updatedAt fields in MongoDB
});

module.exports = mongoose.model('Product', productSchema);