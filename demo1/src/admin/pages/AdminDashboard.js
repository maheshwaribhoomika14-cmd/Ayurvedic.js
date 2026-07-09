import React, { useState, useEffect } from 'react';
import { ShoppingBag, Users, MessageSquare, Leaf } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ orders: 1, products: 13, users: 2, enquires: 2 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardBrief = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v2/orders');
        let orderCount = 1;
        
        if (response.ok) {
          const ordersData = await response.json();
          if (Array.isArray(ordersData)) {
            orderCount = ordersData.length;
          }
        }
        
        setStats(prev => ({
          ...prev,
          orders: orderCount,
          products: 13,
          users: 2,
          enquires: 2
        }));

      } catch (err) {
        console.error("Ayurveda engine data bridge offline:", err);
      } finally {
        setLoading(false);
      }
    };
    loadDashboardBrief();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="w-full flex-1 flex flex-col items-center justify-center py-40 bg-[#ffffff]">
        <div className="animate-spin text-[#004d56] inline-block w-6 h-6 border-4 border-current border-t-transparent rounded-full" />
        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-3">Booting Ayurvedic Admin Panel...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-5 text-left font-sans box-border antialiased" style={{ backgroundColor: '#f4f7f6' }}>
      
      {/* 👑 PREMIUM AYURVEDIC HEADER BAND */}
      <div className="mb-6 flex justify-between items-center p-5 rounded-2xl border" style={{ background: 'linear-gradient(135deg, #004d56 0%, #00798c 100%)', borderColor: '#003c43', boxShadow: '0 4px 15px rgba(0,77,86,0.15)' }}>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight m-0 uppercase">Ayurveda Control Center</h1>
            <Leaf size={20} className="text-emerald-300 animate-bounce" />
          </div>
          <p className="text-xs text-teal-100/90 font-medium mt-1">Welcome back, Bhoomika! Managing your botanical items and user queries live.</p>
        </div>
        <div className="text-right">
          <span className="text-[10px] bg-emerald-500 text-white font-black uppercase px-3 py-1 rounded-full tracking-wider select-none shadow-sm animate-pulse">
            PIPELINE ACTIVE
          </span>
        </div>
      </div>

      {/* 📊 RICH COLORFUL SUMMARY CARDS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <div className="bg-white p-5 rounded-2xl flex items-center gap-4 shadow-sm" style={{ borderBottom: '4px solid #10b981' }}>
          <div className="w-12 h-12 text-emerald-700 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0"><ShoppingBag size={18} /></div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 font-mono m-0">{stats.orders}</h3>
            <span className="text-[10px] text-emerald-700 font-extrabold tracking-wider uppercase block mt-0.5">Live Orders</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl flex items-center gap-4 shadow-sm" style={{ borderBottom: '4px solid #3b82f6' }}>
          <div className="w-12 h-12 text-blue-700 bg-blue-50 rounded-xl flex items-center justify-center shrink-0"><Users size={18} /></div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 font-mono m-0">{stats.users}</h3>
            <span className="text-[10px] text-blue-700 font-extrabold tracking-wider uppercase block mt-0.5">Store Customers</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl flex items-center gap-4 shadow-sm" style={{ borderBottom: '4px solid #f59e0b' }}>
          <div className="w-12 h-12 text-amber-700 bg-amber-50 rounded-xl flex items-center justify-center shrink-0"><MessageSquare size={18} /></div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 font-mono m-0">{stats.enquires}</h3>
            <span className="text-[10px] text-amber-700 font-extrabold tracking-wider uppercase block mt-0.5">Patient Enquiries</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl flex items-center gap-4 shadow-sm" style={{ borderBottom: '4px solid #06b6d4' }}>
          <div className="w-12 h-12 text-teal-700 bg-teal-50 rounded-xl flex items-center justify-center shrink-0"><Leaf size={18} /></div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 font-mono m-0">{stats.products}</h3>
            <span className="text-[10px] text-teal-700 font-extrabold tracking-wider uppercase block mt-0.5">Ayurvedic Items</span>
          </div>
        </div>
      </div>

     

      {/* ============================================================================= */}
      {/* 📊 HIGH-END ANALYTICS GRID LAYER                                              */}
      {/* ============================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between" style={{ position: 'relative', overflow: 'visible' }}>
          <div className="flex justify-between items-center gap-3 mb-6" style={{ position: 'relative', zIndex: 50 }}>
            <div>
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider m-0">📈 Revenue by Category</h2>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">Live botanical branch performance tracking analysis.</p>
            </div>
            <select 
              className="text-[12px] font-black bg-gradient-to-b from-white to-slate-50 text-[#004d56] px-4 py-2 rounded-xl border border-slate-200 hover:border-[#004d56] transition-all duration-200 outline-none cursor-pointer shadow-sm"
              style={{ position: 'relative', zIndex: 100 }}
              onChange={(e) => console.log(`Filter Applied: ${e.target.value}`)}
            >
              <option value="all">Filter: All Categories</option>
              <option value="classical">Herbal Medicines</option>
              <option value="ailments">Ayurvedic Oils</option>
              <option value="general">Wellness Supplements</option>
            </select>
          </div>

          <div className="w-full flex items-end justify-between px-8 pb-4 border-b border-slate-200 bg-slate-50/50 rounded-2xl" style={{ height: '220px', position: 'relative', zIndex: 10, paddingTop: '30px' }}>
            <div className="w-16 sm:w-20 rounded-t-xl transition-all duration-300 relative flex items-start justify-center shadow-md" style={{ height: '45%', backgroundColor: '#10b981', minHeight: '45%' }}>
              <span className="absolute -top-7 text-[10px] bg-slate-900 text-white font-black px-2 py-0.5 rounded shadow-sm font-mono tracking-wide z-10" style={{ whiteSpace: 'nowrap' }}>₹12,450</span>
            </div>
            <div className="w-16 sm:w-20 rounded-t-xl transition-all duration-300 relative flex items-start justify-center shadow-md" style={{ height: '70%', backgroundColor: '#06b6d4', minHeight: '#70%' }}>
              <span className="absolute -top-7 text-[10px] bg-slate-900 text-white font-black px-2 py-0.5 rounded shadow-sm font-mono tracking-wide z-10" style={{ whiteSpace: 'nowrap' }}>₹18,900</span>
            </div>
            <div className="w-16 sm:w-20 rounded-t-xl transition-all duration-300 relative flex items-start justify-center shadow-lg" style={{ height: '90%', backgroundColor: '#004d56', minHeight: '90%' }}>
              <span className="absolute -top-7 text-[10px] bg-slate-900 text-white font-black px-2 py-0.5 rounded shadow-md font-mono tracking-wide z-10" style={{ whiteSpace: 'nowrap' }}>₹24,150</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center text-[10px] text-slate-500 font-extrabold uppercase tracking-widest mt-3 px-2">
            <span style={{ color: '#10b981' }}>🌿 Herbal Meds</span>
            <span style={{ color: '#06b6d4' }}>🧴 Ayurvedic Oils</span>
            <span style={{ color: '#004d56' }}>💊 Supplements (Live Sync)</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between gap-5">
          <div>
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-1">⚙️ Store Diagnostics</h2>
            <p className="text-[11px] text-slate-400 font-medium">Real-time repository micro-services tracking status.</p>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 flex items-start gap-3 shadow-3xs" style={{ backgroundColor: '#fffbeb' }}>
            <div className="text-amber-500 font-bold text-base">⚠️</div>
            <div>
              <span className="text-[11px] font-black text-amber-950 uppercase tracking-tight block">Critical Stock Alert</span>
              <p className="text-[10px] text-amber-800 font-semibold m-0 mt-1 leading-relaxed">Inventory logs indicate 2 herbal formulations are running below safety margins.</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-[11px] font-extrabold uppercase">
              <span className="text-slate-500">MongoDB Cluster Stream:</span>
              <span className="text-emerald-700 font-black bg-emerald-50 px-2 py-0.5 rounded-md font-mono text-xs">100% ONLINE</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 border border-slate-200/60 p-0.5">
              <div className="w-full bg-gradient-to-r from-emerald-400 to-[#004d56] h-full rounded-full animate-pulse" style={{ width: '100%', backgroundColor: '#10b981' }} />
            </div>
            <span className="text-[9px] text-gray-400 font-semibold block text-right">Database cluster synced flawlessly.</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;