import React from 'react';
import {
  FaClock,
  FaUserGraduate,
  FaCertificate,
  FaLevelUpAlt,
  FaVideo,
  FaBookOpen,
  FaProjectDiagram,
  FaStar,
  FaCheckCircle,
  FaPlayCircle,
  FaWhatsapp,
  FaMoneyBillWave
} from 'react-icons/fa';
import { RiFolderDownloadFill, RiMoneyDollarCircleLine } from 'react-icons/ri';
import { MdOutlineSupportAgent, MdUpdate } from 'react-icons/md';

const CoursePage = () => {
  const courseDetails = {
    title: "Complete Web Development Course With Tonmoy",
    subtitle: "From Zero to MERN Stack Developer",
    price: {
      original: "৳ 8,500",
      discounted: "৳ 5,999",
      installments: "৳ 1,000/month"
    },
    rating: 4.9,
    reviews: 1250,
    students: 8500,
    duration: "6 Months",
    level: "Beginner to Advanced",
    language: "Bangla",
    lastUpdated: "December 2024"
  };

  const features = [
    { icon: <FaClock className="text-blue-500" />, text: "80+ Hours of Content", subtext: "Lifetime Access" },
    { icon: <FaVideo className="text-green-500" />, text: "100+ Video Lessons", subtext: "HD Quality" },
    { icon: <FaProjectDiagram className="text-purple-500" />, text: "12+ Real Projects", subtext: "Portfolio Ready" },
    { icon: <FaBookOpen className="text-yellow-500" />, text: "500+ Practice Tasks", subtext: "With Solutions" },
    { icon: <FaCertificate className="text-red-500" />, text: "Course Certificate", subtext: "Industry Recognized" },
    { icon: <MdOutlineSupportAgent className="text-pink-500" />, text: "24/7 Support", subtext: "WhatsApp Group" }
  ];

  const modules = [
    { title: "Module 1: Web Fundamentals", topics: ["HTML5", "CSS3", "Responsive Design", "Git & GitHub"] },
    { title: "Module 2: JavaScript Mastery", topics: ["ES6+", "DOM Manipulation", "API Handling", "Async Programming"] },
    { title: "Module 3: Frontend Development", topics: ["React.js", "Redux", "Tailwind CSS", "Next.js"] },
    { title: "Module 4: Backend Development", topics: ["Node.js", "Express.js", "MongoDB", "Authentication"] },
    { title: "Module 5: Full Stack Projects", topics: ["E-commerce", "Social Media", "Dashboard", "Real-time Chat"] },
    { title: "Module 6: Deployment & Career", topics: ["Vercel", "Firebase", "Resume", "Interview Prep"] }
  ];

  const whatsappLink = "https://wa.me/8801622564462?text=Hello%20Tonmoy,%20I%20want%20to%20enroll%20in%20your%20Web%20Development%20Course";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1221] to-[#0A1A2F] text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#07A8ED]/10 via-transparent to-[#1E3A8A]/10"></div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-400 mb-6">
              <span>Home</span>
              <span className="mx-2">/</span>
              <span>Courses</span>
              <span className="mx-2">/</span>
              <span className="text-[#07A8ED]">Complete Web Development</span>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Course Info */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-[#07A8ED] via-[#3B82F6] to-[#07A8ED] bg-clip-text text-transparent">
                    Complete Web Development
                  </span>
                  <br />
                  <span className="text-3xl md:text-4xl">Course With Tonmoy</span>
                </h1>

                <p className="text-xl text-gray-300 mb-8">
                  Master MERN Stack, build real projects, and launch your career as a professional web developer in just 6 months.
                </p>

                {/* Rating & Stats */}
                <div className="flex flex-wrap items-center gap-6 mb-8">
                  <div className="flex items-center bg-[#1E293B] px-4 py-2 rounded-lg">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="fill-current" />
                      ))}
                    </div>
                    <span className="font-bold">{courseDetails.rating}</span>
                    <span className="text-gray-400 ml-1">({courseDetails.reviews} reviews)</span>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="flex items-center">
                      <FaUserGraduate className="text-green-400 mr-2" />
                      <span>{courseDetails.students.toLocaleString()}+ Students</span>
                    </div>
                    <div className="flex items-center">
                      <MdUpdate className="text-blue-400 mr-2" />
                      <span>Updated {courseDetails.lastUpdated}</span>
                    </div>
                  </div>
                </div>

                {/* Course Features Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                  {features.map((feature, index) => (
                    <div key={index} className="bg-[#1E293B]/50 backdrop-blur-sm p-4 rounded-xl border border-gray-800 hover:border-[#07A8ED]/30 transition-colors">
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

                {/* Preview Video Button */}
                <button className="flex items-center justify-center w-full md:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:opacity-90 transition-all transform hover:-translate-y-1 shadow-lg shadow-purple-500/25 mb-8">
                  <FaPlayCircle className="mr-3" size={24} />
                  <span className="font-bold text-lg">Watch Course Preview (Free)</span>
                </button>
              </div>

              {/* Right Column - Pricing & Enrollment */}
              <div className="lg:sticky lg:top-8 self-start">
                <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl p-8 border border-gray-800 shadow-2xl">
                  {/* Price Tag */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center px-4 py-2 bg-red-500/20 text-red-400 rounded-full text-sm mb-4">
                      <RiMoneyDollarCircleLine className="mr-2" />
                      <span>Limited Time Offer</span>
                    </div>

                    <div className="flex items-center justify-center space-x-4 mb-2">
                      <span className="text-5xl font-bold bg-gradient-to-r from-[#07A8ED] to-[#3B82F6] bg-clip-text text-transparent">
                        {courseDetails.price.discounted}
                      </span>
                      <span className="text-2xl text-gray-400 line-through">
                        {courseDetails.price.original}
                      </span>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                        30% OFF
                      </span>
                    </div>

                    <div className="text-gray-400 mb-6">
                      <span className="flex items-center justify-center">
                        <FaMoneyBillWave className="mr-2" />
                        Or {courseDetails.price.installments} for 6 months
                      </span>
                    </div>
                  </div>

                  {/* Key Benefits */}
                  <div className="space-y-4 mb-8">
                    <h3 className="text-xl font-bold flex items-center">
                      <FaCheckCircle className="text-green-500 mr-3" />
                      What You'll Get
                    </h3>

                    {[
                      "Lifetime Course Access",
                      "All Project Source Codes",
                      "Certificate of Completion",
                      "Job Placement Assistance",
                      "Private WhatsApp Support Group",
                      "1-on-1 Mentorship Sessions"
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4">
                    {/* WhatsApp Enrollment */}
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl hover:opacity-90 transition-all transform hover:-translate-y-1 shadow-lg shadow-green-500/25"
                    >
                      <FaWhatsapp className="mr-3" size={24} />
                      <div className="text-left">
                        <div className="font-bold text-lg">Enroll Now via WhatsApp</div>
                        <div className="text-sm opacity-90">Instant confirmation & support</div>
                      </div>
                    </a>

                    {/* Details Button */}
                    <button className="flex items-center justify-center w-full px-6 py-4 bg-[#2D3748] rounded-xl hover:bg-[#4A5568] transition-all border border-gray-700">
                      <RiFolderDownloadFill className="mr-3" size={24} />
                      <div className="text-left">
                        <div className="font-bold text-lg">Download Course Syllabus</div>
                        <div className="text-sm opacity-90">PDF with full curriculum</div>
                      </div>
                    </button>
                  </div>

                  {/* Guarantee Badge */}
                  <div className="mt-8 pt-6 border-t border-gray-800 text-center">
                    <div className="inline-flex items-center px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-full">
                      <FaCheckCircle className="mr-2" />
                      30-Day Money-Back Guarantee
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-[#07A8ED] to-[#3B82F6] bg-clip-text text-transparent">
              Course Curriculum
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {modules.map((module, index) => (
              <div key={index} className="bg-[#1E293B]/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-[#07A8ED]/30 transition-all hover:-translate-y-1">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#07A8ED] to-[#1E3A8A] rounded-lg flex items-center justify-center font-bold mr-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold">{module.title}</h3>
                </div>

                <ul className="space-y-2">
                  {module.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="flex items-center text-gray-300">
                      <div className="w-1.5 h-1.5 bg-[#07A8ED] rounded-full mr-3"></div>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-[#07A8ED]/10 via-[#3B82F6]/10 to-[#07A8ED]/10 rounded-3xl p-12 border border-[#07A8ED]/30">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start Your <span className="text-[#07A8ED]">Web Development</span> Journey?
            </h2>

            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Join {courseDetails.students.toLocaleString()}+ students who have transformed their careers with this course.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl hover:opacity-90 transition-all text-lg font-bold shadow-lg shadow-green-500/25"
              >
                <FaWhatsapp className="inline mr-3" />
                Enroll Now - {courseDetails.price.discounted}
              </a>

              <button className="px-8 py-4 bg-transparent border-2 border-[#07A8ED] text-[#07A8ED] rounded-xl hover:bg-[#07A8ED]/10 transition-all text-lg font-bold">
                Get Free Consultation
              </button>
            </div>

            <p className="mt-8 text-gray-400">
              Need help deciding? Contact directly:
              <a href="tel:+8801622564462" className="text-[#07A8ED] ml-2 hover:underline">
                +৮৮০ ১৬২২৫৬৪৪৬২
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;