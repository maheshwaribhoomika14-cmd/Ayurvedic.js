const Banner = require('../models/Banner');

// Get Middle Banner Data
exports.getMiddleBanner = async (req, res) => {
  try {
    const banner = await Banner.findOne({ position: "middle" }).sort({ createdAt: -1 });
    if (!banner) {
      return res.status(404).json({ message: "No middle banner found" });
    }
    res.status(200).json(banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add/Update Banner
exports.saveMiddleBanner = async (req, res) => {
  try {
    const imagePath = req.file ? `uploads/${req.file.filename}`.replace(/\\/g, "/") : '';
    const { link } = req.body;

    if (!imagePath) {
      return res.status(400).json({ message: "Banner image file is required!" });
    }

    let banner = await Banner.findOne({ position: "middle" });
    if (banner) {
      banner.image = imagePath;
      banner.link = link || "/shop";
      await banner.save();
    } else {
      banner = new Banner({
        image: imagePath,
        link: link || "/shop",
        position: "middle"
      });
      await banner.save();
    }

    res.status(200).json({ message: "Banner updated successfully!", data: banner });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};