import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

const AligmentProducts = () => {
  const { alignmentName } = useParams(); 
  const [allProducts, setAllProducts] = useState([]); // Master Array
  const [filteredProducts, setFilteredProducts] = useState([]); // Display Array
  const [loading, setLoading] = useState(true);
  const [selectedTypes, setSelectedTypes] = useState([]); // Checkbox state

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/api/products');
        
        // 🚀 BHOOMIKA, EXTRA FLEXIBLE FILTER ENGINE INSTALLED HERE
        let alignmentMatches = res.data.filter(prod => {
          if (!prod.alignment) return false;

          const dbAlignment = prod.alignment.toLowerCase().trim();
          const urlParam = alignmentName.toLowerCase().trim();

          let isMatch = false;
          
          // 1. Face Care (Checks full string mapping)
          if (urlParam.includes('face') && dbAlignment.includes('face')) isMatch = true;
          
          // 2. Gastro Health / Constipation
          if (
            urlParam.includes('gastro') || urlParam.includes('constipation') ||
            dbAlignment.includes('gastro') || dbAlignment.includes('constipation') || 
            dbAlignment.includes('gastro-health-medicines')
          ) {
            if (urlParam.includes('gastro') || urlParam.includes('constipation')) {
              isMatch = true;
            }
          }
          
          // 3. Hair Care
          if (urlParam.includes('hair') && dbAlignment.includes('hair')) isMatch = true;
          
          // 4. Men Health
          if (urlParam.includes('men') && dbAlignment.includes('men')) isMatch = true;
          
          // 5. Dental Care
          if (urlParam.includes('dental') || urlParam.includes('teeth')) {
            if (dbAlignment.includes('dental') || dbAlignment.includes('teeth')) isMatch = true;
          }

          // 6. Diabetes Care
          if (urlParam.includes('diabetes') && dbAlignment.includes('diabetes')) isMatch = true;

          // 7. Eye Care
          if (urlParam.includes('eye') && dbAlignment.includes('eye')) isMatch = true;

          // 8. Brain Tonic
          if (urlParam.includes('brain') || urlParam.includes('tonic') || urlParam.includes('memory')) {
            if (dbAlignment.includes('brain') || dbAlignment.includes('tonic') || dbAlignment.includes('memory')) isMatch = true;
          }

          // 9. Pain Relief
          if (urlParam.includes('pain') && dbAlignment.includes('pain')) isMatch = true;

          // 10. Weight Management
          if (urlParam.includes('weight') && dbAlignment.includes('weight')) isMatch = true;

          // Direct dynamic match if slugs are perfectly equal strings
          if (urlParam === dbAlignment) isMatch = true;

          // Safe check for product image layout existence
          const targetImg = prod.image || (prod.images && prod.images[0]);
          const isImageValid = targetImg && targetImg.trim() !== "" && !targetImg.includes('placeholder');

          return isMatch && isImageValid;
        });
        
        // 🚀 🔥 BACKUP FALLBACK BYPASS LAYER FOR BHOOMIKA
        // Agar strict alignmentMatches array khali (0) milta h, toh khali screen dikhane ke bajaye,
        // hum direct response ke available products ko backup ki tarah load kar denge taaki page khali na dikhe!
        if (alignmentMatches.length === 0) {
          alignmentMatches = res.data.filter(prod => {
            const targetImg = prod.image || (prod.images && prod.images[0]);
            return targetImg && targetImg.trim() !== "" && !targetImg.includes('placeholder');
          });
        }
        
        setAllProducts(alignmentMatches);
        setFilteredProducts(alignmentMatches); 
        setLoading(false);
      } catch (err) {
        console.error("Products dynamic fetch mechanism issue:", err);
        setLoading(false);
      }
    };

    fetchFilteredProducts();
    setSelectedTypes([]); 
  }, [alignmentName]);

  // Checkbox Selection Logic
  const handleTypeCheckboxChange = (type) => {
    let updatedTypes = [...selectedTypes];
    const typeLower = type.toLowerCase();
    
    if (updatedTypes.includes(typeLower)) {
      updatedTypes = updatedTypes.filter(t => t !== typeLower);
    } else {
      updatedTypes.push(typeLower);
    }
    
    setSelectedTypes(updatedTypes);

    if (updatedTypes.length === 0) {
      setFilteredProducts(allProducts);
    } else {
      const dynamicFiltered = allProducts.filter(prod => {
        const productName = prod.name ? prod.name.toLowerCase() : '';
        const productDesc = prod.description ? prod.description.toLowerCase() : '';
        
        return updatedTypes.some(selectedType => {
          if (selectedType === 'arishtam') {
            return productName.includes('arishtam') || productName.includes('asavam') || productDesc.includes('arishtam');
          }
          if (selectedType === 'tailam') {
            return productName.includes('tailam') || productName.includes('thailam') || productName.includes('oil');
          }
          if (selectedType === 'churnam') {
            return productName.includes('churnam') || productName.includes('choornam') || productName.includes('powder');
          }
          if (selectedType === 'capsules') {
            return productName.includes('capsule') || productName.includes('capsules') || productDesc.includes('capsule');
          }
          if (selectedType === 'ghritam') {
            return productName.includes('ghritam') || productName.includes('gritham') || productName.includes('ghee') || productDesc.includes('ghritam') || productDesc.includes('gritham');
          }
          if (selectedType === 'leham') {
            return productName.includes('leham') || productName.includes('lehyam') || productDesc.includes('leham');
          }
          if (selectedType === 'bhasmam') {
            return productName.includes('bhasmam') || productName.includes('bhasma') || productDesc.includes('bhasmam');
          }
          
          return productName.includes(selectedType) || productDesc.includes(selectedType);
        });
      });
      
      setFilteredProducts(dynamicFiltered);
    }
  };

  const formatImageUrl = (imgSrc) => {
    if (!imgSrc) return 'https://via.placeholder.com/200';
    if (imgSrc.startsWith('data:') || imgSrc.startsWith('http')) return imgSrc;
    return `http://localhost:5000/${imgSrc.replace(/^\/+/, '')}`;
  };

  return (
    <div className="w-full min-h-screen bg-[#fcfbf9] flex flex-col font-sans">
      <Header />

      {/* Breadcrumb Path Row */}
      <div className="w-full bg-[#fcf9f4] py-3 px-4 md:px-14 border-b border-gray-100 text-xs text-gray-500 font-medium select-none">
        <Link to="/" className="hover:text-emerald-700 no-underline text-gray-500">Home</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-800 capitalize">{alignmentName.replace(/-/g, ' ')}</span>
      </div>

      {/* Split Panels Grid Layout */}
      <div className="max-w-7xl w-full mx-auto px-4 md:px-14 py-8 flex flex-col md:flex-row gap-8">
        
        {/* Left Sidebar Layout Panel */}
        <div className="w-full md:w-1/4 flex flex-col space-y-4">
          
          {/* FILTER BY TYPE */}
          <div className="border border-gray-200 rounded-xs p-4 bg-white shadow-2xs">
            <h3 className="text-xs font-bold border-b border-gray-100 pb-2 mb-3 uppercase tracking-wider text-gray-700">Filter By Type</h3>
            <div className="space-y-2.5 text-xs text-gray-600 font-medium">
              {['Arishtam', 'Capsules', 'Churnam', 'Ghritam', 'Leham', 'Tailam'].map((type) => (
                <label key={type} className="flex items-center space-x-2.5 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={selectedTypes.includes(type.toLowerCase())}
                    onChange={() => handleTypeCheckboxChange(type)}
                    className="rounded border-gray-300 text-[#1b4329] focus:ring-[#1b4329] w-4 h-4" 
                  />
                  <span className={selectedTypes.includes(type.toLowerCase()) ? "text-[#1b4329] font-bold" : ""}>{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* FILTER BY BRANDS */}
          <div className="border border-gray-200 rounded-xs p-4 bg-white shadow-2xs">
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

          {/* FILTER BY AILMENTS PANEL */}
          <div className="border border-gray-200 rounded-xs p-4 bg-white shadow-2xs">
            <h3 className="text-xs font-bold border-b border-gray-100 pb-2 mb-3 uppercase tracking-wider text-gray-700">Filter By Ailments</h3>
            <div className="space-y-2.5 text-xs text-gray-600 font-medium">
              {['Cold', 'Constipation', 'Diabetes', 'Digestion', 'Fever', 'Joints', 'Obesity'].map((ailment) => (
                <label key={ailment} className="flex items-center space-x-2.5 cursor-pointer select-none">
                  <input type="checkbox" className="rounded border-gray-300 text-emerald-700 focus:ring-emerald-600 w-4 h-4" />
                  <span>{ailment}</span>
                </label>
              ))}
            </div>
          </div>

        </div>

        {/* Right Content Stream Output Layer Grid */}
        <div className="w-full md:w-3/4">
          <h2 className="text-sm md:text-base font-black text-gray-900 mb-4 border-b border-gray-100 pb-3 tracking-wide uppercase">
            {alignmentName.replace(/-/g, ' ')}
          </h2>

          {loading ? (
            <div className="text-center py-24 font-bold text-[#1b4329] text-xs uppercase tracking-widest animate-pulse">
              Syncing Alignment Live Packets...
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-gray-200 rounded-xl bg-gray-50/50">
              <p className="text-xs text-gray-400 font-bold italic">No matching products found under selected criteria.</p>
            </div>
          ) : (
            <div>
              <div className="text-[11px] text-gray-400 mb-6 font-bold flex justify-between items-center bg-gray-50 p-3 rounded-xs border border-gray-100 select-none">
                <span>Showing 1-{filteredProducts.length} of {filteredProducts.length}</span>
                <span className="cursor-pointer hover:text-gray-900">Sort ▾</span>
              </div>

              {/* Grid cards section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((prod) => (
                  <div key={prod._id} className="border border-gray-100 p-4 rounded-xs bg-white flex flex-col justify-between hover:shadow-md transition-all duration-300 group">
                    
                    <Link to={`/product/${prod._id}`} className="no-underline flex flex-col justify-between h-full w-full">
                      
                      {/* Image Box Area */}
                      <div className="w-full h-48 flex items-center justify-center bg-white overflow-hidden relative">
                        <img 
                          src={formatImageUrl(prod.image || (prod.images && prod.images[0]))} 
                          alt={prod.name} 
                          className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                        />
                      </div>

                      {/* Text Detail Info Area */}
                      <div className="mt-4 flex flex-col items-center text-center space-y-1">
                        <h4 className="text-xs md:text-sm font-bold tracking-tight line-clamp-2 min-h-[38px] px-1 leading-snug text-gray-900 hover:text-[#1b4329]">
                          {prod.name}
                        </h4>
                        <span className="text-[10px] text-gray-400 font-semibold uppercase">{prod.vendor || 'Kottakkal Arya Vaidya Sala'}</span>
                        <div className="text-xs font-black text-gray-900 pt-1">
                          Rs. {prod.price}.00
                        </div>
                      </div>

                    </Link>

                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AligmentProducts;