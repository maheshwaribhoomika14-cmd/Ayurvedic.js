import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Standard viewport reset
    window.scrollTo(0, 0);

    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    } catch (e) {
      window.scrollTo(0, 0);
    }

    // 2. HTML & Body Layer Force Reset
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }

    // 🎯 3. MASTER OVERFLOW FIX FOR BHOOMIKA
    // Yeh check karega ki agar koi inner container scroll ho raha hai, toh use bhi top par scroll kar dega
    setTimeout(() => {
      // Common scroll containers ko target karte hain
      const scrollableElements = document.querySelectorAll(
        'div, main, section, [class*="overflow-y-auto"], [class*="overflow-y-scroll"], [class*="h-screen"]'
      );
      
      scrollableElements.forEach((el) => {
        if (el.scrollTop > 0) {
          el.scrollTop = 0; // Forcefully inner scroll ko zero karega
        }
      });
    }, 50); // Thoda sa delay taaki naya page load ho jaye

  }, [pathname]);

  return null;
};

export default ScrollToTop;