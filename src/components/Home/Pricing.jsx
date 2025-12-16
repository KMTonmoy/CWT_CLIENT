"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaWhatsapp,
  FaClock,
  FaVideo,
  FaProjectDiagram,
  FaCertificate,
  FaUserGraduate,
  FaShieldAlt,
  FaUsers,
  FaStar,
  FaBolt,
  FaMoneyBillAlt,
  FaChartLine,
} from "react-icons/fa";
import { RiSecurePaymentFill, RiDiscountPercentFill } from "react-icons/ri";

const Pricing = () => {
  const features = [
    { icon: <FaVideo />, text: "৮০+ ঘন্টার ভিডিও কনটেন্ট" },
    { icon: <FaProjectDiagram />, text: "১২+ রিয়েল প্রজেক্ট" },
    { icon: <FaUserGraduate />, text: "লাইফটাইম অ্যাক্সেস" },
    { icon: <FaCertificate />, text: "সার্টিফিকেট" },
    { icon: <FaUsers />, text: "প্রাইভেট গ্রুপ" },
    { icon: <RiSecurePaymentFill />, text: "মানি ব্যাক গ্যারান্টি" },
  ];

  const paymentMethods = [
    { name: "বিকাশ", color: "bg-green-500" },
    { name: "নগদ", color: "bg-blue-500" },
    { name: "রকেট", color: "bg-purple-500" },
    { name: "ক্যাশ", color: "bg-yellow-500" },
  ];

  const whatsappLink =
    "https://wa.me/8801622564462?text=আমি%20CodeWithTonmoy%20এর%20ওয়েব%20ডেভেলপমেন্ট%20কোর্সে%20এনরোল%20করতে%20চাই";

  return (
    <div className="relative py-12 md:py-16 px-4 sm:px-6 lg:px-8   overflow-hidden">
      <div className="absolute inset-0 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4">
            <span className="text-[#07A8ED]">সম্পূর্ণ কোর্স</span> মাত্র
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-block mx-2 bg-gradient-to-r from-[#07A8ED] to-[#3B82F6] bg-clip-text text-transparent"
            >
              ৫,৫০০ টাকা
            </motion.span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            ৬ মাসের সম্পূর্ণ MERN স্ট্যাক ওয়েব ডেভেলপমেন্ট কোর্স
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-[#1A2036]/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 border border-[#1E3A8A]/50">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 flex items-center">
                <FaBolt className="text-yellow-400 mr-2 md:mr-3" />
                এই কোর্সে যা যা পাবেন
              </h3>

              <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center p-3 md:p-4 bg-[#0B1221] rounded-lg"
                  >
                    <div className="text-[#07A8ED] text-lg md:text-xl mr-3">
                      {feature.icon}
                    </div>
                    <span className="text-gray-200 text-sm md:text-base">
                      {feature.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 md:mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-3 md:p-4 bg-[#0B1221] rounded-lg"
                >
                  <div className="text-xl md:text-2xl font-bold text-[#07A8ED]">
                    ৮,৫০০+
                  </div>
                  <div className="text-gray-400 text-xs md:text-sm">
                    শিক্ষার্থী
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-3 md:p-4 bg-[#0B1221] rounded-lg"
                >
                  <div className="text-xl md:text-2xl font-bold text-[#07A8ED]">
                    ৪.৯
                  </div>
                  <div className="text-gray-400 text-xs md:text-sm">রেটিং</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-3 md:p-4 bg-[#0B1221] rounded-lg"
                >
                  <div className="text-xl md:text-2xl font-bold text-[#07A8ED]">
                    ১০০%
                  </div>
                  <div className="text-gray-400 text-xs md:text-sm">
                    প্রোজেক্ট বেসড
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-3 md:p-4 bg-[#0B1221] rounded-lg"
                >
                  <div className="text-xl md:text-2xl font-bold text-[#07A8ED]">
                    ২৪/৭
                  </div>
                  <div className="text-gray-400 text-xs md:text-sm">
                    সাপোর্ট
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-br from-[#1A2036] to-[#0F172A] rounded-xl md:rounded-2xl p-6 md:p-8 border-2 border-[#07A8ED] shadow-2xl shadow-[#07A8ED]/20 relative overflow-hidden">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-[#07A8ED]/10 to-[#3B82F6]/10 rounded-full"
              />

              <div className="text-center mb-4 md:mb-6">
                <div className="text-gray-400 mb-1 md:mb-2 text-sm md:text-base">
                  সম্পূর্ণ কোর্স ফি
                </div>
                <motion.div
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="flex items-center justify-center mb-2"
                >
                  <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
                    ৫,৫০০
                  </span>
                  <span className="text-xl md:text-2xl text-gray-300 ml-1 md:ml-2">
                    টাকা
                  </span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-center text-gray-400 text-xs md:text-sm"
                >
                  <del className="mr-2">৮,৫০০ টাকা</del>
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                    <RiDiscountPercentFill className="inline mr-1" />
                    ৩৫% ছাড়
                  </span>
                </motion.div>
              </div>

              <div className="mb-4 md:mb-6">
                <div className="text-gray-300 mb-2 md:mb-3 text-sm md:text-base">
                  পেমেন্ট মেথড
                </div>
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {paymentMethods.map((method, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -2 }}
                      className={`${method.color} text-white px-2 md:px-3 py-1 md:py-2 rounded-lg flex items-center text-xs md:text-sm`}
                    >
                      <FaMoneyBillAlt className="mr-1 md:mr-2" />
                      {method.name}
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="block w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center py-3 md:py-4 rounded-xl font-bold text-base md:text-lg mb-3 md:mb-4 hover:shadow-xl hover:shadow-green-500/30 transition-all flex items-center justify-center"
              >
                <FaWhatsapp className="mr-2 md:mr-3" size={20} />
                WhatsApp এ এনরোল করুন
              </motion.a>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-center p-2 md:p-3 bg-[#0B1221] rounded-lg"
              >
                <FaShieldAlt className="text-yellow-400 mr-2" />
             
              </motion.div>

              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-4 md:mt-6 text-center"
              >
                <div className="inline-flex items-center px-3 md:px-4 py-1 md:py-2 bg-red-500/20 border border-red-500/30 rounded-full">
                  <FaClock className="text-red-400 mr-1 md:mr-2" />
                  <span className="text-red-400 text-xs md:text-sm">
                    সীমিত সময়ের অফার
                  </span>
                </div>
              </motion.div>
            </div>

            <div className="mt-4 text-center text-gray-400 text-xs md:text-sm">
              <p>⚡ অন্যান্য ইনস্টিটিউটে ১৫,০০০-২০,০০০ টাকা</p>
              <p>✨ আমরা বাংলা ভাষায় সহজভাবে শেখাই</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 md:mt-12 bg-gradient-to-r from-[#07A8ED]/10 to-[#3B82F6]/10 rounded-xl md:rounded-2xl p-6 md:p-8 border border-[#07A8ED]/30"
        >
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            <motion.div
              whileHover={{ y: -5 }}
              className="text-center p-4 md:p-6"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#07A8ED] to-[#3B82F6] rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <FaStar className="text-white text-xl md:text-2xl" />
              </div>
              <h4 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">
                জব রেফারেন্স
              </h4>
              <p className="text-gray-300 text-sm md:text-base">
                সফল কমপ্লিশনে ইন্টার্ন সুযোগ
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="text-center p-4 md:p-6"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <FaCheckCircle className="text-white text-xl md:text-2xl" />
              </div>
              <h4 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">
                লাইভ ক্লাস
              </h4>
              <p className="text-gray-300 text-sm md:text-base">
                সাপ্তাহিক লাইভ সেশন
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="text-center p-4 md:p-6"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <FaChartLine className="text-white text-xl md:text-2xl" />
              </div>
              <h4 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">
                ক্যারিয়ার গাইডেন্স
              </h4>
              <p className="text-gray-300 text-sm md:text-base">
                রিজুমি ও ইন্টারভিউ প্রিপারেশন
              </p>
            </motion.div>
          </div>

          <div className="text-center mt-6 md:mt-8">
            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[#07A8ED] to-[#3B82F6] text-white rounded-xl font-bold text-base md:text-lg hover:shadow-xl hover:shadow-[#07A8ED]/30 transition-all"
            >
              <FaWhatsapp className="mr-2 md:mr-3" />
              এখনই ফ্রি কনসালটেশন নিন
            </motion.a>
            <p className="text-gray-400 mt-3 md:mt-4 text-sm md:text-base">
              কল করুন:{" "}
              <a
                href="tel:+8801622564462"
                className="text-[#07A8ED] hover:underline"
              >
                +৮৮০ ১৬২২৫৬৪৪৬২
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;
