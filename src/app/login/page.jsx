'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0B1221] flex items-center justify-center p-4">
      {/* Enhanced background with subtle animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>
        <motion.div
          className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-[#07A8ED] filter blur-[80px] opacity-5"
          animate={{
            x: [0, 40, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Login Card with refined styling */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="relative z-10 w-full max-w-md bg-[#0B1221]/95 backdrop-blur-md border border-[#1E3A8A]/50 rounded-xl shadow-2xl overflow-hidden"
      >
        {/* Animated border gradient */}
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#07A8ED] via-[#3B82F6] to-[#07A8ED]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 1.2,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1]
          }}
        />

        <div className="p-8">
          {/* Header with refined typography */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-[#07A8ED] mb-2 tracking-tight">Welcome Back</h2>
            <p className="text-[#E5E7EB]/80 text-sm">Sign in to your CodeWithTonmoy account</p>
          </motion.div>

          {/* Form with enhanced input fields */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-[#E5E7EB] mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#0B1221] border border-[#1E3A8A]/50 rounded-lg text-[#E5E7EB] placeholder-[#E5E7EB]/40 focus:outline-none focus:ring-2 focus:ring-[#07A8ED]/50 focus:border-[#07A8ED]/30 transition-all"
                placeholder="Enter your email"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label htmlFor="password" className="block text-sm font-medium text-[#E5E7EB] mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#0B1221] border border-[#1E3A8A]/50 rounded-lg text-[#E5E7EB] placeholder-[#E5E7EB]/40 focus:outline-none focus:ring-2 focus:ring-[#07A8ED]/50 focus:border-[#07A8ED]/30 transition-all"
                placeholder="Enter your password"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
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
                    Signing In...
                  </>
                ) : 'Sign In'}
              </button>
            </motion.div>
          </form>

          {/* Footer Links with subtle animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 text-center text-sm text-[#E5E7EB]/80"
          >
            <p className="mb-1">
              Don't have an account?{' '}
              <a href="/register" className="text-[#07A8ED] hover:underline font-medium transition-colors">
                Register
              </a>
            </p>
            <p>
              <a href="/forgot-password" className="text-[#07A8ED] hover:underline transition-colors">
                Forgot password?
              </a>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;