import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
import Header from '../components/Header';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes urgency timer

  // Load Cart items on mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('ayurkart_cart')) || [];
    setCartItems(savedCart);
  }, []);

  // Countdown timer loop logic
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // 🎯 BHOOMIKA CLEAN FIX: Is function se unused variables saaf kar diye hain taaki warning na aaye
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    return `${mins.toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  // 🚀 🔥 BHOOMIKA INNER QUANTITY PLUS-MINUS ENGINE
  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    const updatedCart = cartItems.map(item => 
      String(item._id) === String(id) ? { ...item, quantity: Number(newQty) } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('ayurkart_cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated')); // Header badge instant notification sync
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => String(item._id) !== String(id));
    setCartItems(updatedCart);
    localStorage.setItem('ayurkart_cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // Order summary calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (Number(item.price) * Number(item.quantity)), 0);
  const shippingCharges = subtotal > 900 || subtotal === 0 ? 0 : 50;
  const grandTotal = subtotal + shippingCharges;

  return (
    <div className="w-full min-h-screen bg-[#fcfbf9] flex flex-col font-sans antialiased text-gray-800">
      <Header />

      <div className="max-w-7xl w-full mx-auto px-4 md:px-16 py-10 flex-1 flex flex-col">
        {/* 🚨 URGENCY TIMER BAR BLOCK */}
        {cartItems.length > 0 && (
          <div className="w-full bg-white border border-gray-200 p-4 mb-8 rounded-sm text-center shadow-2xs flex items-center justify-center gap-2 text-xs md:text-sm font-semibold text-left">
            <span className="animate-pulse">⏰</span>
            <p className="text-gray-700">
              An ayurvedic item in your cart is high in demand! Holding your slot for: 
              <span className="text-red-600 font-black font-mono ml-2 text-base">{formatTime(timeLeft)}</span>
            </p>
          </div>
        )}

        {/* 🛒 SHOPPING CART RENDERING CONDITIONAL FLOW */}
        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 text-center gap-5">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
              <ShoppingBag size={36} />
            </div>
            <h2 className="text-xl font-black uppercase tracking-tight text-gray-400">Your Cart is Empty</h2>
            <p className="text-sm text-gray-400 max-w-xs font-medium">Add premium authentic Ayurvedic formulations to launch your holistic health health matrix journey.</p>
            <Link to="/" className="bg-[#004d4e] text-white px-8 py-3 rounded-sm text-xs font-black uppercase tracking-wider no-underline shadow-xs hover:opacity-95 transition-all mt-2">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="w-full flex flex-col">
            {/* 🎯 BHOOMIKA LENGTH RECONCILED: Yeh sirf Unique rows ginega (jaise Kajal = 1 item) */}
            <h2 className="text-xl md:text-2xl font-black text-[#004d56] uppercase tracking-tight text-left mb-6 border-b border-gray-100 pb-3">
              SHOPPING CART ({cartItems.length} {cartItems.length === 1 ? 'ITEM' : 'ITEMS'})
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
              {/* LEFT SIDE: CARDS LIST MATRICES */}
              <div className="lg:col-span-8 flex flex-col space-y-4 w-full">
                {cartItems.map((item) => (
                  <div key={item._id} className="w-full bg-white border border-gray-100 p-5 rounded-xs shadow-3xs flex items-center justify-between gap-4 transition-all hover:shadow-xs">
                    <div className="flex items-center gap-4 min-w-0 flex-1 text-left">
                      <div className="w-20 h-20 border rounded p-1 bg-white flex-shrink-0 flex items-center justify-center overflow-hidden">
                        <img 
                          src={item.image.startsWith('http') ? item.image : `http://localhost:5000/${item.image.replace(/^\/+/, '')}`} 
                          alt={item.name} 
                          className="max-w-full max-h-full object-contain rounded" 
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs md:text-sm font-black text-gray-900 uppercase truncate tracking-tight text-left">{item.name}</h4>
                        <p className="text-[11px] text-gray-400 font-bold uppercase mt-1 text-left">{item.vendor || 'Kottakkal Arya Vaidya Sala'}</p>
                        <p className="text-sm font-black text-gray-800 mt-2 text-left">Rs. {Number(item.price).toFixed(2)}</p>
                      </div>
                    </div>

                    {/* Quantity Selector + Remainder Nodes */}
                    <div className="flex items-center gap-4 flex-shrink-0 select-none">
                      <div className="flex items-center border border-gray-300 rounded h-8 bg-gray-50 w-24 overflow-hidden">
                        <button 
                          onClick={() => updateQuantity(item._id, item.quantity - 1)} 
                          className="px-2.5 hover:bg-gray-200 text-gray-500 font-extrabold h-full border-none bg-transparent cursor-pointer text-xs focus:outline-none"
                        >
                          -
                        </button>
                        <span className="flex-1 text-xs font-black text-gray-700 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item._id, item.quantity + 1)} 
                          className="px-2.5 hover:bg-gray-200 text-gray-500 font-extrabold h-full border-none bg-transparent cursor-pointer text-xs focus:outline-none"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeItem(item._id)} 
                        className="text-gray-400 hover:text-red-500 transition-colors p-1 bg-transparent border-none cursor-pointer focus:outline-none"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* RIGHT SIDE: SUMMARY CALCULATION NODES */}
              <div className="lg:col-span-4 bg-white border border-gray-100 p-6 rounded-xs shadow-3xs w-full text-left">
                <h3 className="text-xs font-black tracking-wider text-gray-900 border-b border-gray-100 pb-3 mb-4 uppercase">Order Summary</h3>
                <div className="space-y-3 text-xs md:text-sm text-gray-600 font-semibold border-b border-gray-100 pb-4">
                  <div className="flex justify-between items-center">
                    <span>Subtotal</span>
                    <span className="text-gray-900">Rs. {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Shipping Charges</span>
                    <span className={shippingCharges === 0 ? "text-emerald-600 uppercase font-black text-xs" : "text-gray-900"}>
                      {shippingCharges === 0 ? 'FREE' : `Rs. ${shippingCharges.toFixed(2)}`}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-4 text-sm md:text-base font-black text-gray-900 uppercase">
                  <span>Grand Total</span>
                  <span className="text-[#004d56] text-lg">Rs. {grandTotal.toFixed(2)}</span>
                </div>

                {/* 🚀 🔥 BHOOMIKA VISIBILITY FIX: Button ko inline basic strong background color aur block display diya taaki transparent na rahe */}
                <Link 
                  to="/checkout" 
                  style={{ 
                    backgroundColor: '#f28500', 
                    color: '#ffffff', 
                    display: 'block',
                    textAlign: 'center',
                    padding: '12px 16px',
                    fontWeight: '900',
                    fontSize: '13px',
                    borderRadius: '2px',
                    letterSpacing: '0.05em',
                    textDecoration: 'none',
                    marginTop: '16px'
                  }}
                  className="w-full uppercase hover:opacity-95 transition-all shadow-md focus:outline-none"
                >
                  Proceed to Checkout <span>→</span>
                </Link>

                {/* 🚀 🔥 BHOOMIKA CHECKOUT LINK TRIGGER: Reconfigured text wrapper anchor link safely */}
                <Link 
                  to="/checkout" 
                  className="w-full bg-[#f28500] text-white py-3 px-4 rounded-xs font-black text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-sm flex items-center justify-center gap-2 mt-2 border-none cursor-pointer no-underline text-center focus:outline-none"
                >
                  Proceed to Checkout <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;