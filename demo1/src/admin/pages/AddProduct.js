import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  
  // 📸 STABLE FILE OBJECT STATES FOR MULTER STORAGE
  const [mainFile, setMainFile] = useState(null); // Primary Binary File Buffer
  const [mainPreview, setMainPreview] = useState(''); // Only for front-end local preview
  
  const [galleryFiles, setGalleryFiles] = useState([]); // Real array files for server upload
  const [galleryPreviews, setGalleryPreviews] = useState([]); // Previews local array paths
  
  const [category, setCategory] = useState(''); 
  const [categories, setCategories] = useState([]); 
  const [alignment, setAlignment] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/categories');
        setCategories(res.data);
      } catch (err) {
        console.error("Categories load karne mein dikkat aayi:", err);
      }
    };
    fetchCategories();
  }, []);

  // Main Cover Image Handler (Binary File + Local Preview URL)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainFile(file); // Real file object saved for backend
      setMainPreview(URL.createObjectURL(file)); // Fast local temporary preview URL
    }
  };

  // 🚀 Multiple Gallery Images Selection Handler
  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setGalleryFiles(files); // Real files list saved for backend loop

    // Generating fast temporary preview loops for admin interface view
    const previewUrls = files.map(file => URL.createObjectURL(file));
    setGalleryPreviews(previewUrls);
  };

  const handleForceSubmitData = async (e) => {
    e.preventDefault();

    if (!name.trim() || !price) {
      return alert("Please fill Product Name and Price fields!");
    }
    
    if (!alignment) {
      return alert("Please select an Alignment for general ailments section routing!");
    }

    try {
      const finalCategoryValue = category || (categories.length > 0 ? categories[0]._id : "000000000000000000000000");

      // 🚀 🔥 MULTIPART FORM DATA ENGINE INITIALIZED TO TRANSFER REAL FILES Safely
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('price', Number(price));
      formData.append('description', description ? description.trim() : "");
      formData.append('category', finalCategoryValue);
      formData.append('alignment', alignment);

      // Main image file element append
      if (mainFile) {
        formData.append('image', mainFile);
      }

      // Multiple sub gallery images append via same field key context loop
      if (galleryFiles.length > 0) {
        galleryFiles.forEach((file) => {
          formData.append('images', file); // Maps flawlessly with backend upload.fields array keys
        });
      }

      // Sending multipart content header to backend
      const response = await axios.post('http://localhost:5000/api/products/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201 || response.data.success) {
        alert(`🎉 Product "${name}" with Multiple Images Added Successfully in MongoDB Cluster!`);
        navigate('/admin/all-products');
      }
    } catch (error) {
      console.error("Product save error:", error);
      alert(error.response?.data?.message || "Something went wrong while saving product!");
    }
  };

  return (
    <div className="flex-1 bg-[#f4f6f4] p-8 min-h-screen font-sans w-full">
      
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6 border-b border-gray-200/60 pb-4">
        <Link to="/admin/all-products" className="text-gray-400 hover:text-[#1b4329] transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#1b4329] tracking-wide">Add New Product</h1>
          <p className="text-xs text-gray-400 mt-1">Insert medicine tablets, syrups, or ghee with multiple images into database</p>
        </div>
      </div>

      {/* Main Entry Form Layout */}
      <div className="max-w-xl bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <form onSubmit={handleForceSubmitData} className="space-y-4">
          
          {/* Field 1: Product Name */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Product Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Ayurveda Herbal Kajal" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1b4329] text-sm text-gray-700 transition-all placeholder:text-gray-300"
            />
          </div>

          {/* Row for Price & Category Dropdown */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Price (INR)</label>
              <input 
                type="number" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g., 104" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1b4329] text-sm text-gray-700 transition-all"
              />
            </div>

            {/* DYNAMIC CATEGORY DROPDOWN SELECTOR */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Select Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1b4329] text-sm text-gray-700 bg-white transition-all"
              >
                <option value="">-- Choose Category --</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* DYNAMIC ALIGNMENT DROPDOWN FIELD */}
          <div className="mb-4 relative"> 
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Select Alignment
            </label>
            <div className="relative">
              <select
                value={alignment}
                onChange={(e) => setAlignment(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1b4329] text-sm text-gray-700 bg-white transition-all uppercase font-semibold text-xs tracking-wide"
                required
              >
                <option value="">-- Choose Alignment --</option>
                <option value="ayurvedic-face-care-products">AYURVEDIC PRODUCTS FOR FACE CARE</option>
                <option value="gastro-health-medicines">GASTRO HEALTH WITH AYURVEDIC MEDICINES</option>
                <option value="ayurvedic-hair-care-products">AYURVEDIC HAIR CARE PRODUCTS</option>
                <option value="men-health-care-ayurveda">MEN HEALTH CARE IN AYURVEDA</option>
                <option value="ayurvedic-dental-care-products">AYURVEDIC DENTAL CARE PRODUCTS</option>
              </select>
            </div>
          </div>

          {/* Field 3: Main Cover Image Upload */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Main Cover Image</label>
            <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-4 bg-gray-50/50 hover:bg-gray-50 transition-all">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              {mainPreview ? (
                <img src={mainPreview} alt="Preview" className="w-24 h-24 object-cover rounded-xl shadow-sm border border-gray-100" />
              ) : (
                <div className="text-center p-2">
                  <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                  <span className="text-xs text-gray-500 font-medium">Click to browse product main photo</span>
                </div>
              )}
            </div>
          </div>

          {/* 🚀 4. Product Gallery Images (Multiple Files Selector) */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Product Gallery Images (Select Multiple thumbnails)</label>
            <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-4 bg-gray-50/50 hover:bg-gray-50 transition-all">
              <input 
                type="file" 
                accept="image/*"
                multiple 
                onChange={handleGalleryChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="text-center p-2">
                <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                <span className="text-xs text-gray-500 font-medium">Click to upload multiple side carousel images</span>
                {galleryFiles.length > 0 && (
                  <p className="text-xs text-emerald-600 font-bold mt-2">
                    ✓ {galleryFiles.length} Gallery Images Selected Successfully!
                  </p>
                )}
              </div>
            </div>
            
            {/* Gallery Previews Container */}
            {galleryPreviews.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3 p-2 bg-gray-50 rounded-xl border border-gray-100">
                {galleryPreviews.map((img, idx) => (
                  <img key={idx} src={img} alt={`Preview ${idx}`} className="w-12 h-12 object-cover rounded-lg border border-gray-200 shadow-xs" />
                ))}
              </div>
            )}
          </div>

          {/* Field 4: Description */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Description / Benefits</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write short product specifications..." 
              rows="3"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1b4329] text-sm text-gray-700 transition-all resize-none"
            />
          </div>

          {/* Submit Trigger */}
          <button 
            type="submit" 
            style={{ backgroundColor: '#1b4329', color: '#ffffff', cursor: 'pointer' }}
            className="w-full flex items-center justify-center space-x-2 p-3 rounded-xl text-xs font-bold tracking-wider uppercase shadow-md mt-6"
          >
            <Save size={16} /> <span>Save Product</span>
          </button>

        </form>
      </div>

    </div>
  );
};

export default AddProduct;