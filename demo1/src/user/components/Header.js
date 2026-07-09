import React, { useState, useEffect } from 'react';
import { Package, LogIn, UserPlus, ShoppingCart, Search, Phone, Truck } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  
  // 🚀 🔥 BHOOMIKA NEW SEARCH STATES & LOGIC LAYER INTEGRATED
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // 🚀 🔥 BHOOMIKA OPTIMIZED LIVE SEARCH ENGINE (CLEAN & SYNTAX ERROR FIXED ✓)
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchQuery.trim().length > 1) {
        try {
          const res = await fetch(`http://localhost:5000/api/products/search/global/query?q=${encodeURIComponent(searchQuery.trim())}`);
          if (res.ok) {
            const resultData = await res.json();
            
            // 🎯 BACKEND FORMAT AUTODETECTOR:
            if (resultData && Array.isArray(resultData)) {
              setSearchResults(resultData);
            } else if (resultData && resultData.data && Array.isArray(resultData.data)) {
              setSearchResults(resultData.data);
            } else if (resultData && resultData.products && Array.isArray(resultData.products)) {
              setSearchResults(resultData.products);
            } else {
              setSearchResults([]);
            }
            
            setShowDropdown(true);
          }
        } catch (err) {
          console.error("Search fetch dynamic packet error:", err);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]); 
        setShowDropdown(false);
      }
    }, 300); // 300ms debounce buffer optimization

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);
  
  // States for main nav links hover background highlight
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  // DROPDOWN VISIBILITY STATES
  const [isAboutHovered, setIsAboutHovered] = useState(false);
  const [isClassicalHovered, setIsClassicalHovered] = useState(false);
  const [isPersonalCareHovered, setIsPersonalCareHovered] = useState(false);
  const [isBrandsHovered, setIsBrandsHovered] = useState(false); 
  const [isHealthHovered, setIsHealthHovered] = useState(false);

  // ABOUT US SUBMENU TEXT HOVER STATES
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [isReviewsHovered, setIsReviewsHovered] = useState(false);

  // HEALTH & NUTRITION SUBMENU TEXT HOVER STATES
  const [hoveredHealthSub, setHoveredHealthSub] = useState(null);

  // BRANDS MEGA MENU HOVER STATES
  const [hoveredBrandCol1, setHoveredBrandCol1] = useState(null);
  const [hoveredBrandCol2, setHoveredBrandCol2] = useState(null);
  const [hoveredBrandCol3, setHoveredBrandCol3] = useState(null);

  // PERSONAL CARE MEGA MENU HOVER STATES
  const [hoveredPersonalCol1, setHoveredPersonalCol1] = useState(null);
  const [hoveredPersonalCol2, setHoveredPersonalCol2] = useState(null);
  const [hoveredPersonalCol3, setHoveredPersonalCol3] = useState(null);
  
  // 🚀 🔥 BHOOMIKA REAL-TIME LIVE BADGE VISIBILITY COUNTER ENGINE
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const calculateTotalItems = () => {
      const savedCart = JSON.parse(localStorage.getItem('ayurkart_cart')) || [];
      setCartCount(savedCart.length); 
    };

    calculateTotalItems();

    window.addEventListener('cartUpdated', calculateTotalItems);
    return () => window.removeEventListener('cartUpdated', calculateTotalItems);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim().length > 1) {
      setShowDropdown(false); 
      navigate(`/collections/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Health & Nutrition Sub-Menu items
  const healthNutritionSub = [
    { name: "Men's Health", path: '/collections/men-health-ayurvedic-medicines' },
    { name: 'Women Health', path: '/collections/women-health-ayurvedic-medicines' },
    { name: 'Diet & Weight', path: '/collections/diet-weight-ayurvedic-medicines' },
    { name: 'Joints & Bones', path: '/collections/joints-bones-ayurvedic-medicines' },
    { name: 'Immunity', path: '/collections/immunity-ayurvedic-medicines' }
  ];

  // AYURVEDIC LEADING BRANDS MEGA MENU FORMULATIONS DATA Matrix
  const brandsMegaData = {
    col1: {
      title: 'AYURVEDIC LEADING BRANDS',
      items: [
        { name: 'Kottakkal Ayurveda', path: '/collections/kottakkal-ayurveda-products' },
        { name: 'Vaidyaratnam', path: '/collections/vaidyaratnam-products' },
        { name: 'Alarsin', path: '/collections/alarsin-products' }
      ]
    },
    col2: {
      title: 'TRUSTED FORMULATIONS',
      items: [
        { name: 'AVN', path: '/collections/avn-products' },
        { name: 'AVP Ayurveda', path: '/collections/avp-ayurveda-products' },
        { name: 'Himalaya Wellness', path: '/collections/himalaya-wellness-products' }
      ]
    },
    col3: {
      title: 'HERBAL & PREMIUM CARE',
      items: [
        { name: 'Kerala Ayurveda', path: '/collections/kerala-ayurveda-products' },
        { name: 'Maharishi Ayurveda', path: '/collections/maharishi-ayurveda-products' },
        { name: 'All Other Brands', path: '/collections/all-brands-products' }
      ]
    }
  };

  // PERSONAL CARE MEGA MENU FORMULATIONS DATA Matrix
  const personalCareMegaData = {
    col1: {
      title: 'AYURVEDIC MEDICINE FOR',
      items: [
        { name: 'Cough and Cold', path: '/collections/cough-and-cold-products' },
        { name: 'Fever', path: '/collections/ayurvedic-fever-products' },
        { name: 'Migraine', path: '/collections/ayurvedic-migraine-products' },
        { name: 'Sinus', path: '/collections/ayurvedic-sinus-products' }
      ]
    },
    col2: {
      title: 'AYURVEDIC PRODUCTS FOR',
      items: [
        { name: 'Body Care', path: '/collections/ayurvedic-body-care-products' },
        { name: 'Face Care', path: '/collections/ayurvedic-face-care-products' }, 
        { name: 'Ayurvedic Hair Oil', path: '/collections/ayurvedic-hair-oil-products' },
        { name: 'Skin & Beauty Care', path: '/collections/ayurvedic-skin-beauty-care-products' }
      ]
    },
    col3: {
      title: 'DIGESTIVE & METABOLIC CARE',
      items: [
        { name: 'Constipation', path: '/collections/ayurvedic-constipation-products' },
        { name: 'Diabetes / Sugar Control', path: '/collections/diabetes-sugar-control-products' },
        { name: 'Digestion', path: '/collections/ayurvedic-digestion-products' },
        { name: 'Gastro Health & Acidity', path: '/collections/gastro-health-acidity-products' }
      ]
    }
  };

  const navLinks = [
    { name: 'ABOUT US', path: '/about', hasDropdown: true, type: 'about' },
    { name: 'AYURVEDA', path: '/ayurveda' },
    { name: 'PERSONAL CARE', path: '/personal-care', hasDropdown: true, type: 'personal' },
    { name: 'BRANDS', path: '/brands', hasDropdown: true, type: 'brands' }, 
    { name: 'HEALTH & NUTRITION', path: '/health-nutrition', hasDropdown: true, type: 'health' },
    { name: 'GENERAL', path: '/collections/general-ayurvedic-products' },
    { name: 'E-CONSULTATION', path: '/e-consultation' }
  ];

  return (
    <header className="w-full font-sans bg-white select-none relative z-50 shadow-sm">
      
      {/* PREMIUM BOTTOM-TO-TOP SLIDE ANIMATION STYLES SHEET */}
      <style>{`
        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up-fade {
          animation: slideUpFade 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* 🟢 TOP MINI-NAV BAR (Beige Color Row - 🎯 FIXED: Cart block deleted from here) */}
      <div 
        style={{ backgroundColor: '#eef2e2', borderBottom: '1px solid #dee2d1' }}
        className="w-full px-6 py-2.5 flex items-center justify-between text-xs font-bold text-gray-700 tracking-wide relative"
      >
        {/* Left Actions Links */}
        <div className="flex items-center space-x-6 text-left">
          <Link 
            to="/my-orders" 
            className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gray-700 hover:text-[#004d56] transition-colors"
            style={{ textDecoration: 'none' }}
          >
            <Package size={14} className="text-gray-500 hover:text-[#004d56]" />
            My Orders
          </Link>
          <Link to="/login" className="flex items-center gap-1.5 text-slate-700 hover:text-emerald-900 transition-colors">
            <LogIn size={14} style={{ color: '#006673' }} />
            <span>LOGIN</span>
          </Link>
          <Link to="/register" className="flex items-center gap-1.5 text-slate-700 hover:text-emerald-900 transition-colors">
            <UserPlus size={14} style={{ color: '#006673' }} />
            <span>CREATE AN ACCOUNT</span>
          </Link>
        </div>
      </div>

      {/* ⚪ MAIN IDENTITY ROW (Logo, Brand Info, Search Bar) */}
      <div className="w-full max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Brand Logo Image */}
        <Link to="/" className="flex items-center shrink-0">
          <img 
            src="/Ayurkart-logo.png" 
            alt="Ayurkart Logo" 
            style={{ height: '70px', width: 'auto' }}
            className="object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
              document.getElementById('brand-text-logo').style.display = 'block';
            }}
          />
          <div id="brand-text-logo" style={{ display: 'none' }}>
            <h1 style={{ color: '#004d56' }} className="text-3xl font-black tracking-tight">Ayurkart</h1>
            <p className="text-[11px] text-gray-400 font-medium tracking-widest uppercase">Health Care at a Click</p>
          </div>
        </Link>

        {/* Center: Info Badges */}
        <div className="hidden lg:flex items-center space-x-8 text-left">
          <div className="flex items-center gap-3">
            <div style={{ backgroundColor: '#f28500' }} className="p-2.5 rounded-xl text-white shadow-sm flex items-center justify-center">
              <Phone size={18} />
            </div>
            <div>
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider leading-tight">Order Online or Call Us</p>
              <p style={{ color: '#004d56' }} className="text-base font-black tracking-wide">044 4859 9296</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div style={{ color: '#f28500' }} className="flex items-center justify-center">
              <Truck size={34} className="stroke-[1.8]" />
            </div>
            <div>
              <p style={{ color: '#004d56' }} className="text-sm font-black leading-tight">FREE Shipping</p>
              <p className="text-xs text-gray-500 font-bold mt-0.5">ON ORDER ABOVE ₹900**</p>
              <p className="text-[10px] text-gray-400 italic mt-0.5">(Only On Selected Items)</p>
            </div>
          </div>
        </div>

        {/* Right Side: Search Bar Input */}
        <div 
          className="w-full max-w-md relative font-sans" 
          onMouseLeave={() => setTimeout(() => setShowDropdown(false), 300)}
        >
          <form onSubmit={handleSearchSubmit} className="w-full flex items-center shadow-sm border border-gray-200 focus-within:border-orange-500/60 rounded-sm overflow-hidden bg-white">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.trim().length > 1 && setShowDropdown(true)}
              placeholder="Search product..."
              className="w-full px-4 py-3 text-sm focus:outline-none text-gray-700 font-medium bg-transparent border-none text-left"
            />
            <button 
              type="submit"
              style={{ backgroundColor: '#f28500' }}
              className="hover:opacity-90 text-white p-3.5 transition-all cursor-pointer flex items-center justify-center border-none focus:outline-none shrink-0"
            >
              <Search size={18} className="stroke-[2.5]" />
            </button>
          </form>

          {/* Search Dropdown Grid Container */}
          {showDropdown && searchQuery.trim().length > 1 && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-b-md shadow-xl z-[999999] max-h-80 overflow-y-auto mt-0.5">
              {searchResults.length > 0 ? (
                searchResults.map((prod) => (
                  <div 
                    key={prod._id}
                    onClick={() => {
                      setSearchQuery('');
                      setShowDropdown(false);
                      navigate(`/product/${prod._id}`);
                    }}
                    className="flex items-center gap-3 p-2.5 hover:bg-orange-50/50 cursor-pointer border-b border-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 flex-shrink-0 border rounded bg-white p-0.5 flex items-center justify-center">
                      <img 
                        src={prod.image ? (prod.image.startsWith('http') ? prod.image : `http://localhost:5000/${prod.image}`) : 'https://via.placeholder.com/50'} 
                        alt="preview" 
                        className="w-full h-full object-contain rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="text-xs font-bold text-gray-800 truncate uppercase tracking-tight">{prod.name}</div>
                      <div className="text-[11px] font-extrabold text-[#f28500] mt-0.5">Rs. {prod.price}.00</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-sm text-gray-500 font-medium text-center">
                  No matching items found for "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>

      </div>

      {/* 🟢 NAVBAR ROW (Background Deep Teal - 🎯 FIXED: Integrated the cart directly at the end) */}
      <div style={{ backgroundColor: '#004d56' }} className="w-full text-white shadow-md relative">
        <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between px-10 min-h-[52px]">
          
          <nav className="flex flex-nowrap items-center py-0 h-full relative flex-1">
            {navLinks.map((link, index) => {
              const isActive = location.pathname === link.path;
              const isMainHovered = hoveredIndex === index;

              if (link.hasDropdown) {
                let isCurrentDropdownOpen = false;
                if (link.type === 'about') isCurrentDropdownOpen = isAboutHovered;
                if (link.type === 'classical') isCurrentDropdownOpen = isClassicalHovered;
                if (link.type === 'personal') isCurrentDropdownOpen = isPersonalCareHovered;
                if (link.type === 'brands') isCurrentDropdownOpen = isBrandsHovered; 
                if (link.type === 'health') isCurrentDropdownOpen = isHealthHovered;

                return (
                  <div 
                    key={index} 
                    className={`flex items-center h-full ${(link.type !== 'personal' && link.type !== 'brands') ? 'relative' : ''}`}
                    onMouseEnter={() => {
                      setHoveredIndex(index);
                      if (link.type === 'about') setIsAboutHovered(true);
                      if (link.type === 'classical') setIsClassicalHovered(true);
                      if (link.type === 'personal') setIsPersonalCareHovered(true);
                      if (link.type === 'brands') setIsBrandsHovered(true);
                      if (link.type === 'health') setIsHealthHovered(true);
                    }}
                    onMouseLeave={() => {
                      setHoveredIndex(null);
                      if (link.type === 'about') setIsAboutHovered(false);
                      if (link.type === 'classical') setIsClassicalHovered(false);
                      if (link.type === 'personal') setIsPersonalCareHovered(false);
                      if (link.type === 'brands') setIsBrandsHovered(false);
                      if (link.type === 'health') setIsHealthHovered(false);
                    }}
                  >
                    <Link
                      to={link.path}
                      style={{ 
                        backgroundColor: (isMainHovered || isActive || isCurrentDropdownOpen) ? '#e68a00' : 'transparent',
                        transition: 'all 0.2s ease-in-out',
                        paddingTop: '15px',
                        paddingBottom: '15px'
                      }}
                      className="px-4 text-xs font-bold tracking-wide uppercase whitespace-nowrap shrink-0 text-white block no-underline"
                    >
                      {link.name}
                    </Link>

                    {/* Sub-menus for links... */}
                    {link.type === 'about' && isAboutHovered && (
                      <div style={{ top: '100%', left: '0px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }} className="absolute w-56 bg-white text-gray-800 border border-gray-200 rounded-b-sm overflow-hidden z-50 py-1 animate-slide-up-fade text-left">
                        <Link to="/profile" onMouseEnter={() => setIsProfileHovered(true)} onMouseLeave={() => setIsProfileHovered(false)} style={{ color: isProfileHovered ? '#e68a00' : '#1f2937', transition: 'all 0.2s', paddingLeft: isProfileHovered ? '24px' : '20px' }} className="block py-3 text-sm font-bold no-underline">Profile</Link>
                        <Link to="/reviews" onMouseEnter={() => setIsReviewsHovered(true)} onMouseLeave={() => setIsReviewsHovered(false)} style={{ color: isReviewsHovered ? '#e68a00' : '#1f2937', transition: 'all 0.2s', paddingLeft: isReviewsHovered ? '24px' : '20px' }} className="block py-3 text-sm font-bold no-underline">Reviews</Link>
                      </div>
                    )}

                    {link.type === 'health' && isHealthHovered && (
                      <div style={{ top: '100%', left: '0px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }} className="absolute w-60 bg-white text-gray-800 border border-gray-200 rounded-b-sm overflow-hidden z-50 py-1 animate-slide-up-fade text-left">
                        {healthNutritionSub.map((subItem, hIdx) => (
                          <Link key={hIdx} to={subItem.path} onMouseEnter={() => setHoveredHealthSub(hIdx)} onMouseLeave={() => setHoveredHealthSub(null)} style={{ color: hoveredHealthSub === hIdx ? '#e68a00' : '#1f2937', transition: 'all 0.2s', paddingLeft: hoveredHealthSub === hIdx ? '24px' : '20px' }} className="block py-3 text-sm font-bold border-b border-gray-50 last:border-none no-underline">{subItem.name}</Link>
                        ))}
                      </div>
                    )}

                    {link.type === 'brands' && isBrandsHovered && (
                      <div style={{ top: '100%', left: '0px', right: '0px', boxShadow: '0 15px 30px -5px rgba(0, 0, 0, 0.12)' }} className="absolute w-full bg-white text-gray-800 border-t border-gray-100 border-b border-gray-200 z-50 py-10 animate-slide-up-fade">
                        <div className="max-w-[1400px] mx-auto px-16 grid grid-cols-3 gap-12 text-left">
                          <div>
                            <h3 className="text-xs font-bold tracking-wider text-gray-900 mb-5 border-b border-gray-100 pb-2.5 uppercase">{brandsMegaData.col1.title}</h3>
                            <div className="space-y-2">
                              {brandsMegaData.col1.items.map((item, idx) => (
                                <Link key={idx} to={item.path} onMouseEnter={() => setHoveredBrandCol1(idx)} onMouseLeave={() => setHoveredBrandCol1(null)} style={{ color: hoveredBrandCol1 === idx ? '#e68a00' : '#4b5563', transition: 'all 0.2s', paddingLeft: hoveredBrandCol1 === idx ? '6px' : '0px' }} className="block py-1 text-[13.5px] font-bold no-underline">{item.name}</Link>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xs font-bold tracking-wider text-gray-900 mb-5 border-b border-gray-100 pb-2.5 uppercase">{brandsMegaData.col2.title}</h3>
                            <div className="space-y-2">
                              {brandsMegaData.col2.items.map((item, idx) => (
                                <Link key={idx} to={item.path} onMouseEnter={() => setHoveredBrandCol2(idx)} onMouseLeave={() => setHoveredBrandCol2(null)} style={{ color: hoveredBrandCol2 === idx ? '#e68a00' : '#4b5563', transition: 'all 0.2s', paddingLeft: hoveredBrandCol2 === idx ? '6px' : '0px' }} className="block py-1 text-[13.5px] font-bold no-underline">{item.name}</Link>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xs font-bold tracking-wider text-gray-900 mb-5 border-b border-gray-100 pb-2.5 uppercase">{brandsMegaData.col3.title}</h3>
                            <div className="space-y-2">
                              {brandsMegaData.col3.items.map((item, idx) => (
                                <Link key={idx} to={item.path} onMouseEnter={() => setHoveredBrandCol3(idx)} onMouseLeave={() => setHoveredBrandCol3(null)} style={{ color: hoveredBrandCol3 === idx ? '#e68a00' : '#4b5563', transition: 'all 0.2s', paddingLeft: hoveredBrandCol3 === idx ? '6px' : '0px' }} className="block py-1 text-[13.5px] font-bold no-underline">{item.name}</Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {link.type === 'personal' && isPersonalCareHovered && (
                      <div style={{ top: '100%', left: '0px', right: '0px', boxShadow: '0 15px 30px -5px rgba(0, 0, 0, 0.12)' }} className="absolute w-full bg-white text-gray-800 border-t border-gray-100 border-b border-gray-200 z-50 py-10 animate-slide-up-fade">
                        <div className="max-w-[1400px] mx-auto px-16 grid grid-cols-3 gap-12 text-left">
                          <div>
                            <h3 className="text-xs font-bold tracking-wider text-gray-900 mb-5 border-b border-gray-100 pb-2.5 uppercase">{personalCareMegaData.col1.title}</h3>
                            <div className="space-y-2">
                              {personalCareMegaData.col1.items.map((item, idx) => (
                                <Link key={idx} to={item.path} onMouseEnter={() => setHoveredPersonalCol1(idx)} onMouseLeave={() => setHoveredPersonalCol1(null)} style={{ color: hoveredPersonalCol1 === idx ? '#e68a00' : '#4b5563', transition: 'all 0.2s', paddingLeft: hoveredPersonalCol1 === idx ? '6px' : '0px' }} className="block py-1 text-[13.5px] font-bold no-underline">{item.name}</Link>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xs font-bold tracking-wider text-gray-900 mb-5 border-b border-gray-100 pb-2.5 uppercase">{personalCareMegaData.col2.title}</h3>
                            <div className="space-y-2">
                              {personalCareMegaData.col2.items.map((item, idx) => (
                                <Link key={idx} to={item.path} onMouseEnter={() => setHoveredPersonalCol2(idx)} onMouseLeave={() => setHoveredPersonalCol2(null)} style={{ color: hoveredPersonalCol2 === idx ? '#e68a00' : '#4b5563', transition: 'all 0.2s', paddingLeft: hoveredPersonalCol2 === idx ? '6px' : '0px' }} className="block py-1 text-[13.5px] font-bold no-underline">{item.name}</Link>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xs font-bold tracking-wider text-gray-900 mb-5 border-b border-gray-100 pb-2.5 uppercase">{personalCareMegaData.col3.title}</h3>
                            <div className="space-y-2">
                              {personalCareMegaData.col3.items.map((item, idx) => (
                                <Link key={idx} to={item.path} onMouseEnter={() => setHoveredPersonalCol3(idx)} onMouseLeave={() => setHoveredPersonalCol3(null)} style={{ color: hoveredPersonalCol3 === idx ? '#e68a00' : '#4b5563', transition: 'all 0.2s', paddingLeft: hoveredPersonalCol3 === idx ? '6px' : '0px' }} className="block py-1 text-[13.5px] font-bold no-underline">{item.name}</Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                );
              }

              return (
                <Link
                  key={index}
                  to={link.path}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{ 
                    backgroundColor: (isMainHovered || isActive) ? '#e68a00' : 'transparent',
                    transition: 'all 0.2s ease-in-out',
                    paddingTop: '15px',
                    paddingBottom: '15px'
                  }}
                  className="px-4 text-xs font-bold tracking-wide uppercase whitespace-nowrap shrink-0 text-white no-underline text-center block"
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* 🎯 RIGHT SIDE NAVBAR: NEW PREMIUM INTERACTIVE CART REDIRECT INDICATOR */}
          <Link 
  to="/cart" 
  className="flex items-center gap-2 px-3 py-1.5 transition-all group select-none cursor-pointer no-underline shrink-0 hover:opacity-85"
  style={{ marginRight: '10px' }}
>
  <ShoppingCart size={15} className="text-white group-hover:scale-105 transition-transform duration-200" />
  <span className="text-xs font-black tracking-wider uppercase text-white font-sans">
    Cart
  </span>
  <span 
    className="text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center font-mono shadow-xs ml-0.5"
    style={{ backgroundColor: '#f28500' }}
  >
    {cartCount}
  </span>
</Link>

          {/* BOOK NOW FLOATING BADGE */}
          <div className="absolute right-6 top-[-14px] hidden xl:block">
            <div 
              style={{ backgroundColor: '#00a3ad' }} 
              className="text-[10px] font-black text-white px-3 py-1 rounded-sm shadow-md tracking-wider uppercase flex items-center relative"
            >
              BOOK NOW
              <div 
                style={{ borderTopColor: '#00a3ad' }}
                className="absolute bottom-[-5px] right-4 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px]"
              />
            </div>
          </div>

        </div>
      </div>

    </header>
  );
};

export default Header;