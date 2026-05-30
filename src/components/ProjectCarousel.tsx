'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Github, ExternalLink } from 'lucide-react';

export default function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = [
    {
      title: "Syntax Showdown",
      category: "Real-Time Collaborative Coding Game",
      stack: "Next.js, Node.js, WebSockets, Monaco Editor, Docker, TypeScript",
      desc: "A real-time multiplayer code dueling platform where developers race to solve programmatic challenges. Built with Monaco Editor synchronization, sandboxed Docker compilation containers, dynamic matchmaking, and real-time Elo-based lobbies.",
      highlights: [
        "Interactive collaborative code editor powered by integrated Monaco Editor suites",
        "Bidirectional low-latency room communication using custom Socket.io protocols",
        "Secure remote execution of code blocks inside isolated Docker build microservices",
        "Elo rating matching queues, live leaderboards, and instant spectator modes"
      ],
      github: "https://github.com/GauravSingh094/Syntax-Showdown",
      live: ""
    },
    {
      title: "Kingsukh Guest House",
      category: "Luxury Hotel Booking Platform",
      stack: "React.js, JavaScript, Tailwind CSS, EmailJS, React Icons, Netlify, Vercel",
      desc: "A premium hospitality booking web application designed for Kingsukh Guest House. It provides a fluid, responsive client-facing catalog, interactive map navigations, elegant room selectors, and automated EmailJS inquiry templates that drive reservations.",
      highlights: [
        "Interactive reservation inquiries using integrated secure EmailJS mailing APIs",
        "Fluid cross-device responsiveness optimizing visual hierarchy on mobile and desktop",
        "Strategic local search engine discoverability and automated metadata mapping",
        "Vibrant visual room portfolios, interactive locations, and direct-connect social channels"
      ],
      github: "https://github.com/GauravSingh094/kingsukh-guesthouse-website",
      live: "https://kingsukh-guesthouse-website.vercel.app/"
    },
    {
      title: "Mindrift",
      category: "Real-Time Quiz Platform",
      stack: "Next.js, Firebase, TypeScript, Tailwind CSS",
      desc: "Scalable quiz platform designed for high participation, secure quiz flow, live leaderboard updates, and admin-level control.",
      highlights: [
        "High-performance architecture supporting concurrent real-time participants",
        "Real-time scoreboard syncing with Firebase real-time database layers",
        "Robust tab-switching anti-cheat triggers and custom session validation",
        "Granular administrative controls for live question release and pacing"
      ],
      github: "https://github.com/GauravSingh094",
      live: ""
    },
    {
      title: "Spring PetClinic",
      category: "Full-Stack Java Application",
      stack: "Spring Boot, Spring MVC, Spring Data JPA, Thymeleaf, MySQL, Maven",
      desc: "Full-stack Java application for managing pet clinic workflows including owners, veterinarians, appointments, and data persistence.",
      highlights: [
        "Layered Enterprise MVC architecture separating data, controllers, and pages",
        "JPA/Hibernate ORM integration with high-efficiency custom MySQL queries",
        "Structured server-side UI rendering using modern semantic layout frames",
        "Extensive Maven dependencies setup with complete database integration testing"
      ],
      github: "https://github.com/GauravSingh094",
      live: ""
    },
    {
      title: "SoulSync",
      category: "AI-Powered Music App",
      stack: "Flutter, Dart, Firebase, Machine Learning, YouTube API",
      desc: "Emotion-based music player application that personalizes the listening experience by detecting the user’s mood and recommending songs accordingly.",
      highlights: [
        "Intelligent real-time facial expression tracking for emotion detection",
        "Personalized music curation based on mood detection metrics",
        "Seamless streaming integration with official public YouTube audio APIs",
        "Vibrant cross-platform design providing premium fluid micro-interactions"
      ],
      github: "https://github.com/GauravSingh094",
      live: ""
    }
  ];

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % projects.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));

  return (
    <section id="work" className="relative z-20 bg-[#0a0a0a] py-40 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-neutral-900 border-dashed">
      <div className="max-w-screen-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:justify-between md:items-end border-b border-neutral-800 pb-12 mb-16 gap-8 md:gap-0"
        >
          <h2 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-800 tracking-tighter uppercase leading-none">
            My Work
          </h2>
          <div className="flex gap-4">
            <button onClick={prevSlide} className="w-16 h-16 rounded-full border border-neutral-700 flex items-center justify-center text-white hover:bg-cyan-400 hover:text-[#0a0a0a] hover:border-cyan-400 transition-all cursor-hover group">
              <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button onClick={nextSlide} className="w-16 h-16 rounded-full border border-neutral-700 flex items-center justify-center text-white hover:bg-cyan-400 hover:text-[#0a0a0a] hover:border-cyan-400 transition-all cursor-hover group">
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
        
        <div className="relative min-h-[650px] flex items-center">
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.95 }}
              animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
              exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 w-full"
            >
              {/* Left Content */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <span className="text-8xl font-black text-neutral-800 mb-8 font-mono tracking-tighter leading-none select-none">
                  {(currentIndex + 1).toString().padStart(2, '0')}
                </span>
                
                <p className="text-cyan-400 font-mono tracking-widest uppercase text-sm mb-4">
                  {projects[currentIndex].category}
                </p>
                
                <h3 className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight uppercase leading-none">
                  {projects[currentIndex].title}
                </h3>
                
                <p className="text-neutral-400 text-xl font-light leading-relaxed mb-8">
                  {projects[currentIndex].desc}
                </p>

                {/* Professional Links CTAs */}
                <div className="flex flex-wrap gap-4 mb-10">
                  {projects[currentIndex].live && (
                    <a
                      href={projects[currentIndex].live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-full bg-cyan-400 text-[#0a0a0a] font-mono text-sm font-bold tracking-wider hover:bg-white hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all flex items-center gap-2 group/btn cursor-hover"
                    >
                      <span>Live Preview</span>
                      <ExternalLink size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                  {projects[currentIndex].github && (
                    <a
                      href={projects[currentIndex].github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-full bg-transparent border border-neutral-700 text-white font-mono text-sm font-bold tracking-wider hover:border-cyan-400 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.1)] transition-all flex items-center gap-2 group/btn cursor-hover"
                    >
                      <Github size={16} />
                      <span>Source Code</span>
                    </a>
                  )}
                </div>
                
                <div className="pt-8 border-t border-neutral-800 border-dashed">
                  <h4 className="text-neutral-500 font-mono text-xs mb-4 uppercase tracking-widest">Tools & Features</h4>
                  <p className="text-cyan-200/80 font-mono text-sm leading-relaxed">
                    {projects[currentIndex].stack}
                  </p>
                </div>
              </div>

              {/* Right Visual/Placeholder with strong editorial border */}
              <div className="lg:col-span-7 relative overflow-hidden bg-[#0c0c0c]/90 border border-neutral-800 rounded-lg h-[450px] lg:h-[650px] group flex flex-col justify-between p-8 md:p-12 transition-all duration-500 hover:border-cyan-500/30">
                 {/* Premium Background Grid & Spotlights */}
                 <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(34,211,238,0.06),transparent_60%)] pointer-events-none" />
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(6,182,212,0.03),transparent_50%)] pointer-events-none" />
                 
                 {/* Top Bar (Browser/Terminal Mockup Header) */}
                 <div className="flex justify-between items-center w-full pb-6 border-b border-neutral-800/80 z-10">
                   <div className="flex gap-2">
                     <span className="w-3 h-3 rounded-full bg-neutral-800 group-hover:bg-red-500/60 transition-colors" />
                     <span className="w-3 h-3 rounded-full bg-neutral-800 group-hover:bg-yellow-500/60 transition-colors" />
                     <span className="w-3 h-3 rounded-full bg-neutral-800 group-hover:bg-green-500/60 transition-colors" />
                   </div>
                   <div className="text-[10px] font-mono text-neutral-600 group-hover:text-cyan-500/60 tracking-widest uppercase transition-colors">
                     SECURE CONTAINER // {projects[currentIndex].title.replace(/\s+/g, "_").toUpperCase()}_NODE
                   </div>
                 </div>

                 {/* Middle Layout showing highlights elegantly */}
                 <div className="flex-1 flex flex-col justify-center py-8 z-10">
                   <h4 className="text-xs font-mono text-cyan-400/60 tracking-[0.25em] uppercase mb-6 font-semibold">
                     // Key Capabilities
                   </h4>
                   <div className="space-y-4">
                     {projects[currentIndex].highlights.map((highlight, idx) => (
                       <motion.div 
                         key={idx}
                         initial={{ opacity: 0, x: 20 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: idx * 0.1 }}
                         className="flex items-start gap-4 group/item"
                       >
                         <span className="font-mono text-cyan-400 mt-1 text-xs select-none">[{idx + 1}]</span>
                         <p className="text-neutral-300 group-hover/item:text-white font-light text-base lg:text-lg transition-colors leading-relaxed">
                           {highlight}
                         </p>
                       </motion.div>
                     ))}
                   </div>
                 </div>

                 {/* Bottom Bar containing metadata */}
                 <div className="flex justify-between items-end w-full pt-6 border-t border-neutral-800/80 z-10 text-[10px] font-mono text-neutral-600">
                   <div>
                     STATUS: <span className="text-emerald-500 animate-pulse font-semibold">DEPLOYED</span>
                   </div>
                   <div>
                     RENDER_INDEX: 00{currentIndex + 1}
                   </div>
                 </div>

                 {/* Corner Accent Glows */}
                 <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-neutral-800 group-hover:border-cyan-400/50 transition-colors duration-500" />
                 <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-neutral-800 group-hover:border-cyan-400/50 transition-colors duration-500" />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dot Indicators */}
          <div className="absolute top-0 left-0 lg:left-[-40px] h-full hidden lg:flex flex-col justify-center gap-4">
            {projects.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentIndex(i)}
                className={`w-1 transition-all duration-500 ${i === currentIndex ? 'h-16 bg-cyan-400' : 'h-4 bg-neutral-800 hover:bg-neutral-600 cursor-hover'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
