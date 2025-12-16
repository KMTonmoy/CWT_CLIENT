"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaCertificate,
  FaAward,
  FaCheckCircle,
  FaGraduationCap,
  FaShieldAlt,
  FaGlobe,
  FaSignature,
  FaQrcode,
  FaDownload,
  FaShareAlt,
} from "react-icons/fa";

const Certificate = () => {
  const certificateFeatures = [
    {
      icon: <FaAward />,
      title: "ইন্ডাস্ট্রি রিকগনাইজড",
      description: "সফটওয়্যার কোম্পানিগুলো কর্তৃক স্বীকৃত",
    },
    {
      icon: <FaGlobe />,
      title: "আন্তর্জাতিক মান",
      description: "গ্লোবাল স্ট্যান্ডার্ড অনুসরণ",
    },
    {
      icon: <FaShieldAlt />,
      title: "ভেরিফাইড",
      description: "অনলাইনে ভেরিফিকেশন সুবিধা",
    },
    {
      icon: <FaQrcode />,
      title: "QR কোড",
      description: "অনলাইনে ভেরিফাই করতে QR কোড",
    },
  ];

  const benefits = [
    "জব ইন্টারভিউতে প্রাধান্য",
    "ফ্রিল্যান্সিং প্রোজেক্ট পেতে সাহায্য",
    "প্রফাইল স্ট্রং করতে সহায়ক",
    "ক্লায়েন্টদের আস্থা বৃদ্ধি করে",
  ];

  return (
    <div className="relative py-12 md:py-16 px-4 sm:px-6 lg:px-8  overflow-hidden">
      <div className="absolute inset-0 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#07A8ED] to-[#3B82F6] rounded-full mb-4 md:mb-6">
            <FaCertificate className="text-white text-2xl md:text-3xl" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4">
            <span className="text-[#07A8ED]">কোর্স কমপ্লিশন</span> সার্টিফিকেট
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            কোর্স সফলভাবে সম্পন্ন করলে পাবেন আন্তর্জাতিক মানের স্বীকৃতিপত্র
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="bg-gradient-to-br from-[#1A2036] to-[#0F172A] rounded-xl md:rounded-2xl p-6 md:p-8 border border-[#1E3A8A]/50">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 flex items-center">
                <FaGraduationCap className="text-[#07A8ED] mr-2 md:mr-3" />
                সার্টিফিকেটের বৈশিষ্ট্য
              </h3>

              <div className="grid sm:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                {certificateFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start p-3 md:p-4 bg-[#0B1221] rounded-lg"
                  >
                    <div className="text-[#07A8ED] text-lg md:text-xl mr-3 mt-1">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm md:text-base mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-gray-400 text-xs md:text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mb-6 md:mb-8">
                <h4 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">
                  <FaCheckCircle className="inline text-green-400 mr-2" />
                  সার্টিফিকেট পাওয়ার সুবিধা
                </h4>
                <div className="space-y-2 md:space-y-3">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                      className="flex items-center"
                    >
                      <div className="w-2 h-2 bg-[#07A8ED] rounded-full mr-3"></div>
                      <span className="text-gray-300 text-sm md:text-base">
                        {benefit}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 md:gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 min-w-[140px] bg-gradient-to-r from-[#07A8ED] to-[#3B82F6] text-white py-2 md:py-3 rounded-lg font-bold flex items-center justify-center"
                >
                  <FaDownload className="mr-2" />
                  স্যাম্পল দেখুন
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 min-w-[140px] bg-[#0B1221] border border-[#07A8ED] text-[#07A8ED] py-2 md:py-3 rounded-lg font-bold flex items-center justify-center"
                >
                  <FaShareAlt className="mr-2" />
                  শেয়ার করুন
                </motion.button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="bg-gradient-to-br from-[#0B1221] to-[#1A2036] rounded-xl md:rounded-2xl p-6 md:p-8 border-2 border-[#07A8ED] shadow-2xl shadow-[#07A8ED]/20"
              >
                <div className="absolute top-4 right-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                    <FaQrcode className="text-white text-lg md:text-xl" />
                  </div>
                </div>

                <div className="text-center mb-6 md:mb-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#07A8ED] to-[#3B82F6] rounded-full mb-4">
                    <FaCertificate className="text-white text-xl md:text-2xl" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    সার্টিফিকেট অফ কমপ্লিশন
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base">
                    CodeWithTonmoy এ প্রদত্ত
                  </p>
                </div>

                <div className="space-y-4 md:space-y-6">
                  <div>
                    <div className="text-gray-400 text-sm mb-1">
                      প্রদান করা হয়
                    </div>
                    <div className="text-white font-bold text-lg md:text-xl">
                      তন্ময় আহমেদ
                    </div>
                    <div className="text-gray-300 text-sm">
                      প্রতিষ্ঠাতা, CodeWithTonmoy
                    </div>
                  </div>

                  <div>
                    <div className="text-gray-400 text-sm mb-1">
                      কোর্সের নাম
                    </div>
                    <div className="text-white font-bold text-base md:text-lg">
                      কমপ্লিট ওয়েব ডেভেলপমেন্ট (MERN Stack)
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <div className="text-gray-400 text-sm mb-1">
                        সনদ নম্বর
                      </div>
                      <div className="text-white font-bold">CWT-#2024</div>
                    </div>
                  </div>

                  <div className="pt-4 md:pt-6 border-t border-gray-800">
                    <div className="flex items-center">
                      <FaSignature className="text-[#07A8ED] mr-2" />
                      <div>
                        <div className="text-gray-400 text-sm">
                          ডিজিটাল স্বাক্ষর
                        </div>
                        <div className="text-white font-bold text-sm md:text-base">
                          Verified & Authentic
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -left-4 w-8 h-8 md:w-12 md:h-12 border-2 border-[#07A8ED] rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-4 -right-4 w-8 h-8 md:w-12 md:h-12 border-2 border-[#3B82F6] rounded-full"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 md:mt-12 bg-gradient-to-r from-[#07A8ED]/10 to-[#3B82F6]/10 rounded-xl md:rounded-2xl p-6 md:p-8 border border-[#07A8ED]/30"
        >
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
              কিভাবে সার্টিফিকেট পাবেন?
            </h3>
            <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 md:p-6"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#0B1221] rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 text-2xl md:text-3xl text-[#07A8ED] font-bold">
                  ১
                </div>
                <h4 className="font-bold text-white mb-2">কোর্স কমপ্লিট</h4>
                <p className="text-gray-300 text-sm md:text-base">
                  সব মডিউল ও প্রজেক্ট সম্পন্ন করুন
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 md:p-6"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#0B1221] rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 text-2xl md:text-3xl text-[#07A8ED] font-bold">
                  ২
                </div>
                <h4 className="font-bold text-white mb-2">ফাইনাল প্রজেক্ট</h4>
                <p className="text-gray-300 text-sm md:text-base">
                  ফাইনাল প্রজেক্ট সাবমিট করুন
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 md:p-6"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#0B1221] rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 text-2xl md:text-3xl text-[#07A8ED] font-bold">
                  ৩
                </div>
                <h4 className="font-bold text-white mb-2">সার্টিফিকেট পান</h4>
                <p className="text-gray-300 text-sm md:text-base">
                  ডিজিটাল ও প্রিন্টেড ভার্সন পান
                </p>
              </motion.div>
            </div>

            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center mt-6 md:mt-8 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-base md:text-lg hover:shadow-xl hover:shadow-green-500/30 transition-all"
            >
              <FaCheckCircle className="mr-2 md:mr-3" />
              এখনই কোর্সে এনরোল করুন
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Certificate;
