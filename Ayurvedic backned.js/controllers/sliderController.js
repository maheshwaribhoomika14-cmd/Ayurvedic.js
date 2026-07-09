const Slider = require('../models/Sliders');

// 1. GET ALL SLIDES (Frontend par show karne ke liye)
const getSlides = async (req, res) => {
  try {
    // MongoDB se saari entries fetch karega sorted by creation time
    const slides = await Slider.find().sort({ createdAt: 1 });
    
    // 🚨 DEBUG LOG: Isse aapko apne terminal par saaf dikhega ki actual mein kitni entries frontend ko jaa rahi hain.
    console.log(`[Slider Debug] Frontend requested data. Sent ${slides.length} slides from MongoDB.`);
    
    res.status(200).json(slides);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Slides fetch nahi ho payi', error: error.message });
  }
};

// 2. CREATE NEW SLIDE (Admin panel ya Postman se initial data daalne ke liye)
const createSlide = async (req, res) => {
  const { image, title, subtitle, buttonText, link } = req.body;
  try {
    const newSlide = new Slider({ image, title, subtitle, buttonText, link });
    await newSlide.save();
    
    console.log(`[Slider Debug] New slide added successfully! Title: ${title}`);
    
    res.status(201).json({ message: 'Slide successfully add ho gayi!', newSlide });
  } catch (error) {
    res.status(400).json({ message: 'Slide add karne mein error aayi', error: error.message });
  }
};

module.exports = {
  getSlides,
  createSlide
};