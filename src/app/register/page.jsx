'use client'
import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { FiEye, FiEyeOff, FiArrowRight, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
 import Link from 'next/link';
import { AuthContext } from '@/AuthProvider/AuthProvider';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    birthDate: '',
    address: '',
    postCode: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { registerUser } = useContext(AuthContext);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
    
    setError('');
    setSuccess('');
  };

  const handlePhoneChange = (value) => {
    setFormData(prev => ({ ...prev, phone: value }));
    setError('');
    setSuccess('');
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Please enter your full name');
      return false;
    }
    
    if (!formData.email.trim()) {
      setError('Please enter your email address');
      return false;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (!formData.password) {
      setError('Please enter a password');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    if (!formData.phone) {
      setError('Please enter your phone number');
      return false;
    }
    
    if (!formData.birthDate) {
      setError('Please select your date of birth');
      return false;
    }
    
    // Validate age (must be at least 13 years old)
    const birthDate = new Date(formData.birthDate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    if (age < 13) {
      setError('You must be at least 13 years old to register');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Prepare user data
      const userData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        phone: formData.phone,
        birthDate: formData.birthDate,
        address: formData.address.trim(),
        postCode: formData.postCode.trim(),
      };
      
      // Register user using AuthProvider
      const result = await registerUser(userData);
      
      if (result.success) {
        setSuccess('Registration successful! Redirecting to dashboard...');
        
        // Redirect after successful registration
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      }
    } catch (error) {
      console.error('Registration error:', error);
      
      // Handle specific errors
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please use a different email or login.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (error.code === 'auth/weak-password') {
        setError('Password is too weak. Please choose a stronger password.');
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.message.includes('Network')) {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1221] to-[#1E293B] flex items-center justify-center p-4">
      {/* Registration Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 10 }}
        className="relative z-10 w-full max-w-lg bg-[#0B1221]/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-[#1E3A8A]/50"
      >
        <div className="p-6 md:p-8">
          {/* Header */}
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#07A8ED] to-[#3B82F6] rounded-full mb-4">
              <FiCheck className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Join <span className="text-[#07A8ED]">CodeWithTonmoy</span>
            </h1>
            <p className="text-gray-400">Start your web development journey today</p>
          </motion.div>

          {/* Error and Success Messages */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start"
            >
              <FiAlertCircle className="text-red-400 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-start"
            >
              <FiCheck className="text-green-400 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-green-400 text-sm">{success}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Full Name *
                </label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0B1221] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#07A8ED] transition-colors"
                  placeholder="John Doe"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address *
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0B1221] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#07A8ED] transition-colors"
                  placeholder="john@example.com"
                  required
                />
              </motion.div>
            </div>

            {/* Password Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Password *
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0B1221] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#07A8ED] transition-colors pr-10"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#07A8ED] transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-400">Password strength:</span>
                      <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${
                            passwordStrength <= 2 ? 'bg-red-500' : 
                            passwordStrength <= 3 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      {passwordStrength <= 2 ? 'Weak' : passwordStrength <= 3 ? 'Medium' : 'Strong'}
                    </p>
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.45 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0B1221] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#07A8ED] transition-colors pr-10"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#07A8ED] transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
                {formData.password && formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <p className="text-xs text-green-400 mt-1 flex items-center">
                    <FiCheck className="mr-1" /> Passwords match
                  </p>
                )}
              </motion.div>
            </div>

            {/* Phone and Birth Date Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Phone Number *
                </label>
                <PhoneInput
                  international
                  defaultCountry="BD"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className="w-full"
                  inputClassName="w-full px-4 py-3 bg-[#0B1221] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#07A8ED] transition-colors"
                  countrySelectProps={{
                    className: 'bg-[#0B1221] text-white border border-gray-800 rounded-l-lg'
                  }}
                  required
                />
              </motion.div>

              <motion.div
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.55 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Date of Birth *
                </label>
                <input
                  name="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0B1221] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#07A8ED] transition-colors"
                  required
                  max={new Date(new Date().setFullYear(new Date().getFullYear() - 13)).toISOString().split('T')[0]}
                />
                <p className="text-xs text-gray-500 mt-1">Must be at least 13 years old</p>
              </motion.div>
            </div>

            {/* Address and Post Code Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Address
                </label>
                <input
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0B1221] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#07A8ED] transition-colors"
                  placeholder="Your address"
                />
              </motion.div>

              <motion.div
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.65 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Postal Code
                </label>
                <input
                  name="postCode"
                  type="text"
                  value={formData.postCode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0B1221] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#07A8ED] transition-colors"
                  placeholder="12345"
                />
              </motion.div>
            </div>

            {/* Terms and Conditions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-start pt-2"
            >
              <input
                type="checkbox"
                id="terms"
                className="mt-1 mr-2"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-400">
                I agree to the{' '}
                <Link href="/terms" className="text-[#07A8ED] hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-[#07A8ED] hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="pt-4"
            >
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                  loading
                    ? 'bg-[#07A8ED]/70 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#07A8ED] to-[#3B82F6] hover:shadow-xl hover:shadow-[#07A8ED]/30'
                } text-white flex items-center justify-center`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account <FiArrowRight className="ml-2" />
                  </>
                )}
              </button>
            </motion.div>
          </form>

          {/* Login Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-center"
          >
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link href="/login" className="text-[#07A8ED] hover:underline font-medium">
                Sign In
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#07A8ED]/5 via-transparent to-[#3B82F6]/5" />
      
      {/* Custom styles for phone input */}
      <style jsx global>{`
        .PhoneInput {
          display: flex;
          align-items: center;
        }
        
        .PhoneInputCountry {
          margin-right: 8px;
          padding: 8px;
          background: #0B1221;
          border: 1px solid #374151;
          border-radius: 8px 0 0 8px;
        }
        
        .PhoneInputCountrySelect {
          background: transparent;
          color: white;
          border: none;
          outline: none;
        }
        
        .PhoneInputCountryIcon {
          width: 24px;
          height: 16px;
        }
        
        .PhoneInputInput {
          flex: 1;
          padding: 12px;
          background: #0B1221;
          color: white;
          border: 1px solid #374151;
          border-left: none;
          border-radius: 0 8px 8px 0;
          outline: none;
        }
        
        .PhoneInputInput:focus {
          border-color: #07A8ED;
        }
        
        .PhoneInputInput::placeholder {
          color: #6B7280;
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;