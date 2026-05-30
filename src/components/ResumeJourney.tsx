'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FileText, Download, ExternalLink, Linkedin, Github, GraduationCap, Briefcase, Code, Award, Sparkles } from 'lucide-react';

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
  // 0.00 - 0.18: Stage 1 (Intro Text, laptop/image subtle)
  // 0.18 - 0.30: Stage 2 (Split Screen emerges, resume & image become bright)
  // 0.30 - 0.43: Stage 3 (Education glows, floating text 1, image glow intensifies)
  // 0.43 - 0.56: Stage 4 (Projects glows, floating text 2, particles increase)
  // 0.56 - 0.69: Stage 5 (Internship glows, floating text 3, rings spin)
  // 0.69 - 0.82: Stage 6 (Skills glows, floating technology particles)
  // 0.82 - 0.92: Stage 7 (Resume fades, image centers, final message)
  // 0.92 - 1.00: Stage 8 (CTA controls)

  // Map scroll progress to visibility and transforms
  const text1Opacity = useTransform(scrollYProgress, [0, 0.12, 0.18], [1, 1, 0]);
  const text1Scale = useTransform(scrollYProgress, [0, 0.12, 0.18], [1, 1.05, 0.95]);

  // Split-layout elements visibility mapping
  const resumeOpacity = useTransform(scrollYProgress, [0.12, 0.18, 0.82, 0.88], [0.10, 1, 1, 0.15]);
  const resumeScale = useTransform(scrollYProgress, [0.12, 0.18, 0.82, 0.88], [0.75, 1, 1, 0.90]);
  const resumeX = useTransform(scrollYProgress, [0.12, 0.18, 0.82, 0.88], [-50, 0, 0, -30]);

  const imageOpacity = useTransform(scrollYProgress, [0.12, 0.18, 0.90, 0.95], [0.10, 1, 1, 0]);
  const imageScale = useTransform(scrollYProgress, [0.12, 0.18, 0.82, 0.88], [0.75, 1, 1, 1.15]);
  const imageX = useTransform(scrollYProgress, [0.12, 0.18, 0.82, 0.88], [50, 0, 0, -180]); // Centers dynamically on final scene

  // Highlight step status
  const activeStep = useTransform(scrollYProgress, (progress) => {
    if (progress < 0.28) return 'intro';
    if (progress >= 0.28 && progress < 0.43) return 'education';
    if (progress >= 0.43 && progress < 0.56) return 'projects';
    if (progress >= 0.56 && progress < 0.69) return 'internship';
    if (progress >= 0.69 && progress < 0.82) return 'skills';
    return 'exit';
  });

  const [currentSection, setCurrentSection] = useState('intro');
  useEffect(() => {
    return activeStep.onChange((v) => {
      setCurrentSection(v);
    });
  }, [activeStep]);

  // Personal image reactions triggers (Glow & particles scale based on milestone reveals)
  const imageGlow = useTransform(
    scrollYProgress,
    [0.18, 0.30, 0.43, 0.56, 0.69, 0.82],
    [
      '0 0 30px rgba(6,182,212,0.2)', // Stage 2
      '0 0 45px rgba(6,182,212,0.35)', // Stage 3 (Edu)
      '0 0 55px rgba(6,182,212,0.45)', // Stage 4 (Proj)
      '0 0 65px rgba(6,182,212,0.50)', // Stage 5 (Intern)
      '0 0 80px rgba(6,182,212,0.65)', // Stage 6 (Skills - Peak)
      '0 0 40px rgba(6,182,212,0.3)', // Stage 7 (Exit)
    ]
  );

  const ringSpeed = useTransform(scrollYProgress, [0.18, 0.30, 0.56, 0.69, 0.82], [30, 20, 15, 8, 25]);

  // Floating text highlights transforms (Zero cards/boxes, pure Apple keynote typography)
  const educationOpacity = useTransform(scrollYProgress, [0.28, 0.32, 0.39, 0.43], [0, 1, 1, 0]);
  const educationY = useTransform(scrollYProgress, [0.28, 0.32], [20, 0]);

  const projectsOpacity = useTransform(scrollYProgress, [0.43, 0.47, 0.52, 0.56], [0, 1, 1, 0]);
  const projectsY = useTransform(scrollYProgress, [0.43, 0.47], [20, 0]);

  const internshipOpacity = useTransform(scrollYProgress, [0.56, 0.60, 0.65, 0.69], [0, 1, 1, 0]);
  const internshipY = useTransform(scrollYProgress, [0.56, 0.60], [20, 0]);

  const skillsOpacity = useTransform(scrollYProgress, [0.69, 0.73, 0.78, 0.82], [0, 1, 1, 0]);
  const skillsY = useTransform(scrollYProgress, [0.69, 0.73], [20, 0]);

  // Exit Cinematic Message transforms
  const text2Opacity = useTransform(scrollYProgress, [0.82, 0.87, 0.92], [0, 1, 0]);
  const text2Scale = useTransform(scrollYProgress, [0.82, 0.87, 0.92], [0.96, 1, 1.04]);

  // Final Action Center transforms
  const ctaOpacity = useTransform(scrollYProgress, [0.91, 0.96], [0, 1]);
  const ctaScale = useTransform(scrollYProgress, [0.91, 0.96], [0.96, 1]);

  const driveUrl = "https://drive.google.com/file/d/1zxa1Co29lOq7zD1bm-5sdHRpOVuzmimH/view?usp=drivesdk";

  return (
    <section 
      id="resume"
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMousePos({ x: 0, y: 0 }); }}
      className="relative z-20 bg-[#050507] w-full min-h-[450vh] select-none overflow-hidden"
    >
      {/* Keyframes Animations for resume scanlines & glowing border reflections */}
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
          box-shadow: 0 0 25px rgba(6, 182, 212, 0.25);
          border-color: rgba(34, 211, 238, 0.35) !important;
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
        @keyframes rotateRing {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}} />

      {/* Ambient spotlights background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(6,182,212,0.03),transparent_55%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none z-0" />

      {/* Floating starry elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[1.5px] h-[1.5px] rounded-full bg-cyan-400/15 animate-pulse"
            style={{
              left: `${5 + i * 5}%`,
              top: `${10 + (i % 4) * 20}%`,
              animationDuration: `${2.5 + (i % 3) * 1.2}s`,
            }}
          />
        ))}
      </div>

      {/* Sticky storyteller locking container */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-center items-center overflow-hidden z-10 px-6">
        
        {/* Stage 1: Reduced size clean intro text */}
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

        {/* Cinematic Split Canvas Composition */}
        <div className="relative w-full max-w-5xl h-[70vh] flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">
          
          {/* Left Column: Tilted 3D Glass Resume Preview */}
          <motion.div
            style={{ 
              opacity: resumeOpacity, 
              scale: resumeScale,
              x: resumeX,
              perspective: 1200
            }}
            className="w-full md:w-[48%] h-full flex flex-col justify-center items-center pointer-events-none relative z-10"
          >
            {/* Tilted 3D resume document capsule */}
            <div 
              className="w-full max-w-sm aspect-[1/1.35] bg-[#0c0c11]/90 border border-white/5 rounded-3xl p-6 md:p-8 relative overflow-hidden transition-transform duration-500 ease-out shadow-2xl flex flex-col justify-between"
              style={{
                transform: `rotateX(${-3 + mousePos.y * -8}deg) rotateY(${mousePos.x * 12}deg)`,
                transformStyle: 'preserve-3d',
                borderColor: hovered ? 'rgba(34, 211, 238, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                boxShadow: '0 25px 60px rgba(0,0,0,0.8)'
              }}
            >
              {/* Screen gloss reflections */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.015] to-white/[0.04] pointer-events-none z-10" />
              
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:100%_15px] pointer-events-none z-0" />

              {/* Resume structure */}
              <div className="w-full space-y-4 overflow-hidden pr-1">
                
                {/* Resume Header */}
                <div className="flex justify-between items-end border-b border-neutral-900 pb-2.5">
                  <div>
                    <h4 className="text-lg font-black text-white tracking-tight uppercase leading-none font-sans">GAURAV SINGH</h4>
                    <p className="text-[7px] font-mono text-cyan-400 uppercase tracking-widest mt-0.5">Systems & Web Engineer</p>
                  </div>
                  <span className="font-mono text-[6px] text-neutral-600">SYS_V2.06_DEPLOY</span>
                </div>

                {/* Highlight: Education */}
                <div 
                  className={`p-2.5 rounded-xl border transition-all duration-500 ${
                    currentSection === 'education' 
                      ? 'glow-active scanline-active bg-cyan-500/[0.02]' 
                      : 'border-transparent opacity-25'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <GraduationCap size={10} className="text-cyan-400" />
                    <span className="text-[7.5px] font-mono font-bold text-white uppercase tracking-wider">Education Dossier</span>
                  </div>
                  <div className="space-y-0.5 pl-3 border-l border-neutral-800">
                    <div className="flex justify-between text-[7.5px] font-bold text-neutral-300">
                      <span>B.Tech in Computer Science (NITRA / AKTU)</span>
                      <span className="font-mono text-cyan-500">2022 – 2026</span>
                    </div>
                    <p className="text-[6.5px] text-neutral-500 font-sans">Ghaziabad, UP // Computer Science & Systems</p>
                  </div>
                </div>

                {/* Highlight: Internship */}
                <div 
                  className={`p-2.5 rounded-xl border transition-all duration-500 ${
                    currentSection === 'internship' 
                      ? 'glow-active scanline-active bg-cyan-500/[0.02]' 
                      : 'border-transparent opacity-25'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Briefcase size={10} className="text-cyan-400" />
                    <span className="text-[7.5px] font-mono font-bold text-white uppercase tracking-wider">Work Internship Experience</span>
                  </div>
                  <div className="space-y-0.5 pl-3 border-l border-neutral-800">
                    <div className="flex justify-between text-[7.5px] font-bold text-neutral-300">
                      <span>Web Developer Intern (InnoByte Services)</span>
                      <span className="font-mono text-cyan-500">2025</span>
                    </div>
                    <p className="text-[6.5px] text-neutral-500 font-sans">Remote // Shipped Responsive Web Modules & Code Refactorings</p>
                  </div>
                </div>

                {/* Highlight: Projects */}
                <div 
                  className={`p-2.5 rounded-xl border transition-all duration-500 ${
                    currentSection === 'projects' 
                      ? 'glow-active scanline-active bg-cyan-500/[0.02]' 
                      : 'border-transparent opacity-25'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Code size={10} className="text-cyan-400" />
                    <span className="text-[7.5px] font-mono font-bold text-white uppercase tracking-wider">Engineering Initiatives</span>
                  </div>
                  <div className="space-y-1 pl-3 border-l border-neutral-800">
                    <div className="flex justify-between text-[7.5px] font-bold text-neutral-300 font-sans">
                      <span>AI Music Player & Quiz Platform</span>
                      <span className="font-mono text-cyan-500 font-semibold">Active</span>
                    </div>
                    <p className="text-[6.5px] text-neutral-500 font-sans">Built emotion recommendation algorithms & quiz leaderboards.</p>
                  </div>
                </div>

                {/* Highlight: Skills */}
                <div 
                  className={`p-2.5 rounded-xl border transition-all duration-500 ${
                    currentSection === 'skills' 
                      ? 'glow-active scanline-active bg-cyan-500/[0.02]' 
                      : 'border-transparent opacity-25'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Award size={10} className="text-cyan-400" />
                    <span className="text-[7.5px] font-mono font-bold text-white uppercase tracking-wider">Technical Capability Matrix</span>
                  </div>
                  <div className="pl-3 border-l border-neutral-800 flex flex-wrap gap-1">
                    {['Flutter', 'React.js', 'Next.js', 'Spring Boot', 'Java', 'MySQL', 'MongoDB'].map((skill) => (
                      <span key={skill} className="text-[5.5px] font-mono bg-neutral-900 border border-neutral-800 text-neutral-400 px-1 py-0.5 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Resume Bottom */}
              <div className="border-t border-neutral-900 pt-2 flex justify-between items-center text-[6px] font-mono text-neutral-600">
                <span>DEPLOYED // READY</span>
                <span>VERIFIED ORIGINAL</span>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Animated Personal Image with Neural rings */}
          <motion.div
            style={{ 
              opacity: imageOpacity, 
              scale: imageScale,
              x: imageX,
              perspective: 1200
            }}
            className="w-full md:w-[48%] h-full flex flex-col justify-center items-center pointer-events-none relative z-10"
          >
            {/* Background elements (Neural rings, energy circles, grid) */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              
              {/* Outer Neural circle ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute w-[360px] h-[360px] md:w-[440px] md:h-[440px] border border-cyan-500/10 rounded-full flex items-center justify-center"
              >
                <div className="absolute top-0 w-2 h-2 rounded-full bg-cyan-400/40 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                <div className="absolute bottom-0 w-2 h-2 rounded-full bg-cyan-400/40 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
              </motion.div>

              {/* Inner tech energy ring */}
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute w-[280px] h-[280px] md:w-[340px] md:h-[340px] border border-cyan-500/5 border-dashed rounded-full"
              />

              {/* Cyan ambient spotlight core */}
              <div className="absolute w-[200px] h-[200px] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1),transparent_70%)] blur-[20px] pointer-events-none" />
            </div>

            {/* Float profile image card */}
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ 
                boxShadow: imageGlow,
                transform: `rotateX(${mousePos.y * -10}deg) rotateY(${mousePos.x * 14}deg)`
              }}
              className="w-48 h-48 md:w-64 md:h-64 rounded-full border border-cyan-500/25 overflow-hidden relative z-10 transition-all duration-300 shadow-[0_0_30px_rgba(6,182,212,0.2)]"
            >
              {/* Profile Image */}
              <img 
                src="/images/profile.png" 
                alt="Gaurav Singh"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
              
              {/* Cyan dynamic edge glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/15 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 rounded-full border-[1.5px] border-cyan-400/20 pointer-events-none" />
            </motion.div>
          </motion.div>

        </div>

        {/* Floating Keynote achievements reveals - Responsive positions */}
        
        {/* Large screen keynotes (Rendered relative to left/right sides) */}
        <div className="absolute top-[20%] left-6 w-[240px] pointer-events-none hidden xl:block z-20 text-left">
          <AnimatePresence>
            {currentSection === 'education' && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="font-mono text-[9px] text-cyan-400 tracking-[0.25em] mb-1">// ACADEMIC DECREE</div>
                <h5 className="text-white text-xl font-black uppercase leading-tight">B.Tech Computer Science</h5>
                <p className="text-neutral-500 font-mono text-[10px] uppercase tracking-wider mt-1.5">2022–2026 // NITRA / AKTU</p>
              </motion.div>
            )}

            {currentSection === 'internship' && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="font-mono text-[9px] text-cyan-400 tracking-[0.25em] mb-1">// EXPERTISE SHIPPED</div>
                <h5 className="text-white text-xl font-black uppercase leading-tight">Industry Experience</h5>
                <p className="text-neutral-500 font-mono text-[10px] uppercase tracking-wider mt-1.5">Web Intern at InnoByte Services</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="absolute top-[25%] right-6 w-[240px] pointer-events-none hidden xl:block z-20 text-right">
          <AnimatePresence>
            {currentSection === 'projects' && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="font-mono text-[9px] text-cyan-400 tracking-[0.25em] mb-1">// ENGINEERING BUILDS</div>
                <h5 className="text-white text-xl font-black uppercase leading-tight">15+ Projects Built</h5>
                <p className="text-neutral-500 font-mono text-[10px] uppercase tracking-wider mt-1.5">AI recommenders & quiz systems</p>
              </motion.div>
            )}

            {currentSection === 'skills' && (
              <motion.div
                className="flex flex-col items-end gap-2 text-right"
              >
                <div className="font-mono text-[9px] text-cyan-400 tracking-[0.25em] mb-1">// TECH CAPABILITIES</div>
                {['Flutter', 'Spring Boot', 'React', 'AI Systems'].map((skill, sIdx) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 15, x: 10 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, delay: sIdx * 0.08, ease: "easeOut" }}
                    className={`text-xl font-black uppercase tracking-tight leading-none ${
                      sIdx === 1 ? 'text-[#58a6ff]' : sIdx === 2 ? 'text-teal-400' : sIdx === 3 ? 'text-cyan-400' : 'text-white'
                    } drop-shadow-[0_0_8px_rgba(6,182,212,0.15)]`}
                  >
                    {skill}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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
            THIS RESUME GOT ME NOTICED<br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)' }}>THE PROJECTS MADE ME UNFORGETTABLE</span>
          </h2>
        </motion.div>

        {/* Step 8: Final Actions Hub CTA */}
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
    </section>
  );
}
