'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

export default function ProjectCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Storing tilt coordinates for interactive 3D effect (3 projects)
  const [tilt1, setTilt1] = useState({ x: 0, y: 0 });
  const [tilt2, setTilt2] = useState({ x: 0, y: 0 });
  const [tilt3, setTilt3] = useState({ x: 0, y: 0 });

  const tilts = [tilt1, tilt2, tilt3];
  const setTilts = [setTilt1, setTilt2, setTilt3];

  useEffect(() => {
    setMounted(true);
  }, []);

  const projects = [
    {
      title: "Syntax Showdown",
      category: "Multi-Agent AI Debate Platform",
      stack: "FastAPI, LangGraph, Next.js, TypeScript, ChromaDB, Tailwind CSS",
      desc: "Built a production-grade multi-agent AI platform leveraging autonomous agents, semantic memory, and real-time orchestration to simulate structured adversarial reasoning. Architected a LangGraph workflow coordinating 3 AI agents and 4 LLM providers with automated failover and fault-tolerant execution.",
      highlights: [
        "Architected a LangGraph workflow coordinating 3 AI agents and 4 LLM providers",
        "Automated failover controls with fully fault-tolerant model execution",
        "Developed real-time FastAPI SSE streaming, achieving sub-100ms response updates",
        "Implemented semantic memory and token analytics, reducing AI inference costs by 40%"
      ],
      glow: "rgba(6, 182, 212, 0.06)", // Cyan
      badge: "rgba(6, 182, 212, 0.2)",
      textColor: "text-cyan-400",
      github: "https://github.com/GauravSingh094/Syntax-Showdown",
      live: "https://syntax-showdown-arena.vercel.app"
    },
    {
      title: "NyayMitra",
      category: "Sovereign Legal AI Ecosystem",
      stack: "Next.js, Spring Boot, FastAPI, Neo4j, GraphRAG, Legal-BERT, Redis, RabbitMQ",
      desc: "Built a legal intelligence platform leveraging GraphRAG and Knowledge Graphs for statutory analysis and judicial research automation. Engineered a GraphRAG retrieval pipeline using Neo4j and Legal-BERT, achieving sub-50ms multi-hop legal search.",
      highlights: [
        "Nyay-Graph: Precedent & Relationship Engine with PageRank and Louvain clustering",
        "Nyay-Audit: Automatic fake citation detection, outdated law scanner, and smart redlining",
        "Nyay-Bridge: Real-time IPC-to-BNS mapping and punishment delta telemetry reports",
        "Nyay-Vani: Bhashini-integrated real-time voice translation into 14+ Indian regional languages"
      ],
      glow: "rgba(99, 102, 241, 0.06)", // Indigo
      badge: "rgba(99, 102, 241, 0.2)",
      textColor: "text-indigo-400",
      github: "https://github.com/JAIKEYSINGH913/Nyay-mitra",
      live: "https://nyay-mitra-rho.vercel.app/"
    },
    {
      title: "Mindrift",
      category: "Real-Time Quiz Platform",
      stack: "Next.js, TypeScript, Spring Boot, PostgreSQL, Redis, Apache Kafka, Clerk, React Query, Resilience4j, Tailwind CSS",
      desc: "Built a scalable real-time quiz platform supporting competitive multiplayer assessments with event-driven architecture and enterprise-grade reliability. Engineered real-time leaderboards using Redis and Apache Kafka, enabling low-latency score synchronization for concurrent quiz sessions.",
      highlights: [
        "Redis & Apache Kafka: Low-latency score synchronization for concurrent quiz sessions",
        "Spring Boot & Resilience4j: Resilient workflows improving fault tolerance through circuit breakers",
        "Next.js & Clerk: Modern client dashboard with secure authentication and React Query caching",
        "PostgreSQL: Database persistence layers for robust and structured session storage"
      ],
      glow: "rgba(20, 184, 166, 0.06)", // Teal
      badge: "rgba(20, 184, 166, 0.2)",
      textColor: "text-teal-400",
      github: "https://github.com/GauravSingh094",
      live: "https://mindrift-quizz.vercel.app/"
    }
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.min(projects.length - 1, Math.floor(latest * projects.length));
    setActiveIndex(idx);
  });

  // Calculate distinct scroll-linked transforms for desktop stacked look (3 projects)
  const opacity0 = useTransform(scrollYProgress, [0.0, 0.05, 0.28, 0.33], [0, 1, 1, 0]);
  const scale0 = useTransform(scrollYProgress, [0.0, 0.05, 0.28, 0.33], [0.92, 1, 1, 0.95]);
  const y0 = useTransform(scrollYProgress, [0.0, 0.05, 0.28, 0.33], [150, 0, 0, -40]);

  const opacity1 = useTransform(scrollYProgress, [0.25, 0.33, 0.61, 0.66], [0, 1, 1, 0]);
  const scale1 = useTransform(scrollYProgress, [0.25, 0.33, 0.61, 0.66], [0.92, 1, 1, 0.95]);
  const y1 = useTransform(scrollYProgress, [0.25, 0.33, 0.61, 0.66], [150, 0, 0, -40]);

  const opacity2 = useTransform(scrollYProgress, [0.58, 0.66, 1.0, 1.0], [0, 1, 1, 1]);
  const scale2 = useTransform(scrollYProgress, [0.58, 0.66, 1.0, 1.0], [0.92, 1, 1, 1]);
  const y2 = useTransform(scrollYProgress, [0.58, 0.66, 1.0, 1.0], [150, 0, 0, 0]);

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
    
    setTilts[index]({ x: px * 10, y: -py * 10 });
  };

  const handleMouseLeave = (index: number) => {
    setTilts[index]({ x: 0, y: 0 });
  };

  return (
    <section 
      id="work" 
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
              background: `radial-gradient(circle at 70% 30%, ${projects[activeIndex].glow}, transparent 65%)`
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none z-0" />

          <div className="w-full max-w-screen-2xl mx-auto px-12 lg:px-24 grid grid-cols-12 gap-16 relative z-10 items-center h-full">
            
            {/* Left Column: Vertical Scene Indicator HUD */}
            <div className="col-span-3 flex flex-col gap-5 justify-center h-fit border-r border-neutral-900/60 pr-10">
              <span className="font-mono text-[9px] text-cyan-400 tracking-[0.45em] uppercase mb-4 block">
                [ INDEX ARCHIVE ]
              </span>
              <div className="space-y-4">
                {projects.map((proj, pIdx) => {
                  const isActive = pIdx === activeIndex;
                  return (
                    <div 
                      key={proj.title}
                      className={`flex items-center gap-4 transition-all duration-500 ${
                        isActive ? 'translate-x-2' : 'opacity-25'
                      }`}
                    >
                      <span className={`font-mono text-xs ${isActive ? proj.textColor : 'text-neutral-500'}`}>
                        {(pIdx + 1).toString().padStart(2, '0')}
                      </span>
                      <span className={`font-mono text-xs uppercase tracking-widest transition-colors font-bold ${
                        isActive ? 'text-white' : 'text-neutral-500'
                      }`}>
                        {proj.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Stacked Project Canvas Frame */}
            <div className="col-span-9 h-[70vh] relative flex items-center justify-center">
              {projects.map((project, index) => {
                const { opacity, scale, y } = cardAnimations[index];
                const tilt = tilts[index];
                
                return (
                  <motion.div
                    key={project.title}
                    style={{ 
                      opacity, 
                      scale, 
                      y, 
                      zIndex: 10 + index,
                      pointerEvents: activeIndex === index ? 'auto' : 'none'
                    }}
                    className="absolute inset-0 grid grid-cols-12 gap-12 w-full items-center"
                  >
                    {/* Left Panel: Project Info details */}
                    <div className="col-span-5 flex flex-col justify-center">
                      <p className={`font-mono tracking-widest uppercase text-xs mb-3 font-semibold ${project.textColor}`}>
                        {project.category}
                      </p>
                      <h3 className="text-4xl lg:text-5xl font-black text-white mb-6 tracking-tighter uppercase leading-none">
                        {project.title}
                      </h3>
                      <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-light max-w-sm">
                        {project.desc}
                      </p>

                      <div className="flex flex-wrap gap-3 mb-8">
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2.5 rounded-xl bg-white text-black font-mono text-[11px] font-bold tracking-widest uppercase hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all flex items-center gap-2 cursor-hover"
                          >
                            <span>Live Preview</span>
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2.5 rounded-xl bg-transparent border border-neutral-800 text-neutral-300 font-mono text-[11px] font-bold tracking-widest uppercase hover:border-cyan-500/30 hover:text-white transition-all flex items-center gap-2 cursor-hover"
                          >
                            <Github size={13} />
                            <span>Source Code</span>
                          </a>
                        )}
                      </div>

                      <div className="pt-6 border-t border-neutral-900 border-dashed">
                        <h4 className="text-neutral-600 font-mono text-[10px] mb-3 uppercase tracking-widest font-semibold">Engine Technologies</h4>
                        <p className="text-neutral-400 font-mono text-[11px] leading-relaxed">
                          {project.stack}
                        </p>
                      </div>
                    </div>

                    {/* Right Panel: Premium Interactive Device Viewport */}
                    <div className="col-span-7 h-full flex items-center justify-center">
                      <div
                        onMouseMove={(e) => handleMouseMove(index, e)}
                        onMouseLeave={() => handleMouseLeave(index)}
                        style={{
                          transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                          transition: 'transform 0.15s ease-out, border-color 0.5s',
                          boxShadow: `0 25px 60px -15px rgba(0,0,0,0.9), 0 0 30px -10px ${project.glow}`
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
                            SECURE_NODE // {project.title.replace(/\s+/g, "_").toUpperCase()}
                          </div>
                        </div>

                        {/* Highlights Capabilities list */}
                        <div className="flex-1 flex flex-col justify-center py-6 z-10">
                          <h4 className="text-[10px] font-mono text-neutral-600 tracking-[0.25em] uppercase mb-5 font-bold">
                            // CORE OPERATIONS
                          </h4>
                          <div className="space-y-3.5">
                            {project.highlights.map((highlight: string, hIdx: number) => (
                              <div key={hIdx} className="flex items-start gap-3 group/item">
                                <span className={`font-mono text-[10px] mt-1 select-none font-bold ${project.textColor}`}>
                                  [0{hIdx + 1}]
                                </span>
                                <p className="text-neutral-300 text-sm font-light leading-relaxed group-hover/item:text-white transition-colors">
                                  {highlight}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Visual Mock-Container Footer */}
                        <div className="flex justify-between items-end w-full pt-4 border-t border-neutral-900 z-10 text-[9px] font-mono text-neutral-600 font-semibold">
                          <div>
                            STATUS: <span className="text-emerald-500 tracking-wider">COMPILED</span>
                          </div>
                          <div>
                            RENDER_GRID // 0{index + 1}
                          </div>
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
      <div className="w-full py-24 px-6 md:px-12 lg:hidden flex flex-col gap-20 max-w-3xl mx-auto z-10 relative">
        <div className="border-b border-neutral-900 pb-10 mb-6">
          <span className="font-mono text-[9px] text-cyan-400 tracking-[0.45em] uppercase mb-4 block">
            [ SECURE INDEX ARCHIVE ]
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-800 tracking-tighter uppercase leading-none">
            Selected Works
          </h2>
        </div>

        {projects.map((project, idx) => (
          <div 
            key={project.title}
            className="flex flex-col gap-8 border border-white/5 bg-[#0c0c11]/40 rounded-2xl p-6 md:p-10 relative overflow-hidden"
            style={{
              boxShadow: `0 15px 35px rgba(0,0,0,0.6), inset 0 0 20px ${project.glow}`
            }}
          >
            <div className="flex justify-between items-start border-b border-neutral-900 pb-4">
              <p className={`font-mono tracking-widest uppercase text-[10px] font-semibold ${project.textColor}`}>
                {project.category}
              </p>
              <span className="font-mono text-xs text-neutral-600 font-bold">
                0{idx + 1}
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight">
                {project.title}
              </h3>
              <p className="text-neutral-400 text-base font-light leading-relaxed mb-6">
                {project.desc}
              </p>

              {/* Mobile details capabilities */}
              <div className="space-y-2 mb-6 pl-2 border-l border-neutral-800">
                {project.highlights.map((highlight: string, hIdx: number) => (
                  <p key={hIdx} className="text-neutral-400 text-xs font-light">
                    • {highlight}
                  </p>
                ))}
              </div>

              <div className="flex gap-4">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-cyan-400 text-black font-mono text-[10px] font-bold tracking-wider uppercase hover:bg-white transition-colors"
                  >
                    Live Preview
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-transparent border border-neutral-800 text-neutral-300 font-mono text-[10px] font-bold tracking-wider uppercase hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-900">
              <span className="text-neutral-600 font-mono text-[9px] uppercase tracking-wider block mb-2">Engine Stack</span>
              <p className="text-neutral-400 font-mono text-xs leading-relaxed">
                {project.stack}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
