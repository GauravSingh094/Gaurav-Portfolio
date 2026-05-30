'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function CareerTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const timeline = [
    {
      role: "Web Developer Intern",
      company: "InnoByte Services Private Limited",
      date: "July 2025 – August 2025",
      location: "New Delhi, Delhi, India",
      desc: "Built responsive and user-centric web applications using React.js, JavaScript, HTML, and CSS. Integrated Firebase for real-time database management and authentication. Collaborated in agile teams to design, develop, and deploy scalable features. Managed version control using Git and GitHub and contributed to UI/UX improvements and performance optimization across projects."
    },
    {
      role: "Kingsukh Website",
      company: "Internship Project",
      date: "2025",
      location: "",
      desc: "Worked on the development and enhancement of the Kingsukh website during internship. Contributed to responsive frontend development, UI/UX improvement, layout optimization, and performance enhancement. Built and refined website sections using React.js, JavaScript, HTML, CSS, Firebase, Git, and GitHub. Focused on clean design, maintainable code, responsiveness across devices, and better user experience."
    },
    {
      role: "Final-Year Developer Journey",
      company: "Flutter, Web, and Full-Stack Projects",
      date: "2022 – Present",
      location: "",
      desc: "Built academic and self-driven projects across Flutter, Next.js, Firebase, and Spring Boot. Developed applications focused on real-world usability, responsive UI, real-time functionality, and maintainable architecture."
    }
  ];

  return (
    <section id="timeline" className="relative z-20 bg-[#0a0a0a] py-40 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto" ref={containerRef}>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-32 flex flex-col items-center text-center"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-4">My career & experience</h2>
        </motion.div>

        <div className="relative pl-8 md:pl-0">
          <div className="absolute left-[16px] md:left-1/2 md:-ml-[1px] top-0 bottom-0 w-[1px] bg-neutral-800">
            <motion.div 
              style={{ scaleY: pathLength, transformOrigin: 'top' }}
              className="w-full h-full bg-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
            />
          </div>

          <div className="space-y-32">
            {timeline.map((item, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={i} className={`relative flex flex-col md:flex-row ${isEven ? 'md:justify-start' : 'md:justify-end'} items-start md:items-center`}>
                  
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="absolute left-[13px] md:left-1/2 md:-ml-[3.5px] w-2 h-2 rounded-full bg-cyan-400 ring-4 ring-[#0a0a0a] z-10"
                  />

                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className={`md:w-5/12 ml-12 md:ml-0 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}
                  >
                    <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4 block">{item.date}</span>
                    <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">{item.role}</h3>
                    <h4 className="text-xl text-neutral-500 mb-6 font-serif italic">{item.company}</h4>
                    {item.location && <p className="text-neutral-600 text-sm mb-6 font-mono uppercase tracking-widest">{item.location}</p>}
                    <p className="text-neutral-400 leading-relaxed text-lg text-left">
                      {item.desc}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
