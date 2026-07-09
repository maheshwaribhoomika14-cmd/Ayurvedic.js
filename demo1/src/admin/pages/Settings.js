import React, { useState, useEffect } from 'react';

const Settings = () => {
  const [shopName, setShopName] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [shippingCharges, setShippingCharges] = useState('');
  const [storeStatus, setStoreStatus] = useState('open'); 
  const [lastSaved, setLastSaved] = useState('Not saved yet');

  // 🚀 INITIAL DATABASE HYDRATION ON PAGE LOAD
  useEffect(() => {
    const loadStoreConfigurations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/settings');
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setShopName(data.shopName || '');
            setSupportEmail(data.supportEmail || '');
            setPhone(data.phone || '');
            setAddress(data.address || '');
            setShippingCharges(data.shippingCharges || '0');
            setStoreStatus(data.storeStatus || 'open');
            if (data.updatedAt) {
              setLastSaved(new Date(data.updatedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) + ' at ' + new Date(data.updatedAt).toLocaleTimeString('en-IN'));
            }
          }
        }
      } catch (err) {
        console.error("Failed to load configurations from database node:", err);
      }
    };
    loadStoreConfigurations();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shopName, supportEmail, phone, address, shippingCharges, storeStatus })
      });
      if (response.ok) {
        // 🎯 BHOOMIKA FORCE SYNC: Pura variable layout saaf kar diya h taaki lint completely reset ho jaye
        await response.json(); 
        const now = new Date();
        setLastSaved(now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) + ' at ' + now.toLocaleTimeString('en-IN'));
        alert(`Configurations saved successfully to MongoDB! Status is now: ${storeStatus.toUpperCase()}`);
      }
    } catch (err) {
      console.error("Network synchronization error:", err);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#ffffff] p-4 text-left font-sans box-border antialiased">
      
      {/* TITLE HEADERS */}
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-950 tracking-tight uppercase m-0">Global Store Settings</h1>
        <p className="text-xs text-gray-400 font-medium mt-1">Configure business details, core contact support, and default checkout logistics</p>
      </div>

      {/* LAST SAVED BADGE */}
      <div className="mb-6 inline-flex items-center gap-2 bg-gray-50/50 border border-gray-100 px-4 py-2 rounded-xl text-xs font-bold text-gray-900 shadow-3xs">
        ⏱️ Last Saved to MongoDB: <span className="font-mono text-gray-600 font-black">{lastSaved}</span>
      </div>

      {/* CONFIGURATIONS DATA INPUT FIELDS */}
      <form onSubmit={handleSave} className="max-w-4xl bg-white/40 border border-gray-200/60 rounded-2xl p-6 shadow-3xs space-y-5">
        
        {/* OPERATIONAL Dropdown Toggle */}
        <div>
          <label className="text-[11px] font-black tracking-widest text-gray-400 uppercase block mb-2">🏬 STORE OPERATIONAL STATUS</label>
          <div className="flex items-center gap-3">
            <select
              value={storeStatus}
              onChange={(e) => setStoreStatus(e.target.value)}
              className={`text-xs font-bold p-2 px-4 border rounded-xl focus:outline-none transition-all cursor-pointer ${
                storeStatus === 'open' 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}
            >
              <option value="open">🟢 SHOP OPEN (Accepting Orders)</option>
              <option value="closed">🔴 SHOP CLOSED (Checkout Paused)</option>
            </select>
            <span className="text-[11px] text-gray-400 font-semibold">
              {storeStatus === 'open' ? 'Live checkout streams are fully active.' : 'Users cannot place orders temporarily.'}
            </span>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* SHOP NAME Input */}
        <div>
          <label className="text-[11px] font-black tracking-widest text-gray-400 uppercase block mb-1.5">SHOP NAME</label>
          <input 
            type="text"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            className="w-full text-xs font-semibold text-gray-800 bg-white p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#004d56]"
          />
        </div>

        {/* EMAIL & CONTACT DUAL ROWS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] font-black tracking-widest text-gray-400 uppercase block mb-1.5">SUPPORT EMAIL</label>
            <input 
              type="email"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              className="w-full text-xs font-semibold text-gray-800 bg-white p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#004d56]"
            />
          </div>
          <div>
            <label className="text-[11px] font-black tracking-widest text-gray-400 uppercase block mb-1.5">SUPPORT PHONE CONTACT</label>
            <input 
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full text-xs font-semibold text-gray-800 bg-white p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#004d56]"
            />
          </div>
        </div>

        {/* STORE BUSINESS ADDRESS TextArea */}
        <div>
          <label className="text-[11px] font-black tracking-widest text-gray-400 uppercase block mb-1.5">STORE BUSINESS ADDRESS</label>
          <textarea 
            rows="3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full text-xs font-semibold text-gray-800 bg-white p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#004d56] resize-none"
          />
        </div>

        {/* DEFAULT SHIPPING CHARGES (INR) */}
        <div>
          <label className="text-[11px] font-black tracking-widest text-gray-400 uppercase block mb-1.5">DEFAULT SHIPPING CHARGES (INR)</label>
          <input 
            type="number"
            value={shippingCharges}
            onChange={(e) => setShippingCharges(e.target.value)}
            className="w-full text-xs font-semibold text-gray-800 bg-white p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#004d56] max-w-xs"
          />
        </div>

        {/* SAVE SUBMIT ACTION LAYOUT */}
        <div className="pt-2">
          <button 
            type="submit"
            className="text-[11px] font-black uppercase tracking-widest bg-[#004d56] hover:bg-[#00383f] text-white py-3 px-6 rounded-xl cursor-pointer transition-all border-none"
          >
            💾 Save Configurations
          </button>
        </div>

      </form>

    </div>
  );
};

export default Settings;