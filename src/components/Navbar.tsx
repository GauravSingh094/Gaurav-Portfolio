'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('about');
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: 'ABOUT', id: 'about' },
    { label: 'SERVICES', id: 'what-i-do' },
    { label: 'WORK', id: 'work' },
    { label: 'EDUCATION', id: 'education' },
    { label: 'CONTACT', id: 'contact' },
  ];

  // Scroll active section detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-6 left-0 right-0 w-full z-50 flex justify-center pointer-events-none px-4">
        <motion.nav 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`border border-white/5 backdrop-blur-md px-5 py-2.5 rounded-full flex justify-between items-center w-full max-w-2xl gap-8 pointer-events-auto shadow-[0_15px_35px_rgba(0,0,0,0.6)] transition-all duration-500 ${
            scrolled ? 'bg-black/75 border-cyan-500/20 shadow-[0_15px_35px_rgba(6,182,212,0.1)]' : 'bg-black/40'
          }`}
        >
          {/* Logo Brand Accent */}
          <a href="#about" className="flex items-center gap-2 group cursor-hover select-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="font-mono text-xs font-black tracking-widest text-cyan-400 group-hover:text-white transition-colors duration-300">
              GS.OS
            </span>
          </a>

          {/* Desktop Links (Hidden on mobile) */}
          <div className="hidden md:flex gap-1.5 items-center relative">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative px-4 py-2 text-[10px] font-mono font-bold tracking-wider rounded-full transition-colors cursor-hover select-none ${
                    isActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-white/10 rounded-full border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Action Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral-400 hover:text-white p-1 transition-colors cursor-hover relative z-50 select-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-xl md:hidden flex flex-col justify-center px-8 md:px-16 select-none"
          >
            {/* Ambient Background Spotlights */}
            <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-cyan-950/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-blue-950/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex flex-col gap-6 max-w-sm w-full mx-auto relative z-10">
              <span className="font-mono text-[9px] text-cyan-400 tracking-[0.3em] uppercase mb-4 block">
                [ INDEX // CORE_NAV ]
              </span>
              
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -30, opacity: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center justify-between border-b border-white/5 pb-4 hover:border-cyan-500/30 transition-colors cursor-hover"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs text-neutral-600 group-hover:text-cyan-400 transition-colors">
                          0{index + 1}
                        </span>
                        <span className={`text-2xl font-light tracking-wider transition-all duration-300 ${
                          isActive ? 'text-cyan-400 font-medium' : 'text-neutral-400 group-hover:text-white'
                        }`}>
                          {item.label}
                        </span>
                      </div>
                      <ArrowUpRight size={16} className="text-neutral-600 group-hover:text-cyan-400 transition-colors" />
                    </a>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
