import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';

const EditConcern = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [link, setLink] = useState('/shop');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  // 🚀 Database se us specific Concern ka data fetch karke form mein bharna
  useEffect(() => {
    const fetchConcernData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/concerns');
        if (response.ok) {
          const allData = await response.json();
          const target = allData.find(item => item._id === id);
          if (target) {
            setName(target.name);
            setLink(target.link);
            setCurrentImage(target.image);
            // Database se aane wale products ko initialize karte waqt backup files options preserve rakhein
            const initializedProducts = (target.products || []).map(p => ({
              ...p,
              imageFiles: [], // Nayi multiple files save karne ke liye khali array handler
              imageKeep: true  // Default true taaki purani image save rahe
            }));
            setProducts(initializedProducts);
          }
        }
      } catch (err) {
        console.error("Error fetching single item layout:", err);
      }
    };
    fetchConcernData();
  }, [id]);

  const handleProductInputChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
  };

  // 🚀 1. MULTIPLE FILES SELECTION HANDLER (For product rows)
  const handleProductFileChange = (index, e) => {
    const updated = [...products];
    const files = Array.from(e.target.files); // Selected files ko real array mein badla
    
    updated[index].imageFiles = files; // Saari selected images ko is specific product row mein save kiya
    updated[index].imageKeep = files.length > 0 ? false : true; // Agar files hain toh purani image badal di jayegi
    setProducts(updated);
  };

  const addProductRow = () => {
    setProducts([...products, { name: '', price: '', image: '', images: [], imageFiles: [], imageKeep: false }]);
  };

  const removeProductRow = (index) => {
    setProducts(products.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('link', link);
    if (image) formData.append('image', image);

    // 🚀 2. TEXT BUNDLE MAPPING: Har product ke meta structure details ko loop mein adjust kiya
    const productsTextPayload = products.map(p => ({
      name: p.name,
      price: p.price,
      image: p.image || '',
      images: p.images || [], // Purani dynamic images array backup data tracking
      imageKeep: (p.imageFiles && p.imageFiles.length > 0) ? false : true 
    }));

    formData.append('productsData', JSON.stringify(productsTextPayload));

    // 🚀 3. MULTIPART FILE APPENDER LOOP
    // Har product row ke andar jitni bhi files hain, unhe dynamic index mapping key ke sath append karenge
    products.forEach((p, pIdx) => {
      if (p.imageFiles && p.imageFiles.length > 0) {
        p.imageFiles.forEach((file) => {
          // 'productImages_' + index framework use karne se backend ko pata chalega kaun si image kis product ki hai
          formData.append(`productImages_${pIdx}`, file);
        });
      }
    });

    try {
      const response = await fetch(`http://localhost:5000/api/concerns/update/${id}`, {
        method: 'PUT',
        body: formData, // Multiform data automatically triggered safely
      });

      if (response.ok) {
        alert('Concern Structure Updated successfully! 🔄🎉');
        navigate('/admin/all-concerns');
      } else {
        alert('Failed to update concern structure components.');
      }
    } catch (error) {
      console.error("Error updates submission grid:", error);
      alert('Failed to connect with backend server.');
    } finally {
      document.body.style.cursor = 'default';
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center font-sans text-left">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl max-w-4xl w-full border border-gray-100">
        
        <div className="text-center mb-8 border-b border-gray-100 pb-4">
          <h2 className="text-xl md:text-3xl font-black text-[#133919] uppercase tracking-tight">
            Modify / Edit Herbal Tab
          </h2>
          <p className="text-xs text-gray-400 mt-1">Update fields directly or change nested prices securely.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Step 1: Tab Header Configurations */}
          <div className="bg-green-50/30 p-4 rounded-xl border border-green-100/50 space-y-4">
            <h3 className="text-sm font-extrabold text-[#133919] uppercase tracking-wider">Step 1: Tab Header Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Concern Name *</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2.5 rounded-lg text-sm uppercase font-semibold text-gray-700" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Redirect Path</label>
                <input type="text" value={link} onChange={(e) => setLink(e.target.value)} className="w-full border p-2.5 rounded-lg text-sm text-gray-500" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Change Main Icon Image (Optional)</label>
              <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="w-full text-xs text-gray-500" />
              {currentImage && <p className="text-[10px] text-gray-400 mt-1">Current file active on server: {currentImage}</p>}
            </div>
          </div>

          {/* Step 2: Product Rows Configuration */}
          <div className="space-y-4">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '12px', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Step 2: Update Products Items
              </h3>
              <button 
                type="button" 
                onClick={addProductRow} 
                style={{ 
                  backgroundColor: '#133919', 
                  color: 'white', 
                  fontSize: '12px', 
                  fontWeight: 'bold', 
                  padding: '8px 16px', 
                  borderRadius: '8px', 
                  border: 'none', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Plus size={14} style={{ marginRight: '4px' }} /> Add Product Row
              </button>
            </div>

            {/* Dynamic Products Matrix Map Grid */}
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {products.map((product, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200 items-center relative">
                  <div className="md:col-span-5">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 md:hidden">Product Name</label>
                    <input type="text" value={product.name} onChange={(e) => handleProductInputChange(index, 'name', e.target.value)} className="w-full border p-2 rounded-lg text-xs font-semibold text-gray-700 bg-white" required />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 md:hidden">Price</label>
                    <input type="number" value={product.price} onChange={(e) => handleProductInputChange(index, 'price', e.target.value)} className="w-full border p-2 rounded-lg text-xs font-semibold text-gray-700 bg-white" required />
                  </div>
                  
                  {/* 🚀 4. UPDATED MULTIPLE FILE INPUT SELECTOR */}
                  <div className="md:col-span-4 flex flex-col space-y-1">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 md:hidden">Upload Images</label>
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple // 👈 MULTIPLE ATTRIBUTE ADDED: Isse ab Ctrl daba kar 2-3 images select ho sakengi
                      onChange={(e) => handleProductFileChange(index, e)} 
                      className="w-full text-xs text-gray-500 cursor-pointer" 
                    />
                    {product.imageFiles && product.imageFiles.length > 0 ? (
                      <p className="text-[10px] text-emerald-600 font-bold">
                        ✓ {product.imageFiles.length} new files bundled to queue
                      </p>
                    ) : product.images && product.images.length > 0 ? (
                      <p className="text-[10px] text-gray-400 font-medium">
                        Active gallery items on database: {product.images.length}
                      </p>
                    ) : null}
                  </div>
                  
                  <div className="md:col-span-1 text-center pt-2 md:pt-0">
                    <button type="button" onClick={() => removeProductRow(index)} className="text-red-500 hover:text-red-700 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions Submit Trigger */}
          <div className="pt-4">
            <button type="submit" disabled={loading} style={{ backgroundColor: '#133919' }} className="w-full text-white p-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all shadow-md flex items-center justify-center space-x-2 hover:opacity-90 active:scale-[0.99] cursor-pointer">
              <span>{loading ? '⏳' : '💾'}</span>
              <span>{loading ? 'Updating Structure...' : 'Save Concern updates'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditConcern;