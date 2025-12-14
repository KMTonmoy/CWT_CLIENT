'use client'
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const WhatYouLearn = () => {
    const mountRef = useRef(null);
    const [isMounted, setIsMounted] = useState(false);

    const technologies = [
        { name: "HTML", textColor: "text-[#E44D26]", bgColor: "bg-[#251216]" },
        { name: "CSS", textColor: "text-[#264DE4]", bgColor: "bg-[#071234]" },
        { name: "Tailwind", textColor: "text-[#38BDF8]", bgColor: "bg-[#0F172A]" },
        { name: "JavaScript", textColor: "text-[#F7DF1E]", bgColor: "bg-[#251216]" },
        { name: "React", textColor: "text-[#61DAFB]", bgColor: "bg-[#022336]" },
        { name: "Firebase", textColor: "text-[#FFCA28]", bgColor: "bg-[#261612]" },
        { name: "Node JS", textColor: "text-[#68A063]", bgColor: "bg-[#141F10]" },
        { name: "Express JS", textColor: "text-[#000000]", bgColor: "bg-[#F5F5F5]" },
        { name: "MongoDB", textColor: "text-[#47A248]", bgColor: "bg-[#0C2916]" }
    ];

    useEffect(() => {
        setIsMounted(true);

        // Only run Three.js on client side
        if (typeof window === 'undefined') return;

        let scene, camera, renderer, mesh;
        let animationFrameId;

        const initThreeJS = () => {
            if (!mountRef.current) return;

            // Three.js setup
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true,
                powerPreference: "high-performance"
            });
            renderer.setClearColor(0x0B1221, 0);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.domElement.style.position = 'absolute';
            renderer.domElement.style.top = '0';
            renderer.domElement.style.left = '0';
            renderer.domElement.style.width = '100%';
            renderer.domElement.style.height = '100%';
            renderer.domElement.style.zIndex = '0';
            renderer.domElement.style.pointerEvents = 'none';

            mountRef.current.appendChild(renderer.domElement);

            // Create a floating geometry
            const geometry = new THREE.IcosahedronGeometry(2, 1);
            const material = new THREE.MeshPhongMaterial({
                color: 0x07A8ED,
                emissive: 0x07A8ED,
                emissiveIntensity: 0.2,
                shininess: 100,
                transparent: true,
                opacity: 0.7,
                wireframe: true
            });
            mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            // Add lights
            const ambientLight = new THREE.AmbientLight(0x404040);
            scene.add(ambientLight);
            const directionalLight = new THREE.DirectionalLight(0x07A8ED, 0.5);
            directionalLight.position.set(1, 1, 1);
            scene.add(directionalLight);

            // Position camera
            camera.position.z = 5;

            // Animation loop
            const animate = () => {
                animationFrameId = requestAnimationFrame(animate);
                if (mesh) {
                    mesh.rotation.x += 0.005;
                    mesh.rotation.y += 0.01;
                }
                renderer.render(scene, camera);
            };
            animate();
        };

        // Handle resize
        const handleResize = () => {
            if (camera && renderer) {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }
        };

        initThreeJS();
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);

            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }

            if (renderer && mountRef.current && renderer.domElement.parentNode === mountRef.current) {
                try {
                    mountRef.current.removeChild(renderer.domElement);
                } catch (error) {
                    console.log('Cleanup error (safe to ignore):', error);
                }
            }

            // Dispose Three.js objects
            if (renderer) {
                renderer.dispose();
                renderer.forceContextLoss();
            }

            if (mesh && mesh.geometry) mesh.geometry.dispose();
            if (mesh && mesh.material) mesh.material.dispose();

            scene = null;
            camera = null;
            renderer = null;
            mesh = null;
        };
    }, []);

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 }
        }
    };

    if (!isMounted) {
        return (
            <div className="relative py-16 px-4 sm:px-6 lg:px-8 bg-[#0B1221] overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-center text-4xl font-bold text-[#f1f5f9] mb-10">
                        এই কোর্সে তুমি কী শিখবে?
                    </h1>
                    <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
                        {technologies.map((tech, index) => (
                            <div
                                key={index}
                                className={`${tech.textColor} ${tech.bgColor} px-4 py-3 text-lg md:text-xl rounded-lg font-medium shadow-lg`}
                            >
                                {tech.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative py-16 px-4 sm:px-6 lg:px-8 bg-[#0B1221] overflow-hidden">
            {/* Three.js container */}
            <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">
                <h1 className="text-center text-4xl font-bold text-[#f1f5f9] mb-10">
                    এই কোর্সে তুমি কী শিখবে?
                </h1>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto"
                >
                    {technologies.map((tech, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className={`${tech.textColor} ${tech.bgColor} px-4 py-3 text-lg md:text-xl rounded-lg font-medium shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#07A8ED]/20 relative z-10`}
                        >
                            {tech.name}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default WhatYouLearn;