import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddAilments = () => {
  const [name, setName] = useState('');
  const [count, setCount] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !image) {
      alert("Please fill name and upload an image!");
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('count', count);
    formData.append('image', image);

    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/ailments/add', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert("Ailment Added Successfully!");
        navigate('/admin/all-ailments');
      } else {
        alert("Failed to add ailment");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 bg-[#f4f7f6] min-h-screen font-sans w-full">
      
      {/* Header Title */}
      <div className="w-full max-w-5xl mx-auto mb-6">
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Add New General Ailment</h2>
        <p className="text-xs text-gray-500 mt-1">Sync dynamic diagnostic cards into the homepage grid slider</p>
      </div>

      {/* Main Container Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 w-full max-w-5xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* 1. Ailment Name Input */}
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
              Ailment Name <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="e.g., Gastro Health, Skin Care"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-green-700 bg-white transition-all"
              required
            />
          </div>

          {/* 2. Sub-label Product Count Input */}
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
              Sub-label Product Count (Subtitle)
            </label>
            <input 
              type="text" 
              value={count} 
              onChange={(e) => setCount(e.target.value)} 
              placeholder="e.g., 78 Products"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-green-700 bg-white transition-all"
            />
          </div>

          {/* 3. Image Upload Dropzone */}
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
              Graphic Vector Image <span className="text-red-500">*</span>
            </label>
            
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 bg-[#fafafa] hover:bg-gray-50 transition-colors relative flex flex-col items-center justify-center text-center h-[160px] cursor-pointer group">
              <input 
                type="file" 
                onChange={(e) => setImage(e.target.files[0])} 
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                required
              />
              <div className="text-4xl mb-2 select-none">📁</div>
              <p className="text-xs font-bold text-gray-600 select-none">
                {image ? `File Selected: ${image.name}` : "Click to choose or drop alignment vector image file"}
              </p>
              <p className="text-[10px] text-gray-400 mt-1 select-none">MAX. FILE SIZE 5MB | SUPPORTS JPG, PNG, WEBP</p>
            </div>
          </div>

          {/* 🚀 FIXED BUTTON WITH EXACT rgb(27, 67, 41) COLOR CODE */}
          <div className="pt-4 w-full">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full text-white font-bold text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-3 border-0 cursor-pointer"
              style={{ 
                backgroundColor: 'rgb(27, 67, 41)', 
                color: '#ffffff',
                width: '100%', 
                height: '50px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '700'
              }}
            >
              <span style={{ fontSize: '16px', color: '#ffffff' }}>💾</span>
              <span style={{ color: '#ffffff', fontWeight: '700', letterSpacing: '0.05em' }}>
                {loading ? "SAVE AILMENT..." : "SAVE AILMENT"}
              </span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddAilments;