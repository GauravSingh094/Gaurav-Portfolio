'use client';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function FixedSocials() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 1 }}
      className="fixed left-8 bottom-0 z-40 hidden md:flex flex-col items-center gap-6 mix-blend-difference text-white pointer-events-auto"
    >
      <a href="https://github.com/GauravSingh094" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors hover:-translate-y-1 transform duration-300 cursor-hover">
        <Github size={20} />
      </a>
      <a href="https://linkedin.com/in/gaurav-singh-276944292" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors hover:-translate-y-1 transform duration-300 cursor-hover">
        <Linkedin size={20} />
      </a>
      <a href="mailto:gauravsinghx2510@gmail.com" className="hover:text-cyan-400 transition-colors hover:-translate-y-1 transform duration-300 cursor-hover">
        <Mail size={20} />
      </a>
      <div className="w-[1px] h-24 bg-white/30 mt-4"></div>
    </motion.div>
  );
}
