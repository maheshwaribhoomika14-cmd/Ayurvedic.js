import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header'; 

const CategoryDetails = () => {
  const { id } = useParams(); // URL se dynamic parameter identifier nikalega
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details'); 

  // Backend URL Formatter
  const formatImageUrl = (imgSrc) => {
    if (!imgSrc) return 'https://via.placeholder.com/450';
    if (imgSrc.startsWith('data:') || imgSrc.startsWith('http')) return imgSrc;
    return `http://localhost:5000/${imgSrc.replace(/^\/+/, '')}`;
  };

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        const cleanId = decodeURIComponent(id).trim();
        console.log("Fetching category with identifier:", cleanId);

        const response = await fetch(`http://localhost:5000/api/categories`);
        
        if (response.ok) {
          const categoriesList = await response.json();
          
          const matchedCategory = categoriesList.find(cat => 
            cat.name.toLowerCase().trim() === cleanId.toLowerCase() ||
            cat._id === cleanId
          );

          if (matchedCategory) {
            const standardizedData = {
              name: matchedCategory.name || 'Ayurvedic Item',
              price: matchedCategory.price || '98',
              sku: matchedCategory.sku || 'AK-VR464',
              availability: matchedCategory.availability || 'In Stock',
              productType: matchedCategory.productType || 'Syrup',
              vendor: matchedCategory.vendor || 'Vaidyaratnam',
              description: matchedCategory.description || 'No description available.',
              dosage: matchedCategory.dosage || 'As directed by the physician.',
              images: matchedCategory.images && matchedCategory.images.length > 0 ? matchedCategory.images : (matchedCategory.image ? [matchedCategory.image] : [])
            };

            setCategory(standardizedData);
            if (standardizedData.images.length > 0) {
              setMainImage(formatImageUrl(standardizedData.images[0]));
            }
            setLoading(false);
            return;
          }
        }
        
        const singleRes = await fetch(`http://localhost:5000/api/categories/${encodeURIComponent(cleanId)}`);
        if (singleRes.ok) {
          const data = await singleRes.json();
          if (data) {
            const standardizedData = {
              name: data.name,
              price: data.price || '98',
              sku: data.sku || 'AK-VR464',
              availability: data.availability || 'In Stock',
              productType: data.productType || 'Syrup',
              vendor: data.vendor || 'Vaidyaratnam',
              description: data.description || '',
              images: data.images && data.images.length > 0 ? data.images : (data.image ? [data.image] : [])
            };
            setCategory(standardizedData);
            if (standardizedData.images.length > 0) {
              setMainImage(formatImageUrl(standardizedData.images[0]));
            }
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchCategoryData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white flex flex-col">
        <Header />
        <div className="text-center py-20 font-bold text-[#f99011] text-lg flex-1 flex items-center justify-center animate-pulse">
          Loading Your Category Details...
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="w-full min-h-screen bg-white flex flex-col">
        <Header />
        <div className="text-center py-20 text-gray-500 flex-1 flex items-center justify-center font-bold">
          Category data not found. Please check Admin panel naming.
        </div>
      </div>
    );
  }

  const galleryImages = category.images.map(img => formatImageUrl(img));
  const activeMainImage = mainImage || galleryImages[0];

  return (
    <div className="w-full min-h-screen bg-white flex flex-col font-sans text-gray-800 antialiased relative overflow-x-hidden">
      
      <style>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-combine-upright: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <Header />

      {/* Breadcrumbs */}
      <div className="w-full bg-gray-50 py-3 px-4 md:px-16 text-xs text-slate-500 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center space-x-2">
          <Link to="/" className="text-gray-500 no-underline hover:text-gray-900">Home</Link> 
          <span>›</span> 
          <span className="text-gray-900 font-medium">{category.name}</span>
        </div>
      </div>

      {/* Main Grid Content Layout */}
      <main className="max-w-7xl mx-auto px-4 md:px-16 py-10 grid grid-cols-1 md:grid-cols-12 gap-10 w-full flex-1">
        
        {/* LEFT COLUMN: MULTI IMAGES */}
        <div className="md:col-span-6 flex flex-col md:flex-row gap-4 items-stretch w-full">
          <div className="flex flex-row md:flex-col gap-3 order-2 md:order-1 w-full md:w-24 max-h-[450px] overflow-auto py-1 no-scrollbar">
            {galleryImages.map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 min-w-[80px] min-h-[80px] border-2 rounded-lg bg-white cursor-pointer transition-all flex items-center justify-center overflow-hidden ${
                  activeMainImage === img ? 'border-[#f99011] scale-102 shadow-xs' : 'border-gray-200 opacity-80 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover select-none" />
              </div>
            ))}
          </div>

          <div className="w-full md:flex-1 h-[350px] md:h-[450px] border border-gray-200 rounded-xl overflow-hidden bg-white order-1 md:order-2 shadow-3xs flex items-center justify-center">
            <img 
              src={activeMainImage} 
              alt={category.name} 
              className="w-full h-full object-cover transition-all duration-300 select-none" 
            />
          </div>
        </div>

        {/* RIGHT COLUMN: TEXT CONTENT */}
        <div className="md:col-span-6 flex flex-col w-full justify-start">
          <h1 className="text-lg md:text-xl font-black text-gray-900 tracking-tight uppercase border-b pb-4">
            {category.name}
          </h1>

          <div className="flex items-center space-x-2 mt-4">
            <div style={{ color: '#f99011' }} className="font-bold text-xs flex space-x-0.5">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <span className="text-xs text-blue-600 font-semibold">15 reviews</span>
          </div>
          
          <div className="text-2xl font-black text-gray-900 mt-4">
            <span className="text-sm font-bold mr-1 text-gray-500">Price:</span>
            <span className="text-gray-400 text-lg mr-1.5 font-normal">Rs.</span>{category.price}.00
          </div>

          <div className="mt-5 border-t border-b border-gray-100 py-4 space-y-3 text-xs md:text-sm">
            <div className="flex"><span className="w-32 text-gray-400 font-bold uppercase text-[11px]">Availability:</span> <span className="text-emerald-600 font-bold">{category.availability}</span></div>
            <div className="flex"><span className="w-32 text-gray-400 font-bold uppercase text-[11px]">Product Type:</span> <span className="text-slate-800 font-medium">{category.productType}</span></div>
            <div className="flex"><span className="w-32 text-gray-400 font-bold uppercase text-[11px]">Vendor:</span> <span className="text-blue-700 font-semibold">{category.vendor}</span></div>
            <div className="flex"><span className="w-32 text-gray-400 font-bold uppercase text-[11px]">SKU:</span> <span className="text-gray-700 font-mono">{category.sku}</span></div>
          </div>

          <div className="flex flex-row gap-4 mt-6 items-stretch max-w-sm w-full">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
              <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className="px-4 py-2 text-sm">-</button>
              <span className="px-2 text-sm text-gray-800 text-center min-w-[20px]">{quantity}</span>
              <button onClick={() => setQuantity(prev => prev + 1)} className="px-4 py-2 text-sm">+</button>
            </div>

            <button 
              style={{ backgroundColor: '#f99011' }}
              className="flex-1 text-white font-bold uppercase rounded-lg text-xs tracking-widest py-3 text-center"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </main>

      {/* NAVIGATION TABS RENDERER PANEL */}
      <div className="w-full bg-gray-50 border-t border-b border-gray-200 mt-10">
        <div className="max-w-7xl mx-auto px-4 md:px-16 flex space-x-1">
          
          <button 
            onClick={() => setActiveTab('details')} 
            className={`py-3.5 px-6 font-bold text-xs uppercase tracking-wider relative transition-all ${
              activeTab === 'details' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Product Details
            {activeTab === 'details' && <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-black"></div>}
          </button>

          <button 
            onClick={() => setActiveTab('reviews')} 
            className={`py-3.5 px-6 font-bold text-xs uppercase tracking-wider relative transition-all ${
              activeTab === 'reviews' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Product Reviews
            {activeTab === 'reviews' && <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-black"></div>}
          </button>

          <button 
            onClick={() => setActiveTab('shipping')} 
            className={`py-3.5 px-6 font-bold text-xs uppercase tracking-wider relative transition-all ${
              activeTab === 'shipping' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Shipping & Returns
            {activeTab === 'shipping' && <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-black"></div>}
          </button>

        </div>
      </div>

      {/* CONTENT SHEETS LAYER */}
      <div className="max-w-7xl mx-auto px-4 md:px-16 py-10 w-full flex-1 mb-16">
        
        {/* VIEW 1: PRODUCT DETAILS DESCRIPTION SHEET */}
        {activeTab === 'details' && (
          <div className="text-sm leading-relaxed text-gray-700 max-w-4xl space-y-4">
            <p><span className="font-bold text-gray-900">{category.vendor} {category.name}:</span> {category.description || 'No description available.'}</p>
            {category.dosage && (
              <p className="mt-2"><span style={{ color: '#f99011' }} className="font-bold">{category.name} Dose:</span> {category.dosage}</p>
            )}
          </div>
        )}

        {/* VIEW 2: PRODUCT REVIEWS FEEDBACK MATRIX */}
        {activeTab === 'reviews' && (
          <div className="w-full flex flex-col items-start">
            <h2 className="w-full text-center font-bold text-gray-800 text-lg tracking-wider uppercase mb-8">Customer Reviews</h2>
            
            <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center border border-gray-100 p-6 md:p-8 rounded-xl bg-gray-50/50 mb-10">
              <div className="md:col-span-4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-200 pb-6 md:pb-0 md:pr-6 text-center">
                <div style={{ color: '#f99011' }} className="flex space-x-1 text-xl mb-2">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <p className="text-sm font-bold text-gray-800">4.71 out of 5</p>
                <p className="text-xs text-gray-400 mt-1">Based on 7 reviews</p>
              </div>

              <div className="md:col-span-5 flex flex-col space-y-2.5 w-full px-2">
                {[
                  { stars: 5, count: 6, percent: '85%' },
                  { stars: 4, count: 0, percent: '0%' },
                  { stars: 3, count: 1, percent: '15%' },
                  { stars: 2, count: 0, percent: '0%' },
                  { stars: 1, count: 0, percent: '0%' }
                ].map((row, index) => (
                  <div key={index} className="flex items-center text-xs text-gray-500 w-full">
                    <div style={{ color: '#f99011' }} className="flex space-x-0.5 w-24 flex-shrink-0 select-none">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>{i < row.stars ? '★' : '☆'}</span>
                      ))}
                    </div>
                    <div className="flex-1 h-5 bg-gray-200 rounded mx-3 overflow-hidden relative">
                      {parseInt(row.percent) > 0 && (
                        <div 
                          className="h-full bg-[#0d8575] rounded flex items-center justify-end pr-2 transition-all duration-500" 
                          style={{ width: row.percent }}
                        >
                          <span className="text-[9px] text-white font-bold select-none">{row.percent}</span>
                        </div>
                      )}
                    </div>
                    <span className="w-4 text-right text-gray-600 font-medium">{row.count}</span>
                  </div>
                ))}
              </div>

              <div className="md:col-span-3 flex items-center justify-center w-full">
                <button 
                  onClick={() => alert("Review Form Modal Open!")}
                  className="w-full bg-[#0d8575] hover:bg-[#0b7365] text-white font-bold text-sm py-3 px-4 rounded-md transition-colors shadow-xs uppercase tracking-wider text-center"
                >
                  Write a review
                </button>
              </div>
            </div>

            {/* DYNAMIC USER COMMENT CARD CONTAINER */}
            <div className="w-full border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between text-xs text-gray-500 pb-2">
                <div className="flex items-center space-x-1.5">
                  <span className="font-bold text-gray-800 text-sm">Most Recent</span>
                  <span className="text-gray-400 text-[10px]">▼</span>
                </div>
                <span className="font-medium text-gray-400">11/08/2025</span>
              </div>
              
              <p className="text-xs text-gray-500 font-medium">
                about <span className="text-[#0d8575] underline cursor-pointer font-semibold">{category.name}</span>
              </p>
              
              <div style={{ color: '#f99011' }} className="flex space-x-0.5 text-xs mt-2.5 mb-3">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>

              <div className="flex items-center space-x-3 bg-gray-50/60 p-3 rounded-xl border border-gray-100 max-w-sm mt-2">
                <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-slate-800 tracking-wide">Karthik</span>
                  <span className="bg-emerald-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-sm mt-1 uppercase tracking-wider w-max">
                    Verified
                  </span>
                </div>
              </div>

              <div className="mt-4 pl-1 space-y-1">
                <h4 className="text-xs font-bold text-gray-900 tracking-wide uppercase">Quick delivery</h4>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                  Items were delivered within 48 hours of ordering and came in a secure packing.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* VIEW 3: SHIPPING & RETURNS */}
        {activeTab === 'shipping' && (
          <div className="w-full text-xs md:text-sm text-gray-700 max-w-5xl">
            <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white shadow-3xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200 text-gray-800 font-bold text-[11px] uppercase tracking-wider">
                    <th className="py-3 px-4 md:px-6 border-r border-gray-200 w-1/3">Policy Type</th>
                    <th className="py-3 px-4 md:px-6">Details & Instructions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-600 font-medium">
                  <tr>
                    <td className="py-4 px-4 md:px-6 font-bold text-gray-900 bg-gray-50/50 border-r border-gray-200 text-xs uppercase tracking-wide">
                      Shipping Policy
                    </td>
                    <td className="py-4 px-4 md:px-6">
                      <ul className="list-disc pl-4 space-y-1.5 text-xs md:text-sm text-gray-600">
                        <li>Standard Delivery: Within 3-7 business days across national zones.</li>
                        <li>Express Delivery: Within 24-48 business hours available for tier-1 metropolitan sectors.</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 md:px-6 font-bold text-gray-900 bg-gray-50/50 border-r border-gray-200 text-xs uppercase tracking-wide">
                      Returns Policy
                    </td>
                    <td className="py-4 px-4 md:px-6">
                      <ul className="list-disc pl-4 space-y-1.5 text-xs md:text-sm text-gray-600">
                        <li>Medicines are eligible for replacement only if found broken or damaged on delivery.</li>
                        <li>Initiate request within 48 hours of shipment reception along with product visuals.</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      

      

    </div>
  );
};

export default CategoryDetails;