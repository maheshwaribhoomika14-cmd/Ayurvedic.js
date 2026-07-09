const Doctor = require('../models/Doctor');

// 🚀 1. GET ALL DOCTORS (User Side Data Fetching Logic)
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 }); // Naye doctors upar dikhenge
    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching doctors",
      error: error.message
    });
  }
};

// 🚀 2. CREATE NEW DOCTOR (Admin Panel Form Insertion Logic)
exports.createDoctor = async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    const savedDoctor = await newDoctor.save();
    res.status(201).json({
      success: true,
      message: "Doctor profile created successfully",
      data: savedDoctor
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error saving doctor data",
      error: error.message
    });
  }
};