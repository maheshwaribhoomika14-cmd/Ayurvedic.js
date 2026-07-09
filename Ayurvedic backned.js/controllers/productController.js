const Product = require('../models/Product');
const mongoose = require('mongoose'); // 🚀 Models bypass scanning ke liye mongoose ko explicitly use kiya

// 🚀 ADD NEW PRODUCT (MULTIPART & UNIVERSAL IMAGE LAYER COMPATIBLE WITH METADATA)
exports.addProduct = async (req, res) => {
    try {
        const { 
            name, 
            price, 
            category, 
            alignment, 
            description, 
            dosage, 
            usage, 
            indications,
            vendor,
            sku,
            availability,
            tags
        } = req.body;

        if (!name || !price) {
            return res.status(400).json({ 
                success: false, 
                message: "Product Name and Price are strictly required!" 
            });
        }

        let productImages = [];

        if (req.files && req.files.length > 0) {
            productImages = req.files.map(file => {
                const rawPath = file.path || `uploads/${file.filename}`;
                return rawPath.replace(/\\/g, '/'); 
            });
        } 
        else if (req.body.images) {
            productImages = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
        } 
        else if (req.body.image) {
            productImages = [req.body.image];
        }

        const finalCategory = category && category !== "" ? category : "000000000000000000000000";

        const newProduct = new Product({
            name: name.trim(),
            price: Number(price),
            category: finalCategory,
            alignment: alignment ? alignment.trim() : "", 
            description: description ? description.trim() : "",
            dosage: dosage ? dosage.trim() : "",
            usage: usage ? usage.trim() : "",
            indications: indications ? indications.trim() : "",
            image: productImages.length > 0 ? productImages[0] : "",
            images: productImages,
            vendor: vendor ? vendor.trim() : 'Kottakkal Arya Vaidya Sala',
            sku: sku ? sku.trim() : 'AK-A001',
            availability: availability ? availability.trim() : 'Available',
            tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim())) : []
        });

        await newProduct.save();

        return res.status(201).json({
            success: true,
            message: "Product saved successfully in MongoDB Cluster!",
            product: newProduct
        });

    } catch (error) {
        console.error("Database Engine Error:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Internal Server Crash during save structure", 
            error: error.message 
        });
    }
};

// 📁 GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 🎯 🔥 BHOOMIKA FIX: GET SINGLE PRODUCT BY ID (UNIVERSAL SCANNER LAYER)
// Isme humne multi-collection nested array scanning lock add kiya hai taaki dynamic tabs data fetch ho sake
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Backend Lookup Engine triggered for target token ID:", id);

        // Path A: Pehle standard products collection check karenge
        let product = await Product.findById(id).populate('category');

        // Path B: Agar standard mein nahi mila, toh concerns collection ke nested arrays scan karenge
        if (!product) {
            console.log("Target product missing in standard collection, searching nested concern array pools...");
            
            // concerns model access sequence layer query
            const concerns = await mongoose.connection.db.collection('concerns').find({}).toArray();
            
            if (Array.isArray(concerns)) {
                for (let concern of concerns) {
                    if (concern.products && Array.isArray(concern.products)) {
                        // Strict case-insensitive dynamic mapping match sequence rule execution
                        const match = concern.products.find(p => {
                            const dbId = p._id ? String(p._id).trim().toLowerCase() : '';
                            const urlId = id ? String(id).trim().toLowerCase() : '';
                            return dbId === urlId;
                        });
                        
                        if (match) {
                            product = match;
                            break;
                        }
                    }
                }
            }
        }

        // Response allocation engine logic blocker checks
        if (!product) {
            return res.status(404).json({ 
                success: false, 
                message: "Product stack completely missing in MongoDB Server cluster nodes." 
            });
        }

        return res.status(200).json(product);

    } catch (error) {
        console.error("Backend single dynamic packet router crash diagnostics:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 📝 UPDATE PRODUCT (MULTIPART MULTI-IMAGES FULL EDIT LAYER FIXED)
exports.updateProduct = async (req, res) => {
    try {
        const { 
            name, 
            price, 
            alignment, 
            description, 
            dosage, 
            usage, 
            indications,
            vendor,
            sku,
            availability,
            tags
        } = req.body;
        
        let updateData = {};
        if (name) updateData.name = name.trim();
        if (price) updateData.price = Number(price);
        if (alignment) updateData.alignment = alignment.trim();
        if (description) updateData.description = description.trim();
        if (dosage) updateData.dosage = dosage.trim();
        if (usage) updateData.usage = usage.trim();
        if (indications) updateData.indications = indications.trim();
        if (vendor) updateData.vendor = vendor.trim();
        if (sku) updateData.sku = sku.trim();
        if (availability) updateData.availability = availability.trim();
        if (tags) updateData.tags = Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim());

        if (req.files && req.files.length > 0) {
            const productImages = req.files.map(file => {
                const rawPath = file.path || `uploads/${file.filename}`;
                return rawPath.replace(/\\/g, '/'); 
            });
            
            updateData.image = productImages[0];
            updateData.images = productImages; 
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            { $set: updateData }, 
            { new: true }
        );

        return res.status(200).json({ 
            success: true, 
            message: "Product data structure and all images updated successfully!", 
            product: updatedProduct 
        });
    } catch (error) {
        console.error("Update process crash diagnostic:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 🗑️ DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json({ success: true, message: "Product deleted safely" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 🚀 🔥 BHOOMIKA STRICT CASE-INSENSITIVE FUZZY SEARCH ENGINE
// Purane duplicate token splitting jhamela ko hata kar clean regex engine set kar diya h
exports.searchProducts = async (req, res) => {
    try {
        const query = req.query.q ? String(req.query.q).trim() : '';
        if (!query || query.length < 2) return res.status(200).json([]);

        // 🎯 Word-by-word structural sequential query builder (Brahmi par strictly Brahmi hi dhoondhega)
        const regex = new RegExp(query, 'i'); 

        let results = [];

        // 1. Scan the main products collection first (Matching Name or Description)
        const mainProducts = await Product.find({
            $or: [
                { name: regex },
                { description: regex }
            ]
        }).limit(8); // Dropdown clean and light weight execution limit
        
        results = [...mainProducts];

        // 2. Scan fallback from concerns nested array sub-pools if limit underflow
        if (results.length < 5) {
            const concerns = await mongoose.connection.db.collection('concerns').find({}).toArray();
            for (let concern of concerns) {
                if (concern.products && Array.isArray(concern.products)) {
                    const nestedMatches = concern.products.filter(p => p.name && regex.test(p.name));
                    for (let match of nestedMatches) {
                        // Double duplication tokens mapping validator check layer
                        if (!results.some(r => String(r._id) === String(match._id)) && results.length < 8) {
                            results.push(match);
                        }
                    }
                }
            }
        }

        return res.status(200).json(results);
    } catch (error) {
        console.error("Search engine crash routing diagnostics:", error);
        return res.status(200).json([]); 
    }
};