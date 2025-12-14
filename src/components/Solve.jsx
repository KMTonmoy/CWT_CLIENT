'use client'
import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaSadTear, FaSmile, FaRocket } from 'react-icons/fa'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'

const Solve = () => {
  const threeContainer = useRef(null)
  const arrowRefs = useRef([])

  useEffect(() => {
    if (!threeContainer.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setClearColor(0x000000, 0)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.top = '0'
    renderer.domElement.style.left = '0'
    renderer.domElement.style.zIndex = '0'
    renderer.domElement.style.pointerEvents = 'none'
    threeContainer.current.appendChild(renderer.domElement)

    // Post-processing for glowing effect
    const composer = new EffectComposer(renderer)
    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)

    const outlinePass = new OutlinePass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      scene,
      camera
    )
    outlinePass.edgeStrength = 3.0
    outlinePass.edgeGlow = 1.0
    outlinePass.edgeThickness = 1.0
    outlinePass.pulsePeriod = 2
    outlinePass.visibleEdgeColor.set('#07A8ED')
    outlinePass.hiddenEdgeColor.set('#07A8ED')
    composer.addPass(outlinePass)

    // Create arrow paths from problems to solutions
    const arrows = []
    const arrowGeometry = new THREE.BufferGeometry()
    const arrowMaterial = new THREE.LineBasicMaterial({ 
      color: 0x07A8ED,
      transparent: true,
      opacity: 0.7,
      linewidth: 2
    })

    // Function to create arrow between two elements
    const createArrow = (startElem, endElem) => {
      const startRect = startElem.getBoundingClientRect()
      const endRect = endElem.getBoundingClientRect()
      
      const startX = (startRect.left + startRect.width / 2) / window.innerWidth * 2 - 1
      const startY = -(startRect.top + startRect.height / 2) / window.innerHeight * 2 + 1
      const endX = (endRect.left + endRect.width / 2) / window.innerWidth * 2 - 1
      const endY = -(endRect.top + endRect.height / 2) / window.innerHeight * 2 + 1
      
      const curve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(startX * 10, startY * 10, 0),
        new THREE.Vector3(startX * 8, (startY + endY)/2 * 10, 5),
        new THREE.Vector3(endX * 8, (startY + endY)/2 * 10, 5),
        new THREE.Vector3(endX * 10, endY * 10, 0)
      )
      
      const points = curve.getPoints(50)
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      
      const line = new THREE.Line(geometry, arrowMaterial)
      scene.add(line)
      arrows.push(line)
      
      // Add arrowhead
      const dir = new THREE.Vector3()
      dir.subVectors(points[points.length-1], points[points.length-2]).normalize()
      
      const arrowhead = new THREE.ArrowHelper(
        dir,
        points[points.length-1],
        0.5,
        0x07A8ED,
        0.3,
        0.2
      )
      scene.add(arrowhead)
      arrows.push(arrowhead)
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      
      // Update arrow positions when elements move
      if (arrowRefs.current.length === 8) { // 4 problems and 4 solutions
        // Clear old arrows
        arrows.forEach(obj => scene.remove(obj))
        arrows.length = 0
        
        // Create new arrows
        for (let i = 0; i < 4; i++) {
          createArrow(arrowRefs.current[i], arrowRefs.current[i+4])
        }
      }
      
      composer.render()
    }
    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      composer.setSize(window.innerWidth, window.innerHeight)
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
      {/* Three.js container */}
      <div ref={threeContainer} className="fixed inset-0 z-0" />
      
      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-center text-4xl font-bold text-[#f1f5f9] mb-10">
          তোমার সমস্যা ও আমাদের সমাধান
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Problems Column */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-[#f1f5f9] mb-6 flex items-center">
              <FaSadTear className="text-red-400 mr-3" />
              সমস্যাগুলো
            </h3>

            {[
              "কী শিখব, কতটুকু শিখবো, কোথা থেকে শুরু করব কিছুই বুঝি না।",
              "স্কিল ও নলেজ নেই",
              "ইন্টার্নশিপ বা চাকরি পর্যন্ত পৌঁছানোর আগেই হার মেনে যাই।",
              "রেগুলারিটি বজায় রাখতে পারি না – মাঝপথেই থেমে যাই।"
            ].map((problem, index) => (
              <motion.div
                key={`problem-${index}`}
                ref={el => arrowRefs.current[index] = el}
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start p-4 bg-[#1A2036] rounded-lg border border-[#1E3A8A]/50"
              >
                <FaSadTear className="text-red-400 mt-1 mr-3 flex-shrink-0" />
                <p className="text-[#E5E7EB]">{problem}</p>
              </motion.div>
            ))}
          </div>

          {/* Solutions Column */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-[#f1f5f9] mb-6 flex items-center">
              <FaSmile className="text-green-400 mr-3" />
              আমাদের সমাধান
            </h3>

            {[
              "আমরা পুরো আউটলাইন, গাইডলাইন, কনটেন্ট রেডি করেই তোমার সাথে আছি",
              "৬ মাসে লার্নিং জার্নিতে যদি সিরিয়াস হও –নিজের নলেজ ও স্কিল দুইটাই পাবে",
              "তোমার জব ইন্টার্ন নিশ্চিত না হওয়া পর্যন্ত আমরা তোমাকে ছাড়বো না",
              "ডেডিকেটেড লাইভ সাপোর্ট, গাইডলাইন, ২৪/৭ কমিউনিটি সাপোর্টে থেমে যাওয়ার চান্স নেই"
            ].map((solution, index) => (
              <motion.div
                key={`solution-${index}`}
                ref={el => arrowRefs.current[index+4] = el}
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start p-4 bg-[#1A2036] rounded-lg border border-[#1E3A8A]/50"
              >
                <FaSmile className="text-green-400 mt-1 mr-3 flex-shrink-0" />
                <p className="text-[#E5E7EB]">{solution}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Solve