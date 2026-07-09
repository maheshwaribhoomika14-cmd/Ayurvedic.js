const ClassicalProduct = require('../models/ClassicalProduct');

// 1. Get products by category (Frontend par dynamic dikhane ke liye)
exports.getProductsByCategory = async (req, require) => {
  try {
    const { categoryName } = req.params;
    const products = await ClassicalProduct.find({ category: categoryName.toLowerCase() });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching classical products", error });
  }
};

// 2. Add New Classical Product (Admin panel se database me save karne ke liye)
exports.addClassicalProduct = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;
    const newProduct = new ClassicalProduct({
      name,
      description,
      price,
      image,
      category: category.toLowerCase()
    });
    await newProduct.save();
    res.status(201).json({ message: "Product saved successfully!", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error saving product", error });
  }
};