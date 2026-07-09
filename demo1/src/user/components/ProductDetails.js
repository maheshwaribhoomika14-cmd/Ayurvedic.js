import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header'; // Sahi Navbar path

const ProductDetails = () => {
  const { id } = useParams(); // URL se dynamic Mongo ID uthayega
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details'); 

  // Backend URL Formatter for Image Assets
  const formatImageUrl = (imgSrc) => {
    if (!imgSrc) return 'https://via.placeholder.com/450';
    if (imgSrc.startsWith('data:') || imgSrc.startsWith('http')) return imgSrc;
    return `http://localhost:5000/${imgSrc.replace(/^\/+/, '')}`;
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        console.log("Bhoomika Integrated Engine - Fetching ID:", id);
        
        let foundProduct = null;

        // 🚀 PATH 1: Pehle check karte hain direct standard products endpoint par
        try {
          const response = await fetch(`http://localhost:5000/api/products/${id}`);
          if (response.ok) {
            const data = await response.json();
            if (data) {
              foundProduct = data.data ? data.data : data;
            }
          }
        } catch (err) {
          console.log("Not in primary products, checking classical products endpoint...");
        }

        // 🚀 PATH 2: Agar standard mein nahi mila, toh Classical Products check karenge
        if (!foundProduct) {
          try {
            const classicalResponse = await fetch(`http://localhost:5000/api/classical-products/${id}`);
            if (classicalResponse.ok) {
              const classicalData = await classicalResponse.json();
              if (classicalData) {
                foundProduct = classicalData.data ? classicalData.data : classicalData;
              }
            }
          } catch (err) {
            console.log("Not in classical, checking concerns sub-array layer fallback...");
          }
        }

        // 🚀 PATH 3: BHOOMIKA CONCERNS COLLECTION LAYER SCANNER (Brahmi, Giloy, Aswagandha tabs fix)
        if (!foundProduct) {
          try {
            const concernsResponse = await fetch('http://localhost:5000/api/concerns');
            if (concernsResponse.ok) {
              const concernsData = await concernsResponse.json();
              const concernsList = concernsData ? (concernsData.data ? concernsData.data : concernsData) : [];
              
              if (Array.isArray(concernsList)) {
                // Har ek concern element ke andar bane products nested array mein scanning loops chalenge
                for (let concern of concernsList) {
                  if (concern.products && Array.isArray(concern.products)) {
                    // String casing mismatch logic bypass criteria handle kiya
                    const match = concern.products.find(p => {
                      const dbId = p._id ? String(p._id).trim().toLowerCase() : '';
                      const urlId = id ? String(id).trim().toLowerCase() : '';
                      return dbId === urlId;
                    });
                    if (match) {
                      foundProduct = match;
                      break;
                    }
                  }
                }
              }
            }
          } catch (concernErr) {
            console.error("Concerns matrix scanning failed:", concernErr);
          }
        }

        // Target state assignment allocation block
        if (foundProduct) {
          setProduct(foundProduct);
          if (foundProduct.image) {
            setMainImage(formatImageUrl(foundProduct.image));
          } else if (foundProduct.images && foundProduct.images.length > 0) {
            setMainImage(formatImageUrl(foundProduct.images[0])); 
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
    } else {
      setLoading(false);
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
          <h2 className="text-2xl font-bold text-red-500">PRODUCT STACK MISSING IN MONGODB SERVER.</h2>
          <p className="text-sm text-slate-400">Database node matching query completely empty. ID: {id}</p>
          <Link to="/" className="bg-[#004d4e] text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow no-underline hover:bg-[#003334]">
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
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <Header />

      {/* Breadcrumbs path layout */}
      <div className="w-full bg-[#f4ebd9]/30 py-3 px-4 md:px-16 text-xs text-slate-500 border-b">
        <div className="max-w-7xl mx-auto flex items-center space-x-2">
          <Link to="/" className="hover:text-[#005f60] font-semibold no-underline text-gray-500">Home</Link> 
          <span>/</span> 
          <span className="hover:text-[#005f60] font-semibold no-underline text-gray-500">Top Selling Ayurvedic Medicines</span>
          <span>/</span>
          <span className="text-slate-800 uppercase font-bold">{product.name}</span>
        </div>
      </div>

      {/* Main Product Panel Block Layout Grid */}
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
                    activeMainImage === img ? 'border-[#f28500] scale-102 shadow-xs' : 'border-gray-200 opacity-80 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-contain rounded" />
                </div>
              ))}
            </div>
          )}

          <div className="w-full md:flex-1 h-[450px] border border-slate-200 rounded overflow-hidden flex items-center justify-center p-4 bg-white order-1 md:order-2 shadow-3xs relative">
            <img 
              src={activeMainImage} 
              alt={product.name} 
              className="w-full h-full max-h-full max-w-full object-contain"
            />
          </div>
        </div>

        {/* RIGHT SIDE: COMMERCE LAYOUT & DETAILS PANEL */}
        <div className="md:col-span-6 flex flex-col w-full justify-start space-y-4 pt-1">
          <h1 className="text-xl md:text-2xl font-black text-gray-800 uppercase tracking-tight leading-tight">
            {product.name}
          </h1>

          <div className="flex items-center gap-1 font-bold text-xs select-none">
            <div className="flex space-x-0.5">
              {[...Array(5)].map((_, i) => <span key={i} className="text-[#f99011] text-[15px]">★</span>)}
            </div>
            <span className="text-gray-400 text-[11px] font-semibold ml-1">18 reviews</span>
          </div>
          
          <div className="text-2xl md:text-3xl font-black text-gray-800 pt-1">
            Rs. {product.price ? product.price : '104'}.00
          </div>

          <div className="text-[12px] space-y-2.5 text-gray-600 border-b border-gray-100 pb-5">
            <div className="grid grid-cols-4 items-center">
              <span className="font-bold text-gray-400 uppercase tracking-wide">Availability:</span> 
              <span className="col-span-3 text-emerald-600 font-bold pl-2">{product.availability || 'Available'}</span>
            </div>
            <div className="grid grid-cols-4 items-center">
              <span className="font-bold text-gray-400 uppercase tracking-wide">Product Type:</span> 
              <span className="col-span-3 text-cyan-700 font-bold pl-2">{product.category?.name || product.category || product.productType || 'General'}</span>
            </div>
            <div className="grid grid-cols-4 items-center">
              <span className="font-bold text-gray-400 uppercase tracking-wide">Product Vendor:</span> 
              <span className="col-span-3 font-bold text-gray-700 pl-2">{product.vendor || 'Kottakkal Arya Vaidya Sala'}</span>
            </div>
            <div className="grid grid-cols-4 items-center">
              <span className="font-bold text-gray-400 uppercase tracking-wide">Product SKU:</span> 
              <span className="col-span-3 font-mono text-gray-500 font-bold pl-2">{product.sku || 'AK-A001'}</span>
            </div>
          </div>

          {/* Quantity Controls Box */}
          <div className="flex items-center border border-gray-300 rounded h-10 bg-gray-50 w-28 overflow-hidden mb-2">
            <button 
              onClick={() => setQuantity(prev => Math.max(1, prev - 1))} 
              className="px-3 hover:bg-gray-200 text-gray-500 font-extrabold h-full border-none bg-transparent cursor-pointer text-sm focus:outline-none"
            >
              -
            </button>
            <span className="flex-1 text-xs font-black text-gray-700 text-center select-none">
              {quantity}
            </span>
            <button 
              onClick={() => setQuantity(prev => prev + 1)} 
              className="px-3 hover:bg-gray-200 text-gray-500 font-extrabold h-full border-none bg-transparent cursor-pointer text-sm focus:outline-none"
            >
              +
            </button>
          </div>

          {/* Action Buttons Container Row */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px', marginTop: '15px', width: '100%' }}>
            <button 
              onClick={() => alert(`${product.name} (${quantity} Qty) added to your cart!`)}
              style={{ backgroundColor: '#f28500', color: '#ffffff', height: '46px', padding: '0px 36px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '13px', borderRadius: '2px', border: 'none', cursor: 'pointer' }}
            >
              ADD TO CART
            </button>
            <button 
              onClick={() => alert(`${product.name} saved to Wishlist!`)}
              style={{ backgroundColor: '#004d4e', color: '#ffffff', height: '46px', width: '46px', borderRadius: '2px', border: 'none', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}
            >
              ♥
            </button>
          </div>

          {/* Trusted Checkout Assurance */}
          <div className="pt-4 pb-3 text-[10px] text-gray-400 font-bold border-b border-gray-100">
            <p className="uppercase tracking-wider mb-1.5">Secured and trusted checkout with:</p>
            <div className="flex flex-wrap gap-2 opacity-80 select-none">
              <span className="border border-gray-200 px-2 py-0.5 rounded text-gray-500 font-black">VISA</span>
              <span className="border border-gray-200 px-2 py-0.5 rounded text-gray-500 font-black">UPI</span>
              <span className="border border-gray-200 px-2 py-0.5 rounded text-gray-500 font-black">RuPay</span>
              <span className="border border-gray-200 px-2 py-0.5 rounded text-gray-500 font-black">Paytm</span>
            </div>
          </div>
        </div>
      </main>

      {/* DYNAMIC TAGS SYSTEM */}
      {product.tags && product.tags.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 md:px-16 pb-4 w-full flex items-center gap-2 select-none">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tags:</span>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-600 border border-gray-200 px-3 py-1 rounded text-xs font-semibold capitalize">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* NAVIGATION 3-TABS ROW LAYOUT SECTION */}
      <div className="w-full bg-gray-50 border-t border-b border-gray-200 mt-6 relative z-20 font-sans select-none">
        <div className="max-w-7xl mx-auto px-4 md:px-16 flex space-x-1">
          {['details', 'reviews', 'shipping'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)} 
              className={`py-3.5 px-6 font-bold text-xs uppercase tracking-wider relative transition-all focus:outline-none cursor-pointer ${
                activeTab === tab ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'
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

      {/* DYNAMIC DETAILS RENDERING ENGINE */}
      <div className="max-w-7xl mx-auto px-4 md:px-16 py-10 w-full flex-1 mb-16 relative z-10 font-sans">
        {activeTab === 'details' && (
          <div className="text-sm text-gray-700 max-w-5xl space-y-8 animate-fadeIn">
            
            <div className="space-y-4">
              <h2 className="text-base md:text-xl font-bold text-gray-900 uppercase tracking-tight">
                {product.name} – AYURVEDIC FORMULATION DETAILS
              </h2>
              
              <div className="pt-2 flex flex-col space-y-3 text-xs text-gray-700 font-bold pl-1">
                {product.indications && (
                  <div className="flex items-start">
                    <span className="text-orange-500 font-bold mr-2 text-sm select-none">✓</span>
                    <span>Indications: <span className="font-medium text-gray-600 ml-1">{product.indications}</span></span>
                  </div>
                )}
                {product.usage && (
                  <div className="flex items-start">
                    <span className="text-orange-500 font-bold mr-2 text-sm select-none">✓</span>
                    <span>Product Usage / Benefit: <span className="font-medium text-gray-600 ml-1">{product.usage}</span></span>
                  </div>
                )}
                {product.dosage && (
                  <div className="flex items-start">
                    <span className="text-orange-500 font-bold mr-2 text-sm select-none">✓</span>
                    <span>Recommended Dosage: <span className="font-medium text-gray-600 ml-1">{product.dosage}</span></span>
                  </div>
                )}
                <div className="flex items-start">
                  <span className="text-orange-500 font-bold mr-2 text-sm select-none">✓</span>
                  <span>Authentic product sourced directly from <span className="text-gray-900 font-black">{product.vendor || 'Kottakkal'}</span></span>
                </div>
              </div>

              <div className="pt-4 text-xs md:text-sm text-gray-600 leading-relaxed font-medium space-y-3">
                <p>
                  <span className="font-bold text-gray-900">{product.name}</span> from brand <span className="font-bold text-gray-900">{product.vendor || 'Kottakkal Ayurveda'}</span> is a highly specialized traditional preparation compound optimized under standard specifications. It is engineered with premium organic herbs supporting core internal equilibrium and body system restoration safely.
                </p>
                <div className="bg-gray-50 border border-gray-100 p-4 rounded-lg mt-4 font-normal italic text-gray-500">
                  <span className="font-bold uppercase text-[10px] tracking-wider text-gray-400 block mb-1">Database Cloud Description:</span>
                  {product.description || "No customized product paragraph strings specified inside MongoDB server collections."}
                </div>
              </div>
            </div>

          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="w-full text-center py-10 text-gray-400 font-medium text-xs uppercase tracking-wider">
            No customer reviews posted yet for this item slot.
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="space-y-4 text-xs md:text-sm text-gray-600 font-medium pl-1">
            <h4 className="font-bold text-gray-900 uppercase">Shipping Guidelines</h4>
            <p>• Standard shipment updates are processed within 24-48 business warehouse hours.</p>
            <p>• Returns or quality claim checks can be initiated within 7 delivery days smoothly.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default ProductDetails;