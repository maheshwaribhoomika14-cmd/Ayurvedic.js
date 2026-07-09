const mongoose = require('mongoose');

// Slider Schema definition
const sliderSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true, // Example save in Compass: '/Slider1.png'
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  buttonText: {
    type: String,
    default: 'SHOP NOW',
  },
  link: {
    type: String,
    default: '/',
  },
}, { timestamps: true });

// 🚨 STRICT EXPLICIT NAMING FIX:
// Third parameter 'sliders' pass karne se Mongoose direct Compass ke 'sliders' collection se link ho jayega.
module.exports = mongoose.model('Slider', sliderSchema, 'sliders');