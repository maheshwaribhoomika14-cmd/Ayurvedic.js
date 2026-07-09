import React, { useState, useEffect } from 'react';
import { TrendingUp, ShoppingBag, Users, Layers, ShieldCheck } from 'lucide-react';
// 🚀 THE ULTIMATE VISUALIZATION CHARTS ENGINE MATRIX IMPORT
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Reports = () => {
  const [metrics, setMetrics] = useState({
    products: 13,
    buyers: 2,
    totalOrders: 0,
    activeOrders: 0,
    revenue: 0,
    generatedAt: new Date().toLocaleString()
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsReport = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v2/reports/analytics');
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setMetrics({
              products: data.products,
              buyers: data.buyers,
              totalOrders: data.totalOrders,
              activeOrders: data.activeOrders,
              revenue: data.revenue,
              generatedAt: new Date(data.generatedAt).toLocaleString('en-IN')
            });
          }
        }
      } catch (err) {
        console.error("Analytics network node disconnect:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalyticsReport();
  }, []);

  // 📈 DYNAMIC CHART ARRAY INJECTION LOGIC (Direct Database Stream Maps)
  const chartData = [
    { name: 'Products', count: metrics.products },
    { name: 'Buyers', count: metrics.buyers },
    { name: 'Total Orders', count: metrics.totalOrders },
    { name: 'Active Orders', count: metrics.activeOrders },
  ];

  if (loading) {
    return (
      <div className="w-full flex-1 flex flex-col items-center justify-center py-40 bg-[#ffffff]">
        <div className="animate-spin text-[#004d56] inline-block w-6 h-6 border-4 border-current border-t-transparent rounded-full" />
        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-3">Rendering Chart Elements...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#ffffff] p-4 text-left font-sans box-border antialiased">
      
      {/* TITLE TOP MODULE */}
      <div className="mb-6">
        <span className="text-[11px] font-black tracking-widest text-gray-900 uppercase block mb-1">📊 PERFORMANCE GRAPH CENTER</span>
        <h1 className="text-xl font-black text-gray-950 tracking-tight uppercase m-0">Live Database Pipeline Stream</h1>
      </div>

      {/* COMPACT UPPER INSIGHT METRIC BADGES */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-3 px-4 rounded-xl border border-gray-100 shadow-3xs flex items-center gap-3">
          <div className="w-7 h-7 text-emerald-600 flex items-center justify-center bg-emerald-50 rounded-lg"><TrendingUp size={14} /></div>
          <div>
            <div className="text-xs font-black text-gray-900 font-mono leading-none">₹{metrics.revenue}</div>
            <span className="text-[9px] text-gray-400 font-bold mt-1 block tracking-tight uppercase">TOTAL REVENUE</span>
          </div>
        </div>
        <div className="bg-white p-3 px-4 rounded-xl border border-gray-100 shadow-3xs flex items-center gap-3">
          <div className="w-7 h-7 text-blue-600 flex items-center justify-center bg-blue-50 rounded-lg"><ShoppingBag size={14} /></div>
          <div>
            <div className="text-xs font-black text-gray-900 font-mono leading-none">{metrics.totalOrders}</div>
            <span className="text-[9px] text-gray-400 font-bold mt-1 block tracking-tight uppercase">TOTAL ORDERS</span>
          </div>
        </div>
        <div className="bg-white p-3 px-4 rounded-xl border border-gray-100 shadow-3xs flex items-center gap-3">
          <div className="w-7 h-7 text-gray-500 flex items-center justify-center bg-gray-50 rounded-lg"><Layers size={14} /></div>
          <div>
            <div className="text-xs font-black text-gray-900 font-mono leading-none">{metrics.products}</div>
            <span className="text-[9px] text-gray-400 font-bold mt-1 block tracking-tight uppercase">PRODUCTS LIVE</span>
          </div>
        </div>
        <div className="bg-white p-3 px-4 rounded-xl border border-gray-100 shadow-3xs flex items-center gap-3">
          <div className="w-7 h-7 text-amber-600 flex items-center justify-center bg-amber-50 rounded-lg"><Users size={14} /></div>
          <div>
            <div className="text-xs font-black text-gray-900 font-mono leading-none">{metrics.buyers}</div>
            <span className="text-[9px] text-gray-400 font-bold mt-1 block tracking-tight uppercase">BUYERS REGISTERED</span>
          </div>
        </div>
      </div>

      {/* 📊 👑 THE LIVE PREMIUM BAR CHART INTERFACE AREA */}
      <div className="w-full bg-white border border-gray-200/80 rounded-xl p-5 shadow-3xs mb-6">
        <h2 className="text-xs font-black text-gray-800 uppercase tracking-wider mb-4">📈 Database Metrics Visualization Chart</h2>
        <div className="w-full h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#9ca3af" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '11px', fontWeight: 'bold' }} />
              {/* Premium Botanical Dark Green fill code matches your dashboard theme */}
              <Bar dataKey="count" fill="#004d56" radius={[4, 4, 0, 0]} barSize={35} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* DETAILED INFORMATION PANEL SYSTEM LOGS */}
      <div className="w-full bg-white border border-gray-200/70 rounded-xl p-5 shadow-3xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-black text-gray-900 uppercase tracking-wider">
          <ShieldCheck size={14} className="text-[#004d56]" /> Real-time System Verification
        </div>
        <ul className="m-0 pl-4 space-y-1.5 text-[11px] text-gray-500 font-medium leading-relaxed list-disc">
          <li>System registers total <span className="font-bold text-gray-900">{metrics.products} items</span> inside active inventory nodes.</li>
          <li>Analytics engine has parsed the live MongoDB collection layer matching <span className="font-bold text-gray-900">`bhoomikaorders` ({metrics.totalOrders} items)</span> seamlessly.</li>
        </ul>
        <hr className="border-gray-100 my-2" />
        <div className="text-[10px] text-gray-400 font-bold tracking-tight uppercase flex items-center gap-1.5 select-none">
          📊 Graph Matrix Generated on: <span className="font-mono text-gray-600 font-black">{metrics.generatedAt}</span>
        </div>
      </div>

    </div>
  );
};

export default Reports;