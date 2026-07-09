const mongoose = require('mongoose');

const concernSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true // Jaise: ASHWAGANDHA, TRIPHALA
  },
  image: {
    type: String,
    required: true // Tab ki apni main display image
  },
  link: {
    type: String,
    default: '/shop'
  },
  // 🚀 DYNAMIC PRODUCTS NESTED INSIDE THIS TAB
  products: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String, required: true }, // Product ki image path
      
      // 🚀 FIXED SYSTEM BINDING: Store dynamic thumbnails carousel array string paths smoothly in MongoDB
      images: { 
        type: [String], 
        default: [] 
      }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Concern', concernSchema);