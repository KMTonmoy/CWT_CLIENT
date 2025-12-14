'use client'
import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { motion } from 'framer-motion'

const Curriculum = () => {
  const threeContainer = useRef(null)

  useEffect(() => {
    if (!threeContainer.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setClearColor(0x000000, 0)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.domElement.style.position = 'fixed'
    renderer.domElement.style.top = '0'
    renderer.domElement.style.left = '0'
    renderer.domElement.style.zIndex = '0'
    renderer.domElement.style.pointerEvents = 'none'
    threeContainer.current.appendChild(renderer.domElement)

    // Create tornado particles
    const particles = 2000
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particles * 3)
    const sizes = new Float32Array(particles)

    for (let i = 0; i < particles; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 10
      positions[i3 + 1] = Math.random() * 20
      positions[i3 + 2] = (Math.random() - 0.5) * 10
      sizes[i] = Math.random() * 2
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const material = new THREE.PointsMaterial({
      color: 0x07A8ED,
      size: 0.1,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    })

    const particleSystem = new THREE.Points(geometry, material)
    scene.add(particleSystem)

    // Camera position
    camera.position.z = 15

    // Animation variables
    let time = 0
    const animationSpeed = 0.005

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      time += animationSpeed

      // Animate particles in tornado pattern
      const positions = particleSystem.geometry.attributes.position.array
      for (let i = 0; i < particles; i++) {
        const i3 = i * 3
        const radius = 0.5 + (positions[i3 + 1] / 20) * 3
        const angle = time * 2 + positions[i3 + 1] * 0.1
        
        positions[i3] = Math.cos(angle) * radius
        positions[i3 + 2] = Math.sin(angle) * radius
        
        // Slowly move particles upward
        positions[i3 + 1] += 0.02
        if (positions[i3 + 1] > 20) {
          positions[i3 + 1] = 0
        }
      }
      particleSystem.geometry.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (threeContainer.current && renderer.domElement.parentNode === threeContainer.current) {
        threeContainer.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div className="relative bg-[#0B1221] py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Three.js container (fixed background) */}
      <div  className="fixed inset-0 z-0" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-center text-4xl font-bold text-[#f1f5f9] mb-10">
            এই কোর্সে তুমি কী শিখবে?
          </h1>
          <p className="text-[#E5E7EB] max-w-2xl mx-auto">
            CodeBangla এর ডাইনামিক বুটকেম্পটি MERN স্ট্যাকের প্রারম্ভিক থেকে শুরু করে সম্পূর্ণ দক্ষতা অর্জন পর্যন্ত তোমাকে নিয়ে যাবে। একসাথে মজবুত ভিত্তি গড়ে, শেখার যাত্রাকে করে তুলবে সহজ, মজার ও ফলপ্রসূ।
          </p>
        </motion.div>

        {/* Curriculum Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {/* Module Group 1 */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-[#1A2036] rounded-lg p-6 border border-[#1E3A8A]/50"
          >
            <h3 className="text-xl font-bold text-[#07A8ED] mb-4">Foundational Modules</h3>
            <ul className="space-y-3">
              {[
                "Module -1: Welcome Video",
                "Module 0: Orientation",
                "Module 1: Learn HTML",
                "Module 2: Learn CSS",
                "Module 3: Git & GitHub",
                "Module 4: More HTML"
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-[#E5E7EB]"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Module Group 2 */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-[#1A2036] rounded-lg p-6 border border-[#1E3A8A]/50"
          >
            <h3 className="text-xl font-bold text-[#07A8ED] mb-4">Core Development</h3>
            <ul className="space-y-3">
              {[
                "Module 5: Portfolio Website",
                "Module 6: Flower Shop",
                "Module 7: Responsive Layout",
                "Module 8: Advanced Layout",
                "Module 9: Landing Page",
                "Module 10: Image Optimization"
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="text-[#E5E7EB]"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Module Group 3 */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-[#1A2036] rounded-lg p-6 border border-[#1E3A8A]/50"
          >
            <h3 className="text-xl font-bold text-[#07A8ED] mb-4">Advanced Topics</h3>
            <ul className="space-y-3">
              {[
                "Module 16: JavaScript Intro",
                "Module 24: DOM Tour",
                "Module 38: React Core",
                "Module 54: Node & Express",
                "Module 64: Final Project",
                "Module 73: Next.js"
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                  className="text-[#E5E7EB]"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Curriculum