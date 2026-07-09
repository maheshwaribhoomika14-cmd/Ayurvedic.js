import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header'; // Sahi Navbar path
import { addToCartGlobal } from '../utils/cartUtils';

const ProductDetails = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details'); 

  // 🎯 EXACT REVIEWS MATCH MATRIX DATA (As per image_10367a.png layout setup)
  const mockReviewsList = [
    {
      id: 1,
      name: "Jyothi Mohite",
      date: "14/11/2025",
      rating: 5,
      comment: "I apply your kajal every night. Next day I don't have to use kajal pencil, eyeliner etc.",
      isVerified: false
    },
    {
      id: 2,
      name: "Deepti Chaturvedi",
      date: "31/03/2025",
      rating: 5,
      comment: "Love tht small container with herbal kajal no itching after use.",
      isVerified: true
    },
    {
      id: 3,
      name: "Rahul Verma",
      date: "02/01/2026",
      rating: 4,
      comment: "Very clean formulation and traditional packaging. Highly effective for daily scaling.",
      isVerified: false
    },
    {
      id: 4,
      name: "Bhoomika Maheshwari",
      date: "28/02/2026",
      rating: 5,
      comment: "Excellent cooling effect on eyes, pristine herbal texture. Highly recommended!",
      isVerified: true
    }
  ];

  const formatImageUrl = (imgSrc) => {
    if (!imgSrc) return 'https://via.placeholder.com/450';
    if (imgSrc.startsWith('data:') || imgSrc.startsWith('http')) return imgSrc;
    return `http://localhost:5000/${imgSrc.replace(/^\/+/, '')}`;
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        let response = await fetch(`http://localhost:5000/api/products/${id}`);
        let data = null;

        if (response.ok) {
          data = await response.json();
        } else {
          const classicalResponse = await fetch(`http://localhost:5000/api/classical-products/${id}`);
          if (classicalResponse.ok) {
            data = await classicalResponse.json();
          }
        }

        if (data) {
          const targetData = data.data ? data.data : data;
          setProduct(targetData);
          
          if (targetData.image) {
            setMainImage(formatImageUrl(targetData.image));
          } else if (targetData.images && targetData.images.length > 0) {
            setMainImage(formatImageUrl(targetData.images[0])); 
          }
        }
      } catch (error) {
        console.error("Frontend Data fetching crash error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white flex flex-col">
        <Header />
        <div className="text-center py-20 font-bold text-[#f28500] text-lg flex-1 flex items-center justify-center animate-pulse">
          Loading Ayurveda Specifications...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full min-h-screen bg-white flex flex-col">
        <Header />
        <div className="text-center py-20 flex-1 flex flex-col items-center justify-center gap-4 bg-[#fbfaf7]">
          <h2 className="text-2xl font-bold text-red-500">Product Not Found!</h2>
          <Link to="/" className="bg-[#004d4e] text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow no-underline">
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  const galleryImages = product.images && product.images.length > 0 
    ? product.images.map(img => formatImageUrl(img))
    : [formatImageUrl(product.image)];

  const activeMainImage = mainImage || galleryImages[0];

  return (
    <div className="w-full min-h-screen bg-white flex flex-col font-sans text-gray-800 antialiased relative overflow-x-hidden pb-20">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .animate-fadeIn { animation: fadeIn 0.3s ease-in-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <Header />

      <div className="w-full bg-[#f4ebd9]/30 py-3 px-4 md:px-16 text-xs text-slate-500 border-b">
        <div className="max-w-7xl mx-auto flex items-center space-x-2">
          <Link to="/" className="hover:text-[#005f60] font-semibold no-underline text-gray-500">Home</Link> 
          <span>/</span> 
          <span className="text-slate-800 uppercase font-bold">{product.name}</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-16 py-12 grid grid-cols-1 md:grid-cols-12 gap-12 w-full">
        {/* LEFT SIDE: GALLERY CONTAINER */}
        <div className="md:col-span-6 flex flex-col md:flex-row gap-4 items-start w-full">
          {galleryImages.length > 1 && (
            <div className="flex flex-row md:flex-col gap-3 order-2 md:order-1 w-full md:w-24 max-h-[450px] overflow-auto py-1 no-scrollbar flex-shrink-0">
              {galleryImages.map((img, idx) => (
                <div 
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`w-20 h-20 border-2 rounded p-1 bg-white cursor-pointer transition-all flex items-center justify-center overflow-hidden flex-shrink-0 ${
                    activeMainImage === img ? 'border-[#f28500] scale-102 shadow-xs' : 'border-gray-200 opacity-80'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-contain rounded" />
                </div>
              ))}
            </div>
          )}
          <div className="w-full md:flex-1 h-[450px] border border-slate-200 rounded overflow-hidden flex items-center justify-center p-4 bg-white order-1 md:order-2 shadow-3xs relative">
            <img src={activeMainImage} alt={product.name} className="w-full h-full object-contain" />
          </div>
        </div>

        {/* RIGHT SIDE: COMMERCE LAYOUT PANEL */}
        <div className="md:col-span-6 flex flex-col w-full justify-start space-y-4 pt-1 text-left">
          <h1 className="text-xl md:text-2xl font-black text-gray-800 uppercase tracking-tight leading-tight">{product.name}</h1>
          
          <div className="flex items-center gap-1 font-bold text-xs select-none">
            <div className="flex space-x-0.5">
              {[...Array(5)].map((_, i) => <span key={i} className="text-[#f99011] text-[15px]">★</span>)}
            </div>
            <span className="text-gray-400 text-[11px] font-semibold ml-1">18 reviews</span>
          </div>

          <div className="text-2xl md:text-3xl font-black text-gray-800 pt-1">Rs. {product.price}.00</div>

          <div className="text-[12px] space-y-2.5 text-gray-600 border-b border-gray-100 pb-5 text-left">
            <div className="grid grid-cols-4 items-center">
              <span className="font-bold text-gray-400 uppercase tracking-wide">Availability:</span> 
              <span className="col-span-3 text-emerald-600 font-bold pl-2">{product.availability || 'In Stock'}</span>
            </div>
            <div className="grid grid-cols-4 items-center">
              <span className="font-bold text-gray-400 uppercase tracking-wide">Product Type:</span> 
              <span className="col-span-3 text-cyan-700 font-bold pl-2">
                {product.category?.name || (typeof product.category === 'string' ? product.category : 'General')}
              </span>
            </div>
            <div className="grid grid-cols-4 items-center">
              <span className="font-bold text-gray-400 uppercase tracking-wide">Product Vendor:</span> 
              <span className="col-span-3 font-bold text-gray-700 pl-2">{product.vendor || 'Kottakkal Arya Vaidya Sala'}</span>
            </div>
          </div>

          {/* Quantity Counter Wrapper */}
          <div className="flex items-center border border-gray-300 rounded h-10 bg-gray-50 w-28 overflow-hidden mb-2">
            <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className="px-3 hover:bg-gray-200 text-gray-500 font-extrabold h-full border-none bg-transparent cursor-pointer text-sm focus:outline-none">-</button>
            <span className="flex-1 text-xs font-black text-gray-700 text-center select-none">{quantity}</span>
            <button onClick={() => setQuantity(prev => prev + 1)} className="px-3 hover:bg-gray-200 text-gray-500 font-extrabold h-full border-none bg-transparent cursor-pointer text-sm focus:outline-none">+</button>
          </div>

          {/* ADD TO CART ACTION SYSTEM */}
          <div className="flex flex-row items-center gap-3 mt-4 w-full">
            <button 
              onClick={() => {
                addToCartGlobal(product, quantity);
                alert(`🛒 Success! "${product?.name || 'Item'}" has been added to your cart.`);
                window.dispatchEvent(new Event('cartUpdated'));
              }} 
              style={{ backgroundColor: '#f28500', color: '#ffffff', height: '46px', padding: '0px 36px', fontWeight: '900', textTransform: 'uppercase', border: 'none', cursor: 'pointer', borderRadius: '2px' }}
              className="hover:opacity-95 transition-all focus:outline-none shadow-sm"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </main>

      {/* BHOOMIKA 3-TABS ROW LAYOUT MATRIX */}
      <div className="w-full bg-gray-100 border-t border-b border-gray-200 mt-6 font-sans select-none">
        <div className="max-w-7xl mx-auto px-4 md:px-16 flex space-x-2">
          {['details', 'reviews', 'shipping'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)} 
              className={`py-3.5 px-6 font-extrabold text-xs uppercase tracking-wider relative transition-all focus:outline-none cursor-pointer border-none ${
                activeTab === tab ? 'bg-black text-white' : 'bg-transparent text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab === 'details' ? 'Product Details' : tab === 'reviews' ? 'Product Reviews' : 'Shipping & Returns'}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[100%] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-black z-30"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* DYNAMIC CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 md:px-16 py-10 w-full flex-1 font-sans">
        
        {/* Tab 1: Details */}
        {activeTab === 'details' && (
          <div className="text-sm text-gray-700 max-w-5xl space-y-8 animate-fadeIn text-left">
            <div className="space-y-4">
              <h2 className="text-base md:text-xl font-black text-gray-900 uppercase tracking-tight">
                KEY BENEFITS OF {product.name}
              </h2>
              <p className="leading-relaxed text-gray-600 font-medium text-sm md:text-base bg-gray-50 p-4 border border-gray-100 rounded-lg whitespace-pre-line">
                {product.description || `${product.name} is a premium authentic Ayurvedic formulation curated carefully under certified global standards to restore body equilibrium and support core health system restorative values safely.`}
              </p>
            </div>
          </div>
        )}

        {/* ============================================================================= */}
        {/* 🎯 Tab 2: REPLACED WITH PRECISE MATCH LAYOUT FOR REVIEWS (As per image_10367a.png) */}
        {/* ============================================================================= */}
        {activeTab === 'reviews' && (
          <div className="max-w-6xl mx-auto space-y-8 py-4 text-left animate-fadeIn font-sans">
            <div className="divide-y divide-gray-100">
              {mockReviewsList.map((rev) => (
                <div key={rev.id} className="py-6 first:pt-0 last:pb-0 flex flex-col gap-2">
                  
                  {/* Row 1: Orange Stars & Right Date Layout */}
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-0.5 text-sm">
                      {[...Array(5)].map((_, starIdx) => (
                        <span key={starIdx} style={{ color: starIdx < rev.rating ? '#f28500' : '#e5e7eb' }}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-[11px] text-gray-400 font-medium font-sans tracking-wide">
                      {rev.date}
                    </span>
                  </div>

                  {/* Row 2: Avatar Box Profile Segment with Custom SVG Branding */}
                  <div className="flex items-center gap-3.5 mt-1.5">
                    {/* User profile outline vector box placeholder shape */}
                    <div className="w-10 h-10 rounded-sm bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#004d56" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>

                    {/* Name Link with Optional Verified Badge */}
                    <div className="flex items-center gap-2">
                      <span style={{ color: '#005f60' }} className="text-[13px] font-bold hover:underline cursor-pointer">
                        {rev.name}
                      </span>
                      {rev.isVerified && (
                        <span style={{ backgroundColor: '#004d56', color: '#ffffff' }} className="text-[9px] font-black tracking-wider px-1.5 py-0.5 rounded-xs uppercase">
                          Verified
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Row 3: Actual Clean Comment Body block text alignment */}
                  <div className="mt-2 pl-0 md:pl-14">
                    <p className="text-[13px] text-gray-600 font-medium leading-relaxed m-0">
                      {rev.comment}
                    </p>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}
        {/* ============================================================================= */}

        {/* Tab 3: Shipping & Returns */}
        {activeTab === 'shipping' && (
          <div className="space-y-4 text-xs md:text-sm text-gray-600 font-medium pl-1 text-left animate-fadeIn">
            <h4 className="font-black text-gray-900 uppercase tracking-tight text-sm md:text-base">Shipping Guidelines</h4>
            <p className="text-gray-500">• Standard shipment packages are carefully prepared and dispatched within 24-48 business hours.</p>
            <p className="text-gray-500">• Easy returns or claims can be processed within 7 business delivery days smoothly.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;