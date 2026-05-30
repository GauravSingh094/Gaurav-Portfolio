'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FileText, Download, ExternalLink, Linkedin, Github, GraduationCap, Briefcase, Code, Award, CheckCircle } from 'lucide-react';

export default function ResumeJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track mouse coordinates for subtle card parallax tilt
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const box = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - box.left) / box.width - 0.5;
    const y = (e.clientY - box.top) / box.height - 0.5;
    setMousePos({ x, y });
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Storytelling scroll progress thresholds
  // 0.0 - 0.20: Step 1 (Intro cinematic text)
  // 0.20 - 0.40: Step 2 (MacBook slides and fades in)
  // 0.40 - 0.50: Step 3A (Highlight: Education)
  // 0.50 - 0.60: Step 3B (Highlight: Internship)
  // 0.60 - 0.70: Step 3C (Highlight: Projects)
  // 0.70 - 0.80: Step 3D (Highlight: Skills)
  // 0.80 - 0.92: Step 4 (Cinematic exit text)
  // 0.92 - 1.00: Step 5 (CTAs and download buttons)

  // Map scroll progress to visibility and transforms
  const text1Opacity = useTransform(scrollYProgress, [0, 0.12, 0.18], [1, 1, 0]);
  const text1Scale = useTransform(scrollYProgress, [0, 0.12, 0.18], [1, 1.05, 0.95]);

  const laptopOpacity = useTransform(scrollYProgress, [0.16, 0.24, 0.80, 0.86], [0, 1, 1, 0]);
  const laptopScale = useTransform(scrollYProgress, [0.16, 0.24, 0.80, 0.86], [0.8, 1, 1, 0.85]);
  const laptopY = useTransform(scrollYProgress, [0.16, 0.24], [50, 0]);

  // Highlight steps mapping
  const activeStep = useTransform(scrollYProgress, (progress) => {
    if (progress < 0.22) return 'none';
    if (progress >= 0.22 && progress < 0.44) return 'intro';
    if (progress >= 0.44 && progress < 0.54) return 'education';
    if (progress >= 0.54 && progress < 0.64) return 'internship';
    if (progress >= 0.64 && progress < 0.74) return 'projects';
    if (progress >= 0.74 && progress < 0.84) return 'skills';
    return 'exit';
  });

  // Floating reveals tracking state
  const [currentSection, setCurrentSection] = useState('none');
  useEffect(() => {
    return activeStep.onChange((v) => {
      setCurrentSection(v);
    });
  }, [activeStep]);

  // Connectors and Keynotes transforms
  const text2Opacity = useTransform(scrollYProgress, [0.82, 0.88, 0.94], [0, 1, 0]);
  const text2Scale = useTransform(scrollYProgress, [0.82, 0.88, 0.94], [0.95, 1, 1.05]);

  const ctaOpacity = useTransform(scrollYProgress, [0.91, 0.96], [0, 1]);
  const ctaScale = useTransform(scrollYProgress, [0.91, 0.96], [0.96, 1]);

  const driveUrl = "https://drive.google.com/file/d/1zxa1Co29lOq7zD1bm-5sdHRpOVuzmimH/view?usp=drivesdk";

  return (
    <div 
      id="resume"
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMousePos({ x: 0, y: 0 }); }}
      className="relative z-20 bg-[#050507] w-full min-h-[450vh] select-none overflow-hidden"
    >
      {/* Background ambient mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(6,182,212,0.03),transparent_60%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none z-0" />

      {/* Floating starry dust */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[1.5px] h-[1.5px] rounded-full bg-cyan-400/20 animate-pulse"
            style={{
              left: `${10 + i * 6.5}%`,
              top: `${15 + (i % 3) * 22}%`,
              animationDuration: `${2.5 + (i % 2) * 1.5}s`,
            }}
          />
        ))}
      </div>

      {/* Sticky locked canvas layer */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-center items-center overflow-hidden z-10 px-6">
        
        {/* Step 1: Entry text */}
        <motion.div
          style={{ opacity: text1Opacity, scale: text1Scale }}
          className="absolute text-center max-w-4xl z-20 pointer-events-none"
        >
          <span className="font-mono text-[9px] text-cyan-400 tracking-[0.45em] uppercase mb-6 block">
            [ SYSTEM JOURNAL ]
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-white uppercase mb-8">
            MORE THAN A RESUME<br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.2)' }}>IT'S MY JOURNEY</span>
          </h2>
          <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest animate-pulse">
            // Scroll down to begin the story
          </p>
        </motion.div>

        {/* MacBook Centerpiece Frame */}
        <motion.div
          style={{ 
            opacity: laptopOpacity, 
            scale: laptopScale,
            y: laptopY,
            perspective: 1200
          }}
          className="relative w-full max-w-4xl aspect-[1.6/1] flex flex-col items-center z-15 pointer-events-none"
        >
          {/* Laptop 3D container */}
          <div 
            className="relative w-full h-[85%] rounded-t-3xl transition-transform duration-500 ease-out"
            style={{
              transform: `rotateX(${-3 + mousePos.y * -8}deg) rotateY(${mousePos.x * 12}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Screen Lid border & shadow */}
            <div className="absolute inset-0 bg-[#1d1d1f] rounded-2xl border-[4px] border-[#2d2d30] shadow-2xl overflow-hidden flex flex-col justify-between p-2">
              
              {/* Glossy screen screen reflection cover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.015] to-white/[0.04] pointer-events-none z-10" />

              {/* Screen Camera Notch */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-b-xl z-20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-900/60" />
              </div>

              {/* Actual resume page mockup panel */}
              <div className="relative w-full h-full bg-[#0a0a0d] rounded-xl overflow-hidden p-6 md:p-8 flex flex-col justify-between border border-white/5 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:100%_15px] pointer-events-none" />

                {/* Mockup Resume structure */}
                <div className="w-full space-y-5 overflow-hidden pr-2">
                  
                  {/* Resume Header */}
                  <div className="flex justify-between items-end border-b border-neutral-900 pb-3">
                    <div>
                      <h4 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase leading-none">GAURAV SINGH</h4>
                      <p className="text-[8px] font-mono text-cyan-400 uppercase tracking-widest mt-1">Systems & Web Engineer</p>
                    </div>
                    <span className="font-mono text-[7px] text-neutral-600">SYS_V2.06_DEPLOY</span>
                  </div>

                  {/* Highlight: Education */}
                  <div 
                    className={`p-3 rounded-xl border transition-all duration-500 ${
                      currentSection === 'education' 
                        ? 'bg-cyan-500/[0.03] border-cyan-500/35 shadow-[0_0_20px_rgba(6,182,212,0.1)]' 
                        : 'border-transparent opacity-45'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <GraduationCap size={12} className="text-cyan-400" />
                      <span className="text-[9px] font-mono font-bold text-white uppercase tracking-wider">Education Dossier</span>
                    </div>
                    <div className="space-y-1 pl-4 border-l border-neutral-800">
                      <div className="flex justify-between text-[8px] font-bold text-neutral-300">
                        <span>B.Tech in Computer Science (NITRA / AKTU)</span>
                        <span className="font-mono text-cyan-500">2022 – 2026</span>
                      </div>
                      <p className="text-[7px] text-neutral-500">Ghaziabad, UP // Computer Science & Systems</p>
                    </div>
                  </div>

                  {/* Highlight: Internship */}
                  <div 
                    className={`p-3 rounded-xl border transition-all duration-500 ${
                      currentSection === 'internship' 
                        ? 'bg-cyan-500/[0.03] border-cyan-500/35 shadow-[0_0_20px_rgba(6,182,212,0.1)]' 
                        : 'border-transparent opacity-45'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <Briefcase size={12} className="text-cyan-400" />
                      <span className="text-[9px] font-mono font-bold text-white uppercase tracking-wider">Work Internship Experience</span>
                    </div>
                    <div className="space-y-1 pl-4 border-l border-neutral-800">
                      <div className="flex justify-between text-[8px] font-bold text-neutral-300">
                        <span>Web Developer Intern (InnoByte Services)</span>
                        <span className="font-mono text-cyan-500">2025</span>
                      </div>
                      <p className="text-[7px] text-neutral-500">Remote // Shipped Responsive Web Modules & Code Refactorings</p>
                    </div>
                  </div>

                  {/* Highlight: Projects */}
                  <div 
                    className={`p-3 rounded-xl border transition-all duration-500 ${
                      currentSection === 'projects' 
                        ? 'bg-cyan-500/[0.03] border-cyan-500/35 shadow-[0_0_20px_rgba(6,182,212,0.1)]' 
                        : 'border-transparent opacity-45'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <Code size={12} className="text-cyan-400" />
                      <span className="text-[9px] font-mono font-bold text-white uppercase tracking-wider">Engineering Initiatives</span>
                    </div>
                    <div className="space-y-1.5 pl-4 border-l border-neutral-800">
                      <div className="flex justify-between text-[8px] font-bold text-neutral-300">
                        <span>AI Music Player & Quiz Platform</span>
                        <span className="font-mono text-cyan-500">Active</span>
                      </div>
                      <p className="text-[7px] text-neutral-500">Built emotion-based recommendation algorithms & concurrent quiz leaderboards.</p>
                    </div>
                  </div>

                  {/* Highlight: Skills */}
                  <div 
                    className={`p-3 rounded-xl border transition-all duration-500 ${
                      currentSection === 'skills' 
                        ? 'bg-cyan-500/[0.03] border-cyan-500/35 shadow-[0_0_20px_rgba(6,182,212,0.1)]' 
                        : 'border-transparent opacity-45'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <Award size={12} className="text-cyan-400" />
                      <span className="text-[9px] font-mono font-bold text-white uppercase tracking-wider">Technical Capability Matrix</span>
                    </div>
                    <div className="pl-4 border-l border-neutral-800 flex flex-wrap gap-1.5">
                      {['Flutter', 'React.js', 'Next.js', 'Spring Boot', 'Java', 'MySQL', 'MongoDB'].map((skill) => (
                        <span key={skill} className="text-[6px] font-mono bg-neutral-900 border border-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Resume Bottom */}
                <div className="border-t border-neutral-900 pt-3 flex justify-between items-center text-[7px] font-mono text-neutral-600">
                  <span>DEPLOYED // READY</span>
                  <span>VERIFIED ORIGINAL</span>
                </div>

              </div>

            </div>
          </div>

          {/* Realistic Keyboard Laptop Base tilt projection */}
          <div 
            className="w-[106%] h-[8px] bg-gradient-to-r from-[#202022] via-[#48484a] to-[#202022] rounded-t-sm shadow-2xl relative z-10"
            style={{
              transform: `rotateX(${65 + mousePos.y * -4}deg) translateY(-8px) translateZ(10px)`,
              transformOrigin: 'bottom center',
              boxShadow: '0 10px 40px rgba(0,0,0,0.9)'
            }}
          >
            {/* Display thin sleek lip notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-[2px] bg-black/60 rounded-b" />
          </div>

          {/* Interactive Floating Keynotes around laptop - Apple-keynote style */}
          <AnimatePresence>
            {currentSection === 'education' && (
              <motion.div
                initial={{ opacity: 0, x: -50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, scale: 0.95 }}
                className="absolute left-[-260px] top-[15%] w-[240px] pointer-events-none hidden xl:block"
              >
                <div className="bg-[#0c0c11]/85 border border-cyan-500/20 backdrop-blur-md p-6 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.8)]">
                  <div className="flex items-center gap-2 mb-2 font-mono text-[9px] text-cyan-400">
                    <span>// CREDENTIAL</span>
                  </div>
                  <h5 className="text-white text-base font-bold uppercase mb-1">First-Class Distinction</h5>
                  <p className="text-neutral-500 text-xs font-light leading-relaxed">
                    Maintained high standards across AKTU ghaziabad computer science syllabus.
                  </p>
                </div>
              </motion.div>
            )}

            {currentSection === 'internship' && (
              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 30, scale: 0.95 }}
                className="absolute right-[-260px] top-[25%] w-[240px] pointer-events-none hidden xl:block"
              >
                <div className="bg-[#0c0c11]/85 border border-cyan-500/20 backdrop-blur-md p-6 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.8)]">
                  <div className="flex items-center gap-2 mb-2 font-mono text-[9px] text-cyan-400">
                    <span>// SHIPPED CODE</span>
                  </div>
                  <h5 className="text-white text-base font-bold uppercase mb-1">Industry Experience</h5>
                  <p className="text-neutral-500 text-xs font-light leading-relaxed">
                    Shipped clean interface components, responsive layout modules, and system testing.
                  </p>
                </div>
              </motion.div>
            )}

            {currentSection === 'projects' && (
              <motion.div
                initial={{ opacity: 0, x: -50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, scale: 0.95 }}
                className="absolute left-[-260px] top-[40%] w-[240px] pointer-events-none hidden xl:block"
              >
                <div className="bg-[#0c0c11]/85 border border-cyan-500/20 backdrop-blur-md p-6 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.8)]">
                  <div className="flex items-center gap-2 mb-2 font-mono text-[9px] text-cyan-400">
                    <span>// BUILDS</span>
                  </div>
                  <h5 className="text-white text-base font-bold uppercase mb-1">15+ Projects Built</h5>
                  <p className="text-neutral-500 text-xs font-light leading-relaxed">
                    Designed and launched high-performance tools covering real-time systems and ML interfaces.
                  </p>
                </div>
              </motion.div>
            )}

            {currentSection === 'skills' && (
              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 30, scale: 0.95 }}
                className="absolute right-[-260px] top-[50%] w-[240px] pointer-events-none hidden xl:block"
              >
                <div className="bg-[#0c0c11]/85 border border-cyan-500/20 backdrop-blur-md p-6 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.8)]">
                  <div className="flex items-center gap-2 mb-2 font-mono text-[9px] text-cyan-400">
                    <span>// MATRIX</span>
                  </div>
                  <h5 className="text-white text-base font-bold uppercase mb-1">Full-Stack Capability</h5>
                  <p className="text-neutral-500 text-xs font-light leading-relaxed">
                    Engineered modular applications using Spring Boot Java backends and React frontends.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>

        {/* Step 4: Exit cinematic message */}
        <motion.div
          style={{ opacity: text2Opacity, scale: text2Scale }}
          className="absolute text-center max-w-4xl z-20 pointer-events-none"
        >
          <span className="font-mono text-[9px] text-cyan-400 tracking-[0.45em] uppercase mb-6 block">
            [ SYSTEM SUMMARY ]
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none text-white uppercase mb-8">
            THIS RESUME OPENS DOORS<br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.2)' }}>THE PROJECTS CREATE IMPACT</span>
          </h2>
        </motion.div>

        {/* Step 5: Final minimal Actions Hub */}
        <motion.div
          style={{ opacity: ctaOpacity, scale: ctaScale }}
          className="absolute flex flex-col items-center max-w-2xl z-25 pointer-events-auto"
        >
          <span className="font-mono text-[9px] text-cyan-400 tracking-[0.45em] uppercase mb-6 block">
            [ SECURE ACTIONS ARCHIVE ]
          </span>
          
          <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase mb-8 text-center leading-none">
            Ready to Deploy
          </h3>

          <div className="flex flex-col sm:flex-row gap-5 w-full justify-center">
            {/* View CV direct drive view */}
            <a 
              href={driveUrl}
              target="_blank"
              rel="noreferrer"
              className="group relative bg-[#0c0c11]/85 hover:bg-[#0c0c11] border border-white/5 hover:border-cyan-500/30 text-white font-mono font-bold text-xs tracking-widest uppercase py-4.5 px-8 rounded-2xl flex items-center justify-center gap-2.5 transition-all duration-300 shadow-xl cursor-hover"
            >
              <FileText size={15} className="text-cyan-400" />
              <span>View Resume</span>
              <ExternalLink size={12} className="text-neutral-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Direct Drive download action */}
            <a 
              href={driveUrl}
              target="_blank"
              rel="noreferrer"
              className="group relative bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-black font-mono font-bold text-xs tracking-widest uppercase py-4.5 px-8 rounded-2xl flex items-center justify-center gap-2.5 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] cursor-hover"
            >
              <Download size={15} strokeWidth={2.5} />
              <span>Download CV</span>
            </a>
          </div>

          <div className="flex gap-6 mt-10 text-neutral-500 font-mono text-[10px] uppercase tracking-wider">
            <a href="https://linkedin.com/in/gaurav-singh-276944292" target="_blank" rel="noreferrer" className="hover:text-white transition-colors cursor-hover flex items-center gap-1">
              <Linkedin size={12} />
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com/GauravSingh094" target="_blank" rel="noreferrer" className="hover:text-white transition-colors cursor-hover flex items-center gap-1">
              <Github size={12} />
              <span>GitHub</span>
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
