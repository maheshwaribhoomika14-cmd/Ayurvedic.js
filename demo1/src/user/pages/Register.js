import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, ShieldCheck } from 'lucide-react';

const UserRegister = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Strict frontend validation passwords match check
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match! Please verify again.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long!');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Account created successfully! Redirecting to login...');
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        
        // 2 seconds ke baad automatically login page par shift kar dega
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(data.message || 'Registration failed. Try using another email!');
      }
    } catch (err) {
      console.error('Registration backend cluster crash:', err);
      setError('Server connection failed. Please check your backend network!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[85vh] flex items-center justify-center bg-gray-50/50 font-sans px-4 py-12">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-sm shadow-xl p-8 animate-slide-up-fade">
        
        {/* Headings */}
        <div className="text-center mb-8">
          <h2 style={{ color: '#004d56' }} className="text-2xl font-black tracking-tight uppercase">Create Account</h2>
          <p className="text-xs text-gray-400 font-bold tracking-wide mt-1">JOIN AYURKART HEALTH PLATFORM</p>
        </div>

        {/* Status Alerts */}
        {error && (
          <div className="mb-5 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-bold rounded-sm text-left">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-5 p-3 bg-green-50 border-l-4 border-green-500 text-green-700 text-xs font-bold rounded-sm text-left flex items-center gap-2">
            <ShieldCheck size={16} />
            <span>{success}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleRegisterSubmit} className="space-y-4 text-left">
          
          {/* Full Name Input */}
          <div>
            <label className="text-xs font-black text-gray-600 tracking-wider block mb-1.5 uppercase">Full Name</label>
            <div className="relative flex items-center border border-gray-200 focus-within:border-[#004d56] rounded-sm overflow-hidden bg-white transition-colors">
              <span className="pl-3.5 text-gray-400"><User size={16} /></span>
              <input 
                type="text" 
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="enter your full name..."
                className="w-full px-3 py-3 text-sm focus:outline-none text-gray-700 font-medium bg-transparent border-none"
              />
            </div>
          </div>

          {/* Email Address Input */}
          <div>
            <label className="text-xs font-black text-gray-600 tracking-wider block mb-1.5 uppercase">Email Address</label>
            <div className="relative flex items-center border border-gray-200 focus-within:border-[#004d56] rounded-sm overflow-hidden bg-white transition-colors">
              <span className="pl-3.5 text-gray-400"><Mail size={16} /></span>
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="enter your email..."
                className="w-full px-3 py-3 text-sm focus:outline-none text-gray-700 font-medium bg-transparent border-none"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="text-xs font-black text-gray-600 tracking-wider block mb-1.5 uppercase">Password</label>
            <div className="relative flex items-center border border-gray-200 focus-within:border-[#004d56] rounded-sm overflow-hidden bg-white transition-colors">
              <span className="pl-3.5 text-gray-400"><Lock size={16} /></span>
              <input 
                type={showPassword ? 'text' : 'password'} 
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="create password (min 6 chars)..."
                className="w-full pl-3 pr-10 py-3 text-sm focus:outline-none text-gray-700 font-medium bg-transparent border-none"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer bg-transparent border-none"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="text-xs font-black text-gray-600 tracking-wider block mb-1.5 uppercase">Confirm Password</label>
            <div className="relative flex items-center border border-gray-200 focus-within:border-[#004d56] rounded-sm overflow-hidden bg-white transition-colors">
              <span className="pl-3.5 text-gray-400"><Lock size={16} /></span>
              <input 
                type={showPassword ? 'text' : 'password'} 
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="re-enter your password..."
                className="w-full pr-10 pl-3 py-3 text-sm focus:outline-none text-gray-700 font-medium bg-transparent border-none"
              />
            </div>
          </div>

          {/* Submit Action Button */}
          <button 
            type="submit"
            disabled={loading}
            style={{ backgroundColor: '#004d56' }}
            className="w-full text-white py-3 px-4 rounded-sm font-bold text-sm tracking-wide uppercase hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50 mt-4 border-none focus:outline-none"
          >
            {loading ? 'Creating Account...' : (
              <>
                <UserPlus size={16} />
                <span>Register Now</span>
              </>
            )}
          </button>
        </form>

        {/* Existing User Redirect */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-500 font-medium">
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#f28500' }} className="font-bold hover:underline uppercase tracking-wide ml-1">
              Sign In Instead
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default UserRegister;