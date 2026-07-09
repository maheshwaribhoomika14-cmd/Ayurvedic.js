import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2 } from 'lucide-react';

const AllConcerns = () => {
  const [concerns, setConcerns] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🚀 Database se saare concerns fetch karna
  const fetchConcerns = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/concerns');
      if (response.ok) {
        const data = await response.json();
        setConcerns(data);
      }
    } catch (error) {
      console.error("Error fetching concerns list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConcerns();
  }, []);

  // 🗑️ Delete handle framework system
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this concern tab structure?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/concerns/delete/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          alert("Concern Tab deleted successfully! 🗑️");
          fetchConcerns(); // Table refresh karne ke liye
        } else {
          alert("Failed to delete the selected item.");
        }
      } catch (error) {
        console.error("Error deleting item execution:", error);
      }
    }
  };

  if (loading) {
    return <div className="text-center p-8 font-bold text-gray-500">⏳ Loading Concerns Matrix...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-left">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full border border-gray-100">
        
        <div className="mb-6 border-b pb-4">
          <h2 className="text-xl md:text-2xl font-black text-[#133919] uppercase tracking-tight">
            Manage Dynamic Herbal Profile Tabs
          </h2>
          <p className="text-xs text-gray-400 mt-1">View explicit items nested inside each herbal profile category safely.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50 text-gray-600 text-xs font-extrabold uppercase tracking-wider">
                {/* 🚀 FIXED: TAB IMAGE COLUMN HEADER COMPLETELY REMOVED */}
                <th className="py-4 px-6 text-left">Tab Name</th>
                <th className="py-4 px-6">Products Inside This Tab (Name & Price)</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {concerns.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                  
                  {/* 🚀 FIXED: IMAGE DIV COMPLETELY REMOVED, ONLY TAB NAME SHOWS NOW */}
                  <td className="py-5 px-6 font-black text-gray-800 uppercase tracking-wide text-left">
                    {item.name}
                  </td>

                  {/* Products list inner nesting column wrapper */}
                  <td className="py-5 px-6">
                    <div className="space-y-2 max-w-xl">
                      {item.products && item.products.map((prod, idx) => (
                        <div key={idx} className="flex items-center space-x-3 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                          {prod.image && (
                            <img 
                              src={`http://localhost:5000/${prod.image}`} 
                              alt={prod.name} 
                              className="w-8 h-8 rounded-lg object-contain bg-white border"
                            />
                          )}
                          <div className="text-xs">
                            <p className="font-bold text-gray-700">{prod.name}</p>
                            <p className="font-extrabold text-green-700 mt-0.5">Rs. {prod.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>

                  {/* Actions Grid Triggers */}
                  <td className="py-5 px-6 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <Link 
                        to={`/admin/edit-concern/${item._id}`} 
                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors active:scale-95"
                      >
                        <Edit2 size={16} />
                      </Link>
                      <button 
                        type="button" 
                        onClick={() => handleDelete(item._id)} 
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors active:scale-95"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default AllConcerns;