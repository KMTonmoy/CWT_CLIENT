'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    birthDate: '',
    address: '',
    postCode: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value) => {
    setFormData(prev => ({ ...prev, phone: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate registration process
    setTimeout(() => {
      router.push('/verify-email');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">


      {/* Registration Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 10 }}
        className="relative z-10 w-full max-w-md bg-[#0B1221]/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-[#1E3A8A]/50"
      >
        <div className="p-8">
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-bold text-[#07A8ED] mb-1">Create Account</h2>
            <p className="text-[#E5E7EB]/80 text-sm">Join CodeWithTonmoy community</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label htmlFor="name" className="block text-sm font-medium text-[#E5E7EB] mb-1">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0B1221] border border-[#1E3A8A]/50 rounded-lg text-[#E5E7EB] placeholder-[#E5E7EB]/40 focus:outline-none focus:ring-2 focus:ring-[#07A8ED]/50 focus:border-[#07A8ED]/30 transition-all"
                placeholder="Your full name"
                required
              />
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-[#E5E7EB] mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0B1221] border border-[#1E3A8A]/50 rounded-lg text-[#E5E7EB] placeholder-[#E5E7EB]/40 focus:outline-none focus:ring-2 focus:ring-[#07A8ED]/50 focus:border-[#07A8ED]/30 transition-all"
                placeholder="your@email.com"
                required
              />
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <label htmlFor="password" className="block text-sm font-medium text-[#E5E7EB] mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0B1221] border border-[#1E3A8A]/50 rounded-lg text-[#E5E7EB] placeholder-[#E5E7EB]/40 focus:outline-none focus:ring-2 focus:ring-[#07A8ED]/50 focus:border-[#07A8ED]/30 transition-all pr-10"
                  placeholder="Create password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#E5E7EB]/60 hover:text-[#07A8ED] transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </motion.div>

            {/* Phone Number with react-phone-number-input */}
            <motion.div
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              <label htmlFor="phone" className="block text-sm font-medium text-[#E5E7EB] mb-1">
                Phone Number
              </label>
              <PhoneInput
                international
                defaultCountry="BD"
                value={formData.phone}
                onChange={handlePhoneChange}
                className="phone-input-custom"
                inputClassName="w-full px-4 py-3 bg-[#0B1221] border border-[#1E3A8A]/50 rounded-lg text-[#E5E7EB] placeholder-[#E5E7EB]/40 focus:outline-none focus:ring-2 focus:ring-[#07A8ED]/50 focus:border-[#07A8ED]/30 transition-all"
                countrySelectProps={{
                  className: 'text-[#E5E7EB] bg-[#0B1221] border border-[#1E3A8A]/50 rounded-lg'
                }}
              />
            </motion.div>

            {/* Date of Birth */}
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <label htmlFor="birthDate" className="block text-sm font-medium text-[#E5E7EB] mb-1">
                Date of Birth
              </label>
              <input
                id="birthDate"
                name="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0B1221] border border-[#1E3A8A]/50 rounded-lg text-[#E5E7EB] placeholder-[#E5E7EB]/40 focus:outline-none focus:ring-2 focus:ring-[#07A8ED]/50 focus:border-[#07A8ED]/30 transition-all"
                required
              />
            </motion.div>

            {/* Address */}
            <motion.div
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              <label htmlFor="address" className="block text-sm font-medium text-[#E5E7EB] mb-1">
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0B1221] border border-[#1E3A8A]/50 rounded-lg text-[#E5E7EB] placeholder-[#E5E7EB]/40 focus:outline-none focus:ring-2 focus:ring-[#07A8ED]/50 focus:border-[#07A8ED]/30 transition-all"
                placeholder="Your address"
                required
              />
            </motion.div>

            {/* Post Code */}
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <label htmlFor="postCode" className="block text-sm font-medium text-[#E5E7EB] mb-1">
                Post Code
              </label>
              <input
                id="postCode"
                name="postCode"
                type="text"
                value={formData.postCode}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0B1221] border border-[#1E3A8A]/50 rounded-lg text-[#E5E7EB] placeholder-[#E5E7EB]/40 focus:outline-none focus:ring-2 focus:ring-[#07A8ED]/50 focus:border-[#07A8ED]/30 transition-all"
                placeholder="Postal/Zip code"
                required
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="pt-2"
            >
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                  isLoading
                    ? 'bg-[#07A8ED]/70 cursor-not-allowed'
                    : 'bg-[#07A8ED] hover:bg-[#3B82F6] hover:shadow-[0_5px_20px_-5px_rgba(59,130,246,0.5)]'
                } text-[#0B1221] flex items-center justify-center shadow-[0_4px_15px_-5px_rgba(7,168,237,0.4)]`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Register Now <FiArrowRight className="ml-2" />
                  </>
                )}
              </button>
            </motion.div>
          </form>

          {/* Already have account link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 text-center text-sm text-[#E5E7EB]/80"
          >
            <p>
              Already have an account?{' '}
              <a href="/login" className="text-[#07A8ED] hover:underline font-medium">
                Sign In
              </a>
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Custom styles for phone input */}
      <style jsx global>{`
        .phone-input-custom .PhoneInputCountry {
          margin-right: 0.5rem;
        }
        .phone-input-custom .PhoneInputCountrySelect {
          background: transparent;
          color: #E5E7EB;
          border: 1px solid rgba(30, 58, 138, 0.5);
          border-radius: 0.5rem;
          padding: 0.5rem;
        }
        .phone-input-custom .PhoneInputCountryIconImg {
          object-fit: contain;
        }
        .phone-input-custom .PhoneInputInput {
          background: #0B1221;
          color: #E5E7EB;
          border: 1px solid rgba(30, 58, 138, 0.5);
          border-radius: 0.5rem;
          padding: 0.75rem;
          width: 100%;
        }
        .phone-input-custom .PhoneInputInput:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(7, 168, 237, 0.5);
          border-color: rgba(7, 168, 237, 0.3);
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;