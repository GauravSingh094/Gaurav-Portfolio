'use client';

import { motion } from 'framer-motion';

export default function CareerTimeline() {
  const item = {
    role: "Web Developer Intern",
    company: "InnoByte Services Private Limited",
    date: "July 2025 – August 2025",
    location: "New Delhi, Delhi, India",
    desc: "Built responsive and user-centric web applications using React.js, JavaScript, HTML, and CSS. Integrated Firebase for real-time database management and authentication. Collaborated in agile teams to design, develop, and deploy scalable features. Managed version control using Git and GitHub and contributed to UI/UX improvements and performance optimization across projects."
  };

  return (
    <section id="timeline" className="relative z-20 bg-[#050507] py-40 px-6 md:px-12 lg:px-24 border-t border-neutral-900 border-dashed overflow-hidden select-none">
      {/* Background soft ambient radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.02),transparent_75%)] pointer-events-none" />

      {/* Local keyframe styles for intelligence panels */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes energyWave {
          0% { transform: translateX(-50%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}} />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 flex flex-col items-center text-center"
        >
          <p className="text-cyan-400 font-mono text-[10px] tracking-[0.45em] uppercase mb-4">
            [ PROFESSIONAL TIMELINE ]
          </p>
          <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-800 tracking-tighter uppercase leading-none">
            Career & Experience
          </h2>
        </motion.div>

        {/* Center Glass Display Panel */}
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#0c0c11]/80 border border-white/5 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl hover:border-cyan-500/20 transition-all duration-500 group"
          style={{
            boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
          }}
        >
          {/* Internal reflection spotlight */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.04),transparent_60%)] pointer-events-none" />
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-0 border-b border-neutral-900 pb-8 mb-8">
            <div>
              <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase mb-2 block">
                {item.date}
              </span>
              <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase">
                {item.role}
              </h3>
              <h4 className="text-xl text-neutral-500 font-serif italic mt-1">
                {item.company}
              </h4>
            </div>
            
            {item.location && (
              <div className="bg-neutral-950/80 border border-neutral-900 px-4 py-2 rounded-lg font-mono text-[10px] text-neutral-400 uppercase tracking-widest self-start">
                {item.location}
              </div>
            )}
          </div>

          <p className="text-neutral-300 text-lg font-light leading-relaxed">
            {item.desc}
          </p>

          {/* Glowing bottom line wave */}
          <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden pointer-events-none">
            <div className="w-[200%] h-full opacity-35 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-[energyWave_4s_linear_infinite]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
