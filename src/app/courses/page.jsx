import React from 'react';
import {
  FaClock,
  FaCertificate,
  FaVideo,
  FaBookOpen,
  FaProjectDiagram
} from 'react-icons/fa';
import { MdOutlineSupportAgent } from 'react-icons/md';

const CoursePage = () => {
  const courseDetails = {
    title: "Complete Web Development Course With Tonmoy",
    subtitle: "From Zero to MERN Stack Developer",
    price: "৳ 5,500",
    duration: "6 মাস",
    level: "Beginner to Advanced",
    language: "Bangla",
    lastUpdated: "December 2024"
  };

  const features = [
    { icon: <FaClock className="text-blue-500" />, text: "80+ ঘণ্টার কন্টেন্ট", subtext: "Lifetime Access" },
    { icon: <FaVideo className="text-green-500" />, text: "100+ ভিডিও লেসন", subtext: "HD Quality" },
    { icon: <FaProjectDiagram className="text-purple-500" />, text: "12+ প্রকল্প", subtext: "Portfolio Ready" },
    { icon: <FaBookOpen className="text-yellow-500" />, text: "500+ প্র্যাকটিস টাস্ক", subtext: "Solutions সহ" },
    { icon: <FaCertificate className="text-red-500" />, text: "কোর্স সার্টিফিকেট", subtext: "Industry Recognized" },
    { icon: <MdOutlineSupportAgent className="text-pink-500" />, text: "24/7 সাপোর্ট", subtext: "Email & Chat" }
  ];

  const milestones = [
    "Orientation – What Matters in This Course",
    "Welcome to the Course",
    "HTML, CSS, and GitHub for Beginners",
    "Responsive Web Layout",
    "CSS Frameworks",
    "Hello JavaScript",
    "Integrating JavaScript with APIs",
    "Introduction to Simple React",
    "React Router and State Management",
    "React Authentication",
    "Backend and Database Integration",
    "Backend with JWT and Axios Interceptor",
    "Final Project – Complete Website",
    "Explore More and Get Ready to Be Hired"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1221] to-[#0A1A2F] text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          <span className="bg-gradient-to-r from-[#07A8ED] via-[#3B82F6] to-[#07A8ED] bg-clip-text text-transparent">
            Complete Web Development
          </span>
          <br />
          <span className="text-3xl md:text-4xl">Course With Tonmoy</span>
        </h1>

        <p className="text-xl text-gray-300 mb-12 text-center">
          MERN Stack শিখুন, প্রকল্প তৈরি করুন, এবং ৬ মাসের মধ্যে প্রফেশনাল ওয়েব ডেভেলপার হিসেবে ক্যারিয়ার শুরু করুন।
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-[#1E293B]/50 p-4 rounded-xl border border-gray-800">
              <div className="flex items-center mb-2">
                <div className="text-2xl mr-3">{feature.icon}</div>
                <div>
                  <div className="font-semibold">{feature.text}</div>
                  <div className="text-sm text-gray-400">{feature.subtext}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#07A8ED] to-[#3B82F6] bg-clip-text text-transparent">
            কোর্সে এন্ট্রোল করার ধাপসমূহ
          </h2>

          <div className="space-y-6">
            <div className="bg-[#1E293B]/50 p-6 rounded-xl border border-gray-800">
              <h3 className="font-bold text-xl mb-2">ধাপ ১: অ্যাকাউন্ট তৈরি করুন</h3>
              <p className="text-gray-300">
                আপনার ইমেইল দিয়ে আমাদের ওয়েবসাইটে একটি একাউন্ট তৈরি করুন।
              </p>
            </div>

            <div className="bg-[#1E293B]/50 p-6 rounded-xl border border-gray-800">
              <h3 className="font-bold text-xl mb-2">ধাপ ২: পেমেন্ট করুন</h3>
              <p className="text-gray-300">
                01731158705 এই নাম্বারে <span className="text-[#07A8ED] font-semibold">৫৫০০ টাকা</span> পাঠান।  
                রেফারেন্স হিসেবে আপনার <span className="text-[#07A8ED] font-semibold">ইমেইল অ্যাড্রেস</span> লিখবেন।
              </p>
            </div>

            <div className="bg-[#1E293B]/50 p-6 rounded-xl border border-gray-800">
              <h3 className="font-bold text-xl mb-2">ধাপ ৩: এক্সেস পান</h3>
              <p className="text-gray-300">
                পেমেন্ট কনফার্ম হওয়ার ২৪ ঘন্টার মধ্যে আপনার একাউন্টে কোর্সের এক্সেস পেয়ে যাবেন।
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#07A8ED] to-[#3B82F6] bg-clip-text text-transparent">
            Enrollment Process ভিডিও
          </h2>
          <div className="aspect-video">
            <iframe
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
              title="Enrollment Video"
              className="w-full h-full rounded-xl"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#07A8ED] to-[#3B82F6] bg-clip-text text-transparent">
            Course Milestones
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {milestones.map((item, index) => (
              <div key={index} className="bg-[#1E293B]/50 p-6 rounded-xl border border-gray-800">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#07A8ED] to-[#1E3A8A] rounded-lg flex items-center justify-center font-bold mr-4">
                    {index}
                  </div>
                  <h3 className="text-lg font-semibold">{item}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CoursePage;
