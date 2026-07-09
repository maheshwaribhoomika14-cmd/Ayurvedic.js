import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import Header from '../components/Header';
import BannerSlider from '../components/BannerSlider';
import WelcomeBanner from '../components/WelcomeBanner';
import TopCategories from '../components/TopCategories'; 

const Home = () => {
  const [products, setProducts] = useState([]);
  const [ailmentsCategories, setAilmentsCategories] = useState([]); 
  // 🚀 Dynamic Middle Banner State
  const [middleBanner, setMiddleBanner] = useState(null); 
  
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingAilments, setLoadingAilments] = useState(true);
  
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  const formatImageUrl = (prod) => {
    let imgSrc = '';
    if (prod.images && prod.images.length > 0) {
      imgSrc = prod.images[0]; 
    } else if (prod.image) {
      imgSrc = prod.image; 
    }
    if (!imgSrc) return 'https://via.placeholder.com/200';
    if (imgSrc.startsWith('data:') || imgSrc.startsWith('http')) return imgSrc;
    return `http://localhost:5000/${imgSrc.replace(/^\/+/, '')}`;
  };

  useEffect(() => {
    console.log("Ayurkart Home Page successfully mount ho gaya hai!");

    const fetchTopSellingProducts = async () => {
      try {
        setLoadingProducts(true);
        const response = await fetch('http://localhost:5000/api/products');
        if (response.ok) {
          const data = await response.json();
          
          // 🚀 Filter: Slider mein alignment wale products hide rahenge
          const generalProducts = data.filter(prod => !prod.alignment || prod.alignment.trim() === '');
          setProducts(generalProducts);
        }
        setLoadingProducts(false);
      } catch (error) {
        console.error("Error loading products:", error);
        setLoadingProducts(false);
      }
    };

    const fetchAilmentsCategories = async () => {
      try {
        setLoadingAilments(true);
        const response = await fetch('http://localhost:5000/api/ailments');
        if (response.ok) {
          const data = await response.json();
          setAilmentsCategories(data);
        }
      } catch (error) {
        console.error("Error loading dynamic ailments:", error);
      } finally {
        setLoadingAilments(false);
      }
    };

    const fetchMiddleBanner = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/banners/middle');
        if (response.ok) {
          const data = await response.json();
          console.log("Database se aaya hua Middle Banner Data:", data);
          setMiddleBanner(data);
        }
      } catch (error) {
        console.error("Error loading middle banner:", error);
      }
    };

    fetchTopSellingProducts();
    fetchAilmentsCategories();
    fetchMiddleBanner();
  }, []);

  const nextProducts = () => {
    if (products.length > 5) {
      setCurrentProductIndex((prev) => (prev + 1) % (products.length - 4));
    }
  };

  const prevProducts = () => {
    if (products.length > 5) {
      setCurrentProductIndex((prev) => (prev - 1 + (products.length - 4)) % (products.length - 4));
    }
  };

  const nextCategories = () => {
    if (ailmentsCategories.length > 5) {
      setCurrentCategoryIndex((prev) => {
        if (prev >= ailmentsCategories.length - 5) return 0;
        return prev + 1;
      });
    }
  };

  const prevCategories = () => {
    if (ailmentsCategories.length > 5) {
      setCurrentCategoryIndex((prev) => {
        if (prev === 0) return ailmentsCategories.length - 5;
        return prev - 1;
      });
    }
  };

  // 🛠️ FIXED: UPGRADED ROUTING MATRIX TO SUPPORT ALL 10 DYNAMIC ALIGNMENT SLUGS flawlessly
  const getAlignmentSlug = (name) => {
    if (!name) return 'ayurvedic-face-care-products';
    const cleanName = name.trim().toLowerCase();
    
    if (cleanName.includes('face') || cleanName.includes('skin care')) return 'ayurvedic-face-care-products';
    if (cleanName.includes('gastro') || cleanName.includes('digestive')) return 'gastro-health-medicines';
    if (cleanName.includes('hair')) return 'ayurvedic-hair-care-products';
    if (cleanName.includes('men')) return 'men-health-care-ayurveda';
    if (cleanName.includes('dental') || cleanName.includes('teeth') || cleanName.includes('mouth')) return 'ayurvedic-dental-care-products';
    
    // 🚀 NEW ADDITIONAL ALIGNMENTS ROUTE CORRELATION STRINGS
    if (cleanName.includes('joint') || cleanName.includes('bone')) return 'healthy-joints-bones-ayurveda';
    if (cleanName.includes('eye') || cleanName.includes('vision')) return 'eye-health-ayurvedic';
    if (cleanName.includes('diabetes') || cleanName.includes('sugar')) return 'diabetes-care-ayurveda';
    if (cleanName.includes('brain') || cleanName.includes('tonic') || cleanName.includes('memory')) return 'brain-tonic-ayurveda';
    if (cleanName.includes('pain') || cleanName.includes('relief')) return 'pain-relief-ayurveda';
    if (cleanName.includes('weight') || cleanName.includes('fat') || cleanName.includes('obesity')) return 'weight-management-ayurveda';
    
    // Auto fallback mechanism parameters if nothing strings match rules
    return name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
  };

  const visibleProducts = products.slice(currentProductIndex, currentProductIndex + 5);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col relative">
      <Header />
      
      <main className="w-full block relative min-h-[460px] bg-[#f4ebd9]">
        <BannerSlider />
      </main>
      
      <WelcomeBanner />
      <TopCategories />

      {/* PRODUCT SLIDER SECTION */}
      <section className="w-full py-12 bg-white text-center border-t border-gray-100 relative overflow-x-hidden">
        <div className="flex items-center justify-center space-x-4 max-w-xl mx-auto px-4">
          <div className="h-[2px] bg-slate-800 w-12 rounded-full"></div>
          <h2 className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-wide whitespace-nowrap">
            Top Selling Ayurvedic Medicines
          </h2>
          <div className="h-[2px] bg-slate-800 w-12 rounded-full"></div>
        </div>
        <p className="text-xs md:text-sm text-gray-500 mt-2">
          Explore our best rated Online Ayurvedic Medicines
        </p>

        {loadingProducts ? (
          <div className="text-center py-10 font-bold text-[#f99011] text-xs uppercase tracking-widest animate-pulse">
            Loading Fresh Inventory...
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 md:px-16 mt-12 relative flex items-center w-full min-h-[460px]">
            {products.length > 5 && (
              <button onClick={prevProducts} className="absolute left-2 md:left-6 z-40 bg-white hover:bg-gray-50 border border-gray-200 rounded-full w-9 h-9 flex items-center justify-center shadow-md text-gray-400 font-bold text-sm select-none">‹</button>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-6 w-full px-2 items-stretch">
              {visibleProducts.map((prod, idx) => (
                <div key={idx} className="flex flex-col items-center justify-between bg-white border border-gray-100 p-4 rounded-lg relative group transition-all duration-300 hover:shadow-lg min-h-[440px] overflow-hidden">
                  {prod.oldPrice && (
                    <span className="absolute top-3 left-3 bg-[#f2656a] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-xs uppercase tracking-wider z-20 select-none">Sale</span>
                  )}

                  <div className="w-full h-52 flex items-center justify-center relative bg-white rounded-md select-none overflow-hidden">
                    <Link to={`/product/${prod._id}`} className="w-full h-full flex items-center justify-center p-2">
                      <img src={formatImageUrl(prod)} alt={prod.name} className="max-w-full max-h-full object-contain" />
                    </Link>
                  </div>

                  <div className="w-full flex flex-col items-center text-center mt-4 flex-1 justify-end space-y-1">
                    <Link to={`/product/${prod._id}`} className="no-underline text-center hover:no-underline">
                      <h3 className="text-xs md:text-sm font-bold text-gray-900 tracking-tight leading-snug line-clamp-2 max-w-[95%] mx-auto hover:text-[#f99011] transition-colors">
                        {prod.name}
                      </h3>
                    </Link>
                    <span className="text-[10px] md:text-xs text-gray-400 block font-medium">{prod.vendor || 'Kottakkal Arya Vaidya Sala'}</span>
                    <div className="text-xs md:text-sm font-black text-gray-900 pt-1 flex items-center space-x-2 justify-center">
                      {prod.oldPrice && <span className="text-gray-400 font-normal line-through text-[11px]">Rs. {prod.oldPrice}.00</span>}
                      <span className="text-slate-900 font-extrabold">Rs. {prod.price || '275'}.00</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {products.length > 5 && (
              <button onClick={nextProducts} className="absolute right-2 md:right-6 z-40 bg-white hover:bg-gray-50 border border-gray-200 rounded-full w-9 h-9 flex items-center justify-center shadow-md text-gray-400 font-bold text-sm select-none">›</button>
            )}
          </div>
        )}
      </section>

      {/* GENERAL AILMENTS SLIDER SECTION */}
      <section className="w-full py-14 bg-white text-center border-t border-gray-100 relative overflow-x-hidden font-sans">
        <div className="flex items-center justify-center space-x-4 max-w-2xl mx-auto px-4">
          <div className="h-[1.5px] bg-slate-800 w-14 rounded-full"></div>
          <h2 className="text-lg md:text-xl font-black text-gray-900 uppercase tracking-tight whitespace-nowrap">
            AYURVEDIC PRODUCTS & MEDICINES TO GENERAL AILMENTS
          </h2>
          <div className="h-[1.5px] bg-slate-800 w-14 rounded-full"></div>
        </div>
        <p className="text-xs md:text-sm text-gray-500 font-medium mt-1.5 tracking-wide">
          Natural healthcare with Ayurveda
        </p>

        <p className="max-w-6xl mx-auto text-[11px] md:text-xs text-gray-400 mt-5 px-6 leading-relaxed text-center">
          Ayurveda, an ancient tradition of medicines in India, is focused on the idea that 'Prevention is better than cure.' Ayurveda suggests alterations in the diet and lifestyle to achieve a healthy balance. Ayurveda medicines not only concentrates on healing but also emphasizes general wellness. The traditional system of ayurvedic medicine introduced several potent herbal combinations that aid in maintaining health. Check out these Ayurvedic medicines online for general ailments.
        </p>

        <div className="max-w-7xl mx-auto px-4 md:px-14 mt-10 relative flex items-center w-full min-h-[350px]">
          {ailmentsCategories.length > 5 && (
            <button type="button" onClick={prevCategories} className="absolute left-2 md:left-4 z-50 bg-white hover:bg-gray-50 border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center shadow-lg text-gray-700 font-black text-lg select-none focus:outline-none">‹</button>
          )}

          <div className="w-full overflow-hidden px-1">
            {loadingAilments ? (
              <div className="text-center py-12 text-[#f28500] font-bold text-xs uppercase tracking-widest animate-pulse">
                Syncing Live Database Ailments Matrix...
              </div>
            ) : ailmentsCategories.length === 0 ? (
              <div className="text-center py-12 text-gray-400 italic text-xs">No active ailments card listed in dashboard.</div>
            ) : (
              <div 
                className="flex flex-row transition-transform duration-500 ease-in-out items-stretch"
                style={{
                  transform: `translateX(-${currentCategoryIndex * (100 / ailmentsCategories.length)}%)`,
                  width: `${(ailmentsCategories.length / 5) * 100}%`
                }}
              >
                {ailmentsCategories.map((cat, idx) => (
                  <div key={cat._id || idx} style={{ width: `${100 / ailmentsCategories.length}%` }} className="px-2.5 box-border flex flex-col">
                    
                    <Link 
                      to={`/collections/${getAlignmentSlug(cat.name)}`} 
                      className="no-underline block h-full text-left" 
                      style={{ textDecoration: 'none' }}
                    >
                      <div className="w-full flex flex-col bg-[#f28500] hover:bg-orange-600 border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 h-full shadow-xs cursor-pointer">
                        <div className="w-full h-48 overflow-hidden bg-white relative flex items-center justify-center p-2">
                          <img src={`http://localhost:5000/${cat.image ? cat.image.replace(/^\/+/, '') : ''}`} alt={cat.name || "Ailment"} className="max-w-full max-h-full object-contain" onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/200"; }} />
                        </div>
                        <div style={{ backgroundColor: '#f28500', padding: '16px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '100px' }}>
                          <h3 style={{ color: '#ffffff', fontWeight: '800', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.03em', lineHeight: '1.4', margin: '0', padding: '0' }}>{cat.name}</h3>
                          <span style={{ color: '#ffffff', fontWeight: '700', fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '8px', display: 'block', opacity: '0.95' }}>{cat.count || '0'}</span>
                        </div>
                      </div>
                    </Link>

                  </div>
                ))}
              </div>
            )}
          </div>

          {ailmentsCategories.length > 5 && (
            <button type="button" onClick={nextCategories} className="absolute right-2 md:right-4 z-50 bg-white hover:bg-gray-50 border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center shadow-lg text-gray-700 font-black text-lg select-none focus:outline-none">›</button>
          )}
        </div>
      </section>

      {/* 🚀 🟢 FIXED DYNAMIC BANNER STRIP ROUTE LINKED TO ALL FACE PRODUCTS */}
      <section className="w-full py-6 bg-white overflow-hidden select-none border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-14">
          <Link to="/collections/ayurvedic-face-care-products" className="block w-full h-auto overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <img 
              src={`http://localhost:5000/${middleBanner && (middleBanner.image || middleBanner.img) ? (middleBanner.image || middleBanner.img).replace(/^\/+/, '') : 'uploads/banner2.png'}`} 
              alt="Promotional Banner" 
              className="w-full h-auto object-cover block hover:scale-[1.005] transition-transform duration-500"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "http://localhost:5000/uploads/banner2.png";
              }}
            />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;