'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ROLES = [
  "Flutter Developer",
  "Web Developer",
  "Full Stack Developer",
  "Software Engineer"
];

const MARQUEE_TEXT = ROLES.join(" • ") + " • " + ROLES.join(" • ") + " • ";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<'loading' | 'welcome' | 'exiting'>('loading');
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for the tactile glow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const { clientX, clientY } = e;
        containerRef.current.style.setProperty('--mouse-x', `${clientX}px`);
        containerRef.current.style.setProperty('--mouse-y', `${clientY}px`);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Staged loading behavior (Snappy load, then pauses at Welcome stage for user click)
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Reaches 100% in ~1.1 seconds
      current += Math.random() * 2 + 2.8;
      
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        
        // Pause at welcome stage so the user can manually click to proceed
        setTimeout(() => {
          setStage('welcome');
        }, 150);
      } else {
        setProgress(Math.floor(current));
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    if (stage === 'welcome') {
      setStage('exiting');
      setTimeout(onComplete, 1000);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.8 } }}
        className="fixed inset-0 z-[100] bg-[#e0f2f1] text-[#050505] flex flex-col overflow-hidden select-none"
        style={{ '--mouse-x': '50%', '--mouse-y': '50%' } as any}
      >
        {/* Header Area */}
        <div className="p-8 md:p-12 flex justify-center z-10">
          <div className="w-full max-w-7xl flex justify-between items-center text-black">
            <span className="text-sm font-bold tracking-tight uppercase">GS</span>
            
            {/* Kinetic Mini-Game (Top Right) */}
            <div className="flex items-center gap-1 group">
               <div className="w-24 h-6 border border-black/10 rounded-sm bg-black/5 relative flex items-center px-1 overflow-hidden">
                  <div className="absolute inset-0 flex justify-around items-center px-1">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <motion.div 
                        key={i} 
                        animate={{ height: [4, 12, 4] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                        className="w-[2px] bg-black/20" 
                      />
                    ))}
                  </div>
                  <motion.div 
                    animate={{ x: [0, 80, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-2 h-2 rounded-full bg-[#2dd4bf] shadow-[0_0_8px_#2dd4bf] relative z-20"
                  />
               </div>
            </div>
          </div>
        </div>

        {/* Huge Marquee Strip */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full overflow-hidden whitespace-nowrap opacity-[0.08] pointer-events-none z-0">
          <motion.div 
            animate={{ x: [0, -2000] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="text-[18vw] font-black uppercase tracking-tighter text-black inline-block"
          >
            {MARQUEE_TEXT}
          </motion.div>
        </div>

        {/* Central Unit: Black Pill Button Wrapper */}
        <div className="flex-1 flex items-center justify-center p-6 z-20 overflow-visible">
          <div className="relative overflow-visible">
            {/* The dramatic Expanding Pill Fill */}
            <AnimatePresence>
              {stage === 'exiting' && (
                <motion.div 
                  initial={{ scale: 1, borderRadius: '9999px' }}
                  animate={{ scale: 100, borderRadius: '9999px' }}
                  transition={{ duration: 1.2, ease: [0.7, 0, 0.3, 1] }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-black z-[100] pointer-events-none"
                />
              )}
            </AnimatePresence>

            <motion.div
              layout
              className="relative rounded-full p-[2px] bg-black/5 border border-black/10 backdrop-blur-sm group"
            >
              {/* Interaction Glow Layer */}
              <div 
                className="absolute inset-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 overflow-hidden"
              >
                <div 
                  className="absolute w-[200px] h-[200px] -translate-x-1/2 -translate-y-1/2 blur-[40px] opacity-30 bg-[#2dd4bf]"
                  style={{ left: 'var(--mouse-x)', top: 'var(--mouse-y)' }}
                />
              </div>

              <motion.button
                onClick={handleEnter}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="relative bg-black text-white px-12 md:px-20 py-8 md:py-10 rounded-full flex items-center gap-4 md:gap-8 group overflow-hidden"
              >
                 {/* Secondary White Hover Glow */}
                 <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none z-0"
                  style={{
                    background: `radial-gradient(circle 80px at var(--mouse-x) var(--mouse-y), white, transparent)`
                  }}
                 />

                 <AnimatePresence mode="wait">
                    {stage === 'loading' ? (
                      <motion.div 
                        key="loading"
                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                        className="flex items-center gap-6"
                      >
                         <span className="text-xl md:text-3xl font-black tabular-nums tracking-tighter">
                            Loading {progress}%
                         </span>
                         <motion.div 
                           animate={{ opacity: [1, 0, 1] }}
                           transition={{ duration: 0.8, repeat: Infinity }}
                           className="w-3 h-5 md:w-4 md:h-8 bg-white" 
                         />
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="welcome"
                        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center"
                      >
                        <span className="text-xl md:text-3xl font-black uppercase tracking-[0.2em]">Welcome</span>
                        <span className="text-[10px] font-mono text-neutral-400 mt-2 tracking-widest animate-pulse">Click to proceed</span>
                      </motion.div>
                    )}
                 </AnimatePresence>
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Footer info (matches reference mood) */}
        <div className="p-12 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-black/30 z-10 w-full max-w-7xl mx-auto flex justify-between items-end">
           <div className="flex flex-col items-start gap-1">
              <span>System: Active</span>
              <span>Visuals: G.2.0.4</span>
           </div>
           <div>( © 2026 GS Portfolio System )</div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
