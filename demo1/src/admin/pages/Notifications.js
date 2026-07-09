import React, { useState, useEffect } from 'react';
import { Bell, ShoppingBag, UserPlus, AlertTriangle } from 'lucide-react';

const Notification = () => {
  // Hard fallback items initially set taaki database empty/offline hone par bhi screen kabhi blank na ho
  const [alerts, setAlerts] = useState([
    { _id: 'NTF001', type: 'user', title: 'New Customer Registered', message: 'User Vaibhav Sharma successfully created a new account in the system.', createdAt: new Date() },
    { _id: 'NTF002', type: 'stock', title: 'Low Stock Alert', message: 'Brahmi Vati - 60 Tablets inventory count is running below 5 items.', createdAt: new Date() },
    { _id: 'NTF003', type: 'order', title: 'System Status Update', message: 'Database replication node synchronized successfully with MongoDB cluster.', createdAt: new Date() }
  ]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v2/notifications');
        if (response.ok) {
          const data = await response.json();
          // Agar real database mein arrays hain, toh unhe force map karo
          if (data && data.length > 0) {
            setAlerts(data);
          }
        }
      } catch (err) {
        console.error("Notification stream connection offline:", err);
      }
    };
    fetchNotifications();
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'order': return <ShoppingBag size={12} className="text-emerald-600" />;
      case 'user': return <UserPlus size={12} className="text-blue-600" />;
      case 'stock': return <AlertTriangle size={12} className="text-amber-600" />;
      default: return <Bell size={12} className="text-gray-600" />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#ffffff] p-4 text-left font-sans box-border antialiased">
      
      {/* HEADER SECTION */}
      <div className="mb-6">
        <span className="text-[11px] font-black tracking-widest text-gray-900 uppercase block mb-1">🔔 ALERT CENTER</span>
        <h1 className="text-xl font-black text-gray-950 tracking-tight uppercase m-0">NOTIFICATION CENTER</h1>
        <div className="text-right text-[11px] text-gray-400 font-semibold -mt-5 select-none">
          Dashboard &gt; <span className="text-gray-600 font-bold">System Updates</span>
        </div>
      </div>

      {/* 📋 THE HIGH-FIDELITY SYSTEM UPDATES TABLE */}
      <div className="w-full bg-white border border-gray-200/70 rounded-xl overflow-hidden shadow-3xs mt-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse m-0 table-layout-fixed">
            <thead>
              <tr className="bg-white border-b border-gray-200 text-[11px] font-black text-gray-400 uppercase tracking-widest select-none">
                <th className="p-3.5 pl-6 w-[8%] text-center">TYPE</th>
                <th className="p-3.5 w-[22%]">EVENT TITLE</th>
                <th className="p-3.5 w-[58%]">MESSAGE / ACTIVITY DETAILS</th>
                <th className="p-3.5 w-[12%] text-center">TIME</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-semibold text-gray-600">
              {alerts.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50/20 transition-colors">
                  
                  {/* Icon Indicator */}
                  <td className="p-3.5 pl-6 text-center select-none">
                    <div className="w-6 h-6 mx-auto bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center">
                      {getIcon(item.type)}
                    </div>
                  </td>
                  
                  {/* Event Title */}
                  <td className="p-3.5 font-bold text-gray-800 tracking-tight truncate">
                    {item.title}
                  </td>
                  
                  {/* Detailed Description */}
                  <td className="p-3.5 text-gray-400 font-medium break-words leading-relaxed text-[11px]">
                    {item.message}
                  </td>

                  {/* Time Stamp */}
                  <td className="p-3.5 text-center text-gray-400 text-[11px]">
                    {new Date(item.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
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

export default Notification;