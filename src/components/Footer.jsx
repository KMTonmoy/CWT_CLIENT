"use client"
import React from 'react';
import {
  FaFacebook, FaYoutube, FaLinkedin, FaGithub,
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaExternalLinkAlt
} from 'react-icons/fa';
import { RiSecurePaymentLine, RiVerifiedBadgeFill } from 'react-icons/ri';
import { SiGooglemaps } from 'react-icons/si';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Payment method logos (optimized URLs)
  const paymentLogos = {
    bKash: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/BKash.svg/1280px-BKash.svg.png",
    nagad: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Nagad_Logo.svg/1280px-Nagad_Logo.svg.png",
    sslcommerz: "https://www.sslcommerz.com/wp-content/uploads/2021/08/SSL-Commerz-Logo-01.png"
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="bg-gradient-to-b from-[#0B1221] to-[#0A1A2F] text-[#E5E7EB] border-t border-[#07A8ED]/30">
      {/* Decorative Top Border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#07A8ED] to-transparent"></div>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* Brand Section - Enhanced */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-[#07A8ED] to-[#1E3A8A] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">CWT</span>
                </div>
                <RiVerifiedBadgeFill className="absolute -top-1 -right-1 text-[#07A8ED]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-[#07A8ED] to-[#3B82F6] bg-clip-text text-transparent">
                  CodeWithTonmoy
                </h3>
                <p className="text-xs text-[#94A3B8]">Bangla Web Development Hub</p>
              </div>
            </div>

            <p className="text-sm text-[#94A3B8] leading-relaxed">
              বাংলা ভাষায় ওয়েব ডেভেলপমেন্ট শেখার সবচেয়ে নির্ভরযোগ্য প্ল্যাটফর্ম।
              শিখুন সহজে, করুন প্রফেশনাল কাজ।
            </p>

            {/* Social Media */}
            <div className="pt-4">
              <p className="text-sm font-medium mb-3">Follow Us</p>
              <div className="flex space-x-3">
                {[
                  { icon: <FaFacebook size={22} />, color: "hover:text-[#1877F2]", label: "Facebook" },
                  { icon: <FaYoutube size={22} />, color: "hover:text-[#FF0000]", label: "YouTube" },
                  { icon: <FaLinkedin size={22} />, color: "hover:text-[#0A66C2]", label: "LinkedIn" },
                  { icon: <FaGithub size={22} />, color: "hover:text-white", label: "GitHub" }
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href="#"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`bg-[#1E293B] p-2.5 rounded-full text-[#E5E7EB] ${social.color} transition-all duration-300 hover:shadow-lg hover:shadow-${social.color.replace('hover:text-', '')}/20`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Links - Enhanced */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold text-white flex items-center">
              <span className="w-2 h-6 bg-[#07A8ED] rounded-full mr-3"></span>
              দ্রুত লিংক
            </h3>
            <ul className="space-y-3">
              {[
                { name: "হোম", icon: "🏠" },
                { name: "কোর্সসমূহ", icon: "📚" },
                { name: "আমাদের সম্পর্কে", icon: "👥" },
                { name: "ব্লগ", icon: "✍️" },
                { name: "যোগাযোগ", icon: "📞" },
                { name: "প্রাইভেসি পলিসি", icon: "🔒" }
              ].map((link, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a href="#" className="flex items-center text-sm hover:text-[#07A8ED] transition-colors group">
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">{link.icon}</span>
                    <span>{link.name}</span>
                    <FaExternalLinkAlt className="ml-auto text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Payment Methods - Enhanced */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold text-white flex items-center">
              <RiSecurePaymentLine className="mr-3 text-[#07A8ED]" />
              পেমেন্ট মাধ্যম
              <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">সুরক্ষিত</span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "bKash", logo: paymentLogos.bKash, color: "border-pink-500/30" },
                { name: "Nagad", logo: paymentLogos.nagad, color: "border-red-500/30" },
                { name: "SSLCOMMERZ", logo: paymentLogos.sslcommerz, color: "border-blue-500/30", span: "col-span-2" }
              ].map((method, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className={`bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-4 rounded-xl border ${method.color} ${method.span || ''} flex flex-col items-center justify-center`}
                >
                  <img
                    src={method.logo}
                    alt={method.name}
                    className="h-7 object-contain mb-2"
                    loading="lazy"
                  />
                  <span className="text-xs text-[#94A3B8]">{method.name}</span>
                </motion.div>
              ))}
            </div>

            <p className="text-xs text-[#94A3B8] text-center mt-4">
              💳 অন্যান্য কার্ড ব্যাংকিং সুবিধা প্রযোজ্য
            </p>
          </motion.div>

          {/* Contact Info - Enhanced with your details */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold text-white flex items-center">
              <span className="w-2 h-6 bg-[#07A8ED] rounded-full mr-3"></span>
              যোগাযোগ
            </h3>

            <div className="space-y-4">
              {/* Email */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-start p-3 rounded-lg bg-[#1E293B]/50 hover:bg-[#1E293B] transition-all group"
              >
                <div className="p-2 rounded-lg bg-[#07A8ED]/10 mr-3 group-hover:bg-[#07A8ED]/20 transition-colors">
                  <FaEnvelope className="text-[#07A8ED]" />
                </div>
                <div>
                  <p className="text-xs text-[#94A3B8]">ইমেইল এড্রেস</p>
                  <a
                    href="mailto:tonmoyahamed2009@gmail.com"
                    className="text-sm hover:text-[#07A8ED] transition-colors flex items-center"
                  >
                    tonmoyahamed2009@gmail.com
                    <FaExternalLinkAlt className="ml-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-start p-3 rounded-lg bg-[#1E293B]/50 hover:bg-[#1E293B] transition-all group"
              >
                <div className="p-2 rounded-lg bg-green-500/10 mr-3 group-hover:bg-green-500/20 transition-colors">
                  <FaPhone className="text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-[#94A3B8]">ফোন নম্বর</p>
                  <a
                    href="tel:+8801622564462"
                    className="text-sm hover:text-green-400 transition-colors flex items-center"
                  >
                    +৮৮০ ১৬২২৫৬৪৪৬২
                    <FaExternalLinkAlt className="ml-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </motion.div>

              {/* Address */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-start p-3 rounded-lg bg-[#1E293B]/50 hover:bg-[#1E293B] transition-all group"
              >
                <div className="p-2 rounded-lg bg-yellow-500/10 mr-3 group-hover:bg-yellow-500/20 transition-colors">
                  <FaMapMarkerAlt className="text-yellow-500" />
                </div>
                <div>
                  <p className="text-xs text-[#94A3B8]">ঠিকানা</p>
                  <div className="text-sm">ঢাকা, বাংলাদেশ</div>
                  <a
                    href="https://maps.google.com/?q=Dhaka,Bangladesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#94A3B8] hover:text-yellow-400 transition-colors flex items-center mt-1"
                  >
                    <SiGooglemaps className="mr-1" /> Google Map
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Copyright Section - Enhanced */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="border-t border-[#1E3A8A]/50 pt-8 mt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <p className="text-sm text-[#94A3B8]">
                &copy; {currentYear} <span className="text-[#07A8ED] font-semibold">CodeWithTonmoy</span>. সর্বস্বত্ব সংরক্ষিত।
              </p>

              <div className="flex items-center space-x-4">
                <div className="w-1 h-1 bg-[#94A3B8] rounded-full"></div>
                <div className="flex space-x-4">
                  {["প্রাইভেসি পলিসি", "টার্মস", "কুকি সেটিংস"].map((item, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="text-xs text-[#94A3B8] hover:text-[#07A8ED] transition-colors"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 md:mt-0">
              <div className="flex items-center space-x-2 text-xs text-[#94A3B8]">
                <span>Made with ❤️ in Bangladesh</span>
                
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;