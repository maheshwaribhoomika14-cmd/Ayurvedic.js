const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  link: {
    type: String,
    default: "/shop"
  },
  position: {
    type: String,
    default: "middle"
  }
}, { timestamps: true });

module.exports = mongoose.model('Banner', bannerSchema);