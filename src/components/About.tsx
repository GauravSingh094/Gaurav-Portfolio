'use client';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="relative z-20 bg-[#121212] py-40 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto flex flex-col items-start">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-sm font-mono tracking-widest text-cyan-400 uppercase mb-12"
        >
          [ About Me ]
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-12 text-3xl md:text-4xl lg:text-5xl font-light text-neutral-300 leading-tight tracking-tight"
        >
          <p>
            I am a final-year <span className="text-white font-medium">B.Tech Computer Science and Engineering</span> student with hands-on experience in full-stack and cross-platform development. I work with Flutter, React.js, Next.js, Firebase, Java, Spring Boot, MongoDB, and MySQL to build scalable, user-friendly, and modern digital products.
          </p>
          <p className="text-xl md:text-2xl text-neutral-500 leading-relaxed max-w-3xl">
            I enjoy creating applications that are not only functional but also clean, responsive, and visually polished. My foundation includes object-oriented programming, backend architecture, real-time application development, and responsive UI design. I am a quick learner, a collaborative team player, and someone who enjoys turning ideas into practical software solutions.
          </p>
          <p className="text-xl md:text-2xl text-cyan-200/60 leading-relaxed max-w-3xl font-medium">
            I am currently looking for opportunities where I can contribute to real-world software products while continuing to grow as a developer.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
