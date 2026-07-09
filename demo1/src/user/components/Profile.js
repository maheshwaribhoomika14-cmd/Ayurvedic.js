import React from 'react';
import { Link } from 'react-router-dom'; // 🟢 Direct routing connection ke liye import kiya
import Header from './Header'; // Aapka existing navbar header

const Profile = () => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col font-sans text-gray-800 antialiased relative overflow-x-hidden">
      
      {/* 🟢 NAVBAR HEADER */}
      <Header />

      {/* 🥖 BREADCRUMBS PATH ROW */}
      <div className="w-full bg-gray-50 py-3 px-6 md:px-16 text-xs text-slate-500 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto flex items-center space-x-2">
          <Link to="/" className="hover:text-emerald-800 cursor-pointer font-semibold text-gray-600 no-underline">Home</Link> 
          <span className="text-gray-400">›</span> 
          <span className="text-gray-900 font-medium">Ayurkart - One of the Best Online Ayurvedic Store in India</span>
        </div>
      </div>

      {/* 📝 CORE MAIN CONTENT AREA */}
      <main className="w-full max-w-[1400px] mx-auto px-6 md:px-16 py-10 flex-1 relative">
        
        {/* Main Bold Heading Title */}
        <h1 className="text-xl md:text-2xl font-black tracking-wide text-gray-900 uppercase border-b-2 border-gray-100 pb-4 mb-6">
          Ayurkart - One of the Best Online Ayurvedic Store in India
        </h1>

        {/* Informational Rich Text Blocks Layout */}
        <div className="space-y-6 text-sm md:text-base leading-relaxed text-gray-700 font-normal pr-12 md:pr-16">
          
          <p>
            Quality <span className="text-emerald-900 font-extrabold hover:underline cursor-pointer">ayurvedic products</span> at a click!
          </p>

          <p>
            Ayurkart aims to bring the world of <span className="text-gray-900 font-extrabold">authentic ayurvedic herbs</span> and <span className="text-gray-900 font-extrabold">ayurvedic medicines</span> to your doorstep within the shortest delivery time possible.
          </p>

          <p className="text-justify">
            In recent years The Internet has revolutionized the way we purchase things. Because of the numerous advantages and benefits, more and more people these days prefer buying things online over the conventional method of going into shops. In 2017, an estimated 1.66 billion people worldwide have purchased goods online. So why not bring this revolution into our ancient traditional form of <span className="text-gray-900 font-bold">Ayurvedic medicines</span>. Currently more and more people are switching to Ayurveda which is a natural way of heeling the mind body and soul and at many times after a diagnosis the patient are not able to purchase the medicines at a convenient location. This is the soul aim and purpose of <span className="text-emerald-950 font-black">Ayurkart!</span> We will deliver the medicines that you require at the utmost quality right to your door step within the shortest possible time....
          </p>

        </div>
        
      </main>

    </div>
  );
};

export default Profile;