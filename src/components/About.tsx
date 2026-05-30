'use client';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="relative z-20 bg-[#050507] py-40 px-6 md:px-12 lg:px-24 overflow-hidden select-none">
      {/* Background radial spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.03),transparent_50%)] pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          
          {/* Left Column: Heading */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 text-cyan-400 font-mono text-[10px] tracking-[0.45em] uppercase mb-8"
            >
              <span className="w-8 h-[1px] bg-cyan-950 inline-block" />
              [ WHO I AM ]
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-800 tracking-tighter uppercase leading-none"
            >
              GAURAV<br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>SINGH</span>
            </motion.h2>
          </div>

          {/* Right Column: Premium Frosted Card Content */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-[#0c0c11]/70 border border-white/5 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl hover:border-cyan-500/20 transition-all duration-500 group"
              style={{
                boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
              }}
            >
              {/* Internal spotlight reflection */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(34,211,238,0.03),transparent_60%)] pointer-events-none" />

              {/* Status Badge */}
              <div className="flex items-center gap-2.5 bg-neutral-950/80 border border-neutral-900 px-4 py-2 rounded-full w-fit mb-10">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                </span>
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-semibold">
                  SYS_STATUS // ACTIVE DEV INQUIRIES
                </span>
              </div>

              {/* Core Bio Description */}
              <div className="space-y-8 text-2xl md:text-3xl font-light text-neutral-300 leading-snug tracking-tight">
                <p>
                  I am a final-year <span className="text-white font-semibold">B.Tech Computer Science and Engineering</span> student with hands-on experience in full-stack and cross-platform development. I design and engineer responsive applications using Flutter, React.js, Next.js, Firebase, Java, Spring Boot, MongoDB, and MySQL.
                </p>
                <p className="text-lg text-neutral-400 leading-relaxed font-light font-sans">
                  I enjoy creating applications that are not only functional but also clean, responsive, and visually polished. My foundation includes object-oriented programming, backend architecture, real-time application development, and responsive UI design. I am a quick learner, a collaborative team player, and someone who enjoys turning ideas into practical software solutions.
                </p>
                <p className="text-lg text-cyan-400/80 leading-relaxed font-mono tracking-wide">
                  Currently seeking opportunities where I can contribute to real-world software systems while continuing to grow my technical capabilities.
                </p>
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-neutral-800 group-hover:border-cyan-400/50 transition-colors duration-300" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-neutral-800 group-hover:border-cyan-400/50 transition-colors duration-300" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
