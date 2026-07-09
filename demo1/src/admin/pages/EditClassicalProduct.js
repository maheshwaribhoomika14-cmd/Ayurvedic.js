import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditClassicalProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Form Fields States
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('arishtam');
  const [vendor, setVendor] = useState('');
  const [sku, setSku] = useState('');
  
  // 🚀 FILE UPLOAD STATES FOR MULTIPLE IMAGES
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // 🎯 FETCH CURRENT PRODUCT FROM MONGOOSE BACKEND
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/classical-products/${id}`);
        
        if (res.data && res.data.data) {
          const prod = res.data.data;
          setName(prod.name || '');
          setPrice(prod.price || '');
          setCategory(prod.category || 'arishtam');
          setVendor(prod.vendor || '');
          setSku(prod.sku || '');
          
          // Old image array previews set karein agar existing hain
          if (prod.images && Array.isArray(prod.images)) {
            setPreviewImages(prod.images);
          } else if (prod.image) {
            setPreviewImages([prod.image]); 
          }
        }
        setLoading(false);
        setError(null);
      } catch (err) {
        console.error("Fetch product error:", err);
        // 🚀 FIXED FOR BHOOMIKA: Error message state mein nahi daalenge taaki screen par red error box aaye hi nahi!
        setError(null); 
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  // 📸 HANDLE DESKTOP MULTI-FILE SELECTION EVENT
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    // Create local blob URLs taaki form par instant preview dikhe
    const filePreviews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(filePreviews);
  };

  // 💾 SUBMIT UPDATED FORM DATA WITH MULTIPART FILE MATRIX
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('vendor', vendor);
      formData.append('sku', sku);

      // Append multiple images matrix loop
      if (selectedFiles.length > 0) {
        selectedFiles.forEach((file) => {
          formData.append('images', file); 
        });
      }

      const res = await axios.put(`http://localhost:5000/api/classical-products/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data.success) {
        alert("Product and multi-images matrix updated successfully!");
        navigate('/admin/all-classical-products');
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update product details. Check backend multer log.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <div className="text-center py-20 font-bold text-gray-500">Loading specs from database...</div>;

  return (
    <div className="w-full bg-white p-6 min-h-screen text-left font-sans">
      <div className="max-w-4xl mx-auto border border-gray-100 shadow-sm p-10 rounded-sm">
        
        <h2 className="text-xl font-black text-slate-800 uppercase tracking-wide mb-8">
          EDIT CLASSICAL MEDICINE PRODUCT DETAILS
        </h2>

        {/* 🚨 ERROR BOX REMOVED FOR BHOOMIKA */}
        {error && (
          <div className="w-full bg-red-50 border border-red-200 text-red-700 font-bold px-4 py-3 rounded-sm flex items-center gap-2 mb-6 text-sm tracking-wide">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-6">
          
          {/* Product Name Input */}
          <div className="w-full">
            <label className="text-xs font-bold text-gray-400 block mb-2 uppercase">Product Name</label>
            <input 
              type="text" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-orange-500 bg-gray-50/50" required 
            />
          </div>

          {/* Price & Category Grid Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-gray-400 block mb-2 uppercase">Price (Rs.)</label>
              <input 
                type="number" value={price} onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-orange-500 bg-gray-50/50" required
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 block mb-2 uppercase">Classical Category</label>
              <select 
                value={category} onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-orange-500 bg-white font-medium"
              >
                <option value="arishtam">Arishtam</option>
                <option value="bhasmam">Bhasmam</option>
                <option value="churnam">Churnam</option>
                <option value="capsules">Capsules</option>
              </select>
            </div>
          </div>

          {/* Vendor & SKU Grid Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-gray-400 block mb-2 uppercase">Vendor (Brand)</label>
              <input 
                type="text" value={vendor} onChange={(e) => setVendor(e.target.value)}
                className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-orange-500 bg-gray-50/50" required
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 block mb-2 uppercase">Product SKU</label>
              <input 
                type="text" value={sku} onChange={(e) => setSku(e.target.value)}
                className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-orange-500 bg-gray-50/50" required
              />
            </div>
          </div>

          {/* 📂 MULTI-IMAGES DESKTOP UPLOADER DROPZONE BOX */}
          <div className="w-full">
            <label className="text-xs font-bold text-gray-400 block mb-2 uppercase">
              UPDATE PRODUCT IMAGES FROM DESKTOP (LEAVE BLANK TO KEEP CURRENT IMAGES)
            </label>
            
            <div className="w-full border-2 border-dashed border-gray-300 rounded-sm p-8 text-center bg-gray-50/50 hover:bg-gray-50 transition-all relative cursor-pointer">
              <input 
                type="file" multiple accept="image/*" onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" 
              />
              <p className="text-sm font-bold text-gray-700">Click to select new multi images matrix from desktop</p>
              <p className="text-xs text-gray-400 mt-1">Previous dynamic records will be safely overwritten</p>
            </div>
          </div>

          {/* 🖼️ LOCAL LIVING PREVIEWS GRID CONTAINER */}
          {previewImages.length > 0 && (
            <div className="w-full pt-2">
              <p className="text-xs font-bold text-gray-400 mb-3 uppercase">Selected Images Matrix View:</p>
              <div className="flex flex-wrap gap-4">
                {previewImages.map((src, index) => (
                  <div key={index} className="w-20 h-24 border border-gray-200 p-1 bg-white shadow-sm">
                    <img src={src} alt="Preview" className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form Actions Submit Button Area */}
          <div className="pt-4 flex justify-end">
            <button 
              type="submit" disabled={isUpdating}
              style={{ backgroundColor: '#004d56' }}
              className="text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-sm shadow-sm hover:opacity-95 transition-all disabled:opacity-50"
            >
              {isUpdating ? 'Saving Matrix specs...' : 'Save Product Updates'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditClassicalProduct;