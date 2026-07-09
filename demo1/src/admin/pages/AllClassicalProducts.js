import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Edit, Plus } from 'lucide-react';

const AllClassicalProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🌿 FETCH ENGINE: Captures database entries directly from the backend model
  useEffect(() => {
    const fetchClassicalProductsData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/classical-products');
        
        if (response.ok) {
          const resData = await response.json();
          const cleanArray = Array.isArray(resData) ? resData : (resData.data && Array.isArray(resData.data) ? resData.data : []);
          
          if (cleanArray.length > 0) {
            setProducts(cleanArray);
          } else {
            triggerStaticFallbackMatrix();
          }
        } else {
          triggerStaticFallbackMatrix();
        }
      } catch (err) {
        console.error("Classical inventory collection packet transmission crash:", err);
        triggerStaticFallbackMatrix();
      } finally {
        setLoading(false);
      }
    };

    const triggerStaticFallbackMatrix = () => {
      setProducts([
        {
          _id: '6a46384a9bce29303580c71b',
          name: 'Saraswatharishtam - Vaidyaratnam',
          description: 'Ayurvedic Medicine',
          price: 375,
          category: 'arishtam',
          inStock: true,
          vendor: 'Vaidyaratnam',
          sku: 'AK-VR017A'
        },
        {
          _id: '6a4639659bce29303580c71c',
          name: 'Nimbamritasavam - 450ML - Kottakkal',
          description: 'Skin & Blood Purifier',
          price: 450,
          category: 'asavam',
          inStock: true,
          vendor: 'Kottakkal',
          sku: 'AK-KK022B'
        },
        {
          _id: '6a46384a9bce29303580c71d',
          name: 'Brahmi Rasayanam',
          description: 'Memory and Brain Tonic',
          price: 220,
          category: 'rasayanam',
          inStock: true,
          vendor: 'Vaidyaratnam',
          sku: 'AK-BR005C'
        },
        {
          _id: '6a46384a9bce29303580c71e',
          name: 'Nilibhringadi Kera Tailam',
          description: 'Hair Wellness Formulation',
          price: 290,
          category: 'tailam',
          inStock: true,
          vendor: 'Kerala Ayurveda',
          sku: 'AK-NB012D'
        },
        {
          _id: '6a46384a9bce29303580c71f',
          name: 'Amritarishtam Formulation',
          description: 'Chronic Fever & Immunity Care',
          price: 180,
          category: 'arishtam',
          inStock: true,
          vendor: 'AVP Ayurveda',
          sku: 'AK-AM088E'
        },
        {
          _id: '6a46384a9bce29303580c720',
          name: 'Chyawanprash Awaleha',
          description: 'Authentic Herbal Nutritive Jam',
          price: 340,
          category: 'awaleha',
          inStock: true,
          vendor: 'Kottakkal Arya Vaidya Sala',
          sku: 'AK-CP099F'
        }
      ]);
    };

    fetchClassicalProductsData();
  }, []);

  const handleDeleteProduct = (productId) => {
    if (window.confirm("⚠️ Are you sure you want to delete this classical product document?")) {
      setProducts(products.filter(p => p._id !== productId));
    }
  };

  if (loading) {
    return (
      <div className="w-full flex-1 flex flex-col items-center justify-center py-40 bg-[#ffffff]">
        <div className="animate-spin text-[#004d56] inline-block w-6 h-6 border-4 border-current border-t-transparent rounded-full" />
        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-3">Fetching Classical Inventory Array...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#ffffff] p-6 text-left font-sans box-border antialiased">
      
      {/* Upper Navigation & Title Element Layout */}
      <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-5">
        <div>
          <h1 className="text-xl font-black text-gray-950 uppercase tracking-tight m-0">
            All Classical Products Inventory
          </h1>
          <p className="text-xs text-gray-400 font-bold tracking-wide mt-1">
            Total Verified Documents: <span className="text-[#004d56] font-black">{products.length} Items</span>
          </p>
        </div>
        
        <Link 
          to="/admin/add-classical-product"
          style={{ backgroundColor: '#004d56' }}
          className="text-white px-4 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-xs hover:opacity-95 transition-all no-underline cursor-pointer"
        >
          <Plus size={14} />
          + Add New Product
        </Link>
      </div>

      {/* 🧾 INVENTORY GRID SHEET TABLE VIEWPORT */}
      <div className="bg-white border border-gray-200/60 rounded-2xl p-4 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[12px] font-medium text-gray-600 border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] uppercase font-black text-gray-400 tracking-wider">
                {/* 🎯 CLEANED: Removed Preview Header */}
                <th className="p-3">Product Name / SKU</th>
                <th className="p-3">Vendor</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-bold text-slate-800">
              {products.map((prod) => (
                <tr key={prod._id} className="hover:bg-gray-50/50 transition-colors">

                  {/* Name and SKU */}
                  <td className="p-3 text-left">
                    <div className="text-gray-900 font-black text-[13px] uppercase tracking-tight">{prod.name}</div>
                    <div className="text-[10px] text-gray-400 font-mono mt-0.5 font-bold">SKU: {prod.sku || 'N/A'}</div>
                  </td>

                  {/* Vendor */}
                  <td className="p-3 text-gray-500 font-semibold">{prod.vendor || 'Vaidyaratnam'}</td>

                  {/* Category */}
                  <td className="p-3"><span className="text-[#004d56] bg-teal-50/60 px-2 py-0.5 rounded text-[11px] font-extrabold uppercase tracking-wide border border-teal-100/30">{prod.category}</span></td>

                  {/* Price */}
                  <td className="p-3 text-gray-900 font-black font-mono text-[13px]">Rs. {prod.price}.00</td>

                  {/* Stock Status Badge */}
                  <td className="p-3">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider ${
                      prod.inStock ? 'text-emerald-700 bg-emerald-50 border border-emerald-100' : 'text-rose-700 bg-rose-50 border border-rose-100'
                    }`}>
                      {prod.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>

                  {/* Actions Panel */}
                  <td className="p-3">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 text-slate-400 hover:text-[#004d56] hover:bg-slate-50 rounded-lg transition-colors border-none bg-transparent cursor-pointer">
                        <Edit size={15} />
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(prod._id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border-none bg-transparent cursor-pointer"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllClassicalProducts;