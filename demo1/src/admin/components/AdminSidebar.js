import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FolderTree, Package, ShoppingCart, Users, Star, 
  FileText, Bell, Settings, 
   BarChart3, LogOut, ChevronDown, ChevronUp,
  HeartPulse // 🚀 New icon added for Health Concerns dropdown mapping
} from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState('');

  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? '' : menuName);
  };

  // 🚨 UPDATED LOGOUT HANDLER: Directs accurately to isolated admin login layout
  const handleLogout = (e) => {
    e.preventDefault();
    
    // 1. Browser storage se token aur session clear kiya
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    
    // 2. STAGE TARGET REDIRECT: Admin login card logic par hit karega direct
    navigate('/admin/login');
  };

  // Exact elements array matching the image grid row sequence
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/admin/dashboard' },
    { 
      name: 'Categories', 
      icon: <FolderTree size={18} />, 
      path: '#', 
      isDropdown: true, 
      subMenu: 'categories',
      items: [{ name: 'All Categories', path: '/admin/all-categories' }, { name: 'Add Category', path: '/admin/add-category' }]
    },
    { 
      name: 'Products', 
      icon: <Package size={18} />, 
      path: '#', 
      isDropdown: true, 
      subMenu: 'products',
      items: [{ name: 'All Products', path: '/admin/all-products' }, { name: 'Add Product', path: '/admin/add-product' }]
    },
    { 
      name: 'Ailments', 
      icon: <Package size={18} />, 
      path: '#', 
      isDropdown: true, 
      subMenu: 'ailment',
      items: [{ name: 'All Ailments ', path: '/admin/all-ailments' }, { name: 'Add ailments', path: '/admin/add-ailments' }]
    },
    // 🚀 NEW SUB-MENU SYSTEM LINKED: Shop By Concern Matrix Panel Control
    { 
      name: 'Concerns', 
      icon: <HeartPulse size={18} />, 
      path: '#', 
      isDropdown: true, 
      subMenu: 'concerns',
      items: [
        { name: 'All Concerns', path: '/admin/all-concerns' }, 
        { name: 'Add Concern', path: '/admin/add-concern' }
      ]
    },

    { 
      name: 'Classical Product', 
      icon: <HeartPulse size={18} />, 
      path: '#', 
      isDropdown: true, 
      subMenu: 'ClassicalProduct',
      // 🚀 FIXED: Paths converted to match exact lowercase pattern registered in App.js
      items: [
        { name: 'All Classical Products', path: '/admin/all-classical-products' }, 
        { name: 'Add Classical Product', path: '/admin/add-classical-product' }
      ]
    },
    { name: 'Orders', icon: <ShoppingCart size={18} />, path: '/admin/orders' },
    { name: 'Customers', icon: <Users size={18} />, path: '/admin/customers' },
    { name: 'Reviews', icon: <Star size={18} />, path: '/admin/reviews' },
    { name: 'Enquire', icon: <FileText size={18} />, path: '/admin/enquire' },
    { name: 'Notifications', icon: <Bell size={18} />, path: '/admin/notifications' },
    { name: 'Settings', icon: <Settings size={18} />, path: '/admin/settings' },
    { name: 'Reports', icon: <BarChart3 size={18} />, path: '/admin/reports' },
  ];

  return (
    <div 
      style={{ backgroundColor: '#133919' }} 
      className="w-64 text-gray-200 min-h-screen flex flex-col shadow-2xl select-none shrink-0 font-sans"
    >
      
      {/* Sidebar Branding Header Row */}
      <div style={{ borderBottom: '1px solid #1a4d22' }} className="p-6 flex items-center space-x-3">
        <div style={{ backgroundColor: '#1a4d22' }} className="p-2 rounded-xl text-green-400">
          🌱
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide leading-tight">Ayurveda</h2>
          <p className="text-[11px] text-green-300 font-medium tracking-wider uppercase opacity-80">Admin Panel</p>
        </div>
      </div>
      
      {/* Scrollable Navigation Sidebar List Container */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-100px)]">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          
          if (item.isDropdown) {
            return (
              <div key={index}>
                <button 
                  type="button"
                  onClick={() => toggleMenu(item.subMenu)} 
                  className="w-full flex items-center justify-between p-3 rounded-xl transition-colors text-sm font-medium text-gray-300 hover:bg-[#1a4d22]/40 focus:outline-none"
                >
                  <div className="flex items-center space-x-3">
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                  {openMenu === item.subMenu ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                
                {openMenu === item.subMenu && (
                  <div style={{ backgroundColor: '#0e2b13' }} className="pl-9 mt-1 space-y-1 rounded-xl p-1">
                    {item.items.map((sub, sIdx) => (
                      <Link 
                        key={sIdx} 
                        to={sub.path} 
                        style={location.pathname === sub.path ? { backgroundColor: '#1e5425', color: '#ffffff' } : {}}
                        className="block p-2 text-xs rounded-lg text-gray-400 hover:text-white transition-colors no-underline"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link 
              key={index}
              to={item.path} 
              style={isActive ? { backgroundColor: '#1e5425', color: '#ffffff' } : {}}
              className="flex items-center justify-between p-3 rounded-xl text-sm font-medium text-gray-300 hover:bg-[#1a4d22]/40 transition-all no-underline"
            >
              <div className="flex items-center space-x-3">
                {item.icon}
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span style={{ backgroundColor: '#2d6a4f' }} className="text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        {/* DYNAMIC LOGOUT COMPONENT BUTTON */}
        <button 
          onClick={handleLogout} 
          className="w-full flex items-center space-x-3 p-3 rounded-xl text-sm font-medium text-red-300 hover:bg-red-950/20 transition-colors mt-6 text-left focus:outline-none cursor-pointer border-none bg-transparent"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;