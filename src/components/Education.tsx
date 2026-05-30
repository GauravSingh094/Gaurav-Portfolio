'use client';
import { motion } from 'framer-motion';

export default function Education() {
  const education = [
    {
      degree: "B.Tech in Computer Science and Engineering",
      institution: "NITRA Technical Campus, Ghaziabad / AKTU",
      year: "2022 – 2026",
      details: [
        "Specialization: Computer Science & Systems",
        "Key Coursework: Data Structures, OOPs, DBMS, Operating Systems",
        "Activity: Software Engineering Research & Web Labs"
      ],
      location: "Ghaziabad, UP",
      code: "AKTU_275"
    },
    {
      degree: "Intermediate",
      institution: "Saraswati Vidya Mandir, Gorakhpur",
      year: "2022",
      details: [
        "Stream: Science (Physics, Chemistry, Mathematics)",
        "Focus: Core Mathematics & Foundational Programming",
        "Status: Passed with First Class Distinction"
      ],
      location: "Gorakhpur, UP",
      code: "SVM_SEC"
    },
    {
      degree: "High School",
      institution: "Himalayan Public School, Gorakhpur",
      year: "2020",
      details: [
        "Focus: Science, Mathematics & English",
        "Activities: Information Technology Laboratory Labs",
        "Status: Passed with First Class Distinction"
      ],
      location: "Gorakhpur, UP",
      code: "HPS_HIGH"
    }
  ];

  return (
    <section id="education" className="relative z-20 bg-[#050507] py-40 px-6 md:px-12 lg:px-24 border-t border-neutral-900 border-dashed overflow-hidden select-none">
      {/* Background radial spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(6,182,212,0.02),transparent_50%)] pointer-events-none" />

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
              [ ACADEMIC ARCHIVE ]
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-800 tracking-tighter uppercase leading-none">
              Education
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-neutral-500">
            <span>SYS_ACADEMICS_ACTIVE</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          {education.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-[#0c0c11]/80 border border-white/5 rounded-3xl p-8 md:p-10 overflow-hidden transition-all duration-500 hover:border-cyan-500/20 hover:bg-[#0c0c11] shadow-2xl hover:-translate-y-2"
              style={{
                boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
              }}
            >
              {/* Internal glow spotlight */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.03),transparent_65%)] pointer-events-none" />

              {/* Upper Section Header */}
              <div className="flex justify-between items-start mb-8 border-b border-neutral-900 pb-6">
                <div>
                  <span className="font-mono text-xs text-cyan-400 font-semibold tracking-wider">
                    {item.code}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-mono text-xs text-neutral-400 flex items-center gap-1.5 font-medium bg-neutral-950/50 border border-neutral-900 px-3 py-1 rounded-full">
                    {item.year}
                  </span>
                </div>
              </div>

              {/* Degree Title & Institution */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-cyan-400 transition-colors uppercase leading-tight">
                  {item.degree}
                </h3>
                <p className="text-neutral-400 font-sans text-base leading-relaxed">
                  {item.institution}
                </p>
              </div>

              {/* Academic Highlights/Details list */}
              <ul className="space-y-3 mb-6 border-t border-neutral-950 pt-6">
                {item.details.map((detail, idx) => (
                  <li key={idx} className="text-neutral-500 text-sm leading-relaxed font-light flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/30 group-hover:bg-cyan-500/50 transition-colors shrink-0" />
                    <span className="group-hover:text-neutral-400 transition-colors">{detail}</span>
                  </li>
                ))}
              </ul>

              {/* Location Footer Accent */}
              <div className="mt-8 pt-4 border-t border-neutral-900 flex justify-between items-center text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
                <span className="flex items-center gap-1">
                  {item.location}
                </span>
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-neutral-800 group-hover:border-cyan-400/50 transition-colors duration-300" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-neutral-800 group-hover:border-cyan-400/50 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
