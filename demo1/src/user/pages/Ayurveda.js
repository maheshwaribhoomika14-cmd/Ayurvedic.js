import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header'; // Aapka existing navbar header

const Ayurveda = () => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col font-sans text-gray-800 antialiased relative overflow-x-hidden">
      
      {/* 🟢 NAVBAR HEADER */}
      <Header />

      {/* 🥖 BREADCRUMBS PATH ROW */}
      <div className="w-full bg-[#fcf9f4] py-3 px-4 md:px-14 border-b border-gray-100 text-xs text-gray-500 font-medium select-none">
        <div className="max-w-7xl mx-auto flex items-center space-x-2">
          <Link to="/" className="hover:text-emerald-700 text-gray-500 no-underline">Home</Link> 
          <span className="text-gray-400">›</span> 
          <span className="text-gray-900 font-medium">What is Ayurveda?</span>
        </div>
      </div>

      {/* 📝 CORE MAIN CONTENT AREA */}
      <main className="max-w-7xl w-full mx-auto px-4 md:px-14 py-10 flex-grow">
        
        {/* Main Bold Heading Title */}
        <h1 className="text-xl md:text-2xl font-black tracking-wide text-gray-900 uppercase border-b border-gray-100 pb-4 mb-6">
          WHAT IS AYURVEDA ?
        </h1>

        {/* Informational Rich Text Blocks Layout matching original UI exactly */}
        <div className="space-y-5 text-sm md:text-base leading-relaxed text-gray-700 font-normal">
          
          <p>
            <strong className="text-gray-900 font-bold">Ayurveda</strong> is the oldest school of medicine which helped our Indian king’s health even at the time of war. Ayurveda is a system of medicine that is over 5000 years old still lives and help you to lead better life with nature. We promise you longevity of your health. <strong className="text-gray-900 font-bold">Prevention is better than cure.</strong> Prevention starts with a life that is harmony in changing cycles of nature.
          </p>

          <p>
            In the situation of our polluted cities the modern technologies with side effects helps us only to pay more for the lifetime. We are in a modern age with new diseases which not even named. Modern medicines are not prescribed according to your unique body type but our <strong className="text-gray-900 font-bold">ayurvedic medicines</strong> are from the nature’s plate. The ancient culture and medicine are dug back by us which are presented in this <strong className="text-[#004d4e] font-bold">website</strong>.
          </p>

          <p>
            Ayurveda understand the cycle of nature, it provides what you need and makes the rhythm of life enjoyable in this dynamic circumstances.
          </p>

          

        </div>
        
      </main>

    </div>
  );
};

export default Ayurveda;