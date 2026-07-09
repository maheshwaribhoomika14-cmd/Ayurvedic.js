import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';

const UserLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // Token aur user details localStorage mein save karenge
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userInfo', JSON.stringify(data.user));
        
        // 🎯 TARGET EXECUTED: Triggers native browser window pop-up alert with exact requested text & party popper emoji!
        alert("🎉 Hello Bhoomika! Welcome to your website");
        
        // Login hote hi user ko home page par redirect karenge
        navigate('/');
        window.location.reload(); 
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      console.error('Login request error:', err);
      setError('Server se connect nahi ho paa raha hai. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center bg-gray-50/50 font-sans px-4 py-12">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-sm shadow-xl p-8 animate-slide-up-fade">
        
        {/* Headings */}
        <div className="text-center mb-8">
          <h2 style={{ color: '#004d56' }} className="text-2xl font-black tracking-tight uppercase">Customer Login</h2>
          <p className="text-xs text-gray-400 font-bold tracking-wide mt-1">WELCOME BACK TO AYURKART</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-bold rounded-sm text-left">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-5">
          
          {/* Email Input */}
          <div className="text-left">
            <label className="text-xs font-black text-gray-600 tracking-wider block mb-2 uppercase">Email Address</label>
            <div className="relative flex items-center border border-gray-200 focus-within:border-[#004d56] rounded-sm overflow-hidden bg-white transition-colors">
              <span className="pl-3.5 text-gray-400"><Mail size={16} /></span>
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="enter your email..."
                className="w-full px-3 py-3 text-sm focus:outline-none text-gray-700 font-medium bg-transparent"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="text-left">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black text-gray-600 tracking-wider uppercase">Password</label>
              <Link to="/forgot-password" style={{ color: '#f28500' }} className="text-[11px] font-bold hover:underline">Forgot?</Link>
            </div>
            <div className="relative flex items-center border border-gray-200 focus-within:border-[#004d56] rounded-sm overflow-hidden bg-white transition-colors">
              <span className="pl-3.5 text-gray-400"><Lock size={16} /></span>
              <input 
                type={showPassword ? 'text' : 'password'} 
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="enter your password..."
                className="w-full pl-3 pr-10 py-3 text-sm focus:outline-none text-gray-700 font-medium bg-transparent"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={loading}
            style={{ backgroundColor: '#004d56' }}
            className="w-full text-white py-3 px-4 rounded-sm font-bold text-sm tracking-wide uppercase hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50 mt-2"
          >
            {loading ? 'Authenticating...' : (
              <>
                <LogIn size={16} />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        {/* Register Redirect Panel */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-500 font-medium">
            New Customer?{' '}
            <Link to="/register" style={{ color: '#f28500' }} className="font-bold hover:underline uppercase tracking-wide ml-1">
              Create an account
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default UserLogin;