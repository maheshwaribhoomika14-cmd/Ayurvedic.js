import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header'; 

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  // Slider slide control state index tracker
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // 📊 REAL EXTENDED DATA MATCHING EXTREME CAROUSEL SLIDER MATRIX
    const sampleReviews = [
      { id: 1, title: 'Best product', rating: 5, comment: 'Best', user: 'Lokesh J.' },
      { id: 2, title: 'Super', rating: 5, comment: 'Good for baby skin', user: 'Jayasree' },
      { id: 3, title: 'Good aesthetic', rating: 5, comment: 'I have just started using it and result is pristine.', user: 'Dr S BANERJEE' },
      { id: 4, title: 'Good product. Go for it..', rating: 5, comment: 'Poonam Niwaskar', user: 'Poonam Niwaskar' },
      { id: 5, title: 'Good one', rating: 4, comment: 'Highly effective organic medicine.', user: 'Inna' },
      { id: 6, title: 'Genuine product', rating: 5, comment: 'Good packaging, genuine ayurvedic items.', user: 'Chaitra B' },
      { id: 7, title: 'Superb Formulation', rating: 5, comment: 'Rare product found here instantly.', user: 'Ravindran' },
      { id: 8, title: 'Smiley & Happy', rating: 5, comment: "It's a very good product. Fully satisfied.", user: 'Sarat sahu' }
    ];

    setReviews(sampleReviews);
  }, []);

  // Slider navigation controls
  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? reviews.length - 4 : prevIndex - 1));
  };

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= reviews.length - 4 ? 0 : prevIndex + 1));
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col font-sans text-gray-800 antialiased relative overflow-x-hidden">
      
      {/* 🚨 VERTICAL REVIEWS BADGE TEXT UTILITIES */}
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

      {/* 🟢 HEADER NAVBAR */}
      <Header />

      {/* 🥖 BREADCRUMBS PATH ROW */}
      <div className="w-full bg-white py-3 px-6 md:px-16 text-xs text-gray-500 border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto flex items-center space-x-1.5">
          <Link to="/" className="hover:text-emerald-700 text-gray-600 transition-colors no-underline">Home</Link> 
          <span className="text-gray-400">›</span> 
          <span className="text-gray-500">What customers say about Ayurkart</span>
        </div>
      </div>

      {/* 📊 MAIN CONTENT FRAMEWORK */}
      <main className="w-full max-w-[1400px] mx-auto px-6 md:px-16 py-10 flex-1 relative">
        
        {/* Core Main Headings */}
        <h1 className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-tight">
          What customers say about Ayurkart
        </h1>
        <h2 className="text-sm md:text-base font-bold text-gray-700 uppercase mt-0.5 tracking-wide">
          Product Reviews
        </h2>

        {/* ⭐ OVERALL RATINGS STAR SHEET */}
        <div className="mt-8 border-b pb-6 border-gray-100">
          <h3 className="text-base font-bold text-gray-900 uppercase tracking-wide">
            What customers say about Ayurkart
          </h3>
          <div style={{ color: '#f99011' }} className="flex items-center space-x-0.5 mt-2 text-sm tracking-tighter">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
          <p className="text-xs text-[#0275d8] font-semibold mt-1 cursor-pointer hover:underline">
            from 3036 reviews
          </p>
        </div>

        {/* 📦 DYNAMIC CAROUSEL SLIDER LAYER WITH CONTAINER ARROWS */}
        <div className="w-full relative mt-10 pr-12 md:pr-0 group">
          
          {/* Slider Content Wrapper viewport window */}
          <div className="w-full overflow-hidden no-scrollbar">
            <div 
              style={{ transform: `translateX(-${currentIndex * 25}%)`, transition: 'transform 0.4s ease-in-out' }}
              className="flex w-full flex-row"
            >
              {reviews.map((rev) => (
                <div 
                  key={rev.id} 
                  className="w-full sm:w-1/2 md:w-1/4 flex-shrink-0 p-2.5"
                >
                  <div className="border border-gray-200 bg-white p-5 rounded-md flex flex-col justify-between h-[150px] shadow-3xs">
                    <div>
                      <div style={{ color: '#f99011' }} className="text-xs tracking-tighter mb-1.5">
                        {'★'.repeat(rev.rating)}
                      </div>
                      {/* Title */}
                      <h4 className="font-extrabold text-sm text-gray-900 leading-tight mb-1 truncate">{rev.title}</h4>
                      {/* Comment text snippet */}
                      <p className="text-xs text-gray-500 leading-normal text-left font-medium line-clamp-3">
                        {rev.comment}
                      </p>
                    </div>
                    {/* Bottom username label framework placement */}
                    <div className="text-xs text-gray-400 font-medium tracking-wide">
                      {rev.user}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 🔘 SLIDER INTERACTIVE NAVIGATION CONTROLS FRAME */}
          {reviews.length > 4 && (
            <div className="flex items-center justify-center space-x-6 mt-8 w-full">
              {/* Left Angle Arrow Control Button */}
              <button 
                type="button"
                onClick={handlePrevSlide}
                className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center bg-white text-gray-600 font-bold hover:bg-gray-50 active:bg-gray-100 transition-colors shadow-2xs text-lg select-none cursor-pointer"
              >
                ‹
              </button>
              {/* Right Angle Arrow Control Button */}
              <button 
                type="button"
                onClick={handleNextSlide}
                className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center bg-white text-gray-600 font-bold hover:bg-gray-50 active:bg-gray-100 transition-colors shadow-2xs text-lg select-none cursor-pointer"
              >
                ›
              </button>
            </div>
          )}

        </div>

      </main>

    </div>
  );
};

export default ReviewsPage;