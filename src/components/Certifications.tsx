'use client';
import { motion } from 'framer-motion';

export default function Certifications() {
  const certifications = [
    { title: "Introduction to Cloud Computing", status: "Completed" },
    { title: "Project Engineer – 5G Network", status: "Completed" },
    { title: "Python Web Development — Anudip Foundation", status: "Ongoing", highlight: true }
  ];

  return (
    <section className="relative z-20 bg-[#0a0a0a] py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-20 text-white tracking-tighter"
        >
          Certifications & Learning
        </motion.h2>

        <div className="flex flex-col border-t border-neutral-900">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group flex flex-col md:flex-row md:items-center justify-between py-10 border-b border-neutral-900 hover:border-cyan-900/50 transition-colors cursor-hover"
            >
              <h3 className={`text-2xl md:text-3xl font-light tracking-tight transition-colors ${cert.highlight ? 'text-white group-hover:text-cyan-400' : 'text-neutral-400 group-hover:text-white'}`}>
                {cert.title}
              </h3>
              <div className="mt-4 md:mt-0 flex items-center">
                <span className={`text-xs font-mono tracking-widest uppercase flex items-center gap-3 ${cert.highlight ? 'text-cyan-400' : 'text-neutral-600'}`}>
                  {cert.highlight && <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>}
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
