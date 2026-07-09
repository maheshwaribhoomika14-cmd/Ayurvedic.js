import React from 'react';

const WelcomeBanner = () => {
  return (
    /* MAIN GREEN WELCOME BANNER */
    <div 
      style={{ backgroundColor: '#005f60' }} 
      className="w-full text-white py-12 px-6 md:px-16 text-center shadow-inner relative"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-4">
        
        {/* Main Heading Text */}
        <h1 className="text-2xl md:text-4xl font-normal tracking-wide leading-tight max-w-5xl text-white">
          Buy Ayurvedic Medicine Online from India's Largest Ayurvedic Shopping Store
        </h1>
        
        {/* Decorative Spacing Element */}
        <div className="h-[1px] w-full max-w-md bg-white/20 my-2"></div>
        
        {/* Subtitle Description 1 */}
        <p className="text-xs md:text-sm text-gray-100 font-light max-w-7xl leading-relaxed tracking-wide">
          Ayurkart, the online ayurvedic store sells all kinds of ayurvedic medicine and ayurvedic products online from India's top most ayurvedic brands like Kottakkal Arya Vaidya Sala, Vaidyaratnam, AVP, Kerala Ayurveda, Himalaya, Dabur, Zandu Ayurveda & Alarsin etc.,
        </p>
        
        {/* Subtitle Description 2 */}
        <p className="text-xs md:text-sm text-gray-100 font-light max-w-4xl leading-relaxed tracking-wide mt-2">
          Our aims to bring the world of authentic ayurvedic herbs and ayurvedic medicines to your doorstep within the shortest delivery time possible.
        </p>
        
      </div>
    </div>
  );
};

export default WelcomeBanner;