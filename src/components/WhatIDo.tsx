'use client';
import { motion } from 'framer-motion';
import { Smartphone, Server } from 'lucide-react';
import React from 'react';

export default function WhatIDo() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    
    // Normalize coordinates between -0.5 and 0.5
    const px = x / box.width - 0.5;
    const py = y / box.height - 0.5;
    
    // Tilt angle multiplier (up to 12 degrees of physical tilt)
    const tiltX = -py * 12;
    const tiltY = px * 12;
    
    card.style.setProperty('--tilt-x', `${tiltX}deg`);
    card.style.setProperty('--tilt-y', `${tiltY}deg`);
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <section id="what-i-do" className="relative z-20 bg-[#0a0a0a] py-32 px-6 md:px-12 lg:px-24 border-t border-neutral-900 border-dashed overflow-hidden">
      {/* Background glowing gradients */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-950/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-blue-950/15 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-screen-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-6"
        >
          <div>
            <h2 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-800 tracking-tighter uppercase leading-none">
              What I Do
            </h2>
            <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest mt-4">
              // SCALABLE DIGITAL ARCHITECTURE & USER EXPERIENCES
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>02 CORE SPECIALTIES ACTIVE</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
          
          {/* Panel 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative p-12 md:p-16 lg:p-20 bg-neutral-900/10 border border-neutral-800/80 rounded-2xl overflow-hidden transition-all duration-300 hover:border-cyan-500/30 select-none flex flex-col justify-between min-h-[480px]"
            style={{
              transform: `perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))`,
              transition: 'transform 0.15s ease-out, border-color 0.3s'
            }}
          >
            {/* Spotlight Glow Layer */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
              style={{
                background: `radial-gradient(circle 250px at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(34, 211, 238, 0.08), transparent 80%)`
              }}
            />
            {/* Grid Mesh Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

            <div className="relative z-10 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-8">
                <Smartphone className="text-cyan-400 group-hover:scale-110 transition-transform duration-500" size={48} strokeWidth={1} />
                <span className="font-mono text-neutral-800 text-5xl font-black select-none tracking-tighter">01</span>
              </div>
              
              <h3 className="text-3xl tracking-tight font-black text-white mb-2 uppercase">
                FLUTTER & FRONTEND
              </h3>
              <h4 className="text-sm font-mono text-cyan-400/80 mb-6 uppercase tracking-wider">
                Crafting High-Fidelity & Responsive Client Experiences
              </h4>
              <p className="text-neutral-400 text-lg font-light leading-relaxed mb-8">
                I design and build dynamic user interfaces across platforms. Specializing in highly interactive applications, beautiful typographic systems, custom canvas widgets, and optimized responsive layouts across web and mobile viewports.
              </p>
            </div>
            
            <div className="relative z-10 flex flex-wrap gap-2 pt-6 border-t border-neutral-900 border-dashed">
              {['Flutter', 'Dart', 'React.js', 'Next.js', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'HTML5/CSS3'].map(skill => (
                <span 
                  key={skill} 
                  className="text-[10px] font-mono border border-neutral-800/80 text-neutral-500 px-3 py-1 rounded-full group-hover:border-cyan-500/20 group-hover:text-cyan-300 transition-colors uppercase tracking-wider"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-neutral-800 group-hover:border-cyan-400/50 transition-colors duration-300" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-neutral-800 group-hover:border-cyan-400/50 transition-colors duration-300" />
          </motion.div>

          {/* Panel 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative p-12 md:p-16 lg:p-20 bg-neutral-900/10 border border-neutral-800/80 rounded-2xl overflow-hidden transition-all duration-300 hover:border-cyan-500/30 select-none flex flex-col justify-between min-h-[480px]"
            style={{
              transform: `perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))`,
              transition: 'transform 0.15s ease-out, border-color 0.3s'
            }}
          >
            {/* Spotlight Glow Layer */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
              style={{
                background: `radial-gradient(circle 250px at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(34, 211, 238, 0.08), transparent 80%)`
              }}
            />
            {/* Grid Mesh Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

            <div className="relative z-10 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-8">
                <Server className="text-cyan-400 group-hover:scale-110 transition-transform duration-500" size={48} strokeWidth={1} />
                <span className="font-mono text-neutral-800 text-5xl font-black select-none tracking-tighter">02</span>
              </div>
              
              <h3 className="text-3xl tracking-tight font-black text-white mb-2 uppercase">
                BACKEND & INTEGRATION
              </h3>
              <h4 className="text-sm font-mono text-cyan-400/80 mb-6 uppercase tracking-wider">
                Powering Digital Products with High-Performance Engines
              </h4>
              <p className="text-neutral-400 text-lg font-light leading-relaxed mb-8">
                I engineer highly performant backend infrastructure, database structures, and dynamic API endpoints. Focused on thread-safe services, cloud architecture integration, relational/document storage structures, and robust client communications.
              </p>
            </div>
            
            <div className="relative z-10 flex flex-wrap gap-2 pt-6 border-t border-neutral-900 border-dashed">
              {['Firebase', 'Node.js', 'Java', 'Spring Boot', 'Spring Data JPA', 'MongoDB', 'MySQL', 'RESTful APIs'].map(skill => (
                <span 
                  key={skill} 
                  className="text-[10px] font-mono border border-neutral-800/80 text-neutral-500 px-3 py-1 rounded-full group-hover:border-cyan-500/20 group-hover:text-cyan-300 transition-colors uppercase tracking-wider"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-neutral-800 group-hover:border-cyan-400/50 transition-colors duration-300" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-neutral-800 group-hover:border-cyan-400/50 transition-colors duration-300" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
