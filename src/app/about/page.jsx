import React from 'react';
import {
  FaCode,
  FaGraduationCap,
  FaUsers,
  FaLaptopCode,
  FaStar,
  FaCheckCircle,
  FaRocket,
  FaHandsHelping,
  FaLightbulb,
  FaHeart,
  FaGlobeAsia,
  FaTrophy,
  FaQuoteLeft,
  FaLinkedin,
  FaGithub,
  FaFacebook,
  FaYoutube
} from 'react-icons/fa';
import { MdSchool, MdWork, MdEmail, MdPhone } from 'react-icons/md';
import { BiMessageRoundedDetail } from 'react-icons/bi';

const AboutPage = () => {
  const stats = [
    { number: "8500+", label: "Students Enrolled", icon: <FaUsers className="text-blue-500" /> },
    { number: "4.9", label: "Course Rating", icon: <FaStar className="text-yellow-500" /> },
    { number: "1250+", label: "Projects Built", icon: <FaLaptopCode className="text-green-500" /> },
    { number: "98%", label: "Satisfaction Rate", icon: <FaHeart className="text-red-500" /> }
  ];

  const values = [
    {
      icon: <FaGraduationCap className="text-purple-500" />,
      title: "Quality Education",
      description: "Providing industry-relevant, practical knowledge that prepares students for real-world challenges."
    },
    {
      icon: <FaHandsHelping className="text-green-500" />,
      title: "Community Support",
      description: "Building a supportive community where learners help each other grow and succeed together."
    },
    {
      icon: <FaLightbulb className="text-yellow-500" />,
      title: "Innovation First",
      description: "Constantly updating courses with latest technologies and modern teaching methodologies."
    },
    {
      icon: <FaGlobeAsia className="text-blue-500" />,
      title: "Accessibility",
      description: "Making web development education accessible to everyone in Bangladesh, regardless of background."
    }
  ];

  const journey = [
    { year: "2020", title: "Journey Begins", description: "Started teaching programming basics to friends and local students" },
    { year: "2021", title: "First Online Course", description: "Launched first structured web development course on YouTube" },
    { year: "2022", title: "Platform Growth", description: "Reached 5000+ students with comprehensive MERN stack curriculum" },
    { year: "2023", title: "Community Building", description: "Established active WhatsApp groups and support communities" },
    { year: "2024", title: "Full Platform", description: "Launched complete learning platform with structured mentorship" }
  ];

  const testimonials = [
    {
      name: "Rahim Ahmed",
      role: "Frontend Developer",
      company: "Brain Station 23",
      text: "Thanks to CodeWithTonmoy, I transitioned from a Biology student to a professional developer in 6 months. The practical approach changed everything!",
      rating: 5
    },
    {
      name: "Sadia Islam",
      role: "Full Stack Developer",
      company: "Grameenphone",
      text: "The structured curriculum and constant support helped me land my dream job. The projects were exactly what employers were looking for.",
      rating: 5
    },
    {
      name: "Arif Hossain",
      role: "Freelancer",
      company: "Upwork Top Rated",
      text: "As a freelancer, the real-world projects taught me exactly what clients need. I've doubled my income since completing the course.",
      rating: 5
    }
  ];

  const socialLinks = [
    { platform: "Facebook", icon: <FaFacebook />, url: "#", color: "hover:text-[#1877F2]" },
    { platform: "YouTube", icon: <FaYoutube />, url: "#", color: "hover:text-[#FF0000]" },
    { platform: "LinkedIn", icon: <FaLinkedin />, url: "#", color: "hover:text-[#0A66C2]" },
    { platform: "GitHub", icon: <FaGithub />, url: "#", color: "hover:text-white" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1221] to-[#0A1A2F] text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-[#07A8ED]/10 via-transparent to-[#1E3A8A]/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#07A8ED] via-[#3B82F6] to-[#07A8ED] bg-clip-text text-transparent">
                About CodeWithTonmoy
              </span>
            </h1>
            <p className="text-2xl text-gray-300 mb-8">
              Empowering the next generation of Bangladeshi developers with practical, industry-relevant education.
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#07A8ED] to-[#3B82F6] rounded-full text-lg font-semibold">
              <FaRocket className="mr-3" />
              Transforming Careers Since 2020
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="bg-[#1E293B]/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold mb-2">{stat.number}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-8 rounded-2xl border border-gray-800">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4">
                  <FaCode className="text-blue-500 text-2xl" />
                </div>
                <h3 className="text-2xl font-bold">Our Mission</h3>
              </div>
              <p className="text-lg text-gray-300 mb-6">
                To democratize web development education in Bangladesh by providing high-quality, affordable,
                and accessible learning resources that empower individuals to build successful tech careers.
              </p>
              <ul className="space-y-3">
                {["Make coding accessible to all", "Bridge the industry-academia gap", "Foster a supportive developer community", "Promote practical, project-based learning"].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <FaCheckCircle className="text-green-500 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-8 rounded-2xl border border-gray-800">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mr-4">
                  <FaTrophy className="text-purple-500 text-2xl" />
                </div>
                <h3 className="text-2xl font-bold">Our Vision</h3>
              </div>
              <p className="text-lg text-gray-300 mb-6">
                To become Bangladesh's leading platform for practical tech education, producing world-class
                developers who drive innovation and contribute to the country's digital transformation.
              </p>
              <ul className="space-y-3">
                {["10,000+ successful graduates by 2025", "Partner with 100+ tech companies", "Expand to mobile app development", "Launch scholarship programs"].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <FaRocket className="text-[#07A8ED] mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-[#07A8ED] to-[#3B82F6] bg-clip-text text-transparent">
              Our Core Values
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-[#1E293B]/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-[#07A8ED]/30 transition-all hover:-translate-y-2">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Journey */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-[#07A8ED] to-[#3B82F6] bg-clip-text text-transparent">
              Our Journey
            </span>
          </h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#07A8ED] via-[#3B82F6] to-[#07A8ED]"></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {journey.map((item, index) => (
                <div key={index} className={`relative flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
                  {/* Year Badge */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-[#07A8ED] to-[#1E3A8A] rounded-full flex items-center justify-center z-10 border-4 border-[#0B1221]">
                    <span className="font-bold">{item.year}</span>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <div className="bg-[#1E293B]/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* About Tonmoy */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl p-8 border border-gray-800 overflow-hidden">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Image Placeholder */}
              <div className="relative">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#07A8ED] to-[#1E3A8A] flex items-center justify-center">
                  <span className="text-6xl font-bold">TA</span>
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center border-4 border-[#0B1221]">
                  <MdWork className="text-white" />
                </div>
              </div>

              {/* About Info */}
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-[#07A8ED] to-[#3B82F6] bg-clip-text text-transparent">
                    About Tonmoy Ahamed
                  </span>
                </h2>
                <p className="text-lg text-gray-300 mb-6">
                  Founder & Lead Instructor at CodeWithTonmoy. With over 4 years of experience in web development
                  and teaching, Tonmoy has dedicated his career to making coding accessible to Bangladeshi students.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <MdSchool className="text-blue-500 mr-3" />
                    <span>BSc in Computer Science</span>
                  </div>
                  <div className="flex items-center">
                    <MdWork className="text-green-500 mr-3" />
                    <span>4+ Years Experience</span>
                  </div>
                  <div className="flex items-center">
                    <MdEmail className="text-yellow-500 mr-3" />
                    <span>tonmoyahamed2009@gmail.com</span>
                  </div>
                  <div className="flex items-center">
                    <MdPhone className="text-red-500 mr-3" />
                    <span>01622564462</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className={`w-12 h-12 bg-[#2D3748] rounded-full flex items-center justify-center text-xl ${social.color} transition-all hover:-translate-y-1`}
                      aria-label={social.platform}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-[#07A8ED] to-[#3B82F6] bg-clip-text text-transparent">
              Student Success Stories
            </span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-[#1E293B]/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
                <FaQuoteLeft className="text-3xl text-[#07A8ED] mb-4" />
                <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role} • {testimonial.company}</p>
                  </div>
                  <div className="flex text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-[#07A8ED]/10 via-[#3B82F6]/10 to-[#07A8ED]/10 rounded-3xl p-12 border border-[#07A8ED]/30">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start <span className="text-[#07A8ED]">Your Journey</span>?
            </h2>

            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Join thousands of successful developers who started their careers with CodeWithTonmoy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/course"
                className="px-8 py-4 bg-gradient-to-r from-[#07A8ED] to-[#3B82F6] rounded-xl hover:opacity-90 transition-all text-lg font-bold shadow-lg shadow-[#07A8ED]/25"
              >
                Explore Our Courses
              </a>

              <button className="px-8 py-4 bg-transparent border-2 border-[#07A8ED] text-[#07A8ED] rounded-xl hover:bg-[#07A8ED]/10 transition-all text-lg font-bold">
                <BiMessageRoundedDetail className="inline mr-3" />
                Contact Us
              </button>
            </div>

            <p className="mt-8 text-gray-400">
              Have questions? Reach out directly:
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

export default AboutPage;