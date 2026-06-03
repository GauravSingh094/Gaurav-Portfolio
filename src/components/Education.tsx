'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Calendar, GraduationCap, MapPin, Sparkles } from 'lucide-react';

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Card mouse hovers coordinate trackers
  const [tilt1, setTilt1] = useState({ x: 0, y: 0 });
  const [tilt2, setTilt2] = useState({ x: 0, y: 0 });
  const [tilt3, setTilt3] = useState({ x: 0, y: 0 });

  const tilts = [tilt1, tilt2, tilt3];
  const setTilts = [setTilt1, setTilt2, setTilt3];

  useEffect(() => {
    setMounted(true);
  }, []);

  const education = [
    {
      degree: "B.Tech in Computer Science and Engineering",
      institution: "NITRA Technical Campus, Ghaziabad (Affiliated with AKTU)",
      year: "2022 – 2026",
      details: [
        "Specialization: Computer Science & Systems Engineering",
        "Key Coursework: Data Structures, OOPs, DBMS, Operating Systems, Web Technologies",
        "Activity: Creative Web Design Labs & Software Engineering Research Groups"
      ],
      location: "Ghaziabad, UP, India",
      code: "B.TECH // CSE",
      glow: "rgba(6, 182, 212, 0.06)", // Cyan
      textColor: "text-cyan-400 font-semibold"
    },
    {
      degree: "Intermediate / Senior Secondary",
      institution: "Saraswati Vidya Mandir, Gorakhpur",
      year: "2022",
      details: [
        "Stream: Science (Physics, Chemistry, Mathematics)",
        "Focus: Advanced Mathematics, Physics & Foundational Programming",
        "Status: Passed with First Class Distinction honors"
      ],
      location: "Gorakhpur, UP, India",
      code: "SVM // INTER",
      glow: "rgba(20, 184, 166, 0.06)", // Teal
      textColor: "text-teal-400 font-semibold"
    },
    {
      degree: "High School / Secondary",
      institution: "Himalayan Public School, Gorakhpur",
      year: "2020",
      details: [
        "Focus: General Science, Mathematics & Information Technology",
        "Activities: Computer Science and Logic Laboratories",
        "Status: Passed with First Class Distinction honors"
      ],
      location: "Gorakhpur, UP, India",
      code: "HPS // HIGH",
      glow: "rgba(99, 102, 241, 0.06)", // Indigo
      textColor: "text-indigo-400 font-semibold"
    }
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.min(education.length - 1, Math.floor(latest * education.length));
    setActiveIndex(idx);
  });

  // Calculate scroll transformations for the 3 stacked cards
  const opacity0 = useTransform(scrollYProgress, [0.0, 0.05, 0.28, 0.33], [0, 1, 1, 0]);
  const scale0 = useTransform(scrollYProgress, [0.0, 0.05, 0.28, 0.33], [0.92, 1, 1, 0.95]);
  const y0 = useTransform(scrollYProgress, [0.0, 0.05, 0.28, 0.33], [120, 0, 0, -40]);

  const opacity1 = useTransform(scrollYProgress, [0.25, 0.33, 0.61, 0.66], [0, 1, 1, 0]);
  const scale1 = useTransform(scrollYProgress, [0.25, 0.33, 0.61, 0.66], [0.92, 1, 1, 0.95]);
  const y1 = useTransform(scrollYProgress, [0.25, 0.33, 0.61, 0.66], [120, 0, 0, -40]);

  const opacity2 = useTransform(scrollYProgress, [0.58, 0.66, 1.0, 1.0], [0, 1, 1, 1]);
  const scale2 = useTransform(scrollYProgress, [0.58, 0.66, 1.0, 1.0], [0.92, 1, 1, 1]);
  const y2 = useTransform(scrollYProgress, [0.58, 0.66, 1.0, 1.0], [120, 0, 0, 0]);

  const cardAnimations = [
    { opacity: opacity0, scale: scale0, y: y0 },
    { opacity: opacity1, scale: scale1, y: y1 },
    { opacity: opacity2, scale: scale2, y: y2 }
  ];

  const handleMouseMove = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const px = x / box.width - 0.5;
    const py = y / box.height - 0.5;
    
    setTilts[index]({ x: px * 8, y: -py * 8 });
  };

  const handleMouseLeave = (index: number) => {
    setTilts[index]({ x: 0, y: 0 });
  };

  return (
    <section
      id="education"
      ref={containerRef}
      className="relative z-20 bg-[#050507] w-full min-h-[300vh] overflow-visible border-t border-neutral-900 border-dashed"
    >
      {/* 1. Desktop Stacked Scroll Cinematic Experience */}
      {mounted && (
        <div className="sticky top-0 h-screen w-full hidden lg:flex items-center justify-center overflow-hidden">
          
          {/* Global Ambient Glow System */}
          <div 
            className="absolute inset-0 transition-colors duration-1000 pointer-events-none z-0" 
            style={{
              background: `radial-gradient(circle at 75% 50%, ${education[activeIndex].glow}, transparent 65%)`
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none z-0" />

          <div className="w-full max-w-screen-2xl mx-auto px-12 lg:px-24 grid grid-cols-12 gap-16 relative z-10 items-center h-full">
            
            {/* Left Column: Vertical Index Tracker HUD */}
            <div className="col-span-3 flex flex-col gap-5 justify-center h-fit border-r border-neutral-900/60 pr-10">
              <span className="font-mono text-[9px] text-cyan-400 tracking-[0.45em] uppercase mb-4 block">
                [ ACADEMIC ARCHIVE ]
              </span>
              <div className="space-y-4">
                {education.map((item, pIdx) => {
                  const isActive = pIdx === activeIndex;
                  return (
                    <div 
                      key={pIdx}
                      className={`flex items-center gap-4 transition-all duration-500 ${
                        isActive ? 'translate-x-2' : 'opacity-25'
                      }`}
                    >
                      <span className={`font-mono text-xs ${isActive ? item.textColor : 'text-neutral-500'}`}>
                        {(pIdx + 1).toString().padStart(2, '0')}
                      </span>
                      <span className={`font-mono text-xs uppercase tracking-widest transition-colors font-bold ${
                        isActive ? 'text-white' : 'text-neutral-500'
                      }`}>
                        {item.code.split(" // ")[0]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Stacked Education Canvas Frame */}
            <div className="col-span-9 h-[65vh] relative flex items-center justify-center">
              {education.map((item, index) => {
                const { opacity, scale, y } = cardAnimations[index];
                const tilt = tilts[index];
                
                return (
                  <motion.div
                    key={index}
                    style={{ 
                      opacity, 
                      scale, 
                      y, 
                      zIndex: 10 + index,
                      pointerEvents: activeIndex === index ? 'auto' : 'none'
                    }}
                    className="absolute inset-0 grid grid-cols-12 gap-12 w-full items-center"
                  >
                    {/* Left Info Column */}
                    <div className="col-span-5 flex flex-col justify-center">
                      <span className="font-mono text-[10px] text-neutral-600 font-bold uppercase tracking-widest mb-3 block">
                        ACADEMIC_NODE // 0{index + 1}
                      </span>
                      <h3 className="text-3xl lg:text-4xl font-black text-white mb-6 tracking-tighter uppercase leading-none font-mono">
                        {item.degree}
                      </h3>
                      <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-light">
                        {item.institution}
                      </p>

                      <div className="flex gap-4 items-center mb-8">
                        <span className="font-mono text-[10px] text-neutral-400 flex items-center gap-2 font-medium bg-neutral-950/80 border border-neutral-900 px-4.5 py-1.5 rounded-full">
                          <Calendar size={11} className="text-cyan-400 animate-pulse" />
                          {item.year}
                        </span>
                        <span className="font-mono text-[10px] text-neutral-500 flex items-center gap-1">
                          <MapPin size={11} />
                          {item.location}
                        </span>
                      </div>

                      <div className="pt-6 border-t border-neutral-900 border-dashed">
                        <span className="text-neutral-600 font-mono text-[9px] uppercase tracking-wider block mb-2">Location Identifier</span>
                        <p className="text-neutral-400 font-mono text-xs leading-relaxed uppercase tracking-widest">
                          {item.code}
                        </p>
                      </div>
                    </div>

                    {/* Right Detailed Card Column */}
                    <div className="col-span-7 h-full flex items-center justify-center">
                      <div
                        onMouseMove={(e) => handleMouseMove(index, e)}
                        onMouseLeave={() => handleMouseLeave(index)}
                        style={{
                          transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                          transition: 'transform 0.15s ease-out, border-color 0.5s',
                          boxShadow: `0 25px 60px -15px rgba(0,0,0,0.9), 0 0 30px -10px ${item.glow}`
                        }}
                        className="w-full h-[85%] bg-[#0c0c11]/85 border border-white/5 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/20"
                      >
                        {/* Static Grid & Accent Spotlight */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(34,211,238,0.02),transparent_60%)] pointer-events-none" />

                        {/* Visual Mock-Container Header */}
                        <div className="flex justify-between items-center w-full pb-4 border-b border-neutral-900 z-10">
                          <div className="flex gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                            <span className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                            <span className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                          </div>
                          <div className="text-[9px] font-mono text-neutral-600 tracking-widest uppercase font-semibold">
                            SECURE_NODE // EDUCATION
                          </div>
                        </div>

                        {/* Detailed Highlights */}
                        <div className="flex-1 flex flex-col justify-center py-6 z-10">
                          <h4 className="text-[10px] font-mono text-neutral-600 tracking-[0.25em] uppercase mb-5 font-bold">
                            // CORE SPECIALIZATION
                          </h4>
                          <div className="space-y-4">
                            {item.details.map((detail: string, hIdx: number) => (
                              <div key={hIdx} className="flex items-start gap-3 group/item">
                                <span className={`font-mono text-[10px] mt-1 select-none font-bold ${item.textColor}`}>
                                  [0{hIdx + 1}]
                                </span>
                                <p className="text-neutral-300 text-sm font-light leading-relaxed group-hover/item:text-white transition-colors">
                                  {detail}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Visual Mock-Container Footer */}
                        <div className="flex justify-between items-end w-full pt-4 border-t border-neutral-900 z-10 text-[9px] font-mono text-neutral-600 font-semibold">
                          <div className="flex items-center gap-1">
                            STATUS: <span className="text-emerald-500 tracking-wider">VERIFIED</span>
                          </div>
                          <span className="flex items-center gap-1 text-cyan-400 font-bold">
                            <Sparkles size={10} className="animate-pulse" />
                            SYS_OK
                          </span>
                        </div>

                        {/* Accent Corners */}
                        <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-neutral-950 group-hover:border-cyan-500/30 transition-colors duration-500" />
                        <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-neutral-950 group-hover:border-cyan-500/30 transition-colors duration-500" />
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      )}

      {/* 2. Tablet & Mobile Storytelling Vertical Fallback */}
      <div className="w-full py-24 px-6 md:px-12 lg:hidden flex flex-col gap-16 max-w-3xl mx-auto z-10 relative">
        <div className="border-b border-neutral-900 pb-10 mb-6">
          <span className="font-mono text-[9px] text-cyan-400 tracking-[0.45em] uppercase mb-4 block">
            [ SECURE ACADEMIC ARCHIVE ]
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-800 tracking-tighter uppercase leading-none font-mono">
            Education
          </h2>
        </div>

        {education.map((item, idx) => (
          <div 
            key={idx}
            className="flex flex-col gap-8 border border-white/5 bg-[#0c0c11]/40 rounded-2xl p-6 md:p-10 relative overflow-hidden"
            style={{
              boxShadow: `0 15px 35px rgba(0,0,0,0.6), inset 0 0 20px ${item.glow}`
            }}
          >
            <div className="flex justify-between items-start border-b border-neutral-900 pb-4">
              <span className="font-mono text-[10px] text-neutral-500 flex items-center gap-1.5">
                <Calendar size={11} />
                {item.year}
              </span>
              <span className="font-mono text-xs text-neutral-600 font-bold">
                0{idx + 1}
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-3 uppercase tracking-tight font-mono">
                {item.degree}
              </h3>
              <p className="text-neutral-400 text-sm font-light leading-relaxed mb-6">
                {item.institution}
              </p>

              {/* Mobile details capabilities */}
              <div className="space-y-2 mb-6 pl-2 border-l border-neutral-800">
                {item.details.map((detail: string, hIdx: number) => (
                  <p key={hIdx} className="text-neutral-400 text-xs font-light">
                    • {detail}
                  </p>
                ))}
              </div>

              <div className="flex gap-2 items-center text-[10px] font-mono text-neutral-500">
                <MapPin size={11} />
                <span>{item.location}</span>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-900">
              <span className="text-neutral-600 font-mono text-[9px] uppercase tracking-wider block mb-2">Location Identifier</span>
              <p className="text-neutral-400 font-mono text-xs leading-relaxed tracking-wider">
                {item.code}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
