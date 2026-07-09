const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qualification: { type: String, required: true },
  image: { type: String, required: true }, // URL ya file path string
  description: { type: String, required: true },
  experience: { type: String, required: true },
  clinicInfo: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Doctor', doctorSchema);