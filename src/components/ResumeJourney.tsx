'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, ExternalLink, Linkedin, Github, Award, Sparkles, CheckCircle2, X, ChevronRight, HelpCircle } from 'lucide-react';

export default function ResumeJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLDivElement>(null);

  // States
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Magnifier States
  const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0, bgX: 0, bgY: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [resumeDimensions, setResumeDimensions] = useState({ width: 0, height: 0 });

  // Mobile Tap-To-Zoom States
  const [isZoomedMobile, setIsZoomedMobile] = useState(false);

  // Responsive device checks
  const [isMobile, setIsMobile] = useState(false);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update resume dimensions on hover or load
  const updateResumeDimensions = () => {
    if (resumeRef.current) {
      const rect = resumeRef.current.getBoundingClientRect();
      setResumeDimensions({ width: rect.width, height: rect.height });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!resumeRef.current) return;
    const box = resumeRef.current.getBoundingClientRect();
    
    // Tilt calculations
    const xTilt = (e.clientX - box.left) / box.width - 0.5;
    const yTilt = (e.clientY - box.top) / box.height - 0.5;
    setMousePos({ x: xTilt, y: yTilt });

    // Magnifier coordinates
    const mX = e.clientX - box.left;
    const mY = e.clientY - box.top;
    const bgX = (mX / box.width) * 100;
    const bgY = (mY / box.height) * 100;
    setMagnifierPos({ x: mX, y: mY, bgX, bgY });
  };

  const resumeUrl = "https://drive.google.com/file/d/1oF2tNQGojLN20D1zKeOYkf-FdVH9jdox/view?usp=drive_link";

  // Floating career highlights tags list
  const highlights = [
    "B.Tech Computer Science",
    "Web Development Intern",
    "Flutter Developer",
    "Full Stack Developer",
    "AI Systems Builder",
    "Spring Boot Developer",
    "Real World Projects"
  ];

  // Recruiter side drawer pitch summaries items
  const recruiterHighlights = [
    { title: "AI Development Experience", desc: "Expertise engineering LLM pipelines, RAG frameworks, LangGraph competitive state machines, and Gemini integrations." },
    { title: "Flutter Expertise", desc: "Engineered responsive, highly optimized cross-platform native iOS & Android applications with emotion tracking facials." },
    { title: "Full Stack Development", desc: "Solid grasp of modular layouts driving sub-10ms latency state synchronizations across real-time multiplayer systems." },
    { title: "Backend Architecture", desc: "Specialization in enterprise Java Spring Boot backends, transaction limits, lazy queries, JPA boundaries, and REST APIs." },
    { title: "Production Deployments", desc: "Proven record shipping actual functional codebases, static catalog optimizations, and localized SEO setups." }
  ];

  // AI assistant remote trigger questions list
  const digitalTwinQuestions = [
    { label: "Explain Gaurav's experience", query: "Explain Gaurav's professional experience and internship background." },
    { label: "Summarize his resume", query: "Can you provide a quick bulleted summary of Gaurav's resume credentials?" },
    { label: "Show strongest projects", query: "Show me Gaurav's strongest software engineering projects." },
    { label: "Why hire Gaurav?", query: "Why should a recruiter hire Gaurav? What is his unique value proposition?" },
    { label: "View backend experience", query: "Describe Gaurav's Java Spring Boot and backend engineering experience." }
  ];

  // Dispatch custom event to trigger chatbot panel automatically
  const handleAIQuery = (query: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-digital-twin', { detail: { query } }));
    }
  };

  return (
    <section 
      id="resume"
      ref={containerRef} 
      className="relative z-20 bg-[#050507] w-full py-24 md:py-32 overflow-hidden"
    >
      {/* Visual background overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(6,182,212,0.025),transparent_55%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.002)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.002)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
        
        {/* Section Header Title matching Hero/Projects layout */}
        <div className="relative">
          <span className="font-mono text-[9px] text-cyan-400 tracking-[0.45em] uppercase mb-3 block">
            [ PROFESSIONAL JOURNEY ]
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase leading-none relative z-10">
            RESUME
          </h2>
          <span className="absolute -left-4 -top-8 text-[6rem] md:text-[8rem] font-black text-white/[0.015] select-none pointer-events-none uppercase tracking-widest font-sans z-0 hidden sm:block">
            JOURNEY
          </span>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 rounded mt-4" />
        </div>

        {/* 60/40 Responsive Split Layout */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
          
          {/* LEFT SIDE (45% split): Compelling Narrative, Highlight tags, CTA buttons */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-[45%] space-y-8"
          >
            {/* Opening statement */}
            <div className="space-y-4">
              <span className="font-mono text-[10px] text-cyan-300 uppercase tracking-widest block font-bold">// THE STORY</span>
              <h3 className="text-xl md:text-3xl font-black text-white uppercase tracking-tight leading-snug">
                ENGINEERING REAL PRODUCTS BY BRIDGING LOGIC & INTELLIGENCE
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed font-light">
                As a Full-Stack Web and Cross-Platform Developer, I specialize in architecting fast mobile applications using <span className="text-cyan-300 font-semibold">Flutter</span> and robust backends powered by <span className="text-teal-400 font-semibold">Java Spring Boot</span>. With a deep passion for <span className="text-cyan-400 font-semibold">AI Engineering</span>, I build production-level software modules grounded in security, transaction safety, and sub-10ms state synchronizations. I view my code not just as logic, but as scalable solutions designed to solve real user friction.
              </p>
            </div>

            {/* Elegant glass career highlight tags */}
            <div className="space-y-3">
              <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">// Career Milestones</span>
              <div className="flex flex-wrap gap-2.5">
                {highlights.map((tag) => (
                  <motion.div 
                    whileHover={{ scale: 1.05, borderColor: "rgba(6, 182, 212, 0.3)", boxShadow: "0 0 12px rgba(6, 182, 212, 0.15)" }}
                    key={tag}
                    className="font-mono text-[10px] text-neutral-300 bg-white/[0.02] border border-white/5 px-3 py-1.5 rounded-xl cursor-default transition-all duration-300"
                  >
                    {tag}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recruiter hiring pitch block */}
            <div className="bg-gradient-to-r from-neutral-900/60 to-neutral-950/60 border border-white/5 rounded-2xl p-6 relative overflow-hidden group shadow-lg">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(6,182,212,0.04),transparent_65%)]" />
              <div className="relative z-10 space-y-4">
                <span className="font-mono text-[9px] text-cyan-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                  <Sparkles size={11} className="text-cyan-400 animate-pulse" />
                  RECRUITER VALUE PROPOSITION
                </span>
                <h4 className="text-white text-sm font-bold uppercase tracking-tight">WHY GAURAV IS WORTH AN INTERVIEW:</h4>
                <ul className="space-y-3.5 text-xs text-neutral-400 font-light pl-1">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={13} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Building scalable software products</strong>: Fully modular systems designed for performance, rapid integration, and responsive state handling.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={13} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Creating AI-powered ecosystems</strong>: Hands-on experience grounding agents, configuring LangGraph state maps, and safely deploying Gemini frameworks.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={13} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Developing production-ready applications</strong>: Enterprise backend setups implementing structured database query loops, JPA parameters, and lazy fetching layers.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Conversational AI Integration suggested questions */}
            <div className="space-y-3.5">
              <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">// Digital Twin Actions</span>
              <div className="bg-[#0c0c11]/40 border border-white/5 rounded-2xl p-5 space-y-3">
                <p className="text-[11px] text-neutral-400 leading-relaxed font-light">
                  Have my conversational AI Digital Twin answer any resume, certification, or capability questions immediately:
                </p>
                <div className="flex flex-wrap gap-2">
                  {digitalTwinQuestions.map((q) => (
                    <button
                      key={q.label}
                      onClick={() => handleAIQuery(q.query)}
                      className="font-mono text-[9.5px] text-cyan-400 bg-cyan-950/20 border border-cyan-500/20 hover:border-cyan-400 hover:bg-cyan-500/5 px-3 py-1.5 rounded-full cursor-pointer transition-all duration-300 active:scale-95 shadow-[0_0_10px_rgba(6,182,212,0.03)]"
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Pinned conversion Call To Actions */}
            <div className="flex gap-4 items-center">
              <a 
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="w-14 h-14 rounded-xl bg-[#0c0c11]/85 hover:bg-[#0c0c11] border border-white/10 hover:border-cyan-500/30 text-cyan-400 hover:text-cyan-300 flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer"
                title="View PDF Resume"
              >
                <FileText size={22} />
              </a>

              <a 
                href={resumeUrl}
                download="Gaurav_Resume.pdf"
                className="w-14 h-14 rounded-xl bg-[#0c0c11]/85 hover:bg-[#0c0c11] border border-white/10 hover:border-teal-500/30 text-teal-400 hover:text-teal-300 flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer"
                title="Download Resume"
              >
                <Download size={22} />
              </a>
            </div>

          </motion.div>

          {/* RIGHT SIDE (50% split): Interactive Resume Preview with Magnifier & 3D Tilt */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-[50%] flex flex-col items-center justify-center relative"
          >
            {/* Ambient neon spot core behind the frame */}
            <div className="absolute w-[220px] h-[220px] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.06),transparent_70%)] blur-[25px] pointer-events-none -z-10" />

            {/* Page Toggle Tabs (placed outside the interaction container so they are clickable) */}
            <div className="flex gap-3 mb-6 z-20 self-center">
              <button 
                onClick={() => setActivePage(1)}
                className={`px-4 py-2 rounded-xl text-[10px] font-mono tracking-widest uppercase transition-all duration-300 border cursor-pointer ${
                  activePage === 1 
                    ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)]' 
                    : 'bg-neutral-900/60 border-white/5 text-neutral-400 hover:text-white'
                }`}
              >
                Page 1
              </button>
              <button 
                onClick={() => setActivePage(2)}
                className={`px-4 py-2 rounded-xl text-[10px] font-mono tracking-widest uppercase transition-all duration-300 border cursor-pointer ${
                  activePage === 2 
                    ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)]' 
                    : 'bg-neutral-900/60 border-white/5 text-neutral-400 hover:text-white'
                }`}
              >
                Page 2
              </button>
            </div>

            {/* Desktop interaction frame container */}
            <div 
              ref={resumeRef}
              onMouseEnter={() => {
                setShowMagnifier(true);
                updateResumeDimensions();
              }}
              onMouseLeave={() => {
                setShowMagnifier(false);
                setMousePos({ x: 0, y: 0 });
              }}
              onMouseMove={handleMouseMove}
              onClick={() => {
                if (isMobile) {
                  setIsZoomedMobile(prev => !prev);
                }
              }}
              style={{
                perspective: 1200,
              }}
              className="w-full max-w-xl cursor-crosshair relative"
            >
              <motion.div
                animate={{
                  rotateX: isMobile ? 0 : (mousePos.y * -6),
                  rotateY: isMobile ? 0 : (mousePos.x * 8),
                  scale: isZoomedMobile ? 1.4 : 1
                }}
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
                className="w-full aspect-[1/1.38] bg-[#0d0d12]/98 border border-white/10 rounded-2xl overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:shadow-[0_25px_60px_rgba(6,182,212,0.15)] hover:border-cyan-500/20 transition-shadow duration-300"
              >
                {/* Specular layout overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.01] to-white/[0.04] pointer-events-none z-10" />

                {/* Actual resume image loaded */}
                <img 
                  src={activePage === 1 ? "/images/resume-preview-page1.png" : "/images/resume-preview-page2.png"} 
                  alt="Gaurav Singh Resume Preview" 
                  className="w-full h-full object-cover grayscale select-none"
                  loading="lazy"
                />

                {/* Mobile tap-to-zoom help banner */}
                {isMobile && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5 text-[9px] font-mono text-cyan-400 uppercase tracking-widest pointer-events-none select-none z-20 shadow-md">
                    {isZoomedMobile ? "Tap to Zoom Out" : "Tap to Inspect Details"}
                  </div>
                )}
              </motion.div>

              {/* Magnifier glass visual overlay (Desktop only, low latency background-position) */}
              {!isMobile && showMagnifier && (
                <div 
                  className="w-44 h-44 rounded-full border-2 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.35)] absolute pointer-events-none z-30 overflow-hidden"
                  style={{
                    left: `${magnifierPos.x - 88}px`,
                    top: `${magnifierPos.y - 88}px`,
                    backgroundImage: activePage === 1 ? "url('/images/resume-preview-page1.png')" : "url('/images/resume-preview-page2.png')",
                    backgroundPosition: `${magnifierPos.bgX}% ${magnifierPos.bgY}%`,
                    backgroundSize: `${resumeDimensions.width * 2.2}px ${resumeDimensions.height * 2.2}px`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: '#fff'
                  }}
                />
              )}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Recruiter Focus Mode Left Side Drawer overlay */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-[9990] flex pointer-events-auto">
            
            {/* Backdrop blurring clickaway */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer pointer-events-auto"
              onClick={() => setIsDrawerOpen(false)}
            />

            {/* Left side drawer card */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="relative z-10 w-full sm:w-[420px] h-screen bg-[#07070a]/98 border-r border-white/10 p-8 flex flex-col justify-between overflow-y-auto select-text shadow-[15px_0_50px_rgba(0,0,0,0.8)]"
            >
              <div className="space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center pb-5 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-cyan-400 animate-pulse" />
                    <h4 className="text-white text-sm font-mono font-bold uppercase tracking-wider">Hiring Recruiter Dossier</h4>
                  </div>
                  <button 
                    onClick={() => setIsDrawerOpen(false)}
                    className="text-neutral-500 hover:text-white transition-colors p-1 rounded hover:bg-white/5 cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Pitch cards list */}
                <div className="space-y-6">
                  <div>
                    <span className="font-mono text-[9px] text-cyan-400 uppercase tracking-widest block font-bold">// THE FIT</span>
                    <h5 className="text-white text-base font-black uppercase tracking-tight mt-1">Why Hire Gaurav Singh?</h5>
                    <p className="text-neutral-400 text-xs font-light leading-relaxed mt-2">
                      An interview with Gaurav guarantees a developer who focuses heavily on product quality, enterprise structure, and AI-enabled development tools. Here is the concise profile synopsis:
                    </p>
                  </div>

                  <div className="space-y-5">
                    {recruiterHighlights.map((hl) => (
                      <div key={hl.title} className="space-y-1 pl-3 border-l-2 border-l-cyan-500/50">
                        <h6 className="text-white text-xs font-mono font-bold uppercase tracking-wider">{hl.title}</h6>
                        <p className="text-neutral-400 text-[11px] leading-relaxed font-light">{hl.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer footer */}
              <div className="pt-6 border-t border-white/5 space-y-4">
                <a 
                  href={resumeUrl}
                  download="Gaurav_Resume.pdf"
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-black font-mono font-bold text-xs tracking-widest uppercase py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.15)] cursor-pointer"
                >
                  <Download size={14} strokeWidth={2.5} />
                  <span>Download CV Archive</span>
                </a>
                <p className="text-[8px] font-mono text-neutral-600 text-center uppercase tracking-widest">// systems fully active // gaurav singh 2026</p>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
