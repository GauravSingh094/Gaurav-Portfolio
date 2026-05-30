'use client';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="fixed top-0 left-0 w-full z-50 py-6 px-8 md:px-16 flex justify-between items-center mix-blend-difference text-white pointer-events-auto"
    >
      <div className="font-bold text-xl tracking-tighter">GAURAV SINGH</div>
      <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
        <a href="#about" className="hover:text-cyan-400 transition-colors cursor-hover">ABOUT</a>
        <a href="#what-i-do" className="hover:text-cyan-400 transition-colors cursor-hover">EXPERTISE</a>
        <a href="#work" className="hover:text-cyan-400 transition-colors cursor-hover">WORK</a>
        <a href="#contact" className="hover:text-cyan-400 transition-colors cursor-hover">CONTACT</a>
      </div>
    </motion.nav>
  );
}
