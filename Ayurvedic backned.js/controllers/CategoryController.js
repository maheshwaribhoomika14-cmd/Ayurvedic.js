const Category = require('../models/Category');
const fs = require('fs');
const path = require('path');

// @desc    Add new Category with Multiple Image URL Paths Array and Count Tracking
// @route   POST /api/categories/add
const addCategory = async (req, res) => {
    try {
        // 🚀 FIXED: 'count' parameter req.body ke destructuring block mein include kar diya hai
        const { name, description, count, images } = req.body; 

        if (!name) {
            return res.status(400).json({ message: 'Category name is required' });
        }

        // 🚀 FIXED: Count validation framework checker add kiya hai
        if (!count) {
            return res.status(400).json({ message: 'Product count tracking string is required' });
        }

        const categoryExists = await Category.findOne({ name });
        if (categoryExists) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        let dbImagePathsArray = [];

        // 🔄 MULTI-FILE WRITER LOOP
        if (images && Array.isArray(images) && images.length > 0) {
            const uploadDir = path.join(__dirname, '../uploads');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            for (let i = 0; i < images.length; i++) {
                const singleImage = images[i];

                if (singleImage && singleImage.startsWith('data:image')) {
                    const matches = singleImage.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
                    const ext = matches[1].split('/')[1]; // png, jpeg etc.
                    const base64Data = matches[2];

                    const fileName = `cat_${Date.now()}_${i}.${ext}`;
                    const fileSavePath = path.join(uploadDir, fileName);

                    // File ko system mein physically write kijiye
                    fs.writeFileSync(fileSavePath, base64Data, 'base64');

                    // 🚨 CRITICAL FIX: Base URL hataya, ab sirf relative path save hoga
                    dbImagePathsArray.push(`uploads/${fileName}`);
                }
            }
        }

        if (dbImagePathsArray.length === 0) {
            dbImagePathsArray.push('https://cdn-icons-png.flaticon.com/512/824/824688.png');
        }

        // 🚀 FIXED: Schema creation block mein count data ko pass kiya hai
        const category = await Category.create({ 
            name, 
            description, 
            count,
            images: dbImagePathsArray, 
            image: dbImagePathsArray[0] 
        });
        
        return res.status(201).json({ message: 'Category added successfully!', category });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// @desc    Get all Categories
// @route   GET /api/categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({}).sort({ createdAt: -1 });
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// 🚨 ADDED SINGLE FETCH CONTROL FOR FRONTEND COMPATIBILITY
// @desc    Get Single Category by ID
// @route   GET /api/categories/:id
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found inside database records' });
        }
        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// @desc    Update Category Info and Multiple Desktop Images
// @route   PUT /api/categories/:id
const updateCategory = async (req, res) => {
    try {
        // 🚀 FIXED: Destructuring mein 'count' field update feature ke liye add kiya hai
        const { name, description, count, images } = req.body; 
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const uploadDir = path.join(__dirname, '../uploads');
        let dbImagePathsArray = category.images || []; 

        if (images && Array.isArray(images) && images.length > 0) {
            
            // 🗑️ STORAGE CLEANER: Purani files ko delete karne ka engine
            if (category.images && category.images.length > 0) {
                category.images.forEach((oldImgLink) => {
                    if (oldImgLink && !images.includes(oldImgLink)) {
                        // Relative path se file name nikalne ka asar clean handler
                        const oldFileName = oldImgLink.includes('uploads/') ? oldImgLink.split('uploads/')[1] : oldImgLink;
                        const oldFilePath = path.join(uploadDir, oldFileName);
                        if (fs.existsSync(oldFilePath)) {
                            fs.unlinkSync(oldFilePath); 
                        }
                    }
                });
            }

            dbImagePathsArray = [];

            for (let i = 0; i < images.length; i++) {
                const singleImg = images[i];

                if (singleImg && singleImg.startsWith('data:image')) {
                    const matches = singleImg.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
                    const ext = matches[1].split('/')[1];
                    const base64Data = matches[2];
                    const fileName = `cat_${Date.now()}_${i}.${ext}`;
                    const fileSavePath = path.join(uploadDir, fileName);

                    fs.writeFileSync(fileSavePath, base64Data, 'base64');
                    // 🚨 CRITICAL FIX: Relative standard notation saved
                    dbImagePathsArray.push(`uploads/${fileName}`);
                } else if (singleImg) {
                    // Pre-existing strings safe parsing
                    dbImagePathsArray.push(singleImg.replace('http://localhost:5000/', ''));
                }
            }
        }

        category.name = name || category.name;
        category.description = description || category.description;
        // 🚀 FIXED: Count update validation mapping block set kiya hai
        category.count = count || category.count;
        category.images = dbImagePathsArray.length > 0 ? dbImagePathsArray : category.images; 
        category.image = dbImagePathsArray.length > 0 ? dbImagePathsArray[0] : category.image; 

        const updatedCategory = await category.save();
        return res.status(200).json({ message: 'Category updated successfully!', updatedCategory });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// @desc    Delete Category and its local storage file array
// @route   DELETE /api/categories/:id
const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const uploadDir = path.join(__dirname, '../uploads');

        if (category.images && category.images.length > 0) {
            category.images.forEach((imgLink) => {
                const fileName = imgLink.includes('uploads/') ? imgLink.split('uploads/')[1] : imgLink;
                const filePath = path.join(uploadDir, fileName);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            });
        }

        await Category.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: 'Category deleted successfully from MongoDB!' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { addCategory, getCategories, getCategoryById, updateCategory, deleteCategory };