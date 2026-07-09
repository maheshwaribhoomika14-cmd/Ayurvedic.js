import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import AdminSidebar from './admin/components/AdminSidebar';
import AdminDashboard from './admin/pages/AdminDashboard';
import AllCategories from './admin/pages/AllCategories'; 
import AddCategory from './admin/pages/AddCategory';
import AllProducts from './admin/pages/AllProducts';
import AddProduct from './admin/pages/AddProduct';
import Orders from './admin/pages/Orders';
import Customers from './admin/pages/Customers';
import Reviews from './admin/pages/Reviews';
import Enquire from './admin/pages/Enquire';
import Notifications from './admin/pages/Notifications';
import Settings from './admin/pages/Settings';
import AdminUsers from './admin/pages/AdminUsers';
import Reports from './admin/pages/Reports';
import Login from './admin/pages/Login'; 
import EditConcern from './admin/pages/EditConcern';
import EditClassicalProduct from './admin/pages/EditClassicalProduct';
import Profile from './user/components/Profile'; 

// 🚀 CONCERNS MATRIX IMPORTS
import AddConcern from './admin/pages/AddConcern'; 
import AllConcern from './admin/pages/AllConcern'; 

// 🚀 FIXED PATHS: Ailments pages
import AddAilments from './admin/pages/AddAilments';
import AllAilments from './admin/pages/AllAilments';

// 🚀 FIXED IMPORTS FOR CLASSICAL PRODUCTS BASED ON image_6d3f85.png
import AddClassicalProducts from './admin/pages/AddClassicalProducts';
import AllClassicalProducts from './admin/pages/AllClassicalProducts';

// 🚨 ADVANCED ADMIN FORM IMPORTS
import AddProductMulti from './admin/pages/AddProductMulti';

// 🚨 USER SIDE MAIN PAGES & WRAPPER IMPORTS
import Home from './user/pages/Home'; 
import CategoryDetails from './user/components/Categorydetails';
import ReviewsPage from './user/pages/ReviewsPage';
import Ayurveda from './user/pages/Ayurveda';
import ClassicalCategoryProducts from './user/pages/ClassicalCategoryProducts';
import EConsultation from './user/pages/EConsultation';
import UserLogin from './user/pages/Login';
import UserRegister from './user/pages/Register';
import Cart from './user/pages/Cart';
import Checkout from './user/pages/Checkout';
import MyOrders from './user/pages/MyOrders';

// 🚀 DYNAMIC PRODUCT DETAILS INTERFACE IMPORT POINTER
import ProductDetails from './user/pages/ProductDetails'; 

// 🚀 NEW ALIGNMENT PRODUCTS PAGE IMPORT INJECTED HERE
import AligmentProducts from './user/pages/AligmentProducts'; 

// 🚀 FIXED PATH PATH FOR HERBALTABS
import HerbalTabsSection from './user/components/HerbalTabs';
import Footer from './user/components/Footer';
import ScrollToTop from './user/components/ScrollToTop';

// ROUTE GUARD: Secure admin panels
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

// ADMIN LAYOUT WRAPPER
const AdminLayout = ({ children }) => {
  return (
    <div className="flex bg-[#f4f7f6] min-h-screen w-full overflow-x-hidden">
      <AdminSidebar />
      <div className="flex-1 min-w-0">
        {children}
      </div>
    </div>
  );
};

