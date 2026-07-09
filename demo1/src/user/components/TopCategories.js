import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TopCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/categories');
        if (response.ok) {
          let data = await response.json();
          if (data && !Array.isArray(data) && Array.isArray(data.data)) {
            data = data.data;
          }

          if (Array.isArray(data) && data.length > 0) {
            const activeCategories = data.filter(cat => 
              cat.status === 'Active' || 
              cat.status === true || 
              cat.status?.toString().toLowerCase() === 'active'
            );
            setCategories(activeCategories.length > 0 ? activeCategories : data);
          } else {
            loadBackupData();
          }
        } else {
          loadBackupData();
        }
      } catch (error) {
        console.error("Database connection issue. Loading backup array.", error);
        loadBackupData();
      } finally {
        setLoading(false);
      }
    };

    const loadBackupData = () => {
      const backupArray = [
        { _id: '6a229e7c4db65d7639633204', name: 'Swasamrutham Cough Syrup - Vaidyaratnam', isLocal: true },
        { _id: '6a2296dc4db65d7639633203', name: 'ABANA TABLET 60N-HIMALAYA', isLocal: true },
        { _id: '6a1808aa6a00288ac4a7d490', name: 'Swarnabhasmam capsule', isLocal: true },
        { _id: '6a1804cd986dde03873a52ff', name: 'Dehaposhana Yamakam', isLocal: true },
        { _id: '6a18029d986dde03873a52fc', name: 'Brahma Rasayanam', isLocal: true }
      ];
      setCategories(backupArray);
    };

    fetchCategories();
  }, []);

  const formatImageUrl = (imgSrc) => {
    if (!imgSrc) return 'https://via.placeholder.com/150';
    if (imgSrc.startsWith('data:') || imgSrc.startsWith('http')) return imgSrc;
    return `http://localhost:5000/${imgSrc.replace(/^\/+/, '')}`;
  };

  if (loading) return <div className="text-center py-16 text-gray-500 font-semibold bg-[#fbfaf7] min-h-[300px] flex items-center justify-center">Loading Categories...</div>;
  if (categories.length === 0) return null;

  return (
    <div className="w-full bg-[#fbfaf7] py-16 px-4 md:px-16">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12 relative flex flex-col items-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 uppercase font-sans">
            Top Categories
          </h2>
          <p className="text-sm md:text-base text-gray-500 font-medium tracking-wide mt-2">
            Explore our best rated Online Ayurvedic Medicines
          </p>
          <div className="h-[3px] w-16 bg-[#005f60] mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-center items-stretch">
          {categories.map((category, index) => {
            let finalImgUrl = 'https://via.placeholder.com/150';
            let rawImageSrc = (category.images && category.images.length > 0) ? category.images[0] : category.image;

            if (rawImageSrc) {
              finalImgUrl = formatImageUrl(rawImageSrc);
            }

            return (
              <div 
                key={category._id || index} 
                // 🚨 FIXED ROUTE POINTER: '/product' ke bajay ab exact '/category' URL par bhejega
                onClick={() => {
                  const targetId = category._id || '6a2296dc4db65d7639633203';
                  navigate(`/category/${targetId}`);
                }}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-white shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center overflow-hidden border-2 border-slate-100 group-hover:border-[#005f60] p-4">
                  <img 
                    src={finalImgUrl} 
                    alt={category.name} 
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                  />
                </div>
                <span className="mt-4 text-sm md:text-base font-bold text-slate-700 group-hover:text-[#005f60] transition-colors duration-200 line-clamp-2 max-w-[150px]">
                  {category.name}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default TopCategories;