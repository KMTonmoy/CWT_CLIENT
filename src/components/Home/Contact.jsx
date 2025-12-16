"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaPaperPlane,
  FaUser,
  FaComments,
  FaCheckCircle,
  FaMobileAlt,
  FaHeadset,
} from "react-icons/fa";
import { RiMessage2Fill } from "react-icons/ri";

const Contact = () => {
  const threeContainer = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const contactMethods = [
    {
      icon: <FaWhatsapp />,
      title: "WhatsApp",
      info: "২৪/৭ একটিভ",
      value: "+৮৮০ ১৬২২৫৬৪৪৬২",
      link: "https://wa.me/8801622564462",
      color: "bg-green-500",
      buttonText: "মেসেজ দিন",
    },
    {
      icon: <FaPhoneAlt />,
      title: "কল করুন",
      info: "সকাল ৯টা - রাত ১০টা",
      value: "+৮৮০ ১৬২২৫৬৪৪৬২",
      link: "tel:+8801622564462",
      color: "bg-blue-500",
      buttonText: "কল করুন",
    },
    {
      icon: <FaEnvelope />,
      title: "ইমেইল",
      info: "২৪ ঘন্টার মধ্যে রিপ্লাই",
      value: "codewithtonmoy@gmail.com",
      link: "mailto:codewithtonmoy@gmail.com",
      color: "bg-red-500",
      buttonText: "ইমেইল করুন",
    },
  ];

  const faqItems = [
    {
      question: "কোর্স সম্পর্কে বিস্তারিত জানতে চাই?",
      answer: "WhatsApp এ মেসেজ দিন, বিস্তারিত সব তথ্য পাঠিয়ে দিবো।",
    },
    {
      question: "ক্লাস শিডিউল কেমন?",
      answer: "সাপ্তাহিক লাইভ ক্লাস + লাইফটাইম ভিডিও অ্যাক্সেস।",
    },
    {
      question: "পেমেন্ট মেথড কী কী?",
      answer: "বিকাশ, নগদ, রকেট, ক্যাশ সব মাধ্যমেই পেমেন্ট নেওয়া হয়।",
    },
    {
      question: "কোর্স শুরু করার পর রিফান্ড পাবো?",
      answer: "৩০ দিনের মানি ব্যাক গ্যারান্টি আছে।",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappMessage = `Name: ${formData.name}\nPhone: ${formData.phone}\nMessage: ${formData.message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/8801622564462?text=${encodedMessage}`, "_blank");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div className="absolute inset-0 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#07A8ED] to-[#3B82F6] rounded-full mb-4 md:mb-6">
            <FaComments className="text-white text-2xl md:text-3xl" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4">
            <span className="text-[#07A8ED]">যোগাযোগ</span> করুন
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            যেকোনো প্রশ্নে বা কোর্সে এনরোল করতে এখনই যোগাযোগ করুন
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 md:space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-[#1A2036] to-[#0F172A] rounded-xl p-4 md:p-6 border border-[#1E3A8A]/50"
                >
                  <div
                    className={`${method.color} w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-3 md:mb-4`}
                  >
                    <div className="text-white text-xl md:text-2xl">
                      {method.icon}
                    </div>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                    {method.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">{method.info}</p>

                  <div className="mb-4">
                    <p className="text-gray-300 font-medium text-sm md:text-base">
                      {method.value}
                    </p>
                  </div>

                  <motion.a
                    href={method.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="block w-full bg-[#0B1221] hover:bg-[#07A8ED]/10 text-[#07A8ED] text-center py-2 md:py-3 rounded-lg font-medium text-sm md:text-base border border-[#07A8ED]/30 transition-all"
                  >
                    {method.buttonText}
                  </motion.a>
                </motion.div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-[#1A2036] to-[#0F172A] rounded-xl md:rounded-2xl p-4 md:p-6 border border-[#1E3A8A]/50">
              <div className="flex items-center mb-3 md:mb-4">
                <FaClock className="text-yellow-400 mr-2" />
                <h3 className="text-lg md:text-xl font-bold text-white">
                  যোগাযোগের সময়
                </h3>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b border-gray-800">
                  <span className="text-gray-300">শনি - বৃহস্পতি</span>
                  <span className="text-white font-medium">
                    সকাল ৯টা - রাত ১০টা
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-300">শুক্রবার</span>
                  <span className="text-white font-medium">
                    বিকাল ২টা - রাত ১০টা
                  </span>
                </div>
              </div>

              <div className="mt-4 md:mt-6 p-3 md:p-4 bg-gradient-to-r from-green-500/10 to-emerald-600/10 rounded-lg">
                <div className="flex items-center">
                  <FaHeadset className="text-green-400 mr-2" />
                  <div>
                    <p className="text-white font-medium">দ্রুত প্রতিক্রিয়া</p>
                    <p className="text-gray-400 text-sm">
                      সাধারণত ১৫ মিনিটের মধ্যে রিপ্লাই
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-[#1A2036] to-[#0F172A] rounded-xl md:rounded-2xl p-6 md:p-8 border border-[#1E3A8A]/50"
          >
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 flex items-center">
              <RiMessage2Fill className="text-[#07A8ED] mr-2 md:mr-3" />
              সরাসরি মেসেজ পাঠান
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-gray-300 mb-2 text-sm md:text-base">
                  <FaUser className="inline mr-2" />
                  আপনার নাম
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#0B1221] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#07A8ED] transition-colors"
                  placeholder="আপনার পুরো নাম লিখুন"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm md:text-base">
                  <FaMobileAlt className="inline mr-2" />
                  মোবাইল নাম্বার
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#0B1221] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#07A8ED] transition-colors"
                  placeholder="০১৬XXXXXXXX"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm md:text-base">
                  আপনার প্রশ্ন/মেসেজ
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 bg-[#0B1221] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#07A8ED] transition-colors"
                  placeholder="আপনার প্রশ্ন বা মেসেজ লিখুন..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 md:py-4 rounded-xl font-bold text-base md:text-lg hover:shadow-xl hover:shadow-green-500/30 transition-all flex items-center justify-center"
              >
                <FaPaperPlane className="mr-2 md:mr-3" />
                WhatsApp এ মেসেজ পাঠান
              </motion.button>

              <p className="text-gray-400 text-xs md:text-sm text-center">
                মেসেজ পাঠালে অটোমেটিক WhatsApp এ চলে যাবে এবং সরাসরি আমাদের সাথে
                কানেক্ট হবে।
              </p>
            </form>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 md:mt-12"
        >
          <div className="bg-gradient-to-r from-[#07A8ED]/10 to-[#3B82F6]/10 rounded-xl md:rounded-2xl p-6 md:p-8 border border-[#07A8ED]/30">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 text-center">
              <FaCheckCircle className="inline text-green-400 mr-2" />
              প্রায়শই জিজ্ঞাসিত প্রশ্ন
            </h3>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {faqItems.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#0B1221] rounded-lg p-4 md:p-6"
                >
                  <div className="flex items-start mb-2">
                    <div className="w-6 h-6 bg-[#07A8ED] rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">?</span>
                    </div>
                    <h4 className="text-white font-bold text-sm md:text-base">
                      {faq.question}
                    </h4>
                  </div>
                  <p className="text-gray-300 text-sm md:text-base ml-9">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-6 md:mt-8">
              <motion.a
                href="https://wa.me/8801622564462"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[#07A8ED] to-[#3B82F6] text-white rounded-xl font-bold text-base md:text-lg hover:shadow-xl hover:shadow-[#07A8ED]/30 transition-all"
              >
                <FaWhatsapp className="mr-2 md:mr-3" />
                আরও প্রশ্ন থাকলে WhatsApp এ জানান
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;