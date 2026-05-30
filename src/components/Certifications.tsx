'use client';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

export default function Certifications() {
  const certifications = [
    { title: "Introduction to Cloud Computing", status: "Completed", date: "2025" },
    { title: "Project Engineer – 5G Network", status: "Completed", date: "2025" },
    { title: "Python Web Development — Anudip Foundation", status: "Ongoing", highlight: true, date: "Active" }
  ];

  return (
    <section id="certifications" className="relative z-20 bg-[#050507] py-40 px-6 md:px-12 lg:px-24 border-t border-neutral-900 border-dashed overflow-hidden select-none">
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
              [ TECHNICAL CREDENTIALS ]
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-800 tracking-tighter uppercase leading-none">
              Certifications
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-neutral-500">
            <span>SYS_CREDENTIAL_VERIFIED</span>
          </div>
        </div>

        <div className="flex flex-col border-t border-neutral-800/60">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group flex flex-col md:flex-row md:items-center justify-between py-12 border-b border-neutral-800/60 hover:border-cyan-500/20 transition-all duration-300 cursor-hover relative overflow-hidden px-4 md:px-8 bg-neutral-900/5 hover:bg-neutral-900/10"
            >
              {/* Dynamic hover backdrop spotlight */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_left_center,rgba(34,211,238,0.02),transparent_40%)] pointer-events-none transition-opacity duration-500" />

              <div className="flex items-center gap-6 z-10">
                <span className="font-mono text-xs text-neutral-600 group-hover:text-cyan-400 transition-colors">
                  0{i + 1}
                </span>
                <div className="flex items-center justify-center p-3 rounded-lg bg-neutral-950/80 border border-neutral-800/60 text-neutral-500 group-hover:text-cyan-400 group-hover:border-cyan-500/20 transition-colors">
                  <Award size={20} strokeWidth={1.5} />
                </div>
                <h3 className={`text-xl md:text-2xl font-light tracking-tight transition-colors ${cert.highlight ? 'text-white group-hover:text-cyan-400' : 'text-neutral-400 group-hover:text-white'}`}>
                  {cert.title}
                </h3>
              </div>

              <div className="mt-6 md:mt-0 flex items-center gap-8 z-10 self-start md:self-center ml-12 md:ml-0">
                <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
                  {cert.date}
                </span>
                
                <span className={`text-xs font-mono tracking-widest uppercase flex items-center gap-3 ${cert.highlight ? 'text-cyan-400' : 'text-neutral-500'}`}>
                  {cert.highlight && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                  )}
                  {cert.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