// 🚀 AUTOMATIC FOOTER & REVIEWS LAYOUT WRAPPER FOR USER SIDE
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate(); 

  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div className="w-full min-h-screen flex flex-col justify-between relative">
      <div className="flex-grow">
        {children}
      </div>

      {/* 🎯 GLOBAL REVIEWS TAB (This is the single master button) */}
      {!isAdminPath && (
        <div 
          onClick={() => navigate('/reviews')}
          style={{ 
            position: 'fixed', 
            right: '0px', 
            top: '50%', 
            transform: 'translateY(-50%) rotate(-90deg)', 
            transformOrigin: 'right bottom',
            zIndex: 999999, 
            backgroundColor: '#f28500', 
            color: '#ffffff', 
            padding: '10px 20px', 
            fontSize: '12px', 
            fontWeight: '900', 
            letterSpacing: '2px', 
            textTransform: 'uppercase', 
            cursor: 'pointer', 
            borderTopLeftRadius: '4px', 
            borderTopRightRadius: '4px', 
            boxShadow: '0px -3px 10px rgba(0,0,0,0.2)',
            whiteSpace: 'nowrap',
            userSelect: 'none',
            display: 'block'
          }}
        >
          <span style={{ marginRight: '6px', fontSize: '14px', display: 'inline-block' }}>★</span>REVIEWS
        </div>
      )}

      {!isAdminPath && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          {/* 🔐 ADMIN AUTH */}
          <Route path="/admin/login" element = {
            <div className="w-screen min-h-screen bg-[#f4f6f4] flex items-center justify-center p-4">
              <Login />
            </div>
          } />
          
          {/* 🛡️ SECURE ADMIN ROUTES */}
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/all-categories" element={<ProtectedRoute><AdminLayout><AllCategories /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/add-category" element={<ProtectedRoute><AdminLayout><AddCategory /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/all-products" element={<ProtectedRoute><AdminLayout><AllProducts /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/add-product" element={<ProtectedRoute><AdminLayout><AddProduct /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/add-product-multi" element={<ProtectedRoute><AdminLayout><AddProductMulti /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute><AdminLayout><Orders /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/customers" element={<ProtectedRoute><AdminLayout><Customers /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/reviews" element={<ProtectedRoute><AdminLayout><Reviews /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/enquire" element={<ProtectedRoute><AdminLayout><Enquire /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/notifications" element={<ProtectedRoute><AdminLayout><Notifications /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute><AdminLayout><Settings /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute><AdminLayout><AdminUsers /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/reports" element={<ProtectedRoute><AdminLayout><Reports /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/edit-concern/:id" element={<EditConcern />} />
          <Route path="/admin/edit-classical-product/:id" element={<EditClassicalProduct />} />

          {/* 🛡️ SECURE AILMENTS ROUTES */}
          <Route path="/admin/add-ailments" element={<ProtectedRoute><AdminLayout><AddAilments /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/all-ailments" element={<ProtectedRoute><AdminLayout><AllAilments /></AdminLayout></ProtectedRoute>} />

          {/* 🛡️ SECURE SHOP BY CONCERN SYSTEM ROUTES */}
          <Route path="/admin/add-concern" element={<ProtectedRoute><AdminLayout><AddConcern /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/all-concerns" element={<ProtectedRoute><AdminLayout><AllConcern /></AdminLayout></ProtectedRoute>} />

          {/* 🛡️ SECURE CLASSICAL PRODUCTS MANAGEMENT ROUTES */}
          <Route path="/admin/all-classical-products" element={<ProtectedRoute><AdminLayout><AllClassicalProducts /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/add-classical-product" element={<ProtectedRoute><AdminLayout><AddClassicalProducts /></AdminLayout></ProtectedRoute>} />

          {/* 🚨 USER SIDE DYNAMIC LINKS */}
          <Route path="/category/:id" element={<CategoryDetails />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          
          {/* 🚀 MASTER ROUTE: Yeh akela route hi baki sabhi collections ko handle karega aur blinking rok dega */}
          <Route path="/collections/:alignmentName" element={<AligmentProducts />} />
          
          <Route path="/herbal-product/:id" element={<ProductDetails />} />

          {/* 🟢 USER DYNAMIC PROFILE DASHBOARD ROUTE */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/scrolltotop" element={<ScrollToTop />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/ayurveda" element={<Ayurveda />} />
          <Route path="/collections/classical/:categoryName" element={<ClassicalCategoryProducts />} />
          <Route path="/e-consultation" element={<EConsultation />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/footer" element={<Footer />} />

          {/* 🟢 USER LANDING */}
          <Route path="/" element={
            <>
              <Home />
              <HerbalTabsSection />
            </>
          } />
          
          {/* Fallback Catch-All */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;