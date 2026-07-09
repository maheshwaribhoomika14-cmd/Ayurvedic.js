import React, { useState, useEffect } from 'react';
import { Users, Mail, Search } from 'lucide-react';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // 🔄 LIVE DATABASE FETCH STREAM
  const fetchCustomers = async () => {
    try {
      // Yeh direct aapke naye backend route ko hit karega
      const response = await fetch('http://localhost:5000/api/v2/users');
      if (response.ok) {
        const data = await response.json();
        setCustomers(data); // Real dynamic database array inject ho raha h
      } else {
        console.error("Server cluster returned error status on CRM route.");
      }
    } catch (err) {
      console.error("Failed to connect to backend MongoDB user nodes pipeline:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Search filter functionality
  const filteredCustomers = customers.filter(c => 
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="w-full flex-1 flex flex-col items-center justify-center py-40 bg-[#ffffff]">
        <div className="animate-spin text-[#004d56] inline-block w-8 h-8 border-4 border-current border-t-transparent rounded-full" />
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-4">Syncing Customer Registry...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#ffffff] p-4 md:p-6 text-left font-sans box-border antialiased">
      
      {/* Title Header */}
      <div className="mb-6">
        <span className="text-[11px] font-black tracking-widest text-gray-900 uppercase block mb-1">CRM Intelligence</span>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase m-0">Customers Hub</h1>
        <div className="text-right text-xs text-gray-400 font-semibold -mt-6 select-none">
          Dashboard &gt; <span className="text-gray-600 font-bold">Users List</span>
        </div>
      </div>

      {/* Dynamic Count Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
        <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-3xs flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center shadow-3xs">
            <Users size={18} />
          </div>
          <div>
            <div className="text-xl font-black text-gray-900 font-mono leading-none">{customers.length}</div>
            <span className="text-[10px] text-gray-400 font-bold mt-1.5 block tracking-tight uppercase">Active Customers</span>
          </div>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="mb-4 max-w-md relative flex items-center">
        <Search size={14} className="absolute left-3 text-gray-400" />
        <input 
          type="text"
          placeholder="Search customer by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-xs font-semibold text-gray-700 bg-gray-50/50 pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#004d56] transition-colors shadow-3xs"
        />
      </div>

      {/* 📋 DYNAMIC DATA TABLE */}
      <div className="w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-3xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse m-0 table-layout-fixed">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-200 text-[11px] font-black text-gray-400 uppercase tracking-widest select-none">
                <th className="p-4 w-[15%]">Customer ID</th>
                <th className="p-4 w-[25%]">Full Name</th>
                <th className="p-4 w-[25%]">Email Address</th>
                <th className="p-4 w-[18%]">Phone Number</th>
                <th className="p-4 w-[17%]">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-semibold text-gray-600">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-10 text-center text-gray-400 font-bold uppercase tracking-wider">
                    No active customers found in database. Waiting for user registrations!
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50/30 transition-colors">
                    
                    {/* ID Substring format */}
                    <td className="p-4 font-bold text-gray-400 font-mono">
                      #{user._id ? user._id.substring(user._id.length - 6).toUpperCase() : 'UNKNOWN'}
                    </td>
                    
                    {/* Name */}
                    <td className="p-4 font-black text-gray-800 text-sm tracking-tight truncate flex items-center gap-2">
                      <div className="w-6 h-6 bg-[#faf9f5] border border-gray-200 rounded-full flex items-center justify-center text-[10px] shrink-0 select-none">👤</div>
                      {user.name || 'Ayurkart Member'}
                    </td>
                    
                    {/* Email */}
                    <td className="p-4 font-mono text-gray-500 tracking-tight lowercase flex items-center gap-1.5 mt-1 border-none">
                      <Mail size={12} className="text-gray-300 shrink-0" />
                      {user.email || 'N/A'}
                    </td>
                    
                    {/* Phone */}
                    <td className="p-4 font-mono text-gray-600 tracking-tight">
                      {user.phone || 'N/A'}
                    </td>
                    
                    {/* Date */}
                    <td className="p-4 text-gray-500 font-sans">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { 
                        day: '2-digit', 
                        month: 'short', 
                        year: 'numeric' 
                      }) : '07 Jul 2026'}
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Customers;