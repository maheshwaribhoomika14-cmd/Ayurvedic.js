import React, { useState, useEffect } from 'react';
import axios from 'axios'; // 🚀 Fixed: Ek hi baar clean import
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';
import { Link } from 'react-router-dom';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit Modal Overlay States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editId, setEditId] = useState('');
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editDesc, setEditDesc] = useState('');
  
  // 📸 MULTIPLE IMAGES FOR EDIT MODE
  const [editImages, setEditImages] = useState([]); 

  // MongoDB se products lane ka function
  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Products load karne mein dikat:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 1. DELETE ACTION SYSTEM
  const handleDelete = async (id) => {
    if (window.confirm("⚠️ Kya aap is product ko MongoDB se permanent delete karna chahte hain?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        alert("🗑️ Product deleted successfully!");
        fetchProducts(); 
      } catch (err) {
        console.error("Delete karne mein error:", err);
        alert("Error deleting product");
      }
    }
  };

  // Edit Modal Open handler
  const openEditModal = (prod) => {
    setEditId(prod._id);
    setEditName(prod.name);
    setEditPrice(prod.price);
    setEditDesc(prod.description || '');
    setEditImages([]); // Shuru mein khali rakhenge jab tak naye select na ho
    setIsEditModalOpen(true);
  };

  // 🚀 Array.from lagaya taaki FileList object ek pure iterable file-array mein convert ho jaye
  const handleEditImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setEditImages(Array.from(e.target.files)); // Fixed [object FileList] issue!
    }
  };

  // 2. UPDATE ACTION HANDLER (FormData Format for Files)
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    
    // Binary data package transmission ke liye FormData banaya
    const formData = new FormData();
    formData.append('name', editName);
    formData.append('price', editPrice);
    formData.append('description', editDesc);

    // Dynamic array appending loop configured matching controller update criteria strictly
    if (editImages.length > 0) {
      editImages.forEach((img) => {
        formData.append('images', img); // Matches backend multer configuration array field key strictly
      });
    }

    try {
      // Backend put route par Form-Data send ho raha h
      await axios.put(`http://localhost:5000/api/products/${editId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      alert("🎉 Product Multiple Images & Info Updated Successfully!");
      setIsEditModalOpen(false);
      setEditImages([]); // Clearing states post production save success
      fetchProducts();
    } catch (err) {
      console.error("Update karne mein error:", err);
      alert("Error updating product structure");
    }
  };

  // HELPER FUNCTION: Sahi absolute link format karne ke liye
  const renderProductImage = (prod) => {
    let imagePath = '';
    if (prod.images && prod.images.length > 0) {
      imagePath = prod.images[0];
    } else if (prod.image) {
      imagePath = prod.image;
    }

    if (!imagePath) return 'https://via.placeholder.com/150?text=No+Image';
    if (imagePath.startsWith('data:') || imagePath.startsWith('http')) return imagePath;

    return `http://localhost:5000/${imagePath.replace(/\\/g, '/')}`;
  };

  return (
    <div className="flex-1 bg-[#f4f6f4] p-8 min-h-screen font-sans w-full relative">
      
      {/* Header Panel */}
      <div className="flex justify-between items-center mb-6 border-b border-gray-200/60 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1b4329]">All Products</h1>
          <p className="text-xs text-gray-400 mt-1">Manage active medicines, change retail prices or descriptions</p>
        </div>
        <Link to="/admin/add-product" className="flex items-center space-x-2 bg-[#1b4329] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#235334] transition-all">
          <Plus size={16} /> <span>Add New Product</span>
        </Link>
      </div>

      {/* Dynamic Products Data Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
              <th className="p-4 pl-6">Image</th>
              <th className="p-4">Product Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right pr-6">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-600 divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan="6" className="p-8 text-center text-gray-400">Loading products database...</td></tr>
            ) : products.length > 0 ? (
              products.map((prod) => (
                <tr key={prod._id} className="hover:bg-gray-50/80 transition-all">
                  <td className="p-4 pl-6">
                    <img 
                      src={renderProductImage(prod)} 
                      alt={prod.name} 
                      className="w-16 h-16 object-cover rounded-lg border border-gray-100 shadow-sm" 
                      onError={(e) => { 
                        e.target.onerror = null; 
                        e.target.src = 'https://via.placeholder.com/150?text=Medicine'; 
                      }}
                    />
                  </td>
                  <td className="p-4 font-semibold text-gray-800">{prod.name}</td>
                  <td className="p-4 text-gray-500 font-medium">
                    {prod.category?.name || <span className="text-gray-300 italic">Unassigned</span>}
                  </td>
                  <td className="p-4 font-bold text-[#1b4329]">Rs. {prod.price}.00</td>
                  <td className="p-4">
                    <span className="bg-green-50 text-[#1b4329] text-[11px] font-bold px-2.5 py-1 rounded-full border border-green-100">
                      {prod.status || 'Active'}
                    </span>
                  </td>
                  <td className="p-4 text-right pr-6 space-x-2">
                    <button onClick={() => openEditModal(prod)} className="text-blue-500 hover:text-blue-700 p-1 inline-block"><Edit size={16} /></button>
                    <button onClick={() => handleDelete(prod._id)} className="text-red-500 hover:text-red-700 p-1 inline-block"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" className="p-8 text-center text-gray-400">No products found. Add your first medicine item!</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* EDIT PRODUCT MODAL OVERLAY */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsEditModalOpen(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"><X size={20} /></button>
            <h2 className="text-lg font-bold text-[#1b4329] mb-4">Edit Product Info</h2>
            
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Product Name</label>
                <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full px-4 py-2 border rounded-xl text-sm focus:outline-none focus:border-[#1b4329]" required />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Price (Rs.)</label>
                <input type="number" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} className="w-full px-4 py-2 border rounded-xl text-sm focus:outline-none focus:border-[#1b4329]" required />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                <textarea 
                  value={editDesc} 
                  onChange={(e) => setEditDesc(e.target.value)} 
                  rows={3}
                  className="w-full px-4 py-2 border rounded-xl text-sm focus:outline-none focus:border-[#1b4329] font-medium resize-none" 
                  placeholder="Insert full usage and ailments instructions here..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Upload Multiple Photos</label>
                <div className="relative flex flex-col items-center justify-center border border-dashed rounded-xl p-4 bg-gray-50 cursor-pointer">
                  <input 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    onChange={handleEditImageChange} 
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" 
                  />
                  <span className="text-2xl mb-1">📁</span>
                  <span className="text-[11px] font-semibold text-slate-600">Click to select 1 or more product files</span>
                  <p className="text-[10px] text-gray-400 mt-0.5">Hold Ctrl / Shift key to choose multi-images</p>
                  
                  {/* Dynamic count preview */}
                  {editImages.length > 0 && (
                    <span className="mt-2 bg-[#1b4329] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {editImages.length} Images Selected
                    </span>
                  )}
                </div>
              </div>

              <button type="submit" style={{ backgroundColor: '#1b4329', color: '#ffffff', cursor: 'pointer' }} className="w-full flex items-center justify-center space-x-2 p-2.5 rounded-xl text-xs font-bold uppercase shadow-md mt-4 transition-colors hover:bg-[#235334]">
                <Save size={16} /> <span>Save Changes</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AllProducts;