import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('maheshwaribhoomika14@gmail.com');
  const [password, setPassword] = useState('142003');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
      
      if (res.data) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userInfo', JSON.stringify(res.data));
        setLoading(false);
        alert("🎉 Welcome back, Admin Bhoomika! Accessing your dashboard...");
        navigate('/admin/dashboard');
      }
    } catch (err) {
      alert(err.response?.data?.message || "Invalid Email or Password!");
      setLoading(false);
    }
  };

  return (
    /* 🚨 FIXED: Inline styles ke sath constraints laga diye hain taaki horizontal space 100% boundary mein rahe */
    <div 
      style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}
      className="min-h-screen bg-[#f4f6f4] flex items-center justify-center p-4 font-sans"
    >
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
        
        {/* Header Branding */}
        <div className="text-center mb-6">
          <span className="text-3xl block mb-1">🌱</span>
          <h2 className="text-2xl font-bold text-emerald-900">Ayurveda Admin</h2>
          <p className="text-xs text-gray-400 mt-1">Enter credentials to access dashboard</p>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:border-emerald-700 text-gray-700 bg-gray-50"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:border-emerald-700 text-gray-700 bg-gray-50"
              required
            />
          </div>

          {/* Solid Green Action Button Panel */}
          <div className="pt-4">
            <button 
              type="submit" 
              disabled={loading}
              style={{ backgroundColor: '#133919', color: '#ffffff', display: 'block', width: '100%' }}
              className="font-bold py-3.5 rounded-xl shadow-md text-center text-sm transition-all hover:opacity-90 active:scale-[0.99] cursor-pointer"
            >
              {loading ? '🔄 Accessing Dashboard...' : 'Sign In to Dashboard'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Login;