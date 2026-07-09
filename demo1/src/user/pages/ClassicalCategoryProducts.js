import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import { addToCartGlobal } from '../utils/cartUtils';

const ClassicalCategoryProducts = () => {
  const { categoryName } = useParams(); // URL se dynamic category (e.g. 'arishtam') nikalega
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🎯 USER SIDE FETCH URL MATRIX
  useEffect(() => {
    const fetchClassicalProducts = async () => {
      try {
        setLoading(true);
        // 🚀 FIXED FOR BHOOMIKA: Router ke naye dynamic route se complete path match kiya
        const res = await axios.get(`http://localhost:5000/api/classical-products/category/${categoryName}`);
        
        if (res.data && res.data.data && Array.isArray(res.data.data)) {
          setProducts(res.data.data);
        } else if (res.data && Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          setProducts([]);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching classical category dynamic packets:", err);
        setProducts([]);
        setLoading(false);
      }
    };

    if (categoryName) {
      fetchClassicalProducts();
    }
  }, [categoryName]);

  const formatImageUrl = (imgSrc) => {
    if (!imgSrc) return 'https://via.placeholder.com/200';
    if (imgSrc.startsWith('data:') || imgSrc.startsWith('http')) return imgSrc;
    return `http://localhost:5000/${imgSrc.replace(/^\/+/, '')}`;
  };

  return (
    <div className="w-full min-h-screen bg-[#fcfbf9] flex flex-col font-sans">
      <Header />

      {/* Breadcrumb Row */}
      <div className="w-full bg-[#fcf9f4] py-3 px-4 md:px-14 border-b border-gray-100 text-xs text-gray-500 font-medium select-none text-left">
        <div className="max-w-7xl mx-auto flex items-center space-x-2">
          <Link to="/" className="hover:text-emerald-700 no-underline text-gray-500">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-800 capitalize">{categoryName} - Liquid Formulation Ayurvedic Medicines</span>
        </div>
      </div>

      {/* Main Split Panel Layout */}
      <div className="max-w-7xl w-full mx-auto px-4 md:px-14 py-8 flex flex-col md:flex-row gap-8">
        
        {/* Left Sidebar Layout Filters Panel */}
        <div className="w-full md:w-1/4 flex flex-col space-y-4">
          {/* FILTER BY TYPE */}
          <div className="border border-gray-200 rounded-xs p-4 bg-white shadow-2xs text-left">
            <h3 className="text-xs font-bold border-b border-gray-100 pb-2 mb-3 uppercase tracking-wider text-gray-700">Filter By Type</h3>
            <div className="space-y-2.5 text-xs text-gray-600 font-medium">
              <label className="flex items-center space-x-2.5 cursor-pointer select-none">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#1b4329] focus:ring-[#1b4329] w-4 h-4" />
                <span className="capitalize">{categoryName}</span>
              </label>
            </div>
          </div>

          {/* FILTER BY BRANDS */}
          <div className="border border-gray-200 rounded-xs p-4 bg-white shadow-2xs text-left">
            <h3 className="text-xs font-bold border-b border-gray-100 pb-2 mb-3 uppercase tracking-wider text-gray-700">Filter By Brands</h3>
            <div className="space-y-2.5 text-xs text-gray-600 font-medium">
              {['Kottakkal', 'AVP Ayurveda', 'Kerala Ayurveda', 'AVN', 'Vaidyaratnam'].map((brand) => (
                <label key={brand} className="flex items-center space-x-2.5 cursor-pointer select-none">
                  <input type="checkbox" className="rounded border-gray-300 text-emerald-700 focus:ring-emerald-600 w-4 h-4" />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* FILTER BY Ailments */}
          <div className="border border-gray-200 rounded-xs p-4 bg-white shadow-2xs text-left">
            <h3 className="text-xs font-bold border-b border-gray-100 pb-2 mb-3 uppercase tracking-wider text-gray-700">Filter By Ailments</h3>
            <div className="space-y-2.5 text-xs text-gray-600 font-medium">
              {['Cold', 'Constipation', 'Diabetes', 'Digestion', 'Fever','Obesity'].map((brand) => (
                <label key={brand} className="flex items-center space-x-2.5 cursor-pointer select-none">
                  <input type="checkbox" className="rounded border-gray-300 text-emerald-700 focus:ring-emerald-600 w-4 h-4" />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* WARNING INFORMATION BOX */}
          <div className="border border-gray-200 rounded-xs bg-white shadow-2xs overflow-hidden">
            <h3 className="text-xs font-black p-4 bg-gray-50 border-b border-gray-100 uppercase tracking-wider text-gray-900 text-left">
              WARNING INFORMATION
            </h3>
            <div className="p-4 space-y-4 text-xs md:text-[13px] text-gray-600 leading-relaxed font-medium text-left">
              <p>
                Incompliance with Drug and Cosmetic Act and Rules, We don't process requests for Schedule X and other habit forming drugs.For Schedule H and H1 drugs you need to upload a valid prescription from a registered medical practitioner.
              </p>
              <p>
                Ayurkart is available only to persons who can form a legally binding contract under the Indian Contract Act, 1872. If you are a minor i.e. under the age of 18 years, you may use only with the guidance of a parent or guardian.
              </p>
            </div>
          </div>
        </div>

        {/* Right Content Grid */}
        <div className="w-full md:w-3/4">
          <h2 className="text-sm md:text-base font-black text-gray-900 mb-4 border-b border-gray-100 pb-3 tracking-wide uppercase text-left">
            {categoryName} - Liquid Formulation Ayurvedic Medicines
          </h2>

          {loading ? (
            <div className="text-center py-24 font-bold text-[#1b4329] text-xs uppercase tracking-widest animate-pulse">
              Syncing Classical Inventory...
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-gray-200 rounded-xl bg-gray-50/50">
              <p className="text-xs text-gray-400 font-bold italic">No active products found under this classical category.</p>
            </div>
          ) : (
            <div>
              <div className="text-[11px] text-gray-400 mb-6 font-bold flex justify-between items-center bg-gray-50 p-3 rounded-xs border border-gray-100 select-none">
                <span>Showing 1-{products.length} of {products.length}</span>
                <span className="cursor-pointer hover:text-gray-900">Sort ▾</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((prod) => {
                  let targetImg = prod.image;
                  if (!targetImg && prod.images && prod.images.length > 0) {
                    targetImg = prod.images[0];
                  }

                  return (
                    <div key={prod._id} className="border border-gray-100 p-4 rounded-xs bg-white flex flex-col justify-between hover:shadow-md transition-all duration-300 group">
                      <div className="flex flex-col justify-between h-full w-full">
                        <Link to={`/product/${prod._id}`} className="no-underline block">
                          <div className="w-full h-48 flex items-center justify-center bg-white overflow-hidden relative">
                            <img 
                              src={formatImageUrl(targetImg)} 
                              alt={prod.name} 
                              className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                            />
                          </div>

                          <div className="mt-4 flex flex-col items-center text-center space-y-1">
                            <h4 className="text-xs md:text-sm font-bold tracking-tight line-clamp-2 min-h-[38px] px-1 leading-snug text-gray-900 group-hover:text-emerald-800 transition-colors">
                              {prod.name}
                            </h4>
                            <div className="text-[11px] text-orange-400 font-bold space-x-0.5">
                              <span>★★★★☆</span> <span className="text-gray-400 text-[10px] font-semibold">(2)</span>
                            </div>
                            <span className="text-[10px] text-gray-400 font-semibold uppercase pt-1">{prod.vendor || 'Kottakkal Arya Vaidya Sala'}</span>
                            <div className="text-xs font-black text-gray-900 pt-1 mb-2">
                              Rs. {prod.price}.00
                            </div>
                          </div>
                        </Link>

                        {/* 🚀 🔥 BHOOMIKA INJECTION: Grid-level independent instant cart addition trigger */}
                        <button 
                          onClick={() => addToCartGlobal(prod, 1)}
                          style={{ backgroundColor: '#f28500' }}
                          className="w-full text-white py-2 px-4 mt-2 rounded-xs font-bold text-xs tracking-wide uppercase hover:opacity-95 transition-all cursor-pointer border-none focus:outline-none shadow-sm"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ClassicalCategoryProducts;