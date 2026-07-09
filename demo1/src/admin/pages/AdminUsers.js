import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        // Backend se ALL users (admin + users) fetch karne ka get route
        const res = await axios.get('http://localhost:5000/api/users');
        setUsers(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Users list load karne mein error:", err);
        setLoading(false);
      }
    };
    fetchAllUsers();
  }, []);

  return (
    <div className="flex-1 bg-[#f4f6f4] p-8 min-h-screen font-sans w-full">
      
      {/* Header Panel */}
      <div className="mb-6 border-b border-gray-200/60 pb-4">
        <h1 className="text-2xl font-bold text-[#1b4329]">System Users & Staff</h1>
        <p className="text-xs text-gray-400 mt-1">
          Manage system permissions, total administrative staff control, and internal access levels
        </p>
      </div>

      {/* Users Table Container */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
              <th className="p-4 pl-6">User Name</th>
              <th className="p-4">Email Address</th>
              <th className="p-4">System Role Access</th>
              <th className="p-4 pr-6 text-right">Registered On</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-600 divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan="4" className="p-8 text-center text-gray-400">Loading system users data...</td></tr>
            ) : users.length > 0 ? (
              users.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50/80 transition-all">
                  <td className="p-4 pl-6 font-semibold text-gray-800">{item.name}</td>
                  <td className="p-4 text-gray-500">{item.email}</td>
                  <td className="p-4">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                      item.role === 'admin' 
                        ? 'bg-red-50 text-red-700 border-red-100' 
                        : 'bg-blue-50 text-blue-700 border-blue-100'
                    }`}>
                      {item.role.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 text-right pr-6 text-gray-400">
                    {new Date(item.createdAt).toLocaleDateString('en-GB', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-12 text-center text-gray-400 font-medium">
                  🔒 No records found in the system database.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AdminUsers;