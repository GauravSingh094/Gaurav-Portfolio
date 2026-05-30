'use client';
import { motion } from 'framer-motion';

export default function Achievements() {
  const achievements = [
    { title: "AI-Powered Music Player Engine", desc: "Built an emotion-based music player application personalizing song recommendations through dynamic facial tracking." },
    { title: "Scalable Real-Time Quiz Platform", desc: "Engineered high-concurrency quiz platform with tab-switching triggers and secure real-time leaderboards." },
    { title: "Web Development Internship Curation", desc: "Successfully engineered and shipped clean user-facing responsive modules at InnoByte Services." },
    { title: "Cross-Platform Engineering Scope", desc: "Built robust product architectures spanning responsive web interfaces, mobile apps, and Java backends." },
    { title: "Continuous Technical Acceleration", desc: "Refining specialized full-stack and mobile capabilities through ongoing professional certifications." }
  ];

  return (
    <section id="achievements" className="relative z-20 bg-[#050507] py-40 px-6 md:px-12 lg:px-24 border-t border-neutral-900 border-dashed overflow-hidden select-none">
      <div className="max-w-screen-2xl mx-auto">
        
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
            <span>SYS_MILESTONES_ACTIVE</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {achievements.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-[#0c0c11]/80 border border-white/5 rounded-2xl p-8 overflow-hidden transition-all duration-500 hover:border-cyan-500/20 hover:bg-[#0c0c11] shadow-xl hover:-translate-y-1.5"
              style={{
                boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
              }}
            >
              {/* Subtle background glow spotlight */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.03),transparent_65%)] pointer-events-none" />

              <div className="flex justify-between items-baseline mb-6 border-b border-neutral-900 pb-4">
                <span className="font-mono text-3xl font-black text-cyan-500/40 group-hover:text-cyan-400 transition-colors">
                  #0{i + 1}
                </span>
                <span className="text-[9px] font-mono text-neutral-600 uppercase tracking-widest">
                  Milestone
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-cyan-400 transition-colors uppercase">
                {item.title}
              </h3>
              <p className="text-neutral-500 text-sm leading-relaxed font-light">
                {item.desc}
              </p>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-neutral-800 group-hover:border-cyan-400/50 transition-colors duration-300" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-neutral-800 group-hover:border-cyan-400/50 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
