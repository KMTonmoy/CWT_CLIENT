"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaWhatsapp,
  FaComments,
  FaHandsHelping,
  FaRocket,
  FaChartLine,
  FaLightbulb,
  FaNetworkWired,
  FaUserFriends,
  FaQuestionCircle,
  FaClock,
  FaMedal,
} from "react-icons/fa";
import { RiGroupFill } from "react-icons/ri";

const Community = () => {
  const communityFeatures = [
    {
      icon: <FaWhatsapp />,
      title: "ওয়াটসঅ্যাপ গ্রুপ",
      description: "২৪/৭ একটিভ কমিউনিটি",
      color: "bg-green-500",
      count: "৮,৫০০+ সদস্য",
    },
    {
      icon: <FaComments />,
      title: "ডেইলি ডিসকাশন",
      description: "প্রব্লেম সলভিং সেশন",
      color: "bg-blue-500",
      count: "১০০+ ডেইলি পোস্ট",
    },
    {
      icon: <FaHandsHelping />,
      title: "পিয়ার সাপোর্ট",
      description: "সিনিয়রদের গাইডেন্স",
      color: "bg-purple-500",
      count: "সিনিয়র রেসপন্ডেন্ট",
    },
    {
      icon: <FaRocket />,
      title: "জব রেফারেন্স",
      description: "ইন্টার্ন ও জব সুযোগ",
      color: "bg-pink-500",
      count: "৫০০+ প্লেসমেন্ট",
    },
  ];

  const activities = [
    "কোড রিভিউ সেশন",
    "লাইভ প্রজেক্ট ডিসকাশন",
    "ইন্টারভিউ প্রিপারেশন",
    "ফ্রিল্যান্সিং গাইডেন্স",
    "রিয়েল প্রজেক্ট সুযোগ",
    "মেন্টরশিপ প্রোগ্রাম",
  ];

  const whatsappLink =
    "https://wa.me/8801622564462?text=আমি%20CodeWithTonmoy%20এর%20ওয়াটসঅ্যাপ%20গ্রুপে%20জয়েন%20করতে%20চাই";

  return (
    <div className="relative py-12 md:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#07A8ED] to-[#3B82F6] rounded-full mb-4 md:mb-6">
            <FaUsers className="text-white text-2xl md:text-3xl" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4">
            একটিভ <span className="text-[#07A8ED]">কমিউনিটি</span> সাপোর্ট
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            ৮,৫০০+ শিক্ষার্থীর বিশাল কমিউনিটির সাথে কানেক্ট হোন
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 md:space-y-6"
          >
            {communityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="bg-gradient-to-r from-[#1A2036] to-[#0F172A] rounded-xl p-4 md:p-6 border border-[#1E3A8A]/50"
              >
                <div className="flex items-start">
                  <div
                    className={`${feature.color} w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mr-4 flex-shrink-0`}
                  >
                    <div className="text-white text-xl md:text-2xl">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg md:text-xl font-bold text-white">
                        {feature.title}
                      </h3>
                      <span className="text-sm px-2 py-1 bg-[#0B1221] text-[#07A8ED] rounded-full">
                        {feature.count}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm md:text-base">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-[#1A2036] to-[#0F172A] rounded-xl md:rounded-2xl p-6 md:p-8 border border-[#1E3A8A]/50"
          >
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 flex items-center">
              <FaNetworkWired className="text-[#07A8ED] mr-2 md:mr-3" />
              কমিউনিটি এক্টিভিটিজ
            </h3>

            <div className="grid sm:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
              {activities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center p-3 md:p-4 bg-[#0B1221] rounded-lg"
                >
                  <FaLightbulb className="text-yellow-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-200 text-sm md:text-base">
                    {activity}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="p-4 md:p-6 bg-gradient-to-r from-[#07A8ED]/10 to-[#3B82F6]/10 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <FaUserFriends className="text-[#07A8ED] mr-2" />
                    <span className="text-white font-bold">
                      রিয়েল টাইম একটিভিটি
                    </span>
                  </div>
                  <FaClock className="text-gray-400" />
                </div>
                <div className="text-gray-300 text-sm md:text-base">
                  লাইভ সেশন, গ্রুপ প্রজেক্ট, কোড রিভিউ
                </div>
              </div>

              <div className="p-4 md:p-6 bg-gradient-to-r from-green-500/10 to-emerald-600/10 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <FaQuestionCircle className="text-green-400 mr-2" />
                    <span className="text-white font-bold">প্রব্লেম সলভিং</span>
                  </div>
                  <FaChartLine className="text-gray-400" />
                </div>
                <div className="text-gray-300 text-sm md:text-base">
                  গড়ে ১৫ মিনিটের মধ্যে প্রব্লেম সলিউশন
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 md:mt-12"
        >
          <div className="bg-gradient-to-r from-[#07A8ED]/10 to-[#3B82F6]/10 rounded-xl md:rounded-2xl p-6 md:p-8 border border-[#07A8ED]/30">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">
                  কমিউনিটির <span className="text-[#07A8ED]">সাফল্য</span> গল্প
                </h3>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="text-center p-4 bg-[#0B1221] rounded-lg">
                    <div className="text-2xl md:text-3xl font-bold text-[#07A8ED]">
                      ৯৫%
                    </div>
                    <div className="text-gray-400 text-sm">
                      প্রব্লেম সলিউশন রেট
                    </div>
                  </div>
                  <div className="text-center p-4 bg-[#0B1221] rounded-lg">
                    <div className="text-2xl md:text-3xl font-bold text-[#07A8ED]">
                      ২৪/৭
                    </div>
                    <div className="text-gray-400 text-sm">একটিভ সাপোর্ট</div>
                  </div>
                  <div className="text-center p-4 bg-[#0B1221] rounded-lg">
                    <div className="text-2xl md:text-3xl font-bold text-[#07A8ED]">
                      ৫০০+
                    </div>
                    <div className="text-gray-400 text-sm">জব প্লেসমেন্ট</div>
                  </div>
                  <div className="text-center p-4 bg-[#0B1221] rounded-lg">
                    <div className="text-2xl md:text-3xl font-bold text-[#07A8ED]">
                      ১০০+
                    </div>
                    <div className="text-gray-400 text-sm">
                      ফ্রিল্যান্স প্রোজেক্ট
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4 md:mb-6">
                  <RiGroupFill className="text-white text-3xl md:text-4xl" />
                </div>
                <h4 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
                  কমিউনিটিতে যোগ দিন
                </h4>
                <motion.a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-base md:text-lg hover:shadow-xl hover:shadow-green-500/30 transition-all"
                >
                  <FaWhatsapp className="mr-2 md:mr-3" />
                  WhatsApp গ্রুপে জয়েন করুন
                </motion.a>
              </div>
            </div>

            <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-800">
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                <div className="flex items-center">
                  <FaMedal className="text-yellow-400 mr-2" />
                  <span className="text-gray-300">সেরা মেন্টর অ্যাওয়ার্ড</span>
                </div>
                <div className="flex items-center">
                  <FaChartLine className="text-green-400 mr-2" />
                  <span className="text-gray-300">৯৫% সন্তুষ্টি রেটিং</span>
                </div>
                <div className="flex items-center">
                  <FaRocket className="text-[#07A8ED] mr-2" />
                  <span className="text-gray-300">দ্রুত প্রব্লেম সলিউশন</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Community;
