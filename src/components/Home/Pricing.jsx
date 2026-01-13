import { Check, Zap, Clock, Video, Award, Users, Link2 } from 'lucide-react'
import React from 'react'
import Link from 'next/link'

const Pricing = () => {
  const features = [
    { icon: <Video size={20} />, text: "৮০+ ঘন্টার ভিডিও কনটেন্ট" },
    { icon: <Zap size={20} />, text: "১২+ রিয়েল প্রজেক্ট" },
    { icon: <Clock size={20} />, text: "লাইফটাইম অ্যাক্সেস" },
    { icon: <Award size={20} />, text: "সার্টিফিকেট" },
    { icon: <Users size={20} />, text: "প্রাইভেট গ্রুপ সাপোর্ট" },
    { icon: <Check size={20} />, text: "রেগুলার আপডেট" }
  ]

  return (
    <div className="py-16 px-4 ">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            কোর্স ফি ও <span className="text-green-400">সুবিধাসমূহ</span>
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            আমাদের ৬ মাসের MERN স্ট্যাক ওয়েব ডেভেলপমেন্ট কোর্সে তুমি যা পাচ্ছো
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left - Features */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Zap className="text-green-400" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white">কোর্স ফিচারস</h3>
            </div>
            
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-xl hover:bg-gray-900 transition-all"
                >
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <div className="text-green-400">{feature.icon}</div>
                  </div>
                  <span className="text-gray-200">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Pricing Card */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border-2 border-green-500/30 shadow-2xl shadow-green-500/10">
              {/* Price Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-full font-bold text-lg shadow-lg">
                  স্পেশাল অফার
                </div>
              </div>

              <div className="text-center pt-4">
                <div className="mb-6">
                  <span className="text-gray-400 text-lg line-through">১০,০০০ টাকা</span>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="text-5xl font-bold text-white">৫,৫০০</span>
                    <span className="text-2xl text-gray-300">টাকা</span>
                  </div>
                  <p className="text-green-400 mt-2">৪৫% ডিসকাউন্ট</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-center gap-2 text-gray-300">
                    <Clock size={18} />
                    <span>৬ মাসের কোর্স</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-300">
                    <Users size={18} />
                    <span>লাইফটাইম সাপোর্ট</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-300">
                    <Award size={18} />
                    <span>কোর্স কমপ্লিশন সার্টিফিকেট</span>
                  </div>
                </div>

                <Link href="/courses" className="block">
                  <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-green-500/25 flex items-center justify-center gap-3">
                    <Zap size={20} />
                    এখনই Enroll করুন
                    <Link2 size={20} />
                  </button>
                </Link>

                <p className="text-gray-400 text-sm mt-4">
                  * ৭ দিনের মানি ব্যাক গ্যারান্টি সহ
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-800/30 rounded-xl">
                <div className="text-green-400 font-bold text-xl">১০০%</div>
                <div className="text-gray-300 text-sm">প্রাকটিক্যাল</div>
              </div>
              <div className="text-center p-4 bg-gray-800/30 rounded-xl">
                <div className="text-green-400 font-bold text-xl">২৪/৭</div>
                <div className="text-gray-300 text-sm">সাপোর্ট</div>
              </div>
              <div className="text-center p-4 bg-gray-800/30 rounded-xl">
                <div className="text-green-400 font-bold text-xl">৫০+</div>
                <div className="text-gray-300 text-sm">স্ট্রাডেন্ট</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <p className="text-gray-300 mb-4">
            📞 কোর্স সম্পর্কে বিস্তারিত জানতে কল করুন: <span className="text-white font-bold">০১৭xx-xxxxxx</span>
          </p>
          <p className="text-gray-400 text-sm">
            অফার সীমিত সময়ের জন্য | আজই রেজিস্ট্রেশন করুন
          </p>
        </div>
      </div>
    </div>
  )
}

export default Pricing