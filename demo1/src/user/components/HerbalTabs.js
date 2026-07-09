import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // 👈 1. Dynamic Routing navigation ke liye Link import kiya hai

const HerbalTabsSection = () => {
  const [concerns, setConcerns] = useState([]);
  const [activeTabId, setActiveTabId] = useState('');
  const [loading, setLoading] = useState(true);

  // 📝 EXACT WEBSITE MATCHING DATA STRUCTURE FOR TEXT DETAILS
  const tabDescriptions = {
    "ASWAGANDHA": {
      mainTitle: "ASWAGANDHA ONLINE STORE / POWERFUL ADAPTOGEN @ DOORSTEP",
      subSubtitle: "Most Trusted Ayurvedic Stress Relief Herb in India",
      introText: "The Aswagandha premium root extract aims to bring the benefits of authentic, time-tested science that has its roots in India right to your doorstep. It helps individuals manage daily anxiety and rejuvenates life naturally.",
      sections: [
        {
          heading: "What Is Aswagandha?",
          text: "In simple terms, it is known as the 'strength of the stallion'. It takes into account both physical endurance and neurological balance to offer a holistic approach to immunity. It has been used for thousands of years as a premier Rasayana."
        },
        {
          heading: "What are the different forms of Aswagandha medicines?",
          text: "Aswagandha is formulated keeping multiple lifestyle factors in mind. Depending on body digestion capacity and mode of dosage, it is distributed into various potent traditional forms:"
        }
      ],
      forms: [
        {
          title: "Churna - Powder form of Aswagandha Root Extract",
          desc: "The fine micro-powders of dried organic roots are called churnas. These are usually administered in a medium of hot water, warm milk, or honey. Their therapeutic action starts directly from the mouth."
        },
        {
          title: "Vati / Tablets - Compressed preparation for easy dosage",
          desc: "The compressed root extracts mixed with minor kashayas are called vati (pills). They are the easiest of dosage forms and are highly preferred for busy day-to-day schedules."
        },
        {
          title: "Arishta - Fermented liquid extract for rapid action",
          desc: "Aswagandharishtam is a combination liquid fermented over a specific period of time. It contains self-generated natural alcohol and ensures the quickest absorption in the body system."
        }
      ]
    },
    "TRIPHALA": {
      mainTitle: "TRIPHALA DIGITAL STORE / COMPLETE DIGESTIVE CARE @ DOORSTEP",
      subSubtitle: "Largest Online Ayurvedic Cleansing Remedy",
      introText: "The Triphala formulation aims to bring the combined cleansing benefits of three legendary fruits (Amalaki, Bibhitaki, and Haritaki) to maintain perfect gastrointestinal balance and inner holistic wellness.",
      sections: [
        {
          heading: "What Is Triphala?",
          text: "In simple terms, it is the 'three fruits' master formula. It addresses the root cause of slow metabolism rather than suppressing temporary issues, clearing accumulated toxins (Ama) safely from the digestive tract."
        },
        {
          heading: "What are the different forms of Triphala formulations?",
          text: "Triphala ingredients are meticulously dried and transformed into clean medicinal variations to suit different bodily needs:"
        }
      ],
      forms: [
        {
          title: "Churna - Powder form for complete gastrointestinal wash",
          desc: "The traditional fine blend of three fruits taken mostly with lukewarm water before bedtime. It acts as a natural colon cleanser and antioxidant booster."
        },
        {
          title: "Vati / Tablets - Modern easy-to-swallow pills",
          desc: "Perfectly balanced compressed extracts that help you maintain regular detoxification cycles without dealing with the authentic bitter taste of raw churnas."
        }
      ]
    },
    "GILOY": {
      mainTitle: "GILOY IMMUNITY STORE / THE ROOT OF IMMORTALITY @ DOORSTEP",
      subSubtitle: "Premium Natural Defense and Fever Care Formula",
      introText: "Giloy extracts aim to introduce your immune system to protective antioxidants. Sourced responsibly to serve you in your journey towards achieving high vitality and protection against seasonal infections.",
      sections: [
        {
          heading: "What Is Giloy?",
          text: "In simple terms, it is 'Amrita'—the plant of immortality. It acts as a powerful anti-inflammatory and blood purifier, regulating body temperature and boosting white blood cells efficiently."
        }
      ],
      forms: [
        {
          title: "Kashayam - Water-based concentrated liquid extract",
          desc: "Obtained by boiling raw Giloy stems in water at a strict temperature until it reduces to a potent therapeutic dosage. It is incredibly light and easy to digest."
        },
        {
          title: "Vati - Pure Ghanvati immunity tablets",
          desc: "Concentrated dry extract of Giloy bound neatly into tablets. It helps keep continuous fever parameters under check and purifies internal liver functions."
        }
      ]
    },
    "BRAHMI": {
      mainTitle: "Ayurvedic Medicine Online Store / Ayurvedic Shop @ Doorstep",
      subSubtitle: "Largest Online Ayurvedic Medicine Store in India",
      introText: "The Ayurkart online Ayurvedic medicine store aims to bring the benefits of authentic, time tested science that has its roots in India to your doorstep. With user friendly portal, safe packaging and quick delivery we are proud to serve you in your journey towards holistic health and living.",
      sections: [
        {
          heading: "What is Ayurveda?",
          text: "In simple terms, it is the 'science of life'. It takes into account the physical and mental states of a person and gives a holistic approach to health. This traditional system of medicine has been time tested for tens of thousands of years and holds good till the current era. It is a natural way of healing the body using different combinations of herbs, animal products and purified metals reduced to nano particles. With increasing lifestyle disorders, the popularity towards a holistic approach to wellbeing through Ayurveda is becoming popular."
        },
        {
          heading: "What is the difference between Ayurveda Medicine and the contemporary system of medicine?",
          text: "The short term fix with no assured complete cure VS a proper diagnosis of individualized health care and appropriate treatment is the scenario. It is best to treat the root cause of your concerns rather than pop pills and shoot injections for temporary relief."
        }
      ],
      forms: [
        {
          title: "Churna - Powder form of Ayurvedic Medicine",
          desc: "The fine powders of dried herbs are called churnas. These herbal medicines also at times in combination with metals are usually administered in a medium of hot water, ghee, honey, milk, butter milk or fresh juices of other herbs or other kashayam. They are easy to administer, and their therapeutic action starts from the mouth."
        },
        {
          title: "Vati - Ayurvedic medicine prepared in the form of tablets or pills",
          desc: "The compressed churnas either added with some kashayas or other drugs like ghee and honey are called vati (pills or tablets). They are the easiest of dosage forms. The vati can differ in size based on the ingredients and the dose of the medicine required."
        },
        {
          title: "Kashayam - Water-based extract of medicinal herbs, often mixed with other medicines as well.",
          desc: "Kashaya or kashayam are the water soluble extracts obtained from the raw materials used by boiling them in water in a particular temperature, for a said amount of time. They are light and easy to digest."
        },
        {
          title: "Asava / Arista ",
          desc: "These formulations are a combination of churna and kashyam which are fermented over a period of time. They contain self-generated alcohol and have the longest natural shelf life. They have very quick action in the body."
        },
        {
          title: "Lehya ",
          desc: "The preparations with semisolid and paste like consistency are called lehya in general. They are heavy to digest and are very nourishing to the body. Most rasayana (rejuvenators) formulations are in the form of lehyas."
        },
        {
          title: "Taila / Gritha - Medicated oils used in the Ayurvedic system of medicine.  ",
          desc: "The traditional medicines are prepared by infusing the herbs in the base of oil (sesame or coconut or combination) and ghee, they are called taila and gritha respectively. They are administered for both internal consumption and external applications."
        },
        {
          title: "Lepa ",
          desc: "The churna preparations when used for the purpose of external applications on face and other parts of body and left for a particular duration are called lepa."
        },
      ]
    }
  };

  // 📝 EXACT WEBSITE MATCHING DATA FOR CUSTOMER REVIEWS
  const reviewsData = [
    { name: "Vino Ravichandran", title: "good product", text: "Good product 5 stars" },
    { name: "Velu", title: "Indukantham", text: "It is very useful who is..." },
    { name: "Arun Tripathi", title: "The product is good and the...", text: "The product is good and the..." },
    { name: "Mekala", title: "Good service", text: "Good" }
  ];

  useEffect(() => {
    const fetchHomeTabs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/concerns');
        if (response.ok) {
          const data = await response.json();
          setConcerns(data);
          if (data.length > 0) {
            setActiveTabId(data[0]._id);
          }
        }
      } catch (error) {
        console.error("Error fetching home profile tabs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeTabs();
  }, []);

  if (loading) {
    return <div className="text-center py-12 text-gray-400 font-medium tracking-wide">⏳ Loading Herbal Categories...</div>;
  }

  const currentTab = concerns.find(tab => tab._id === activeTabId);
  const activeTabName = currentTab ? currentTab.name.toUpperCase() : "";
  const currentTextData = tabDescriptions[activeTabName] || tabDescriptions["ASWAGANDHA"];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16 text-center font-sans bg-white select-none">
      
      {/* 🟢 TOP HEADER BLOCK */}
      <div className="mb-10 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center space-x-6 mb-4 w-full">
          <span className="hidden md:inline-block h-[2px] w-20 bg-[#133919]"></span>
          <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-wider">
            Best Selling Ayurvedic Herbal Products
          </h2>
          <span className="hidden md:inline-block h-[2px] w-20 bg-[#133919]"></span>
        </div>
        <p className="max-w-5xl mx-auto text-xs text-gray-500 leading-relaxed font-medium px-4">
          Ayurveda is a traditional Indian system of medicine. It aims to preserve health and wellness by keeping the mind, body, and spirit in balance and preventing disease rather than treating it.
        </p>
      </div>

      {/* 🎯 NAVIGATION TABS */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-14 border-b border-gray-200/60 pb-1">
        {concerns.map((tab) => {
          const isActive = activeTabId === tab._id;
          return (
            <div key={tab._id} className="relative pb-3 flex flex-col items-center">
              <button
                type="button"
                onClick={() => setActiveTabId(tab._id)}
                className={`px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-150 cursor-pointer rounded-none ${
                  isActive
                    ? 'border-2 border-[#133919] text-[#133919] bg-white font-black'
                    : 'bg-gray-100/70 text-gray-400 hover:text-gray-600 border border-transparent'
                }`}
              >
                {tab.name}
              </button>
            </div>
          );
        })}
      </div>

      {/* 📦 PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-2 bg-white mb-20">
        {currentTab && currentTab.products && currentTab.products.map((prod, index) => (
          <div 
            key={index} 
            className="group bg-white p-4 border border-gray-200 hover:border-gray-300 rounded-lg flex flex-col justify-between items-center relative text-center transition-all duration-300 shadow-sm overflow-hidden"
            style={{ boxSizing: 'border-box' }}
          >
            {/* HOVER ABSOLUTE ACTION ICONS */}
            <div className="absolute top-3 left-3 z-10 flex flex-col space-y-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button type="button" className="p-2 bg-[#134e4a] text-white rounded-md hover:bg-opacity-90 transition-all shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </button>
              <button type="button" className="p-2 bg-[#134e4a] text-white rounded-md hover:bg-opacity-90 transition-all shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.603 10.603Z" />
                </svg>
              </button>
            </div>

            {/* Product Image Area (🎯 FIXED: Link wrapped dynamically) */}
            <div className="w-full h-64 flex items-center justify-center mb-4 bg-white overflow-hidden p-2 select-none">
              <Link to={`/herbal-product/${prod._id}`} className="w-full h-full flex items-center justify-center">
                <img 
                  src={`http://localhost:5000/${prod.image}`} 
                  alt={prod.name} 
                  className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
            </div>

            {/* Product Identity Labels Structure (🎯 FIXED: Link wrapped around Title) */}
            <div className="w-full space-y-1.5 mt-auto pt-2 bg-white">
              <Link to={`/herbal-product/${prod._id}`} className="no-underline hover:no-underline block">
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 min-h-[40px] px-2 leading-snug hover:text-[#f99011] transition-colors">
                  {prod.name}
                </h3>
              </Link>
              <p className="text-xs text-gray-400 font-medium tracking-wide uppercase">
                Kottakkal Arya Vaidya Sala
              </p>
              <p className="text-base font-black text-gray-900 pt-1">
                Rs. {prod.price}.00
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 🚀 EXACT AYURKART WEB DESIGN LAYOUT INJECTED HERE */}
      {currentTextData && (
        <div className="w-full text-left bg-white pt-4 px-2 transition-all duration-300 mb-12">
          
          {/* Centered Main Title Header Block with Decorative side lines */}
          <div className="flex flex-col items-center justify-center text-center mb-6">
            <div className="flex items-center justify-center space-x-4 mb-2 w-full">
              <span className="h-[1.5px] w-12 bg-[#133919]"></span>
              <h3 className="text-md md:text-lg font-black text-black tracking-wide uppercase">
                {currentTextData.mainTitle}
              </h3>
              <span className="h-[1.5px] w-12 bg-[#133919]"></span>
            </div>
            <p className="text-[11px] text-gray-500 font-semibold tracking-wide italic">
              {currentTextData.subSubtitle}
            </p>
          </div>

          {/* Intro Description Paragraph */}
          <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-normal mb-8 text-justify">
            {currentTextData.introText}
          </p>

          {/* Conceptual Informative Headings and Paragraphs */}
          <div className="space-y-6 mb-8">
            {currentTextData.sections.map((sec, sIdx) => (
              <div key={sIdx} className="space-y-2">
                <h4 className="text-sm md:text-base font-black text-black tracking-tight">
                  {sec.heading}
                </h4>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed text-justify">
                  {sec.text}
                </p>
              </div>
            ))}
          </div>

          {/* Form / Product Types List Block with Compact Orange Title Text */}
          {currentTextData.forms && (
            <div className="space-y-6 pt-2">
              {currentTextData.forms.map((f, fIdx) => (
                <div key={fIdx} className="space-y-1.5">
                  <h5 className="text-[11px] md:text-xs font-bold flex items-center gap-2 uppercase tracking-wide" style={{ color: '#ff6c00' }}>
                    <span className="inline-block flex-shrink-0">🍂</span>
                    <span>{f.title}</span>
                  </h5>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed text-justify pl-6">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* 🛑 STATIC WEBSITE INFORMATIONAL BLOCKS (Black text section from Image 2) */}
      <div className="w-full text-left bg-white pt-8 border-t border-gray-100/70 mt-12 px-2 space-y-8">
        
        {/* Our Ayurvedic Products Heading & List */}
        <div className="space-y-3">
          <h4 className="text-sm md:text-base font-black text-black tracking-tight uppercase">
            Our Ayurvedic products and Ayurvedic Medicines
          </h4>
          <p className="text-xs md:text-sm text-gray-600 leading-relaxed text-justify">
            We assure product quality by sourcing only from nationalized and international agencies that are well recognized and GMP certified pharmacies across India.
          </p>
          
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs md:text-sm font-semibold text-[#1a5f7a]">
            {["Arya Vaidya Sala, Kottakkal", "Arya Vaidya Pharmacy (AVP), Coimbatore", "Alarsin", "AVN Arya Vaidya Nilayam", "Charak", "Dabur", "Himalaya", "Kerala Ayurveda", "Maharishi Ayurveda", "SKM Siddha and Ayurveda", "Sreedhareeyam Ayurveda", "Vaidyaratnam", "Zandu"].map((brand, idx) => (
              <span key={idx} className="flex items-center gap-2 hover:underline cursor-pointer transition-all">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Why Ayurkart Content Section */}
        <div className="space-y-3 pt-2">
          <h4 className="text-sm md:text-base font-black text-black tracking-tight uppercase">
            Why Ayurkart?
          </h4>
          <p className="text-xs md:text-sm text-gray-600 leading-relaxed text-justify">
            We cautiously procure, store and pack our products for safe delivery. We also check for expired products before shipments.
          </p>
          
          <ul className="space-y-2.5 pl-4 pt-2 text-xs md:text-sm text-gray-600 font-medium list-disc marker:text-gray-400">
            <li>The best online store for Ayurvedic medicines.</li>
            <li>All Ayurvedic Products are available under one roof. No need to visit multiple outlets in search different products.</li>
            <li>Top brands</li>
            <li>Authentic Ayurvedic medicines in one platform.</li>
            <li>Ayurvedic health products, Ayurvedic beauty products and Ayurvedic supplements.</li>
            <li>Easy and secure payments</li>
            <li>We value your privacy</li>
            <li>Effective and safe packaging to prevent damage and leak in your products.</li>
            <li>Quick delivery</li>
            <li>Shipment tracking and updates through WhatsApp and email</li>
            <li>COD and free delivery options</li>
            <li>Standardized consumer support through phone and email.</li>
          </ul>
        </div>

        {/* Contact/Query Subtle Alert Bar */}
        <div className="pt-6 border-t border-gray-100/50 text-xs text-gray-500 font-medium">
          <p>Check our blog for more information on Ayurvedic products, Ayurveda, consultation and much more.</p>
          <p className="mt-1.5">
            For any queries feel free to contact our customer support team through{' '}
            <span className="text-[#1a5f7a] font-semibold cursor-pointer">sales@ayurkart.com</span> or whatsapp{' '}
            <span className="text-[#1a5f7a] font-semibold cursor-pointer">(+91 96002 98222)</span>
          </p>
        </div>

      </div>

      {/* 🚀 🟢 CUSTOMERS REVIEWS SECTION (Moved precisely beneath the informational block) */}
      <div className="w-full text-left bg-white pt-10 border-t border-gray-100 mt-14 px-5 space-y-6">
        <div>
          <h3 className="text-md md:text-lg font-bold text-gray-900 uppercase tracking-wide">
            WHAT CUSTOMERS SAY ABOUT AYURKART
          </h3>
          <div className="flex flex-col items-start space-y-1 mt-2">
            <div className="flex items-center space-x-1 text-sm md:text-xl font-bold" style={{ color: '#f99011' }}>
              {"★★★★★".split("").map((star, sIdx) => <span key={sIdx}>{star}</span>)}
            </div>
            <span className="text-xs font-bold text-[#1a5f7a] hover:underline cursor-pointer">from 3062 reviews</span>
          </div>
        </div>

        {/* Reviews Cards Matrix Distribution */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          {reviewsData.map((rev, rIdx) => (
            <div 
              key={rIdx} 
              className="bg-white p-4 border border-gray-200/60 rounded-md shadow-sm flex flex-col justify-between items-start space-y-3 min-h-[140px]"
            >
              <div className="w-full space-y-1">
                <div className="flex items-center text-sm" style={{ color: '#f99011' }}>
                  {"★★★★★".split("").map((star, sIdx) => <span key={sIdx}>{star}</span>)}
                </div>
                <h4 className="text-xs font-extrabold text-gray-800 tracking-tight line-clamp-1">
                  {rev.title}
                </h4>
                <p className="text-[11px] text-gray-500 font-medium leading-relaxed line-clamp-3">
                  {rev.text}
                </p>
              </div>
              <span className="text-[11px] font-bold text-gray-400 tracking-wide pt-1">
                {rev.name}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default HerbalTabsSection;