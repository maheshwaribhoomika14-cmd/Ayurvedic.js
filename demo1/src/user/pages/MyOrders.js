import React, { useState, useEffect } from 'react';
import { MapPin, Phone, User, Calendar, ShoppingBag, Clock, ShieldCheck, Check } from 'lucide-react';
import Header from '../components/Header'; 

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v2/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (err) {
      console.error("Fulfillment sync error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const timelineSteps = [
    { title: 'Order Placed', icon: '📋' },
    { title: 'Accepted', icon: '🤝' },
    { title: 'In Progress', icon: '📦' },
    { title: 'On the Way', icon: '🚚' },
    { title: 'Delivered', icon: '🏠' }
  ];

  const getActiveStepIndex = (backendStatus) => {
    switch (backendStatus) {
      case 'Pending': return 0;
      case 'Confirmed': return 1;
      case 'Processing': return 2;
      case 'Shipped': return 3;
      case 'Out for Delivery': return 3;
      case 'Delivered': return 4;
      default: return 0;
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="w-full text-center py-32 bg-[#faf9f6]">
          <div className="animate-spin text-[#004d56] inline-block w-7 h-7 border-3 border-current border-t-transparent rounded-full" />
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-4">Loading Your Orders...</p>
        </div>
      </>
    );
  }

  return (
    <div className="bg-[#fcfcf9] min-h-screen font-sans antialiased text-left">
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Title Registry */}
        <div className="border-b border-gray-200 pb-5 mb-8">
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight m-0 uppercase text-[22px]">My Orders History</h1>
          <p className="text-xs text-gray-400 font-semibold mt-1 m-0">Track real-time updates and live step-by-step lifecycles of your packages.</p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white border border-gray-200 p-16 text-center rounded-xl shadow-xs flex flex-col items-center">
            <ShoppingBag size={32} className="text-gray-300 mb-2" />
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">No orders found in your history.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => {
              const activeIndex = getActiveStepIndex(order.status || 'Pending');
              const isCancelled = order.status === 'Cancelled';

              return (
                <div key={order._id} className="bg-white border border-gray-200 rounded-xl shadow-xs overflow-hidden">
                  
                  {/* UPPER META HEADER BLOCK */}
                  <div className="bg-gray-50/80 border-b border-gray-200 p-4 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-gray-500">
                    <div className="flex flex-wrap items-center gap-6 md:gap-10">
                      <div>
                        <span className="block text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Order ID</span>
                        <span className="font-mono text-gray-900 bg-gray-200/60 px-2 py-0.5 rounded text-[11px]">
                          #{order._id.substring(order._id.length - 8).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Date Placed</span>
                        <span className="text-gray-700 flex items-center gap-1">
                          <Calendar size={12} className="text-gray-400" />
                          {new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Total Bill</span>
                        <span className="text-[#004d56] font-extrabold text-sm font-mono">₹{Number(order.totalAmount).toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 bg-[#f5f0e6] border border-[#c5a880]/30 px-2.5 py-1 rounded-md text-[#b39366] text-[10px] uppercase tracking-wider">
                      <ShieldCheck size={12} />
                      {order.paymentMethod === 'cod' ? 'COD Verified' : 'Online Paid'}
                    </div>
                  </div>

                  {/* PRODUCTS & INVOICE ROW CLUSTER */}
                  <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-6 border-b border-gray-100">
                    
                    {/* Left Grid: Items list & Destination */}
                    <div className="lg:col-span-8 space-y-4">
                      <span className="block text-[10px] font-black text-gray-400 uppercase tracking-wider">Package Manifest</span>
                      
                      <div className="space-y-2">
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-gray-50/50 border border-gray-100 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3 min-w-0">
                              <span className="text-sm shrink-0">🌿</span>
                              <h4 className="text-xs font-bold text-gray-800 truncate m-0 uppercase tracking-tight">{item.name}</h4>
                            </div>
                            <div className="flex items-center gap-6 text-[11px] text-gray-400 font-bold font-mono shrink-0">
                              <span>₹{item.price}</span>
                              <span className="bg-gray-200/60 text-gray-600 px-1.5 py-0.2 rounded">x{item.quantity}</span>
                              <span className="text-gray-700 font-sans font-bold">Subtotal: ₹{item.price * item.quantity}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Customer Address Card */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#faf9f5]/40 border border-gray-100 p-3.5 rounded-xl text-[11px] font-semibold text-gray-500 leading-normal">
                        <div>
                          <span className="block text-[9px] uppercase font-bold text-gray-400 mb-0.5">Recipient</span>
                          <div className="flex items-center gap-1 text-gray-800 font-bold"><User size={12} className="text-gray-400" /> {order.customerDetails?.name}</div>
                        </div>
                        <div>
                          <span className="block text-[9px] uppercase font-bold text-gray-400 mb-0.5">Contact Line</span>
                          <div className="flex items-center gap-1 text-gray-800 font-bold"><Phone size={11} className="text-gray-400" /> {order.customerDetails?.phone}</div>
                        </div>
                        <div>
                          <span className="block text-[9px] uppercase font-bold text-gray-400 mb-0.5">Destination Address</span>
                          <div className="flex items-start gap-1 text-gray-600 font-medium truncate" title={order.customerDetails?.shippingAddress}>
                            <MapPin size={12} className="text-gray-300 shrink-0 mt-0.5" />
                            {order.customerDetails?.shippingAddress}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Grid: Financial Invoice Balance */}
                    <div className="lg:col-span-4 bg-[#1a1d24] text-gray-300 p-4 rounded-xl flex flex-col justify-between shadow-inner text-xs space-y-3">
                      <div className="flex justify-between border-b border-gray-800 pb-2 font-medium text-gray-400">
                        <span>Items Subtotal:</span>
                        <span className="font-mono text-gray-200">₹{Number(order.totalAmount).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-800 pb-2 font-medium text-gray-400">
                        <span>Shipping/Handling:</span>
                        <span className="text-emerald-400 font-bold font-mono">₹0.00 (Free)</span>
                      </div>
                      <div className="flex justify-between items-center pt-1 font-bold text-white">
                        <span className="text-sm">Grand Total:</span>
                        <span className="font-mono text-base text-[#c5a880]">₹{Number(order.totalAmount).toFixed(2)}</span>
                      </div>
                    </div>

                  </div>

                  {/* 👑 🎯 PIXEL-PERFECT HORIZONTAL TIMELINE INFRASTRUCTURE (IMAGE 1 BASED) */}
                  <div className="p-6 bg-white">
                    <span className="block text-[11px] font-black text-gray-900 uppercase tracking-wider mb-6">Order Status</span>

                    {isCancelled ? (
                      <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl flex items-center gap-3 text-rose-800 text-xs">
                        <Clock size={14} />
                        <span className="font-bold uppercase tracking-wider">This unique transaction node was explicitly cancelled.</span>
                      </div>
                    ) : (
                      <div className="w-full border border-gray-100 bg-[#fdfdfc] p-6 rounded-xl relative">
                        
                        {/* THE DYNAMIC CONNECTING BAR SYSTEM */}
                        <div className="absolute left-[10%] right-[10%] top-[45px] h-1 bg-gray-100 z-0 rounded-full" />
                        <div 
                          className="absolute left-[10%] top-[45px] h-1 bg-[#1e4620] z-0 transition-all duration-500 rounded-full"
                          style={{
                            width: `${(activeIndex / (timelineSteps.length - 1)) * 80}%`
                          }}
                        />

                        {/* Nodes Layout Mapping Grid */}
                        <div className="relative z-10 flex justify-between items-start w-full">
                          {timelineSteps.map((step, index) => {
                            const isDone = index <= activeIndex;
                            return (
                              <div key={index} className="flex flex-col items-center flex-1 text-center px-1">
                                
                                {/* 1. Large Crisp Icon */}
                                <span className={`text-xl block mb-2 transition-transform duration-300 ${isDone ? 'opacity-100 scale-110' : 'opacity-25'}`}>
                                  {step.icon}
                                </span>

                                {/* 2. Title Label Header */}
                                <span className={`text-[11px] font-bold tracking-tight block mb-3 uppercase ${isDone ? 'text-gray-800 font-extrabold' : 'text-gray-300'}`}>
                                  {step.title}
                                </span>

                                {/* 3. Square-Rounded Check Node Points (Matching Image 1) */}
                                <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all duration-300 border-2 ${
                                  isDone 
                                    ? 'bg-[#1e4620] border-[#1e4620] text-white shadow-xs' 
                                    : 'bg-white border-gray-200 text-transparent'
                                }`}>
                                  {isDone && <Check size={11} strokeWidth={4} />}
                                </div>

                                {/* 4. Timing Datestamp underneath */}
                                <div className="mt-3 text-[10px] font-bold leading-tight select-none">
                                  {isDone ? (
                                    <div className="text-gray-600">
                                      <div>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</div>
                                      <span className="text-[9px] text-[#1e4620] uppercase font-black tracking-wider block mt-0.5">Done</span>
                                    </div>
                                  ) : (
                                    <div className="text-gray-300 font-medium">
                                      <div>Expected</div>
                                      <span className="text-[9px] text-gray-200 uppercase font-bold block mt-0.5">Soon</span>
                                    </div>
                                  )}
                                </div>

                              </div>
                            );
                          })}
                        </div>

                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;