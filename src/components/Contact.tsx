'use client';
import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';

export default function Contact() {
  const [timeString, setTimeString] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const formatter = new Intl.DateTimeFormat([], options);
      setTimeString(formatter.format(new Date()) + ' IST');
    };
    
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer id="contact" className="relative z-20 bg-[#060606] pt-32 pb-16 px-6 md:px-12 lg:px-24 border-t border-neutral-900 overflow-hidden select-none">
      {/* Visual Accent Glows */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-950/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-neutral-900/40 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-screen-2xl mx-auto relative z-10">
        
        {/* Availability System Status */}
        <div className="flex items-center gap-3 bg-neutral-900/50 border border-neutral-800/60 px-4 py-2 rounded-full w-fit mb-16">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest font-semibold">
            SYSTEM ACTIVE // AVAILABLE FOR INTERNSHIPS & COLLABORATIONS
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 border-b border-neutral-900 pb-24 mb-16">
          
          {/* Column 1: Core Contacts */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h4 className="text-cyan-400 font-mono text-xs tracking-[0.25em] uppercase mb-6 font-semibold">
                // Direct Line
              </h4>
              <div className="relative overflow-hidden group h-12 md:h-16 flex items-center mb-12">
                <a href="mailto:gauravsinghx2510@gmail.com" className="relative block overflow-hidden text-2xl md:text-3xl lg:text-4xl font-light text-white leading-none cursor-hover font-mono tracking-tighter">
                  <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                    gauravsinghx2510@gmail.com
                  </span>
                  <span className="absolute left-0 top-0 block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-full group-hover:translate-y-0 text-cyan-400">
                    gauravsinghx2510@gmail.com
                  </span>
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-cyan-400 font-mono text-xs tracking-[0.25em] uppercase font-semibold">
                // Current Location
              </h4>
              <div className="flex items-center gap-3 text-neutral-400 leading-relaxed font-light text-lg">
                <MapPin size={18} className="text-cyan-500" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>

          {/* Column 2: Social Links Hub */}
          <div className="lg:col-span-3 flex flex-col lg:pl-16">
            <h4 className="text-cyan-400 font-mono text-xs tracking-[0.25em] uppercase mb-8 font-semibold">
              // Connected Networks
            </h4>
            <ul className="space-y-6">
              <li>
                <a 
                  href="https://github.com/GauravSingh094" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="group flex items-center justify-between border-b border-neutral-900 pb-3 hover:border-cyan-500/30 transition-colors duration-300 cursor-hover"
                >
                  <div className="relative overflow-hidden h-8 flex items-center">
                    <span className="text-2xl font-light text-neutral-400 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                      GitHub
                    </span>
                    <span className="absolute left-0 top-0 text-2xl font-semibold text-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-full group-hover:translate-y-0 flex items-center gap-2">
                      GitHub <Github size={18} className="text-cyan-400" />
                    </span>
                  </div>
                  <span className="text-neutral-700 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-300 font-mono text-sm">
                    [ → ]
                  </span>
                </a>
              </li>
              
              <li>
                <a 
                  href="https://linkedin.com/in/gaurav-singh-276944292" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="group flex items-center justify-between border-b border-neutral-900 pb-3 hover:border-cyan-500/30 transition-colors duration-300 cursor-hover"
                >
                  <div className="relative overflow-hidden h-8 flex items-center">
                    <span className="text-2xl font-light text-neutral-400 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                      LinkedIn
                    </span>
                    <span className="absolute left-0 top-0 text-2xl font-semibold text-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-full group-hover:translate-y-0 flex items-center gap-2">
                      LinkedIn <Linkedin size={18} className="text-cyan-400" />
                    </span>
                  </div>
                  <span className="text-neutral-700 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-300 font-mono text-sm">
                    [ → ]
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Live System Stats & Bio */}
          <div className="lg:col-span-4 flex flex-col justify-between lg:pl-16 border-t lg:border-t-0 border-dashed border-neutral-900 pt-12 lg:pt-0">
            <div>
              <p className="text-2xl text-white font-light leading-snug tracking-tight mb-6">
                Let’s construct the next digital boundary.
              </p>
              <p className="text-neutral-500 text-base leading-relaxed font-light mb-12">
                Specialized in cross-platform systems development, interactive responsive frontends, and layered secure backend logic.
              </p>
            </div>
            
            {/* Live Clock HUD */}
            <div className="bg-neutral-950/80 border border-neutral-900 p-6 rounded-xl flex justify-between items-center z-10">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">Local Terminal Time</span>
                <span className="text-lg font-mono text-cyan-400 tracking-tight mt-1 tabular-nums">
                  {mounted ? timeString : '00:00:00 IST'}
                </span>
              </div>
              <div className="w-10 h-10 rounded-lg bg-[#0e0e0e] border border-neutral-800 flex items-center justify-center font-mono text-[10px] text-neutral-500 select-none">
                GMT+5
              </div>
            </div>
          </div>

        </div>

        {/* Footer Base Info */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-neutral-600 font-mono text-[10px] uppercase tracking-[0.25em]">
          <div>
            © 2026 Gaurav Singh // All Systems Operational
          </div>
          <div className="text-neutral-800">
            Designed & Engineered with Anti-Gravity
          </div>
        </div>

      </div>
    </footer>
  );
}
