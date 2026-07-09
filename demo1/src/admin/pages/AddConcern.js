import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react'; // 🚀 FIX: Unused 'Upload' icon ko yahan se remove kar diya hai

const AddConcern = () => {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [link, setLink] = useState('/shop');
  const [loading, setLoading] = useState(false);
  
  // 🚀 Dynamic Product Rows State
  const [products, setProducts] = useState([
    { name: '', price: '', imageFile: null }
  ]);

  const handleMainFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // 🚀 Dynamic Rows Input Change Handler
  const handleProductInputChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  // 🚀 Dynamic Row File Change Handler
  const handleProductFileChange = (index, e) => {
    const updatedProducts = [...products];
    updatedProducts[index].imageFile = e.target.files[0];
    setProducts(updatedProducts);
  };

  // 🚀 Add New Product Row
  const addProductRow = () => {
    setProducts([...products, { name: '', price: '', imageFile: null }]);
  };

  // 🚀 Remove Product Row
  const removeProductRow = (index) => {
    if (products.length === 1) {
      alert("At least one product row is required!");
      return;
    }
    setProducts(products.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !image) {
      alert('Please fill Concern Name and upload Main Tab Image!');
      return;
    }

    // Validation: Check if any product field is empty
    for (let i = 0; i < products.length; i++) {
      if (!products[i].name || !products[i].price || !products[i].imageFile) {
        alert(`Please fill all fields (Name, Price, Image) for Product row #${i + 1}`);
        return;
      }
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
    formData.append('link', link);

    // 🚀 Product text data array structure pass kiya
    const productsTextData = products.map(p => ({ name: p.name, price: p.price }));
    formData.append('productsData', JSON.stringify(productsTextData));

    // 🚀 Saari Product Images ko sequential append kiya multi-file uploads ke liye
    products.forEach((p) => {
      formData.append('productImages', p.imageFile);
    });

    try {
      const response = await fetch('http://localhost:5000/api/concerns/add', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert('Concern Tab with all items published successfully! 🎉');
        setName('');
        setImage(null);
        setLink('/shop');
        setProducts([{ name: '', price: '', imageFile: null }]);
        e.target.reset();
        
        // Auto Redirect to All Concerns list view
        navigate('/admin/all-concerns');
      } else {
        alert(`Error: ${data.message || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error('Error uploading dynamic tab architecture:', error);
      alert('Failed to connect with backend server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center font-sans">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl max-w-4xl w-full border border-gray-100 text-left">
        
        {/* Form Main Title Header */}
        <div className="text-center mb-8 border-b border-gray-100 pb-4">
          <h2 className="text-xl md:text-3xl font-black text-[#133919] uppercase tracking-tight">
            Create Dynamic Herbal Tab
          </h2>
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            Add Tab Name (e.g. BRAHMI) and insert explicit inner products with custom Prices & Images.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Section 1: Main Tab Configurations */}
          <div className="bg-green-50/30 p-4 rounded-xl border border-green-100/50 space-y-4">
            <h3 className="text-sm font-extrabold text-[#133919] uppercase tracking-wider mb-2">
              Step 1: Tab / Concern Info
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
                  Concern / Tab Name *
                </label>
                <input 
                  type="text" 
                  placeholder="e.g., ASHWAGANDHA, BRAHMI, GILOY" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="w-full border border-gray-200 p-2.5 rounded-lg text-sm font-semibold focus:outline-none focus:border-[#f28500] text-gray-700 uppercase"
                  required 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
                  Redirect Path (Optional)
                </label>
                <input 
                  type="text" 
                  value={link} 
                  onChange={(e) => setLink(e.target.value)} 
                  className="w-full border border-gray-200 p-2.5 rounded-lg text-sm text-gray-500 focus:outline-none focus:border-[#f28500]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
                Upload Concern Main Icon / Circle Image *
              </label>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleMainFileChange} 
                className="w-full border border-gray-200 p-2 text-sm rounded-lg bg-white text-gray-600 focus:outline-none"
                required 
              />
            </div>
          </div>

          {/* Section 2: Dynamic Nested Products List Matrix */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="text-sm font-extrabold text-gray-700 uppercase tracking-wider">
                Step 2: Add Products inside this Tab
              </h3>
              <button
                type="button"
                onClick={addProductRow}
                className="flex items-center space-x-1 bg-[#133919] hover:bg-green-800 text-white text-xs font-black px-3 py-2 rounded-lg transition-all active:scale-95"
              >
                <Plus size={14} /> <span>Add Product Row</span>
              </button>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {products.map((product, index) => (
                <div 
                  key={index} 
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200 items-center relative group"
                >
                  {/* Badge index row indicator */}
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-5 h-5 bg-gray-300 text-gray-700 text-[10px] font-black flex items-center justify-center rounded-full shadow-sm">
                    {index + 1}
                  </div>

                  {/* Product Title Name */}
                  <div className="md:col-span-5 pl-2">
                    <label className="block md:hidden text-[10px] font-bold text-gray-400 uppercase mb-1">Product Name</label>
                    <input 
                      type="text"
                      placeholder="Product Name (e.g. Brahmi Caps)"
                      value={product.name}
                      onChange={(e) => handleProductInputChange(index, 'name', e.target.value)}
                      className="w-full border border-gray-200 p-2 rounded-lg text-xs font-semibold text-gray-700 bg-white focus:outline-none focus:border-[#f28500]"
                    />
                  </div>

                  {/* Product Price */}
                  <div className="md:col-span-2">
                    <label className="block md:hidden text-[10px] font-bold text-gray-400 uppercase mb-1">Price (Rs.)</label>
                    <input 
                      type="number"
                      placeholder="Price"
                      value={product.price}
                      onChange={(e) => handleProductInputChange(index, 'price', e.target.value)}
                      className="w-full border border-gray-200 p-2 rounded-lg text-xs font-semibold text-gray-700 bg-white focus:outline-none focus:border-[#f28500]"
                    />
                  </div>

                  {/* Product Binary File Upload */}
                  <div className="md:col-span-4">
                    <label className="block md:hidden text-[10px] font-bold text-gray-400 uppercase mb-1">Upload Product Image</label>
                    <input 
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleProductFileChange(index, e)}
                      className="w-full text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-[11px] file:font-bold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300 cursor-pointer"
                    />
                  </div>

                  {/* Delete Trash Control */}
                  <div className="md:col-span-1 text-center flex justify-end md:justify-center">
                    <button
                      type="button"
                      onClick={() => removeProductRow(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors duration-200"
                      title="Delete Product Row"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* 🚀 UPGRADED: EXACT MATCH WITH SAVE AILMENT BUTTON LAYOUT */}
          <div className="pt-4">
            <button 
              type="submit" 
              disabled={loading}
              style={{ backgroundColor: '#133919' }}
              className={`w-full text-white p-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all shadow-md flex items-center justify-center space-x-2 hover:opacity-90 active:scale-[0.99] ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <span>{loading ? '⏳' : '💾'}</span>
              <span>{loading ? 'Saving Data Structure...' : 'Save Concern'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddConcern;