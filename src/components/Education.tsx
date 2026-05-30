'use client';
import { motion } from 'framer-motion';

export default function Education() {
  const education = [
    {
      degree: "B.Tech in Computer Science and Engineering",
      institution: "NITRA Technical Campus, Ghaziabad / AKTU",
      year: "2022 – 2026",
    },
    {
      degree: "Intermediate",
      institution: "Saraswati Vidya Mandir, Gorakhpur",
      year: "2022",
    },
    {
      degree: "High School",
      institution: "Himalayan Public School, Gorakhpur",
      year: "2020",
    }
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
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-4">Education</h2>
        </motion.div>

        <div className="lg:w-3/4 flex flex-col border-t border-neutral-900">
          {education.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex flex-col md:flex-row md:items-center justify-between py-10 border-b border-neutral-900 hover:border-cyan-900/50 transition-colors cursor-hover"
            >
              <div>
                <h3 className="text-2xl md:text-3xl font-medium text-white mb-3 tracking-tight group-hover:text-cyan-400 transition-colors">{item.degree}</h3>
                <p className="text-neutral-500 font-serif italic text-lg">{item.institution}</p>
              </div>
              <div className="mt-6 md:mt-0 text-cyan-900 font-mono tracking-widest text-sm uppercase group-hover:text-cyan-400 transition-colors">
                {item.year}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
