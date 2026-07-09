import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// IMPORT SWIPER CAROUSEL CORE MODULES AND STYLES
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';

// Import Swiper core styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const BannerSlider = () => {
  // 🚨 MASTER CONTROLLER (Yahan se aap kisi bhi waqt customize kar sakti hain)
  const sliderConfig = {
    sliderHeight: '520px',       // Slider ki global framework height
    sliderWidth: '100%',         // Slider ki global framework width
    
    titleFontSize: '38px',       // H2 Heading ka font size
    titleFontWeight: '700',      // Heading ka weight (Bold)
    
    subtitleFontSize: '15px',    // Subtitle paragraph ka font size
    subtitleFontWeight: '600',   // Subtitle ka weight
    
    buttonFontSize: '12px',      // Button link text size
    buttonFontWeight: '700',     // Button link weight
  };

  const [slides, setSlides] = useState([]);

  // API FETCH: Dynamic extraction sequence template mapping
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/sliders');
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setSlides(data);
          }
        }
      } catch (error) {
        console.error("Database carousel load error:", error);
      }
    };
    fetchSlides();
  }, []);

  if (slides.length === 0) {
    return (
      <div 
        style={{ height: sliderConfig.sliderHeight, width: sliderConfig.sliderWidth }} 
        className="bg-[#f4ebd9] flex items-center justify-center font-bold text-slate-800"
      >
        Loading Beautiful Banners...
      </div>
    );
  }

  return (
    <div 
      style={{ height: sliderConfig.sliderHeight, width: sliderConfig.sliderWidth }} 
      className="relative bg-[#f4ebd9] select-none border-b border-gray-200/30 user-carousel-wrapper mx-auto"
    >
      
      {/* SWIPER CAROUSEL ENGINE WITH FADE EFFECT */}
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        effect={'fade'}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={{ clickable: true }}
        className="h-full w-full"
      >
        {slides.map((slide, index) => {
          const cleanPath = slide.image.replace(/^\/+/, '');

          return (
            <SwiperSlide key={slide._id || index} className="h-full w-full flex items-center relative overflow-hidden px-12 md:px-24">
              
              {/* STRICT IMAGE HANDLING (Full layout background scale backdrop) */}
              <img 
                src={`${window.location.origin}/${cleanPath}`}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0"
              />

              {/* 🚨 FIXED PANEL OVERLAY */}
              <div className="w-full max-w-xl text-center mx-auto z-10 relative slider-content-box pt-16 flex flex-col justify-center h-full items-center">
                
                {/* Heading Title Link */}
                <h2 
                  style={{ fontSize: sliderConfig.titleFontSize, color: 'black', fontWeight: sliderConfig.titleFontWeight }}
                  className="tracking-wide uppercase mb-2 leading-snug drop-shadow-sm slide-title"
                >
                  {slide.title}
                </h2>

                {/* Decorative Line Separator */}
                <div className="h-[3px] w-14 bg-slate-800/80 mb-6 rounded-full slide-line"></div>
                
                {/* Subtitle Paragraph Description */}
                <p 
                  style={{ fontSize: sliderConfig.subtitleFontSize, fontWeight: sliderConfig.subtitleFontWeight }}
                  className="text-slate-700 mb-4 max-w-md leading-relaxed tracking-wide slide-subtitle"
                >
                  {slide.subtitle}
                </p>
                
                {/* Call-to-Action Link Action Linked directly to All Face Care Products Grid for Bhoomika */}
                <div>
                  <Link 
                    to="/collections/ayurvedic-face-care-products"
                    style={{ 
                      backgroundColor: '#f28500', 
                      fontSize: sliderConfig.buttonFontSize, 
                      fontWeight: sliderConfig.buttonFontWeight 
                    }}
                    className="inline-block text-white tracking-widest px-8 py-4 rounded-sm hover:bg-orange-600 shadow-md transition-all uppercase slide-btn"
                  >
                    {slide.buttonText || 'SHOP NOW'}
                  </Link>
                </div>
              </div>

              {/* Light gradient mask overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-transparent pointer-events-none z-0" />
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* 🚨 CUSTOM STYLE SHEET LAYER FOR SQUARE BOX ARROWS AND OVERRIDES */}
      <style>{`
        @keyframes customSlideUp {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .swiper-slide-active .slide-title { animation: customSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .swiper-slide-active .slide-line { animation: customSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.12s forwards; opacity: 0; }
        .swiper-slide-active .slide-subtitle { animation: customSlideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.22s forwards; opacity: 0; }
        .swiper-slide-active .slide-btn { animation: customSlideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.32s forwards; opacity: 0; }

        .swiper-slide-duplicate-active .slide-title,
        .swiper-slide-prev .slide-title,
        .swiper-slide-next .slide-title { opacity: 0; }

        /* FIXED BOX STYLE ARROWS */
        .user-carousel-wrapper .swiper-button-next,
        .user-carousel-wrapper .swiper-button-prev {
          color: #333333 !important;
          background: #ffffff !important;
          width: 40px !important;
          height: 40px !important;
          border-radius: 2px !important;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08) !important;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .user-carousel-wrapper .swiper-button-next:after,
        .user-carousel-wrapper .swiper-button-prev:after { 
          font-size: 16px !important; 
          font-weight: 800 !important; 
        }

        .user-carousel-wrapper .swiper-button-next:hover,
        .user-carousel-wrapper .swiper-button-prev:hover { 
          background: #fdfdfd !important;
          color: #f28500 !important;
        }

        .user-carousel-wrapper .swiper-button-prev { left: 20px !important; }
        .user-carousel-wrapper .swiper-button-next { right: 20px !important; }

        .user-carousel-wrapper .swiper-pagination-bullet { background: #cbd5e1 !important; opacity: 0.7; transition: all 0.3s ease; }
        .user-carousel-wrapper .swiper-pagination-bullet-active { background: #004d56 !important; width: 24px; border-radius: 6px; opacity: 1; }
      `}</style>

    </div>
  );
};

export default BannerSlider;