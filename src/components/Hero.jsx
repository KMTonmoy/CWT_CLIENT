'use client'
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = "বাংলা ভাষায় ওয়েব ডেভেলপমেন্ট শিখুন";
  const courseText = "এইচটিএমএল, সিএসএস, জাভাস্ক্রিপ্ট এবং রিয়্যাক্ট শিখুন";

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden px-4 sm:px-6">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        {/* Blue gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#07A8ED10] via-[#0B1221] to-[#07A8ED10] opacity-20"></div>
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-[#07A8ED] filter blur-3xl opacity-10"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/3 w-40 h-40 rounded-full bg-[#3B82F6] filter blur-3xl opacity-10"
        animate={{
          x: [0, -40, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          {/* Left Column - Text */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6"
            >
              <span className="text-[#07A8ED]">CodeWithTonmoy</span> - {typedText}
              <span className="inline-block w-1 h-8 bg-[#07A8ED] ml-1 animate-pulse"></span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg text-[#E5E7EB] mb-6 md:mb-8 max-w-lg mx-auto lg:mx-0"
            >
              {courseText} মাত্র ৫,৫০০ টাকায়। আপনার মাতৃভাষায় প্রফেশনাল ওয়েব ডেভেলপমেন্ট শিখুন।
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <button className="bg-[#07A8ED] hover:bg-[#3B82F6] text-[#0B1221] px-5 sm:px-6 py-2 sm:py-3 rounded-lg font-bold flex items-center justify-center transition-all shadow-lg hover:shadow-[#07A8ED]/30 text-sm sm:text-base">
                কোর্সে এনরোল করুন <FiArrowRight className="ml-2" />
              </button>
              <button className="bg-transparent border-2 border-[#07A8ED] text-[#07A8ED] hover:bg-[#07A8ED]/10 px-5 sm:px-6 py-2 sm:py-3 rounded-lg font-bold transition-all text-sm sm:text-base">
                কোর্স দেখুন
              </button>
            </motion.div>
          </div>

          {/* Right Column - Code Editor Visual */}
          <div className="lg:w-1/2 mt-8 lg:mt-0 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-[#1F2937] rounded-xl overflow-hidden shadow-2xl border border-[#1E3A8A]"
            >
              {/* Editor Header */}
              <div className="bg-[#1E293B] px-4 py-3 flex items-center">
                <div className="flex space-x-2 mr-4">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#EF4444]"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#F59E0B]"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#10B981]"></div>
                </div>
                <div className="text-xs sm:text-sm text-[#E5E7EB]">app.js</div>
              </div>

              {/* Code Content */}
              <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm">
                <div className="text-[#E5E7EB] mb-3 sm:mb-4">
                  <span className="text-[#07A8ED]">import</span> React <span className="text-[#07A8ED]">from</span> <span className="text-[#F59E0B]">react</span>
                </div>
                <div className="text-[#E5E7EB] mb-3 sm:mb-4">
                  <span className="text-[#07A8ED]">import</span> {`{ CodeWithTonmoyLogo }`} <span className="text-[#07A8ED]">from</span> <span className="text-[#F59E0B]">./components</span>
                </div>
                <div className="text-[#E5E7EB] mb-3 sm:mb-4">
                  <span className="text-[#07A8ED]">const</span> <span className="text-[#F472B6]">App</span> = () <span className="text-[#07A8ED]">=</span> (
                </div>
                <div className="text-[#E5E7EB] ml-4 mb-3 sm:mb-4">
                  <span className="text-[#07A8ED]">return</span> (
                </div>
                <div className="text-[#E5E7EB] ml-8 mb-3 sm:mb-4">
                  <span className="text-[#F472B6]">&lt;div</span> <span className="text-[#07A8ED]">className</span>=<span className="text-[#F59E0B]">container</span><span className="text-[#F472B6]">&gt;</span>
                </div>
                <div className="text-[#E5E7EB] ml-12 mb-3 sm:mb-4">
                  <span className="text-[#F472B6]">&lt;CodeWithTonmoyLogo</span> <span className="text-[#F472B6]">/&gt;</span>
                </div>
                <div className="text-[#E5E7EB] ml-12 mb-3 sm:mb-4">
                  <span className="text-[#F472B6]">&lt;h1&gt;</span>
                  <span className="text-[#F59E0B]">বাংলায় কোড শিখুন</span>
                  <span className="text-[#F472B6]">&lt;/h1&gt;</span>
                </div>
                <div className="text-[#E5E7EB] ml-8 mb-3 sm:mb-4">
                  <span className="text-[#F472B6]">&lt;/div&gt;</span>
                </div>
                <div className="text-[#E5E7EB] ml-4">)</div>
                <div className="text-[#E5E7EB]">)</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
