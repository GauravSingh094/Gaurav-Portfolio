'use client';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink, ShieldCheck, Cpu } from 'lucide-react';

export default function Resume() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    
    // Normalize coordinates between -0.5 and 0.5
    const px = x / box.width - 0.5;
    const py = y / box.height - 0.5;
    
    // Physical tilt limits
    setTilt({
      x: -py * 15,
      y: px * 15
    });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const driveUrl = "https://drive.google.com/file/d/1zxa1Co29lOq7zD1bm-5sdHRpOVuzmimH/view?usp=drivesdk";

  // Skills statistics metrics for interactive dashboard
  const skillStats = [
    { category: "Frontend Engine", value: 92, status: "Optimal" },
    { category: "Backend Architecture", value: 88, status: "Advanced" },
    { category: "Cross-Platform Mobile", value: 85, status: "Stable" },
    { category: "Data Systems", value: 90, status: "Optimal" },
  ];

  return (
    <section id="resume" className="relative z-20 bg-[#0a0a0a] py-40 px-6 md:px-12 lg:px-24 border-t border-neutral-900 border-dashed overflow-hidden select-none">
      {/* Background radial spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(6,182,212,0.02),transparent_50%)] pointer-events-none" />

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
              [ SYSTEM CV ACCESS ]
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-800 tracking-tighter uppercase leading-none">
              Resume View
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-neutral-500">
            <span>SYS_CV_VERIFIED // DRIVE_ONLINE</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Panel: Controls and Statistics Dashboard */}
          <div className="lg:col-span-6 space-y-10">
            
            {/* Status Panel Widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative bg-[#0c0c11]/80 border border-white/5 rounded-3xl p-8 overflow-hidden shadow-xl"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(34,211,238,0.02),transparent_60%)] pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-6">
                <Cpu size={18} className="text-cyan-400" />
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest font-semibold">
                  Credentials System Status
                </span>
              </div>
              
              <p className="text-neutral-400 text-base leading-relaxed font-light mb-8">
                Access my verified professional credentials archive containing structured history across full-stack systems engineering, mobile architecture pipelines, and multi-tier databases.
              </p>

              {/* Progress bars matrix */}
              <div className="space-y-4">
                {skillStats.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-neutral-400 uppercase tracking-wider">{item.category}</span>
                      <span className="text-cyan-400">{item.value}% // {item.status}</span>
                    </div>
                    <div className="h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden border border-neutral-950">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: idx * 0.1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Glowing Command Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-5"
            >
              {/* Direct Drive Download */}
              <a 
                href={driveUrl}
                target="_blank"
                rel="noreferrer"
                className="group relative flex-1 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-black font-mono font-bold text-xs tracking-widest uppercase py-5 px-8 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_0_30px_rgba(6,182,212,0.2)] hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] cursor-hover"
              >
                <Download size={16} strokeWidth={2.5} />
                <span>Download CV</span>
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-cyan-300 rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </a>

              {/* View in Drive (Interactive frosted) */}
              <a 
                href={driveUrl}
                target="_blank"
                rel="noreferrer"
                className="group relative flex-1 bg-[#0c0c11]/80 hover:bg-[#0c0c11] border border-white/5 hover:border-cyan-500/30 text-white font-mono font-bold text-xs tracking-widest uppercase py-5 px-8 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-xl cursor-hover"
              >
                <ExternalLink size={16} className="text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                <span>View Google Drive</span>
              </a>
            </motion.div>

            {/* System Encryption Badge */}
            <div className="flex items-center gap-2.5 px-4 font-mono text-[10px] text-neutral-600 uppercase tracking-widest">
              <ShieldCheck size={14} className="text-cyan-600" />
              <span>SECURE END-TO-END VERIFIED DOCUMENT STORAGE</span>
            </div>

          </div>

          {/* Right Panel: Interactive 3D Parallax Resume Sheet */}
          <div className="lg:col-span-6 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md aspect-[1/1.4] relative z-10"
              style={{ perspective: 1000 }}
            >
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={handleMouseLeave}
                className="w-full h-full bg-[#0c0c11]/90 border border-white/5 rounded-3xl p-8 md:p-10 relative overflow-hidden transition-all duration-300 shadow-2xl flex flex-col justify-between"
                style={{
                  boxShadow: hovered ? '0 25px 60px rgba(6,182,212,0.15), 0 0 40px rgba(0,0,0,0.8)' : '0 20px 50px rgba(0,0,0,0.6)',
                  transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  borderColor: hovered ? 'rgba(34,211,238,0.25)' : 'rgba(255,255,255,0.05)',
                  transition: hovered ? 'none' : 'all 0.5s ease'
                }}
              >
                {/* Visual grid sheet layout */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.007)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.007)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(34,211,238,0.05),transparent_60%)] pointer-events-none" />

                {/* Inner Sheet Header */}
                <div>
                  <div className="flex justify-between items-start mb-6 border-b border-neutral-900 pb-4">
                    <div className="flex items-center gap-2 text-cyan-400 font-mono text-[9px] tracking-widest font-semibold">
                      <FileText size={12} />
                      <span>[ DOC_SYS_CV ]</span>
                    </div>
                    <span className="font-mono text-[8px] text-neutral-600">SYS_V2.6_ACTIVE</span>
                  </div>

                  {/* Resume Mockup Profile */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-3xl font-black text-white tracking-tight uppercase leading-none">
                        Gaurav Singh
                      </h4>
                      <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mt-1">
                        Systems & Full-Stack Engineer
                      </p>
                    </div>

                    <div className="h-[1px] w-full bg-neutral-900" />

                    <div className="space-y-2.5">
                      <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider block">// Core Dossier</span>
                      <p className="text-xs text-neutral-400 leading-relaxed font-light font-sans">
                        Final-year Computer Science Engineering undergraduate specializing in high-concurrency cloud nodes, fluid responsive dashboards, and cross-platform mobile environments (Flutter/React/Java/Spring Boot).
                      </p>
                    </div>

                    <div className="h-[1px] w-full bg-neutral-900" />

                    {/* Resume Mockup Experience */}
                    <div className="space-y-2">
                      <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider block">// Verified Milestones</span>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-semibold text-white">
                          <span>Web Developer Intern</span>
                          <span className="text-cyan-400 font-mono text-[9px]">2025</span>
                        </div>
                        <p className="text-[10px] text-neutral-500">InnoByte Services Private Limited // Remote</p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-semibold text-white">
                          <span>B.Tech in Computer Science</span>
                          <span className="text-cyan-400 font-mono text-[9px]">2022 – 2026</span>
                        </div>
                        <p className="text-[10px] text-neutral-500">NITRA Technical Campus, Ghaziabad / AKTU</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inner Sheet Footer */}
                <div className="border-t border-neutral-900 pt-4 flex justify-between items-center text-[8px] font-mono text-neutral-600 uppercase tracking-widest">
                  <span>SECURE DEPLOY READY</span>
                  <span className="text-cyan-400/80 group-hover:text-cyan-400 transition-colors">
                    [ HOVER TO ROTATE ]
                  </span>
                </div>

                {/* Cyber Card Corners */}
                <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-neutral-800 group-hover:border-cyan-400/40 transition-colors duration-300" />
                <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-neutral-800 group-hover:border-cyan-400/40 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-neutral-800 group-hover:border-cyan-400/40 transition-colors duration-300" />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-neutral-800 group-hover:border-cyan-400/40 transition-colors duration-300" />
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
