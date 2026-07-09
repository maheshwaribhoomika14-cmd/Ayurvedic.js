import React, { useState, useEffect } from 'react';
import { ShoppingBag, Clock, CheckCircle2, Truck, XCircle, Eye, X, MapPin, Phone, User, FileText } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 👑 STATE FOR BHOOMIKA CUSTOM MODAL POPUP
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v2/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v2/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        fetchOrders();
        // Keep active modal state synchronous if currently viewed
        if (selectedOrder && selectedOrder._id === orderId) {
          setSelectedOrder(prev => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      console.error("Error modifying status:", err);
    }
  };

  const getCounts = (statusStr) => orders.filter(o => o.status === statusStr).length;

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-purple-50 text-purple-700 border border-purple-100';
      case 'Processing': return 'bg-indigo-50 text-indigo-700 border border-indigo-100';
      case 'Shipped': return 'bg-blue-50 text-blue-700 border border-blue-100';
      case 'Out for Delivery': return 'bg-cyan-50 text-cyan-700 border border-cyan-100';
      case 'Delivered': return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
      case 'Cancelled': return 'bg-rose-50 text-rose-700 border border-rose-100';
      default: return 'bg-amber-50 text-amber-700 border border-amber-100'; // Pending
    }
  };

  // 🎯 Open Modal Handler instead of standard alert dialog
  const openOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="w-full flex-1 flex flex-col items-center justify-center py-40 bg-[#fbfbfa]">
        <div className="animate-spin text-[#004d56] inline-block w-8 h-8 border-4 border-current border-t-transparent rounded-full" />
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-4">Syncing Dashboard Stream...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#ffffff] p-4 md:p-6 text-left font-sans box-border antialiased relative">
      
      {/* 1ST IMAGE INSPIRED ORIGINAL HEADER TITLE GROUP */}
      <div className="mb-6">
        <span className="text-[11px] font-black tracking-widest text-gray-900 uppercase block mb-1">Store Intelligence</span>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase m-0">Orders Hub</h1>
        <div className="text-right text-xs text-gray-400 font-semibold -mt-6 select-none">
          Dashboard &gt; <span className="text-gray-600 font-bold">Live Orders</span>
        </div>
      </div>

      {/* 📊 STATS COUNTER BLOCKS (EXACTLY AS PER IMAGE) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
        <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-3xs flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gray-50 text-gray-500 rounded-lg flex items-center justify-center"><ShoppingBag size={16} /></div>
          <div>
            <div className="text-base font-black text-gray-800 font-mono leading-none">{orders.length}</div>
            <span className="text-[10px] text-gray-400 font-bold mt-1 block tracking-tight uppercase">Total Orders</span>
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-3xs flex items-center gap-2.5">
          <div className="w-9 h-9 bg-amber-50 text-amber-500 rounded-lg flex items-center justify-center"><Clock size={16} /></div>
          <div>
            <div className="text-base font-black text-gray-800 font-mono leading-none">{getCounts('Pending')}</div>
            <span className="text-[10px] text-gray-400 font-bold mt-1 block tracking-tight uppercase">Pending</span>
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-3xs flex items-center gap-2.5">
          <div className="w-9 h-9 bg-purple-50 text-purple-500 rounded-lg flex items-center justify-center"><CheckCircle2 size={16} /></div>
          <div>
            <div className="text-base font-black text-gray-800 font-mono leading-none">{getCounts('Confirmed') + getCounts('Processing')}</div>
            <span className="text-[10px] text-gray-400 font-bold mt-1 block tracking-tight uppercase">Confirmed</span>
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-3xs flex items-center gap-2.5">
          <div className="w-9 h-9 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center"><Truck size={16} /></div>
          <div>
            <div className="text-base font-black text-gray-800 font-mono leading-none">{getCounts('Shipped')}</div>
            <span className="text-[10px] text-gray-400 font-bold mt-1 block tracking-tight uppercase">Shipped</span>
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-3xs flex items-center gap-2.5">
          <div className="w-9 h-9 bg-cyan-50 text-cyan-500 rounded-lg flex items-center justify-center"><Truck size={16} /></div>
          <div>
            <div className="text-base font-black text-gray-800 font-mono leading-none">{getCounts('Out for Delivery')}</div>
            <span className="text-[10px] text-gray-400 font-bold mt-1 block tracking-tight uppercase">Ready/Out</span>
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-3xs flex items-center gap-2.5">
          <div className="w-9 h-9 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center"><CheckCircle2 size={16} /></div>
          <div>
            <div className="text-base font-black text-gray-800 font-mono leading-none">{getCounts('Delivered')}</div>
            <span className="text-[10px] text-gray-400 font-bold mt-1 block tracking-tight uppercase">Delivered</span>
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-3xs flex items-center gap-2.5">
          <div className="w-9 h-9 bg-rose-50 text-rose-500 rounded-lg flex items-center justify-center"><XCircle size={16} /></div>
          <div>
            <div className="text-base font-black text-gray-800 font-mono leading-none">{getCounts('Cancelled')}</div>
            <span className="text-[10px] text-gray-400 font-bold mt-1 block tracking-tight uppercase">Cancelled</span>
          </div>
        </div>
      </div>

      {/* 📋 THE ORIGINAL FAVORITE CLEAN SPACIOUS TABLE VIEWPORT */}
      <div className="w-full bg-white border border-gray-200/80 rounded-xl overflow-hidden shadow-3xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse m-0 table-layout-fixed">
            <thead>
              <tr className="bg-gray-50/40 border-b border-gray-200 text-[11px] font-black text-gray-400 uppercase tracking-widest select-none">
                <th className="p-4 w-[15%]">Order ID</th>
                <th className="p-4 w-[25%]">Customer</th>
                <th className="p-4 w-[16%]">Phone</th>
                <th className="p-4 w-[14%]">Amount</th>
                <th className="p-4 w-[12%]">Payment</th>
                <th className="p-4 w-[18%]">Status</th>
                <th className="p-4 w-[10%] text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-semibold text-gray-600">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50/40 transition-colors">
                  <td className="p-4 font-bold text-orange-500 font-mono">
                    #{order._id.substring(order._id.length - 6).toUpperCase()}
                  </td>
                  <td className="p-4 font-black text-gray-800 text-sm tracking-tight truncate">
                    {order.customerDetails?.name || 'Anonymous User'}
                  </td>
                  <td className="p-4 font-mono text-gray-500 tracking-tight">
                    {order.customerDetails?.phone || 'N/A'}
                  </td>
                  <td className="p-4 font-bold text-gray-900 font-sans">
                    ₹{Number(order.totalAmount || 0).toFixed(2)}
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                      order.paymentMethod === 'cod' ? 'bg-gray-100 text-gray-600' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      {order.paymentMethod === 'cod' ? 'COD' : 'Online'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="relative inline-block w-full max-w-[130px]">
                      <select
                        value={order.status || 'Pending'}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className={`w-full text-[10px] font-bold uppercase tracking-tight px-2 py-1 rounded-md cursor-pointer focus:outline-none appearance-none text-center ${getStatusBadgeStyle(order.status)}`}
                        style={{ textAlignLast: 'center' }}
                      >
                        <option value="Pending">🕒 Pending</option>
                        <option value="Confirmed">👍 Confirmed</option>
                        <option value="Processing">⚡ Processing</option>
                        <option value="Shipped">📦 Shipped</option>
                        <option value="Out for Delivery">🛵 Out For Delivery</option>
                        <option value="Delivered">✅ Delivered</option>
                        <option value="Cancelled">❌ Cancelled</option>
                      </select>
                    </div>
                  </td>
                  
                  {/* 👁️ THE UPGRADED PROFESSIONAL ACTION BUTTON */}
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => openOrderDetails(order)}
                      className="p-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-400 hover:text-gray-600 rounded-md transition-colors cursor-pointer inline-flex items-center justify-center shadow-3xs"
                      title="View Details"
                    >
                      <Eye size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 👑 🎯 BHOOMIKA PREMIUM CLEAN DETAILS MODAL POPUP */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-xl overflow-hidden text-left border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="bg-gray-50 border-b border-gray-100 px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="text-[#004d56]" size={16} />
                <span className="text-xs font-black text-gray-800 uppercase tracking-wider">Order Specification Manifest</span>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-md text-gray-400 hover:bg-gray-200/60 hover:text-gray-700 transition-colors cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4">
              
              {/* Customer & Address parameters info blocks */}
              <div className="space-y-1.5 bg-gray-50/60 border border-gray-100 p-3 rounded-lg text-xs font-semibold text-gray-600 leading-normal">
                <span className="block text-[9px] uppercase font-bold text-gray-400 mb-1">Logistics/Address</span>
                <div className="flex items-center gap-1.5 text-gray-800 font-bold"><User size={12} className="text-gray-400" /> {selectedOrder.customerDetails?.name}</div>
                <div className="flex items-center gap-1.5 text-gray-500 font-mono"><Phone size={11} className="text-gray-400" /> {selectedOrder.customerDetails?.phone}</div>
                <div className="flex items-start gap-1.5 text-gray-400 font-medium pt-1.5 border-t border-gray-200/60 mt-1"><MapPin size={12} className="text-gray-300 shrink-0 mt-0.5" /> <span className="text-gray-500">{selectedOrder.customerDetails?.shippingAddress}</span></div>
              </div>

              {/* Items array display list */}
              <div className="space-y-1.5">
                <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider">Package Items ({selectedOrder.items?.length || 0})</span>
                <div className="border border-gray-100 rounded-lg overflow-hidden max-h-[180px] overflow-y-auto">
                  <div className="divide-y divide-gray-50 text-xs font-semibold text-gray-600">
                    {selectedOrder.items?.map((item, idx) => (
                      <div key={idx} className="p-2.5 bg-white flex justify-between items-center gap-4">
                        <span className="text-gray-800 truncate uppercase text-[11px]">🌿 {item.name}</span>
                        <div className="flex items-center gap-4 shrink-0 font-mono text-[11px]">
                          <span className="text-gray-400">₹{item.price}</span>
                          <span className="bg-gray-100 text-gray-600 px-1.5 py-0.2 rounded font-bold text-[10px]">x{item.quantity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Invoice subtotal summaries blocks at bottom right */}
              <div className="border-t border-gray-100 pt-3 flex flex-col items-end">
                <div className="w-full max-w-[200px] text-xs space-y-1.5 text-left font-semibold text-gray-500">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-mono text-gray-700">₹{Number(selectedOrder.totalAmount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-1.5">
                    <span>Shipping:</span>
                    <span className="text-emerald-600 font-bold text-[10px] uppercase">Free</span>
                  </div>
                  <div className="flex justify-between items-center pt-0.5 font-bold text-gray-900 text-sm">
                    <span>Total Bill:</span>
                    <span className="font-mono text-[#004d56] text-sm font-black">₹{Number(selectedOrder.totalAmount).toFixed(2)}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Orders;