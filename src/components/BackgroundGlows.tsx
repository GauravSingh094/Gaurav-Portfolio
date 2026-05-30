'use client';
import { motion } from 'framer-motion';

export default function BackgroundGlows() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-cyan-900/20 blur-[120px]"
        animate={{
          x: ['0%', '20%', '0%'],
          y: ['0%', '10%', '0%'],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-teal-900/20 blur-[150px]"
        animate={{
          x: ['0%', '-20%', '0%'],
          y: ['0%', '-10%', '0%'],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
