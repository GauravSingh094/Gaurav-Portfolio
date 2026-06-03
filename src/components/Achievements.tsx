'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Shield, Terminal, Zap, Cpu, Award, Code } from 'lucide-react';

export default function Achievements() {
  const achievements = [
    { 
      title: "Sovereign Legal AI Platform", 
      desc: "Built a GraphRAG judicial telemetry platform using Neo4j case precedent maps, PageRank authority scores, and Bhashini multi-lingual audio synthesis.",
      metric: "GraphRAG",
      icon: Shield,
      color: "from-indigo-500/20 to-cyan-500/10",
      accent: "text-indigo-400"
    },
    { 
      title: "Syntax Showdown Arena", 
      desc: "Engineered a high-concurrency multiplayer code dueling game featuring sandboxed Docker compiler isolation runtimes and real-time Monaco editor room synchronization.",
      metric: "Sandbox",
      icon: Terminal,
      color: "from-cyan-500/20 to-teal-500/10",
      accent: "text-cyan-400"
    },
    { 
      title: "Mindrift Real-Time Quiz", 
      desc: "Designed real-time quiz game engine driving multiplayer game rooms with sub-10ms state synchronization under heavy connection streams.",
      metric: "Sub-10ms",
      icon: Zap,
      color: "from-teal-500/20 to-emerald-500/10",
      accent: "text-teal-400"
    },
    { 
      title: "Spring Boot DB Optimizations", 
      desc: "Optimized transactional scopes, database connection pools, and Hibernate lazy loading limits to resolve N+1 query bottlenecks and connection spikes.",
      metric: "JPA Optim",
      icon: Cpu,
      color: "from-emerald-500/20 to-green-500/10",
      accent: "text-emerald-400"
    },
    { 
      title: "Enterprise Web Internship", 
      desc: "Successfully shipped responsive client-facing modules, validated cross-device layouts, and refactored legacy structures at InnoByte Services.",
      metric: "Internship",
      icon: Code,
      color: "from-violet-500/20 to-indigo-500/10",
      accent: "text-violet-400"
    }
  ];

  return (
    <section id="achievements" className="relative z-20 bg-[#050507] py-40 px-6 md:px-12 lg:px-24 border-t border-neutral-900 border-dashed overflow-hidden select-none">
      {/* Background spotlights */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(6,182,212,0.02),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      <div className="max-w-screen-2xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 text-cyan-400 font-mono text-[10px] tracking-[0.45em] uppercase mb-8"
            >
              <span className="w-8 h-[1px] bg-cyan-950 inline-block" />
              [ MILESTONES & RECOGNITIONS ]
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-800 tracking-tighter uppercase leading-none">
              Achievements
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-neutral-500">
            <Award size={14} className="text-cyan-500 animate-pulse" />
            <span>SYS_MILESTONES_ACTIVE</span>
          </div>
        </div>

        {/* Dynamic Achievements Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {achievements.map((item, i) => {
            const Icon = item.icon;
            return (
              <AchievementCard 
                key={i} 
                item={item} 
                index={i} 
                Icon={Icon} 
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}

// Sub-component to manage individual card pointer events
function AchievementCard({ item, index, Icon }: { item: any; index: number; Icon: any }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouseCoord, setMouseCoord] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMouseCoord({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-[#0c0c11]/80 border border-white/5 rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:border-cyan-500/20 hover:bg-[#0c0c11] shadow-2xl flex flex-col justify-between h-[300px]"
      style={{
        boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
      }}
    >
      {/* Radial Hover Spotlight Glow following the cursor */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          background: `radial-gradient(150px circle at ${mouseCoord.x}px ${mouseCoord.y}px, rgba(6, 182, 212, 0.04), transparent 80%)`
        }}
      />

      {/* Internal themed ambient back-lighting */}
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.color} blur-2xl opacity-40 rounded-full pointer-events-none -z-10`} />

      <div>
        {/* Card Header metadata */}
        <div className="flex justify-between items-center mb-6 border-b border-neutral-900 pb-4">
          <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 bg-neutral-950 border border-neutral-900 px-3 py-1 rounded-full font-bold">
            {item.metric}
          </span>
          <span className="font-mono text-[10px] text-neutral-600 font-bold group-hover:text-cyan-500 transition-colors">
            NODE // 0{index + 1}
          </span>
        </div>

        {/* Dynamic Icon and title */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2.5 rounded-xl bg-neutral-950 border border-neutral-900 group-hover:border-cyan-500/20 group-hover:bg-neutral-900 transition-all duration-300 ${item.accent}`}>
            <Icon size={18} strokeWidth={2} />
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors uppercase font-mono">
            {item.title}
          </h3>
        </div>

        <p className="text-neutral-400 text-[13px] leading-relaxed font-light font-sans group-hover:text-neutral-300 transition-colors">
          {item.desc}
        </p>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-neutral-800 group-hover:border-cyan-400/50 transition-colors duration-300" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-neutral-800 group-hover:border-cyan-400/50 transition-colors duration-300" />
    </motion.div>
  );
}
