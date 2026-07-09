import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';
import { Link } from 'react-router-dom';

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dynamic Edit Modal Pop-up States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editId, setEditId] = useState('');
  const [editName, setEditName] = useState('');
  
  // 🚨 FIXED STATE PACKET: Multi-image array controller synced
  const [editImages, setEditImages] = useState([]);
  const [editDesc, setEditDesc] = useState(''); 

  // 🛠️ HELPER: Absolute URL helper matrix to prevent duplicate paths or broken uploads
  const formatImageUrl = (imgSrc) => {
    if (!imgSrc) return 'https://cdn-icons-png.flaticon.com/512/824/824688.png';
    if (imgSrc.startsWith('data:') || imgSrc.startsWith('http')) return imgSrc;
    return `http://localhost:5000/${imgSrc.replace(/^\/+/, '')}`;
  };

  // MongoDB se saari categories load karne ka function
  const fetchCategories = async () => {
    try {
      setLoading(true);
      // API call direct timestamp bypass se fresh data layegi cache se bachne ke liye
      const res = await axios.get(`http://localhost:5000/api/categories?t=${Date.now()}`);
      setCategories(res.data);
    } catch (err) {
      console.error("Data fetch karne mein error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 1. DELETE MANAGEMENT: Database se entry aur file hatane ke liye
  const handleDelete = async (id) => {
    if (window.confirm("⚠️ Kya aap is category ko MongoDB se delete karna chahte hain?")) {
      try {
        await axios.delete(`http://localhost:5000/api/categories/${id}`);
        alert("🗑️ Category deleted successfully!");
        fetchCategories(); // Table ko turant refresh karein
      } catch (err) {
        console.error("Delete karne mein error:", err);
        alert("Error deleting category");
      }
    }
  };

  // Edit Modal Open karke purana data fields mein set karne ka function
  const openEditModal = (cat) => {
    setEditId(cat._id);
    setEditName(cat.name);
    
    // 🚨 SYNC UPGRADE: Pehle array formats check karke unhe safe paths ke sath parse karenge previews ke liye
    let initialImages = cat.images && cat.images.length > 0 ? cat.images : (cat.image ? [cat.image] : []);
    setEditImages(initialImages.map(img => formatImageUrl(img)));
    
    setEditDesc(cat.description || '');
    setIsEditModalOpen(true);
  };

  // 🔄 Desktop se multiple image files pick karke Base64 mein convert karne ka core system
  const handleEditImageChange = async (e) => {
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
      // Nayi desktop photos select karne par purani images preview list mein empty karke fresh update karenge
      setEditImages([...base64Results]); 
      alert(`🎉 Successfully packed ${files.length} images from desktop!`);
    } catch (err) {
      console.error("Modal multi-files read karne mein error:", err);
    }
  };

  // 2. UPDATE/EDIT SUBMIT: PUT request se data save karne ke liye
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/api/categories/${editId}`, {
        name: editName,
        images: editImages, 
        description: editDesc
      });
      
      if (res.status === 200) {
        alert("🎉 Category Updated Successfully with Multiple Images in MongoDB!");
        setIsEditModalOpen(false);
        fetchCategories(); // Updated info reload database fetch toggle
      }
    } catch (err) {
      console.error("Update karne mein error:", err);
      alert("Error updating category. Please check backend network console!");
    }
  };

  return (
    <div className="flex-1 bg-[#f4f6f4] p-8 min-h-screen font-sans w-full relative">
      
      {/* Upper Header Row */}
      <div className="flex justify-between items-center mb-6 border-b border-gray-200/60 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1b4329] tracking-wide">All Categories</h1>
          <p className="text-xs text-gray-400 mt-1">Manage your active Ayurvedic product groups with images</p>
        </div>
        
        <Link 
          to="/admin/add-category" 
          className="flex items-center space-x-2 bg-[#1b4329] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#235334] transition-all shadow-sm"
        >
          <Plus size={16} /> <span>Add New Category</span>
        </Link>
      </div>

      {/* Tables Container */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
              <th className="p-4 pl-6">Image</th>
              <th className="p-4">Category Name</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right pr-6">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-600 divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-400">Loading categories...</td>
              </tr>
            ) : categories.length > 0 ? (
              categories.map((cat) => {
                // 🚨 CRITICAL ROW RESOLUTION: Images parse controller mapping logically
                let firstRawImg = cat.images && cat.images.length > 0 ? cat.images[0] : cat.image;
                let resolvedRowUrl = formatImageUrl(firstRawImg);

                return (
                  <tr key={cat._id} className="hover:bg-gray-50/80 transition-all">
                    
                    {/* Dynamic Image Cell -> Displays index 0 preview path perfectly */}
                    <td className="p-4 pl-6">
                      <img 
                        src={resolvedRowUrl} 
                        alt={cat.name} 
                        className="w-10 h-10 rounded-xl object-contain border border-gray-100 shadow-sm bg-white p-1"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://cdn-icons-png.flaticon.com/512/824/824688.png';
                        }}
                      />
                    </td>

                    {/* Category Name */}
                    <td className="p-4 font-semibold text-gray-800">{cat.name}</td>
                    
                    {/* Status Badge */}
                    <td className="p-4">
                      <span className="bg-green-50 text-[#1b4329] text-[11px] font-bold px-2.5 py-1 rounded-full border border-green-100">
                        {cat.status || 'Active'}
                      </span>
                    </td>
                    
                    {/* Action buttons mapped with functions */}
                    <td className="p-4 text-right pr-6 space-x-2">
                      <button 
                        onClick={() => openEditModal(cat)} 
                        className="text-blue-500 hover:text-blue-700 p-1 inline-block transition-colors cursor-pointer"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(cat._id)} 
                        className="text-red-500 hover:text-red-700 p-1 inline-block transition-colors cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-400">
                  No categories found. Click 'Add New Category' to save your first item.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* DYNAMIC EDIT MODAL POPUP LAYOUT (WITH ADVANCED MULTI-SELECTION LOCK) */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl relative">
            
            {/* Close Cross Icon */}
            <button 
              onClick={() => setIsEditModalOpen(false)} 
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-lg font-bold text-[#1b4329] mb-4">Edit Category Info</h2>
            
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              
              {/* Field 1: Category Title */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1 tracking-wider">Category Name</label>
                <input 
                  type="text" 
                  value={editName} 
                  onChange={(e) => setEditName(e.target.value)} 
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:border-[#1b4329] text-sm text-gray-700" 
                  required 
                />
              </div>

              {/* Field 2: Multi-Image File Select Field */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1 tracking-wider">Update Desktop Images (Ctrl daba kar select karein)</label>
                <div className="relative flex flex-col items-center justify-center border border-dashed rounded-xl p-4 bg-gray-50/50 hover:bg-gray-50 transition-all min-h-[120px]">
                  
                  <input 
                    type="file" 
                    multiple={true} 
                    accept="image/*" 
                    onChange={handleEditImageChange} 
                    className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                  />
                  
                  {/* Row view array preview compiler layout */}
                  <div className="flex flex-wrap gap-1.5 justify-center mb-2">
                    {editImages.length > 0 ? (
                      editImages.map((img, idx) => (
                        <img 
                          key={idx} 
                          src={img} 
                          alt="Preview row" 
                          className="w-12 h-12 object-contain rounded-lg border border-gray-100 bg-white p-0.5" 
                          onError={(e) => {
                            e.target.src = 'https://cdn-icons-png.flaticon.com/512/824/824688.png';
                          }}
                        />
                      ))
                    ) : (
                      <div className="w-12 h-12 border rounded-lg bg-gray-100 flex items-center justify-center text-gray-300 text-xs">No Img</div>
                    )}
                  </div>
                  
                  <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                    {editImages.length > 0 ? `✓ ${editImages.length} Photos Ready` : "Click to change desktop image files"}
                  </span>
                </div>
              </div>

              {/* Action Button Trigger */}
              <button 
                type="submit" 
                style={{ backgroundColor: '#1b4329', color: '#ffffff', cursor: 'pointer' }} 
                className="w-full flex items-center justify-center space-x-2 p-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md mt-4 hover:bg-[#235334] transition-all"
              >
                <Save size={16} /> <span>Save Changes</span>
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AllCategories;