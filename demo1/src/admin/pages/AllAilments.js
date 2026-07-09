import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AllAilments = () => {
  const [ailments, setAilments] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🚀 Fetch Ailments directly from the new database API
  const fetchAilments = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/ailments');
      if (response.ok) {
        const data = await response.json();
        setAilments(data);
      }
    } catch (error) {
      console.error("Error fetching ailments database matrix:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAilments();
  }, []);

  // 🗑️ Delete handling engine
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this ailment card?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/ailments/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          alert("Ailment deleted successfully!");
          fetchAilments(); // Auto-refresh data row list
        } else {
          alert("Failed to delete ailment.");
        }
      } catch (error) {
        console.error("Delete Error:", error);
      }
    }
  };

  return (
    <div className="p-8 font-sans min-h-screen bg-gray-50">
      {/* Table Content Identity Headers */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-800 tracking-tight">All General Ailments</h1>
          <p className="text-xs text-gray-400 mt-1">Manage active alignment grids, product lists, and dashboard image cards</p>
        </div>
        <Link 
          to="/admin/add-ailment" 
          className="bg-green-600 hover:bg-green-700 text-white font-extrabold py-2.5 px-5 rounded text-xs tracking-wider uppercase transition-colors no-underline shadow-xs flex items-center gap-1.5"
        >
          <span>➕</span> Add New Ailment
        </Link>
      </div>

      {/* Structured Matrix Grid Frame Container */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-[11px] font-black text-gray-400 uppercase tracking-widest">
              <th className="p-4 pl-6 w-32">Image</th>
              <th className="p-4">Category / Disease Name</th>
              <th className="p-4 w-48">Sublabel Count</th>
              <th className="p-4 text-center w-36">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-700 font-medium">
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-12 text-[#f28500] font-bold text-xs uppercase tracking-widest animate-pulse">
                  Fetching Dynamic Ailments...
                </td>
              </tr>
            ) : ailments.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-16 text-gray-400 italic text-xs">
                  No ailments added yet. Click on "+ Add New Ailment" to start uploading!
                </td>
              </tr>
            ) : (
              ailments.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50/40 transition-colors">
                  {/* Graphic Upload Thumbnail Frame */}
                  <td className="p-4 pl-6">
                    <div className="w-14 h-14 bg-white border border-gray-100 rounded-md overflow-hidden flex items-center justify-center p-1 shadow-2xs">
                      <img 
                        src={`http://localhost:5000/${item.image}`} 
                        alt={item.name} 
                        className="max-w-full max-h-full object-contain" 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/60";
                        }}
                      />
                    </div>
                  </td>

                  {/* Main Text Title */}
                  <td className="p-4 text-gray-900 font-bold text-sm tracking-tight">
                    {item.name}
                  </td>

                  {/* Count Counter Grid Label */}
                  <td className="p-4 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                    {item.count || "0 Products"}
                  </td>

                  {/* Operational Removal Module */}
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 hover:text-white hover:bg-red-500 border border-red-200 hover:border-transparent font-extrabold text-xs px-3 py-1.5 rounded transition-all tracking-wider uppercase cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAilments;