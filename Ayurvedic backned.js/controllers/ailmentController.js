const Ailment = require('../models/Ailment');

// 1. Get All Ailments (Using .lean() for direct key access)
exports.getAllAilments = async (req, res) => {
  try {
    // .lean() lagane se Mongoose pure JSON object deta hai, jisse name aur count directly access ho jaate hain
    const ailments = await Ailment.find().sort({ createdAt: -1 }).lean();
    
    // Ekdum safe side rehne ke liye double-check formatting
    const sanitizedAilments = ailments.map(item => ({
      _id: item._id,
      name: item.name || "Ayurvedic Category",
      count: item.count || "0 Products",
      image: item.image
    }));

    res.status(200).json(sanitizedAilments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Add New Ailment
exports.addAilment = async (req, res) => {
  try {
    const name = req.body.name ? req.body.name.trim() : '';
    const count = req.body.count ? req.body.count.trim() : '0 Products';
    
    let imagePath = '';
    if (req.file) {
      imagePath = `uploads/${req.file.filename}`.replace(/\\/g, "/");
    }

    if (!name) {
      return res.status(400).json({ message: "Ailment Name is required!" });
    }
    if (!imagePath) {
      return res.status(400).json({ message: "Image file is required!" });
    }

    const newAilment = new Ailment({
      name,
      count,
      image: imagePath
    });

    await newAilment.save();
    res.status(201).json({ message: "Ailment added successfully!", data: newAilment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Delete Ailment
exports.deleteAilment = async (req, res) => {
  try {
    const ailment = await Ailment.findById(req.params.id);
    if (!ailment) {
      return res.status(404).json({ message: "Ailment not found!" });
    }

    await Ailment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Ailment deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};