'use client'
import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { motion } from 'framer-motion'

const Curriculum = () => {
  const threeContainer = useRef(null)

  

  const milestones = [
    "Welcome to the Course",
    "Orientation – What Matters in This Course",
    "HTML, CSS and GitHub as a Beginner",
    "Responsive Web Layout",
    "CSS Frameworks",
    "Hello JavaScript",
    "Integrate JavaScript with API",
    "Introduction to Simple React",
    "React Router and State Management",
    "React Authentication",
    "Backend and Database Integration",
    "Backend with JWT and Axios Interceptor",
    "Final Project – Complete Website",
    "Explore More and Get Ready to Be Hired"
  ]

  return (
    <div className="relative py-16 px-4 overflow-hidden">
      <div ref={threeContainer} className="fixed inset-0 z-0" />
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-[#f1f5f9] mb-6">
            এই কোর্সে তুমি কী শিখবে?
          </h1>
          <p className="text-[#E5E7EB] max-w-2xl mx-auto">
            এই কোর্সটি একদম শুরু থেকে শুরু করে ফুলস্ট্যাক ডেভেলপার হওয়া পর্যন্ত তোমাকে ধাপে ধাপে নিয়ে যাবে।
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {milestones.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="bg-[#1A2036] rounded-lg p-6 border border-[#1E3A8A]/50"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#07A8ED] to-[#1E3A8A] rounded-lg flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <h3 className="text-[#E5E7EB] font-semibold">{item}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default Curriculum
