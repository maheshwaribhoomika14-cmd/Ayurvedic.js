import React, { useState } from 'react';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [status, setStatus] = useState('Active');
  const [images, setImages] = useState([]);

  // 🔄 Multi-Image Reader Logic
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const base64Promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    });

    try {
      const base64Results = await Promise.all(base64Promises);
      setImages([...images, ...base64Results]); 
      // 🚨 Sabse Pehle Yeh Puraana Alert Box Band Kijiye Jo Submit Ko Confuse Kar Raha Tha
      console.log(`Packed ${files.length} images safely!`);
    } catch (err) {
      console.error("Error reading file structure:", err);
    }
  };

  // 💾 Asli Form Submit Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation(); // Stop event bubbling

    if (!categoryName.trim()) {
      alert("Please enter a Category Name!");
      return;
    }

    if (images.length === 0) {
      alert("Please choose at least 1 Image!");
      return;
    }

    const payload = {
      name: categoryName.trim(),
      status: status,
      images: images 
    };

    try {
      const response = await fetch('http://localhost:5000/api/categories/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      
      if (response.ok) {
        // 🎯 EXACT SUCCESS TRIGGER DETECTED
        alert('🎉 Category with Multiple Images Saved to Database successfully!');
        setCategoryName('');
        setStatus('Active');
        setImages([]); 
        
        const fileInput = document.getElementById('category-file-input');
        if (fileInput) fileInput.value = "";
      } else {
        alert(`Server Error: ${data.message || 'Failed to save category'}`);
      }
    } catch (error) {
      console.error("Database cloud connection error:", error);
      alert("Network Error! Please ensure your Backend Server is running on port 5000.");
    }
  };

  return (
    <div className="p-8 bg-[#f4f7f6] min-h-screen w-full flex justify-center items-start">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm p-8 border border-slate-100">
        
        <div className="mb-8 border-b pb-4 border-slate-100">
          <h2 className="text-3xl font-bold text-[#0f2942] tracking-tight">Add New Category</h2>
          <p className="text-xs text-slate-400 mt-1 uppercase font-semibold tracking-wider">Ayurkart Administrative Panel</p>
        </div>

        {/* 📝 FORM WITH ON-SUBMIT EXPLICIT TRIGGER */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Box 1: Name Input */}
          <div className="flex flex-col">
            <label className="block text-sm font-bold text-slate-800 mb-2 uppercase tracking-wide">
              Category Name*
            </label>
            <input 
              type="text"
              value={categoryName}
              required
              placeholder="e.g. Balaswagandhadhi Kuzhambu"
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full border border-slate-200 p-3.5 rounded-lg focus:outline-none focus:border-[#ff5722] text-slate-700 bg-white shadow-sm text-sm font-medium"
            />
          </div>

          {/* Box 2: Status Dropdown */}
          <div className="flex flex-col">
            <label className="block text-sm font-bold text-slate-800 mb-2 uppercase tracking-wide">
              Status*
            </label>
            <div className="relative w-full">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-slate-200 p-3.5 rounded-lg focus:outline-none focus:border-[#ff5722] text-slate-700 bg-white shadow-sm appearance-none text-sm font-medium pr-10 cursor-pointer"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Box 3: File Input Selector */}
          <div className="flex flex-col">
            <label className="block text-sm font-bold text-slate-800 mb-2 uppercase tracking-wide">
              Category Images* (Desktop se Ctrl/Shift daba kar select karein)
            </label>
            <div className="w-full border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm flex items-center border-dashed p-1.5 hover:border-[#ff5722] transition-colors">
              <input
                id="category-file-input"
                type="file"
                multiple={true}
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-slate-400
                  file:mr-4 file:py-2.5 file:px-6
                  file:border-0 file:rounded-md
                  file:text-xs file:font-bold file:uppercase file:tracking-wider
                  file:bg-slate-100 file:text-slate-700
                  hover:file:bg-slate-200 file:transition-colors cursor-pointer"
              />
            </div>
            
            {/* Real-time image selection counter preview row */}
            {images.length > 0 && (
              <span className="text-xs text-emerald-600 font-bold mt-2">
                ✓ {images.length} Photos Selected & Ready to Save!
              </span>
            )}
          </div>

          {/* Box 4: Save Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#ff5722] hover:bg-[#e64a19] text-white py-4 px-6 rounded-lg font-bold transition-all tracking-wider text-sm uppercase shadow-md hover:shadow-lg active:scale-[0.99]"
            >
              Save Category to Database
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddCategory;
