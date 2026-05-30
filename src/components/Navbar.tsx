'use client';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <div className="fixed top-6 left-0 right-0 w-full z-50 flex justify-center pointer-events-none px-4">
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="bg-black/50 border border-white/10 backdrop-blur-md px-6 md:px-8 py-3.5 rounded-full flex justify-between items-center w-full max-w-lg gap-8 pointer-events-auto shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
      >
        <div className="font-black text-xs tracking-widest text-cyan-400 font-mono">GS.OS</div>
        <div className="flex gap-4 md:gap-6 text-[10px] font-mono font-bold tracking-wider text-neutral-400">
          <a href="#about" className="hover:text-white transition-colors cursor-hover">ABOUT</a>
          <a href="#what-i-do" className="hover:text-white transition-colors cursor-hover">EXPERTISE</a>
          <a href="#work" className="hover:text-white transition-colors cursor-hover">WORK</a>
          <a href="#contact" className="hover:text-white transition-colors cursor-hover">CONTACT</a>
        </div>
      </motion.nav>
    </div>
  );
}
