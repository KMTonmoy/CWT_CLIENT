'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const WhatProjectYoDO = () => {
    const projects = [
        {
            title: "Dragon News",
            description: "A complete news portal with JWT authentication, categories, and author dashboard. Built with MERN stack and real-time updates.",
            image: "https://web.programming-hero.com/home/_next/image?url=%2Fhome%2Fhome2%2Ficons%2Fprojects%2Fimage%20(3).png&w=1920&q=75",
            technologies: [
                { name: "React", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png" },
                { name: "Node.js", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1280px-Node.js_logo.svg.png" },
                { name: "MongoDB", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/2560px-MongoDB_Logo.svg.png" },
                { name: "JWT", logo: "https://jwt.io/img/pic_logo.svg" }
            ]
        },
        {
            title: "Espresso Emporium",
            description: "E-commerce platform with payment integration, product reviews, and admin dashboard. Built with Next.js for SEO optimization.",
            image: "https://web.programming-hero.com/home/_next/image?url=%2Fhome%2Fhome2%2Ficons%2Fprojects%2Fimage%20(4).png&w=1920&q=75",
            technologies: [
                { name: "Next.js", logo: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png" },
                { name: "Firebase", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Firebase_Logo.svg/1280px-Firebase_Logo.svg.png" },
                { name: "Tailwind", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/1024px-Tailwind_CSS_Logo.svg.png" },
                { name: "Stripe", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png" }
            ]
        },
        {
            title: "Genius Car Services",
            description: "Car service management system with appointment booking, service tracking, and customer portal. Features JWT authentication.",
            image: "https://web.programming-hero.com/home/_next/image?url=%2Fhome%2Fhome2%2Ficons%2Fprojects%2Fimage%20(1).png&w=1920&q=75",
            technologies: [
                { name: "React", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png" },
                { name: "Express", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Expressjs.png/1280px-Expressjs.png" },
                { name: "JWT", logo: "https://jwt.io/img/pic_logo.svg" },
                { name: "MongoDB", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/2560px-MongoDB_Logo.svg.png" }
            ]
        },
        {
            title: "Knowledge Cafe",
            description: "Social learning platform with real-time chat, course management, and progress tracking. Uses Firebase for authentication.",
            image: "https://web.programming-hero.com/home/_next/image?url=%2Fhome%2Fhome2%2Ficons%2Fprojects%2Fimage%20(2).png&w=1920&q=75",
            technologies: [
                { name: "Next.js", logo: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png" },
                { name: "Firebase", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Firebase_Logo.svg/1280px-Firebase_Logo.svg.png" },
                { name: "Node.js", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1280px-Node.js_logo.svg.png" },
                { name: "WebSockets", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/WebSocket_Logo.png/600px-WebSocket_Logo.png" }
            ]
        }
    ]

    return (
        <div className="bg-[#0B1221] py-16 px-4 sm:px-6 lg:px-8">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center text-4xl font-bold text-[#f1f5f9] mb-12"
            >
                তুমি যেসব প্রজেক্ট করবে
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.6,
                            delay: index * 0.1,
                            type: "spring",
                            stiffness: 100
                        }}
                        whileHover={{
                            y: -10,
                            boxShadow: "0 20px 25px -5px rgba(7, 168, 237, 0.1), 0 10px 10px -5px rgba(7, 168, 237, 0.04)"
                        }}
                        className="bg-[#1A2036] rounded-xl overflow-hidden border border-[#1E3A8A]/50 relative group"
                    >
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-[#07A8ED] opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"></div>

                        {/* Project Image */}
                        <div className="h-40 overflow-hidden relative">
                            <motion.img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"

                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1221] to-transparent opacity-70"></div>
                            <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">
                                {project.title}
                            </h3>
                        </div>

                        {/* Project Content */}
                        <div className="p-5">
                            <p className="text-[#E5E7EB] text-sm mb-4 h-20 overflow-hidden">
                                {project.description}
                            </p>

                            {/* Technologies Used */}
                            <div className="mt-auto">
                                <h4 className="text-xs font-semibold text-[#E5E7EB]/50 mb-2">TECH STACK</h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech, i) => (
                                        <motion.div
                                            key={i}
                                            whileHover={{ scale: 1.1 }}
                                            className="flex items-center gap-1 px-2 py-1 bg-[#0B1221] rounded-full text-xs"
                                        >
                                            <img
                                                src={tech.logo}
                                                alt={tech.name}
                                                width={16}
                                                height={16}
                                                className="h-4 w-auto object-contain"
                                            />
                                            <span className="text-[#E5E7EB]">{tech.name}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default WhatProjectYoDO