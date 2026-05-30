'use client';
import { motion } from 'framer-motion';

export default function Achievements() {
  const achievements = [
    "Built an AI-powered emotion-based music player",
    "Developed a scalable real-time quiz platform",
    "Completed a web development internship at InnoByte Services",
    "Built projects across mobile, web, and Java full-stack development",
    "Continuously improving technical skills through certifications and ongoing learning"
  ];

  return (
    <section className="relative z-20 bg-[#0a0a0a] py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:w-1/4"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-4">Achievements</h2>
        </motion.div>

        <div className="lg:w-3/4 flex flex-col gap-8">
          {achievements.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-start gap-6 group cursor-hover"
            >
              <div className="text-cyan-900 font-mono text-xl mt-1 group-hover:text-cyan-400 transition-colors">
                {(i + 1).toString().padStart(2, '0')}
              </div>
              <p className="text-neutral-400 text-xl md:text-2xl font-light leading-snug group-hover:text-white transition-colors">
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
