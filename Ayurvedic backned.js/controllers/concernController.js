const Concern = require('../models/Concern');

// 🚀 1. Get All Concerns (User side directly items fetch karne ke liye)
exports.getConcerns = async (req, res) => {
  try {
    const concerns = await Concern.find().sort({ createdAt: -1 });
    res.status(200).json(concerns);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching concerns', error: error.message });
  }
};

// 🚀 2. Add New Concern Tab with its explicit items (🔥 UPGRADED TO SUPPORT DYNAMIC MULTI-IMAGES ON CREATION)
exports.addConcern = async (req, res) => {
  try {
    const { name, link, productsData } = req.body;
    
    // Check main concern tab image
    const filesArray = req.files || [];
    const iconFile = filesArray.find(file => file.fieldname === 'image');
    
    if (!iconFile) {
      return res.status(400).json({ message: 'Please upload main concern image' });
    }

    const mainImagePath = iconFile.path.replace(/\\/g, "/");

    // Parse frontend JSON string array
    let parsedProducts = [];
    if (productsData) {
      parsedProducts = JSON.parse(productsData);
    }

    // Assign dynamic product files path inside parsed array supporting multi-images row-wise
    const finalProducts = parsedProducts.map((prod, idx) => {
      // 🚀 DYNAMIC MULTI-FILE FILTER: Row index ke mutabik saari keys filter karenge (e.g., productImages_0, productImages_1)
      const currentRowFiles = filesArray.filter(file => file.fieldname === `productImages_${idx}`);
      
      let prodImgPath = "uploads/placeholder.png"; 
      let prodGalleryPaths = []; 

      // Agar user ne naye product structure row mein files upload ki hain
      if (currentRowFiles.length > 0) {
        const newPaths = currentRowFiles.map(file => file.path.replace(/\\/g, "/"));
        prodImgPath = newPaths[0]; // Pehli photo cover display banegi
        prodGalleryPaths = newPaths; // Saari selected images array format mein lock hongi
      }

      return {
        name: prod.name,
        price: Number(prod.price),
        image: prodImgPath,       // Cover layout framework view
        images: prodGalleryPaths  // 🚀 FIXED: Ab new collection tab publish karte hi array safe ho jayega!
      };
    });

    const newConcern = new Concern({
      name,
      link: link || '/shop',
      image: mainImagePath,
      products: finalProducts
    });

    await newConcern.save();
    res.status(201).json({ message: 'Concern Tab with items published successfully! 🔄🎉', data: newConcern });
  } catch (error) {
    res.status(500).json({ message: 'Error adding concern structure', error: error.message });
  }
};

// 🚀 3. Update Existing Concern Tab (🔥 UPDATED TO SUPPORT MULTIPLE FILE ARRAYS)
exports.updateConcern = async (req, res) => {
  try {
    const { name, link, productsData } = req.body;
    const concernId = req.params.id;

    // Pehle se database mein saved concern data ko fetch karein
    const existingConcern = await Concern.findById(concernId);
    if (!existingConcern) {
      return res.status(404).json({ message: 'Target concern tab not found' });
    }

    let updateData = {
      name,
      link: link || '/shop'
    };

    // 1. Agar main tab ki image change ki gayi hai (Step 1 Image)
    const filesArray = req.files || [];
    const iconFile = filesArray.find(file => file.fieldname === 'image');
    if (iconFile) {
      updateData.image = iconFile.path.replace(/\\/g, "/");
    } else {
      updateData.image = existingConcern.image; // Purani image ko preserve rakha
    }

    // 2. Inner array items matrix parse aur handle karein
    if (productsData) {
      const parsedProducts = JSON.parse(productsData);
      
      updateData.products = parsedProducts.map((prod, idx) => {
        // 🚀 DYNAMIC MULTI-FILE FILTER: Frontend row index ke mutabik saari keys nikalenge (e.g., productImages_0, productImages_1)
        const currentRowFiles = filesArray.filter(file => file.fieldname === `productImages_${idx}`);
        
        let prodImgPath = prod.image; // Purani main image fallback template
        let prodGalleryPaths = prod.images || []; // Purani sub-gallery data items array tracking

        // Agar user ne is specific row mein nayi files select kari hain
        if (currentRowFiles.length > 0) {
          // Saare naye incoming files ke paths ka array banayenge
          const newPaths = currentRowFiles.map(file => file.path.replace(/\\/g, "/"));
          
          prodImgPath = newPaths[0]; // Pehli image main display image banegi
          prodGalleryPaths = newPaths; // 🚀 Saari images array format mein lock hongi
        }
        
        return {
          name: prod.name,
          price: Number(prod.price),
          image: prodImgPath,       // Main cover image layout view
          images: prodGalleryPaths  // 🚀 MongoDB sub-document dynamic array structure
        };
      });
    }

    const updatedConcern = await Concern.findByIdAndUpdate(
      concernId, 
      { $set: updateData }, 
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: 'Concern architecture updated successfully! 🔄🎉', data: updatedConcern });
  } catch (error) {
    console.error("Backend Error Tracker:", error.message);
    res.status(500).json({ message: 'Error updating concern structure', error: error.message });
  }
};

// 🚀 4. Delete concern
exports.deleteConcern = async (req, res) => {
  try {
    const deletedConcern = await Concern.findByIdAndDelete(req.params.id);
    if (!deletedConcern) {
      return res.status(404).json({ message: 'Concern not found' });
    }
    res.status(200).json({ message: 'Concern deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting concern', error: error.message });
  }
};

// 🚀 5. Get Specific Nested Product Details by its ID (SAFE ROBUST EXTENSION)
exports.getProductById = async (req, res) => {
  try {
    let { productId } = req.params;
    
    // Clean string pipeline if any trailing metadata exists
    if (productId.includes(':')) {
      productId = productId.split(':')[0];
    }
    productId = productId.trim();

    // Database check query line
    const concern = await Concern.findOne({ "products._id": productId });

    if (!concern) {
      return res.status(404).json({ message: 'Product not found in any concern category' });
    }

    // Modern JS Array filtering framework (Robust fallback)
    const product = concern.products.find(p => p._id.toString() === productId);

    if (!product) {
      return res.status(404).json({ message: 'Product sub-document mapping failed' });
    }

    // Successful structured response pipeline mapping
    res.status(200).json({
      concernName: concern.name,
      product: product
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product details', error: error.message });
  }
};