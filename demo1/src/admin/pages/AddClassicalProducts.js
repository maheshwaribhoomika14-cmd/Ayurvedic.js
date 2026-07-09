import React, { useState } from 'react';
import axios from 'axios'; // 🚀 FIXED: Ab axios sahi package se import ho raha hai
import { useNavigate } from 'react-router-dom';

const AddClassicalProducts = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'arishtam',
    vendor: 'Vaidyaratnam',
    sku: '',
    sizes: '100ML,200ML,450ML'
  });
  
  // MULTI-IMAGE STATE POINTERS
  const [imageFiles, setImageFiles] = useState([]); 
  const [imagePreviews, setImagePreviews] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Multiple Desktop Files Selection Handler
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); 
    if (files.length > 0) {
      setImageFiles(files);
      
      const previews = files.map(file => URL.createObjectURL(file));
      setImagePreviews(previews);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageFiles.length === 0) {
      setMessage('❌ Please select at least one image file from your desktop!');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const dataPacket = new FormData();
      dataPacket.append('name', formData.name);
      dataPacket.append('price', formData.price);
      dataPacket.append('category', formData.category);
      dataPacket.append('description', formData.description);
      dataPacket.append('vendor', formData.vendor);
      dataPacket.append('sku', formData.sku);
      dataPacket.append('sizes', formData.sizes);

      // LOOP THROUGH MULTIPLE FILES AND APPEND TO 'images'
      imageFiles.forEach((file) => {
        dataPacket.append('images', file); 
      });

      const res = await axios.post('http://localhost:5000/api/classical/add', dataPacket, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.status === 201) {
        setMessage('🎉 Product with Multiple Images successfully saved in MongoDB!');
        setTimeout(() => navigate('/admin/all-classical-products'), 1500);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Upload failed. Please verify backend multipart configuration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-2xl mx-auto bg-white border border-gray-200 rounded-md shadow-xs font-sans mt-6">
      <h2 className="text-xl font-black text-gray-900 uppercase tracking-wide border-b border-gray-100 pb-3 mb-6">
        ADD NEW CLASSICAL MEDICINE PRODUCT (MULTIPLE IMAGES)
      </h2>

      {message && (
        <div className={`p-3 text-xs font-bold uppercase tracking-wider mb-4 rounded-xs ${message.includes('🎉') ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">PRODUCT NAME</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g., Saraswatharishtam - Vaidyaratnam" className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xs focus:outline-none focus:border-orange-500 font-medium" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">PRICE (RS.)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required placeholder="375" className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xs focus:outline-none focus:border-orange-500 font-bold" />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">CLASSICAL CATEGORY</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xs focus:outline-none focus:border-orange-500 font-bold bg-white capitalize">
              <option value="arishtam">Arishtam</option>
              <option value="bhasmam">Bhasmam</option>
              <option value="capsules">Capsules</option>
              <option value="churnam">Churnam</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">VENDOR (BRAND)</label>
            <input type="text" name="vendor" value={formData.vendor} onChange={handleChange} placeholder="Vaidyaratnam" className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xs focus:outline-none focus:border-orange-500 font-medium" />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">PRODUCT SKU (OPTIONAL)</label>
            <input type="text" name="sku" value={formData.sku} onChange={handleChange} placeholder="e.g., AK-VR017A" className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xs focus:outline-none focus:border-orange-500 font-medium" />
          </div>
        </div>

        {/* MULTI FILE UPLOADER CONTAINER */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
            UPLOAD MULTIPLE IMAGES FROM DESKTOP <span className="text-red-500">*</span>
          </label>
          
          <label className="w-full min-h-[150px] border-2 border-dashed border-gray-200 hover:border-orange-400 rounded-md bg-gray-50/50 flex flex-col items-center justify-center p-6 cursor-pointer transition-colors relative group">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              className="hidden" 
              multiple 
              required={imageFiles.length === 0}
            />
            
            {imagePreviews.length === 0 ? (
              <div className="text-center space-y-2">
                <div className="w-12 h-10 bg-[#ffd166] rounded-md relative mx-auto shadow-xs border border-amber-500/30 flex items-center justify-center">
                  <div className="w-8 h-6 bg-[#ffffff]/60 rounded-xs mt-1"></div>
                </div>
                <p className="text-sm font-bold text-gray-700 tracking-wide pt-1">
                  Click to select multiple desktop product images
                </p>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                  Hold Ctrl / Shift to select multiple images together
                </p>
              </div>
            ) : (
              <div className="space-y-4 w-full">
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {imagePreviews.map((previewUrl, i) => (
                    <img key={i} src={previewUrl} alt="" className="w-16 h-16 object-contain bg-white border p-1 rounded-sm shadow-2xs" />
                  ))}
                </div>
                <p className="text-center text-xs font-mono text-emerald-700 font-bold">
                  ✓ Selected {imageFiles.length} images smoothly
                </p>
              </div>
            )}
          </label>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">PRODUCT DESCRIPTION DETAILS</label>
          <textarea name="description" rows="4" value={formData.description} onChange={handleChange} placeholder="Write details parameters here safely..." className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xs focus:outline-none focus:border-orange-500 font-medium" />
        </div>

        <button type="submit" disabled={loading} style={{ backgroundColor: '#004d56' }} className="w-full text-white font-bold text-xs uppercase tracking-widest py-3 rounded-xs hover:opacity-95 transition-all shadow-sm cursor-pointer border-none">
          {loading ? 'STORING MULTIPLE PICTURES ARRAY...' : 'SAVE PRODUCT DATA LIVE'}
        </button>
      </form>
    </div>
  );
};

export default AddClassicalProducts;