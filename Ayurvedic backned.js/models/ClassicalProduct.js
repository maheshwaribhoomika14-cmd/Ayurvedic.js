const mongoose = require('mongoose');

const ClassicalProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String, required: true }, // Product ki image path
  category: { type: String, required: true, default: 'arishtam' }, // e.g., 'arishtam', 'asavam', etc.
  inStock: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ClassicalProduct', ClassicalProductSchema);