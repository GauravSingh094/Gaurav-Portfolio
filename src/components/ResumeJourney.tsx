'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FileText, Download, ExternalLink, Linkedin, Github, GraduationCap, Briefcase, Code, Award, CheckCircle } from 'lucide-react';

export default function ResumeJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track mouse coordinates for card parallax tilt
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

  // Storytelling scroll progress mapping
  // 0.00 - 0.15: Stage 1 (Intro Text, Laptop is subtle)
  // 0.15 - 0.28: Stage 2 (Laptop scales up and becomes bright)
  // 0.28 - 0.42: Stage 3 (Education glows, floating text 1)
  // 0.42 - 0.54: Stage 4 (Projects glows, floating text 2)
  // 0.54 - 0.66: Stage 5 (Internship glows, floating text 3)
  // 0.66 - 0.78: Stage 6 (Skills glows, floating text particles)
  // 0.78 - 0.90: Stage 7 (Final cinematic message)
  // 0.90 - 1.00: Stage 8 (CTA controls)

  // Map scroll progress to visibility and transforms
  const text1Opacity = useTransform(scrollYProgress, [0, 0.12, 0.18], [1, 1, 0]);
  const text1Scale = useTransform(scrollYProgress, [0, 0.12, 0.18], [1, 1.05, 0.95]);

  // Laptop visibility and hero scale transitions
  // Starts subtle, scales forward to become the absolute dominant visual hero (Apple depth zoom)
  const laptopOpacity = useTransform(scrollYProgress, [0.08, 0.18, 0.82, 0.88], [0.10, 1, 1, 0]);
  const laptopScale = useTransform(scrollYProgress, [0.08, 0.18, 0.82, 0.88], [0.65, 1.25, 1.25, 0.85]);
  const laptopY = useTransform(scrollYProgress, [0.08, 0.18], [50, 0]);

  // Active highlighted areas inside the resume sheet
  const activeStep = useTransform(scrollYProgress, (progress) => {
    if (progress < 0.26) return 'intro';
    if (progress >= 0.26 && progress < 0.42) return 'education';
    if (progress >= 0.42 && progress < 0.54) return 'projects';
    if (progress >= 0.54 && progress < 0.66) return 'internship';
    if (progress >= 0.66 && progress < 0.78) return 'skills';
    return 'exit';
  });

  const [currentSection, setCurrentSection] = useState('intro');
  useEffect(() => {
    return activeStep.onChange((v) => {
      setCurrentSection(v);
    });
  }, [activeStep]);

  // Floating reveals transforms (Pure typography reveals, absolutely zero cards/boxes)
  const educationOpacity = useTransform(scrollYProgress, [0.26, 0.30, 0.38, 0.42], [0, 1, 1, 0]);
  const educationY = useTransform(scrollYProgress, [0.26, 0.30], [20, 0]);

  const projectsOpacity = useTransform(scrollYProgress, [0.42, 0.46, 0.50, 0.54], [0, 1, 1, 0]);
  const projectsY = useTransform(scrollYProgress, [0.42, 0.46], [20, 0]);

  const internshipOpacity = useTransform(scrollYProgress, [0.54, 0.58, 0.62, 0.66], [0, 1, 1, 0]);
  const internshipY = useTransform(scrollYProgress, [0.54, 0.58], [20, 0]);

  const skillsOpacity = useTransform(scrollYProgress, [0.66, 0.70, 0.74, 0.78], [0, 1, 1, 0]);
  const skillsY = useTransform(scrollYProgress, [0.66, 0.70], [20, 0]);

  // Exit Cinematic Message transforms
  const text2Opacity = useTransform(scrollYProgress, [0.80, 0.86, 0.91], [0, 1, 0]);
  const text2Scale = useTransform(scrollYProgress, [0.80, 0.86, 0.91], [0.96, 1, 1.04]);

  // Final Action Center transforms
  const ctaOpacity = useTransform(scrollYProgress, [0.90, 0.95], [0, 1]);
  const ctaScale = useTransform(scrollYProgress, [0.90, 0.95], [0.96, 1]);

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
      {/* Dynamic Keyframe Animations for Screen glows & scanline effect */}
      <style dangerouslySetInnerHTML={{__html: `
        .scanline-active {
          position: relative;
          overflow: hidden;
        }
        .scanline-active::after {
          content: '';
          position: absolute;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(to right, transparent, rgba(34,211,238,0.5), transparent);
          animation: scan 1.8s linear infinite;
        }
        .glow-active {
          box-shadow: 0 0 30px rgba(6, 182, 212, 0.3);
          border-color: rgba(34, 211, 238, 0.45) !important;
          animation: subtlePulse 2.5s infinite ease-in-out;
        }
        @keyframes scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        @keyframes subtlePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.008); }
        }
      `}} />

      {/* Background ambient mesh spotlights */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(6,182,212,0.03),transparent_55%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none z-0" />

      {/* Drifting star elements */}
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

      {/* Sticky storyteller locking container */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-center items-center overflow-hidden z-10 px-6">
        
        {/* Stage 1: Reduced size, clean intro text */}
        <motion.div
          style={{ opacity: text1Opacity, scale: text1Scale }}
          className="absolute text-center max-w-2xl z-20 pointer-events-none"
        >
          <span className="font-mono text-[9px] text-cyan-400 tracking-[0.45em] uppercase mb-4 block">
            [ SYSTEM JOURNAL ]
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-none text-white uppercase mb-5">
            MORE THAN A RESUME
          </h2>
          <p className="text-neutral-500 font-mono text-[10px] uppercase tracking-widest animate-pulse">
            // Scroll to begin journey
          </p>
        </motion.div>

        {/* MacBook Centerpiece Showcase Frame */}
        <motion.div
          style={{ 
            opacity: laptopOpacity, 
            scale: laptopScale,
            y: laptopY,
            perspective: 1200
          }}
          className="relative w-full max-w-3xl aspect-[1.6/1] flex flex-col items-center z-15 pointer-events-none"
        >
          {/* Laptop 3D interactive tilting container */}
          <div 
            className="relative w-full h-[85%] rounded-t-3xl transition-transform duration-500 ease-out"
            style={{
              transform: `rotateX(${-2.5 + mousePos.y * -8}deg) rotateY(${mousePos.x * 12}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Screen Space Gray Aluminium border shell */}
            <div className="absolute inset-0 bg-[#151516] rounded-2xl border-[5px] border-[#1d1d1f] shadow-[0_30px_70px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col justify-between p-2">
              
              {/* Glossy screen glass reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.02] to-white/[0.06] pointer-events-none z-10" />

              {/* Camera Hinge Notch */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-b-xl z-20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-950/60" />
              </div>

              {/* Real Resume Mockup Sheet */}
              <div className="relative w-full h-full bg-[#0a0a0d] rounded-xl overflow-hidden p-6 md:p-8 flex flex-col justify-between border border-white/5 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:100%_15px] pointer-events-none" />

                {/* Resume layout items */}
                <div className="w-full space-y-4 md:space-y-5 overflow-hidden pr-2">
                  
                  {/* Resume Header */}
                  <div className="flex justify-between items-end border-b border-neutral-900 pb-3">
                    <div>
                      <h4 className="text-xl font-black text-white tracking-tight uppercase leading-none font-sans">GAURAV SINGH</h4>
                      <p className="text-[7.5px] font-mono text-cyan-400 uppercase tracking-widest mt-1">Systems & Web Engineer</p>
                    </div>
                    <span className="font-mono text-[7px] text-neutral-600">SYS_V2.06_DEPLOY</span>
                  </div>

                  {/* Section: Education */}
                  <div 
                    className={`p-3 rounded-xl border transition-all duration-500 ${
                      currentSection === 'education' 
                        ? 'glow-active scanline-active bg-cyan-500/[0.02]' 
                        : 'border-transparent opacity-25'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <GraduationCap size={11} className="text-cyan-400" />
                      <span className="text-[8px] font-mono font-bold text-white uppercase tracking-wider">Education Dossier</span>
                    </div>
                    <div className="space-y-1 pl-4 border-l border-neutral-800">
                      <div className="flex justify-between text-[8px] font-bold text-neutral-300">
                        <span>B.Tech in Computer Science (NITRA / AKTU)</span>
                        <span className="font-mono text-cyan-500">2022 – 2026</span>
                      </div>
                      <p className="text-[7px] text-neutral-500 font-sans">Ghaziabad, UP // Computer Science & Systems</p>
                    </div>
                  </div>

                  {/* Section: Internship */}
                  <div 
                    className={`p-3 rounded-xl border transition-all duration-500 ${
                      currentSection === 'internship' 
                        ? 'glow-active scanline-active bg-cyan-500/[0.02]' 
                        : 'border-transparent opacity-25'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <Briefcase size={11} className="text-cyan-400" />
                      <span className="text-[8px] font-mono font-bold text-white uppercase tracking-wider">Work Internship Experience</span>
                    </div>
                    <div className="space-y-1 pl-4 border-l border-neutral-800">
                      <div className="flex justify-between text-[8px] font-bold text-neutral-300">
                        <span>Web Developer Intern (InnoByte Services)</span>
                        <span className="font-mono text-cyan-500">2025</span>
                      </div>
                      <p className="text-[7px] text-neutral-500 font-sans">Remote // Shipped Responsive Web Modules & Code Refactorings</p>
                    </div>
                  </div>

                  {/* Section: Projects */}
                  <div 
                    className={`p-3 rounded-xl border transition-all duration-500 ${
                      currentSection === 'projects' 
                        ? 'glow-active scanline-active bg-cyan-500/[0.02]' 
                        : 'border-transparent opacity-25'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <Code size={11} className="text-cyan-400" />
                      <span className="text-[8px] font-mono font-bold text-white uppercase tracking-wider">Engineering Initiatives</span>
                    </div>
                    <div className="space-y-1.5 pl-4 border-l border-neutral-800">
                      <div className="flex justify-between text-[8px] font-bold text-neutral-300 font-sans">
                        <span>AI Music Player & Quiz Platform</span>
                        <span className="font-mono text-cyan-500">Active</span>
                      </div>
                      <p className="text-[7px] text-neutral-500 font-sans">Built emotion-based recommendation algorithms & concurrent quiz leaderboards.</p>
                    </div>
                  </div>

                  {/* Section: Skills */}
                  <div 
                    className={`p-3 rounded-xl border transition-all duration-500 ${
                      currentSection === 'skills' 
                        ? 'glow-active scanline-active bg-cyan-500/[0.02]' 
                        : 'border-transparent opacity-25'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <Award size={11} className="text-cyan-400" />
                      <span className="text-[8px] font-mono font-bold text-white uppercase tracking-wider">Technical Capability Matrix</span>
                    </div>
                    <div className="pl-4 border-l border-neutral-800 flex flex-wrap gap-1.5">
                      {['Flutter', 'React.js', 'Next.js', 'Spring Boot', 'Java', 'MySQL', 'MongoDB'].map((skill) => (
                        <span key={skill} className="text-[5.5px] font-mono bg-neutral-900 border border-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded">
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

          {/* Realistic Keyboard base */}
          <div 
            className="w-[106%] h-[8px] bg-gradient-to-r from-[#1b1b1c] via-[#48484a] to-[#1b1b1c] rounded-t-sm shadow-2xl relative z-10"
            style={{
              transform: `rotateX(65deg) translateY(-8px) translateZ(10px)`,
              transformOrigin: 'bottom center',
              boxShadow: '0 15px 45px rgba(0,0,0,0.9)'
            }}
          >
            {/* Sleeping lip notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-[2px] bg-black/60 rounded-b" />
          </div>

          {/* Floating Keynote achievements reveals - Elegant floating typography, zero cards/boxes */}
          <AnimatePresence>
            {currentSection === 'education' && (
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute left-[-240px] top-[20%] w-[220px] pointer-events-none hidden xl:block text-left"
              >
                <div className="font-mono text-[9px] text-cyan-400 tracking-[0.25em] mb-1.5">// ACADEMIC DECREE</div>
                <h5 className="text-white text-lg font-black uppercase leading-tight mb-2">B.Tech Computer Science</h5>
                <p className="text-neutral-500 font-mono text-[10px] uppercase tracking-wider">2022–2026 // NITRA / AKTU</p>
              </motion.div>
            )}

            {currentSection === 'projects' && (
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute right-[-240px] top-[30%] w-[220px] pointer-events-none hidden xl:block text-right"
              >
                <div className="font-mono text-[9px] text-cyan-400 tracking-[0.25em] mb-1.5">// ENGINEERING BUILDS</div>
                <h5 className="text-white text-lg font-black uppercase leading-tight mb-2">15+ Projects Built</h5>
                <p className="text-neutral-500 font-mono text-[10px] uppercase tracking-wider font-sans">Emotion recommenders & quiz systems</p>
              </motion.div>
            )}

            {currentSection === 'internship' && (
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute left-[-240px] top-[40%] w-[220px] pointer-events-none hidden xl:block text-left"
              >
                <div className="font-mono text-[9px] text-cyan-400 tracking-[0.25em] mb-1.5">// EXPERTISE SHIPPED</div>
                <h5 className="text-white text-lg font-black uppercase leading-tight mb-2">Industry Experience</h5>
                <p className="text-neutral-500 font-mono text-[10px] uppercase tracking-wider">Web Developer Intern at InnoByte Services</p>
              </motion.div>
            )}

            {currentSection === 'skills' && (
              <motion.div
                className="absolute right-[-240px] top-[20%] w-[220px] pointer-events-none hidden xl:flex flex-col items-end gap-2.5 text-right"
              >
                <div className="font-mono text-[9px] text-cyan-400 tracking-[0.25em] mb-1.5">// TECH CAPABILITIES</div>
                {[
                  { text: 'Flutter', color: 'text-white' },
                  { text: 'Spring Boot', color: 'text-[#58a6ff]' },
                  { text: 'React', color: 'text-teal-400' },
                  { text: 'AI Systems', color: 'text-cyan-400' }
                ].map((skill, sIdx) => (
                  <motion.div
                    key={skill.text}
                    initial={{ opacity: 0, y: 15, x: 10 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, delay: sIdx * 0.08, ease: "easeOut" }}
                    className={`text-xl font-black uppercase tracking-tight leading-none ${skill.color} drop-shadow-[0_0_8px_rgba(6,182,212,0.15)]`}
                  >
                    {skill.text}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>

        {/* Mobile / Tablet floating text display (Visible below xl screens to keep experience fully responsive) */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-sm pointer-events-none xl:hidden text-center z-30">
          <AnimatePresence mode="wait">
            {currentSection === 'education' && (
              <motion.div
                key="edu-mobile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="px-6"
              >
                <span className="font-mono text-[8px] text-cyan-400 tracking-[0.2em] uppercase block mb-1">// ACADEMIC DECREE</span>
                <h5 className="text-white text-base font-black uppercase leading-tight">B.Tech Computer Science</h5>
                <p className="text-neutral-500 font-mono text-[9px] uppercase mt-1">2022–2026 // NITRA / AKTU</p>
              </motion.div>
            )}

            {currentSection === 'projects' && (
              <motion.div
                key="proj-mobile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="px-6"
              >
                <span className="font-mono text-[8px] text-cyan-400 tracking-[0.2em] uppercase block mb-1">// ENGINEERING BUILDS</span>
                <h5 className="text-white text-base font-black uppercase leading-tight">15+ Projects Built</h5>
                <p className="text-neutral-500 font-mono text-[9px] uppercase mt-1">Emotion Recommend & Quiz Platforms</p>
              </motion.div>
            )}

            {currentSection === 'internship' && (
              <motion.div
                key="intern-mobile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="px-6"
              >
                <span className="font-mono text-[8px] text-cyan-400 tracking-[0.2em] uppercase block mb-1">// EXPERTISE SHIPPED</span>
                <h5 className="text-white text-base font-black uppercase leading-tight">Industry Experience</h5>
                <p className="text-neutral-500 font-mono text-[9px] uppercase mt-1">Web Intern at InnoByte Services</p>
              </motion.div>
            )}

            {currentSection === 'skills' && (
              <motion.div
                key="skills-mobile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="px-6 flex flex-wrap justify-center gap-x-4 gap-y-1"
              >
                {['Flutter', 'Spring Boot', 'React', 'AI Systems'].map((s) => (
                  <span key={s} className="text-xs font-black text-white uppercase tracking-tight">
                    {s}
                  </span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Step 7: Final exit cinematic message */}
        <motion.div
          style={{ opacity: text2Opacity, scale: text2Scale }}
          className="absolute text-center max-w-3xl z-20 pointer-events-none"
        >
          <span className="font-mono text-[9px] text-cyan-400 tracking-[0.45em] uppercase mb-4 block">
            [ SYSTEM SUMMARY ]
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-none text-white uppercase">
            THIS RESUME OPENS DOORS<br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)' }}>THE PROJECTS CREATE IMPACT</span>
          </h2>
        </motion.div>

        {/* Step 8: Final Actions Hub */}
        <motion.div
          style={{ opacity: ctaOpacity, scale: ctaScale }}
          className="absolute flex flex-col items-center max-w-2xl z-25 pointer-events-auto"
        >
          <span className="font-mono text-[9px] text-cyan-400 tracking-[0.45em] uppercase mb-5 block">
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
