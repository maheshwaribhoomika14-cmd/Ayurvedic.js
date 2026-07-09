import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header'; 
import { addToCartGlobal } from '../utils/cartUtils';

const HerbalDetails = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  const formatImageUrl = (imgSrc) => {
    if (!imgSrc) return 'https://via.placeholder.com/450';
    if (imgSrc.startsWith('data:') || imgSrc.startsWith('http')) return imgSrc;
    return `http://localhost:5000/${imgSrc.replace(/^\/+/, '')}`;
  };

  useEffect(() => {
    const fetchHerbalOrConcernProduct = async () => {
      try {
        setLoading(true);
        console.log("Bhoomika Master Sync - ID under scan:", id);
        
        let foundProduct = null;

        // 🚀 PATH 1: Direct Standard Products Pool Check
        try {
          const res = await axios.get(`http://localhost:5000/api/products/${id}`);
          if (res && res.data && (res.data.data || res.data)) {
            foundProduct = res.data.data ? res.data.data : res.data;
          }
        } catch (err) {
          console.log("Not in primary products endpoint, checking concerns array layer...");
        }

        // 🚀 PATH 2: Complete Concerns Sub-Array String Match Scanner (Bhoomika Database Fix)
        if (!foundProduct) {
          try {
            const concernsRes = await axios.get('http://localhost:5000/api/concerns');
            const concernsList = concernsRes.data ? (concernsRes.data.data ? concernsRes.data.data : concernsRes.data) : [];
            
            if (Array.isArray(concernsList)) {
              for (let concern of concernsList) {
                if (concern.products && Array.isArray(concern.products)) {
                  // Strict dynamic lowerCase conversion matrix handling
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
          } catch (concernErr) {
            console.error("Concerns matrix parse failed:", concernErr);
          }
        }

        if (foundProduct) {
          setProduct(foundProduct);
          if (foundProduct.image) {
            setMainImage(formatImageUrl(foundProduct.image));
          } else if (foundProduct.images && foundProduct.images.length > 0) {
            setMainImage(formatImageUrl(foundProduct.images[0])); 
          }
        }
      } catch (error) {
        console.error("Global endpoint packet tracking error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchHerbalOrConcernProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white flex flex-col">
        <Header />
        <div style={{ textAlign: 'center', padding: '12px', fontWeight: 'bold', color: '#f28500', marginTop: '100px' }}>
          Syncing Ayurvedic Specifications Matrix...
        </div>
      </div>
    );
  }

  // Multi-images desktop layout builder configuration
  const galleryImages = product && product.images && product.images.length > 0 
    ? product.images.map(img => formatImageUrl(img))
    : product && product.image ? [formatImageUrl(product.image)] : ['https://via.placeholder.com/450'];

  const activeMainImage = mainImage || galleryImages[0];

  return (
    <div className="w-full min-h-screen bg-white flex flex-col font-sans text-gray-800 antialiased relative">
      <Header />

      {!product ? (
        <div className="text-center py-20 flex-1 flex flex-col items-center justify-center gap-4 bg-[#fbfaf7]">
          <h2 className="text-xl font-bold text-red-500">PRODUCT STACK MISSING IN MONGODB SERVER.</h2>
          <p className="text-sm text-slate-400">Target string mismatches: {id}</p>
          <Link to="/" className="bg-[#004d4e] text-white px-6 py-2.5 rounded-lg text-sm font-bold no-underline">
            Go Back Home
          </Link>
        </div>
      ) : (
        <div className="max-w-7xl w-full mx-auto mb-12 px-4 md:px-16 py-12">
          <div className="w-full bg-[#f4ebd9]/30 py-2 px-4 rounded text-xs text-slate-500 mb-6 font-bold text-left">
            <Link to="/" className="no-underline text-gray-500 hover:text-emerald-800">Home</Link> / <span className="text-slate-800 uppercase">{product.name}</span>
          </div>

          <main className="grid grid-cols-1 md:grid-cols-12 gap-12 w-full">
            {/* LEFT SIDE GALLERY VIEW PANEL */}
            <div className="md:col-span-6 flex flex-col md:flex-row gap-4 items-start w-full">
              {galleryImages.length > 1 && (
                <div className="flex flex-row md:flex-col gap-3 order-2 md:order-1 w-full md:w-24 max-h-[450px] overflow-auto py-1">
                  {galleryImages.map((img, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setMainImage(img)}
                      style={{ border: activeMainImage === img ? '2px solid #f28500' : '1px solid #e2e8f0' }}
                      className="w-20 h-20 rounded p-1 bg-white cursor-pointer flex items-center justify-center overflow-hidden flex-shrink-0"
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-contain" />
                    </div>
                  ))}
                </div>
              )}
              <div className="w-full md:flex-1 h-[450px] border border-slate-200 rounded overflow-hidden flex items-center justify-center p-4 bg-white order-1 md:order-2 shadow-xs">
                <img src={activeMainImage} alt={product.name} className="w-full h-full object-contain" />
              </div>
            </div>

            {/* RIGHT SIDE DETAILS INFO PANEL */}
            <div className="md:col-span-6 flex flex-col w-full justify-start space-y-4 pt-1 text-left">
              <h1 className="text-xl md:text-2xl font-black text-gray-800 uppercase tracking-tight leading-none">{product.name}</h1>
              
              <div className="text-2xl md:text-3xl font-black text-gray-800 pt-1">
                Rs. {product.price}.00
              </div>

              <div className="text-[12px] space-y-2 text-gray-600 border-b pb-4 text-left">
                <p><strong>Status:</strong> <span className="text-emerald-700 font-bold uppercase">In Stock</span></p>
                <p><strong>Vendor Allocation:</strong> {product.vendor || 'Kottakkal Arya Vaidya Sala'}</p>
                <p><strong>Database Document Node ID:</strong> <span className="font-mono text-gray-400">{product._id}</span></p>
              </div>

              {/* Quantity Counter */}
              <div className="flex items-center border border-gray-300 rounded h-10 bg-gray-50 w-28 overflow-hidden mb-2">
                <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className="px-3 hover:bg-gray-200 text-gray-500 font-bold h-full border-none bg-transparent cursor-pointer">-</button>
                <span className="flex-1 text-xs font-black text-gray-700 text-center select-none">{quantity}</span>
                <button onClick={() => setQuantity(prev => prev + 1)} className="px-3 hover:bg-gray-200 text-gray-500 font-bold h-full border-none bg-transparent cursor-pointer">+</button>
              </div>

              {/* 🚀 🔥 BHOOMIKA INJECTION: Connected safely to the dynamic utility logic */}
              <button 
                onClick={() => addToCartGlobal(product, quantity)}
                style={{ backgroundColor: '#f28500', color: '#ffffff', height: '46px', width: '220px', fontWeight: '900', textTransform: 'uppercase', border: 'none', cursor: 'pointer', borderRadius: '2px' }}
                className="hover:opacity-95 transition-all cursor-pointer focus:outline-none shadow-sm"
              >
                Add to Cart
              </button>
            </div>
          </main>

          <div className="px-4 py-10 border-t mt-12 text-left">
            <h2 className="text-base md:text-xl font-bold text-gray-900 uppercase tracking-tight">Product Details</h2>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">{product.description || "Premium quality traditional Ayurvedic medicine formulation specs loaded from cluster nested arrays."}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HerbalDetails;