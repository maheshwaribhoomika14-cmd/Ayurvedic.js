import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Truck, CreditCard, ShoppingBag, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'cod' // default Cash on Delivery
  });

  // Load cart items on mount to lock order review summary data
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('ayurkart_cart')) || [];
    if (savedCart.length === 0) {
      navigate('/cart'); // Agar cart khali h toh wapas bhej do
    }
    setCartItems(savedCart);
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 🚀 🔥 BHOOMIKA ADVANCED BACKEND CONNECTIVITY LOGIC MATRIX
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.address || !formData.phone) {
      alert("Please fill in Name, Address, and Phone details!");
      return;
    }

    // Prepare structure payload mapping exact to standard MongoDB Schema
    const orderPayload = {
      customerDetails: {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.zipCode}`
      },
      items: cartItems.map(item => ({
        productId: item._id,
        name: item.name,
        quantity: Number(item.quantity),
        price: Number(item.price)
      })),
      totalAmount: cartItems.reduce((acc, item) => acc + (Number(item.price) * Number(item.quantity)), 0) + (cartItems.reduce((acc, item) => acc + (Number(item.price) * Number(item.quantity)), 0) > 900 ? 0 : 50),
      paymentMethod: formData.paymentMethod,
      status: 'Pending'
    };

    try {
      // 🚀 Dispatching full payload pack to MongoDB Backend Express Server Engine
      const response = await fetch('http://localhost:5000/api/v2/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderPayload)
      });
      if (response.ok) {
        alert(`🎉 Order placed successfully via ${formData.paymentMethod.toUpperCase()}!\nSaved inside MongoDB cluster secure nodes.`);
        
        // Clear local storage and sync counter badges
        localStorage.removeItem('ayurkart_cart');
        window.dispatchEvent(new Event('cartUpdated'));
        navigate('/');
      } else {
        const errorData = await response.json();
        alert(`⚠️ Failed to sync with backend server nodes: ${errorData.message || 'Unknown network packet drop'}`);
      }
    } catch (err) {
      console.error("Order submission critical node failure:", err);
      alert("❌ Critical Server communication packet error! Checking standard fetch proxy route connectivity.");
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (Number(item.price) * Number(item.quantity)), 0);
  const shippingCharges = subtotal > 900 ? 0 : 50;
  const grandTotal = subtotal + shippingCharges;

  return (
    <div className="w-full min-h-screen bg-[#fcfbf9] flex flex-col font-sans text-gray-800 antialiased">
      <Header />

      <div className="max-w-7xl w-full mx-auto px-4 md:px-16 py-10 flex-1 flex flex-col">
        {/* Back Link */}
        <div className="mb-6 text-left">
          <Link to="/cart" className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-emerald-800 no-underline uppercase tracking-wider">
            <ArrowLeft size={14} /> Back to Cart
          </Link>
        </div>

        <h2 className="text-xl md:text-2xl font-black text-[#004d56] uppercase tracking-tight text-left mb-8 border-b border-gray-100 pb-3">
          Secure Checkout Page
        </h2>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full text-left">
          
          {/* LEFT SIDE: SHIPPING & PAYMENT FORM BLOCK */}
          <div className="lg:col-span-7 flex flex-col space-y-6 w-full">
            {/* Shipping Address Container */}
            <div className="bg-white border border-gray-100 p-6 rounded-xs shadow-3xs">
              <h3 className="text-sm font-black uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
                <Truck size={16} className="text-emerald-700" /> Delivery Address Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 flex flex-col space-y-1">
                  <label className="text-[11px] font-bold text-gray-400 uppercase">Full Name *</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#f28500] rounded-sm bg-gray-50/50" placeholder="Enter full name" />
                </div>
                
                <div className="flex flex-col space-y-1">
                  <label className="text-[11px] font-bold text-gray-400 uppercase">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#f28500] rounded-sm bg-gray-50/50" placeholder="email@example.com" />
                </div>
                
                <div className="flex flex-col space-y-1">
                  <label className="text-[11px] font-bold text-gray-400 uppercase">Phone Number *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#f28500] rounded-sm bg-gray-50/50" placeholder="10-digit mobile number" />
                </div>

                <div className="md:col-span-2 flex flex-col space-y-1">
                  <label className="text-[11px] font-bold text-gray-400 uppercase">Street Address *</label>
                  <textarea name="address" value={formData.address} onChange={handleInputChange} required rows="2" className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#f28500] rounded-sm bg-gray-50/50 resize-none" placeholder="Flat, House no., Building, Company, Apartment, Area" />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[11px] font-bold text-gray-400 uppercase">Town / City *</label>
                  <input type="text" name="city" value={formData.city} onChange={handleInputChange} required className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#f28500] rounded-sm bg-gray-50/50" placeholder="City name" />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[11px] font-bold text-gray-400 uppercase">State *</label>
                  <input type="text" name="state" value={formData.state} onChange={handleInputChange} required className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#f28500] rounded-sm bg-gray-50/50" placeholder="State name" />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[11px] font-bold text-gray-400 uppercase">Pincode / Zip *</label>
                  <input type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} required className="border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#f28500] rounded-sm bg-gray-50/50" placeholder="6-digit pincode" />
                </div>
              </div>
            </div>

            {/* Payment Method Container */}
            <div className="bg-white border border-gray-100 p-6 rounded-xs shadow-3xs">
              <h3 className="text-sm font-black uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
                <CreditCard size={16} className="text-emerald-700" /> Payment Selection Node
              </h3>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border border-gray-100 rounded-sm bg-gray-50/50 cursor-pointer select-none hover:border-gray-300 transition-colors">
                  <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleInputChange} className="w-4 h-4 text-[#004d56] focus:ring-[#004d56]" />
                  <div className="text-xs md:text-sm font-bold text-gray-800">
                    Cash on Delivery (COD)
                    <span className="block text-[11px] font-normal text-gray-400 mt-0.5">Pay with cash at the time of package delivery.</span>
                  </div>
                </label>
                
                <label className="flex items-center gap-3 p-3 border border-gray-100 rounded-sm bg-gray-50/50 cursor-pointer select-none hover:border-gray-300 transition-colors opacity-70">
                  <input type="radio" name="paymentMethod" value="online" checked={formData.paymentMethod === 'online'} onChange={handleInputChange} className="w-4 h-4 text-[#004d56] focus:ring-[#004d56]" />
                  <div className="text-xs md:text-sm font-bold text-gray-800">
                    Online Netbanking / UPI / Cards
                    <span className="block text-[11px] font-normal text-amber-600 font-bold mt-0.5">⚠️ Razorpay Payment Gateway integration setup pending.</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: ORDER ITEMS REVIEW & GRAND TOTAL BOX */}
          <div className="lg:col-span-5 bg-white border border-gray-100 p-6 rounded-xs shadow-3xs w-full">
            <h3 className="text-xs font-black tracking-wider text-gray-900 border-b border-gray-100 pb-3 mb-4 uppercase flex items-center gap-2">
              <ShoppingBag size={14} /> Review Items List ({cartItems.length})
            </h3>

            {/* List mini products loop matrices */}
            <div className="max-h-60 overflow-y-auto mb-5 space-y-3 pr-1 border-b border-gray-50 pb-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-3 bg-gray-50/60 p-2 border border-gray-100/50 rounded-sm">
                  <div className="w-12 h-12 border bg-white p-0.5 rounded flex-shrink-0 flex items-center justify-center">
                    <img src={item.image.startsWith('http') ? item.image : `http://localhost:5000/${item.image.replace(/^\/+/, '')}`} alt="mini" className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-gray-800 uppercase truncate tracking-tight">{item.name}</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5 font-medium">Qty: {item.quantity} × Rs. {item.price}</p>
                  </div>
                  <span className="text-xs font-black text-gray-900 shrink-0">Rs. {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Summary details blocks */}
            <div className="space-y-3 text-xs md:text-sm text-gray-600 font-semibold border-b border-gray-100 pb-4">
              <div className="flex justify-between items-center">
                <span>Items Subtotal</span>
                <span className="text-gray-900">Rs. {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Standard Shipment</span>
                <span className={shippingCharges === 0 ? "text-emerald-600 uppercase font-black text-xs" : "text-gray-900"}>
                  {shippingCharges === 0 ? 'FREE' : `Rs. ${shippingCharges.toFixed(2)}`}
                </span>
              </div>
            </div>
            
            <div className="flex justify-between items-center py-4 text-sm md:text-base font-black text-gray-900 uppercase">
              <span>Grand Total</span>
              <span className="text-[#004d56] text-lg">Rs. {grandTotal.toFixed(2)}</span>
            </div>

            <button 
              type="submit" 
              style={{
                backgroundColor: '#004d4e',
                color: '#ffffff',
                display: 'block',
                width: '100%',
                textAlign: 'center',
                padding: '14px 16px',
                fontWeight: '900',
                fontSize: '13px',
                borderRadius: '2px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                border: 'none',
                cursor: 'pointer',
                marginTop: '16px'
              }}
              className="hover:opacity-95 transition-all shadow-md focus:outline-none"
            >
              PLACE ORDER NOW
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Checkout;