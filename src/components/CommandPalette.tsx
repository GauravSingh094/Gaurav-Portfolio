'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Hash, ArrowUpRight, FileText, Github, Linkedin, CornerDownLeft, Sparkles, Terminal } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Command items with tags and actions
  const commandItems = [
    { name: 'Navigate: Home', type: 'nav', target: '#home', icon: Hash, desc: 'Scroll to top landing area' },
    { name: 'Navigate: Who I Am', type: 'nav', target: '#about', icon: Hash, desc: 'Scroll to profile bio' },
    { name: 'Navigate: Specialties', type: 'nav', target: '#what-i-do', icon: Hash, desc: 'Scroll to core expertise' },
    { name: 'Navigate: Projects Showcase', type: 'nav', target: '#projects', icon: Hash, desc: 'Scroll to dynamic stacked cards' },
    { name: 'Navigate: Tech Stack', type: 'nav', target: '#tech-stack', icon: Hash, desc: 'Scroll to WebGL orbital spheres' },
    { name: 'Navigate: Vibe Coding', type: 'nav', target: '#vibe-coding', icon: Hash, desc: 'Scroll to AI tools matrix' },
    { name: 'Navigate: Resume Timeline', type: 'nav', target: '#resume', icon: Hash, desc: 'Scroll to cinematic career journey' },
    { name: 'Navigate: Contact Direct', type: 'nav', target: '#contact', icon: Hash, desc: 'Scroll to message board' },
    { name: 'Interactive CLI Terminal', type: 'link', target: '/terminal', icon: Terminal, desc: 'Open full-screen developer shell' },
    { name: 'Secure Resume Archive', type: 'link', target: '/Gaurav_Resume.pdf', icon: FileText, desc: 'View verified resume PDF' },
    { name: 'Outbound: GitHub Profile', type: 'link', target: 'https://github.com/GauravSingh094', icon: Github, desc: 'Browse verified source repositories' },
    { name: 'Outbound: LinkedIn Network', type: 'link', target: 'https://linkedin.com/in/gaurav-singh-276944292', icon: Linkedin, desc: 'Connect on professional network' },
  ];

  // Filter commands by search query
  const filteredItems = commandItems.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.desc.toLowerCase().includes(query.toLowerCase())
  );

  // Focus input on mount
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle keyboard navigation inside list
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleExecute(filteredItems[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  // Scroll selected item into view dynamically
  useEffect(() => {
    const listNode = listRef.current;
    if (!listNode) return;
    const activeNode = listNode.children[selectedIndex] as HTMLElement;
    if (!activeNode) return;

    const listScrollTop = listNode.scrollTop;
    const listHeight = listNode.clientHeight;
    const activeNodeTop = activeNode.offsetTop;
    const activeNodeHeight = activeNode.offsetHeight;

    if (activeNodeTop + activeNodeHeight > listScrollTop + listHeight) {
      listNode.scrollTop = activeNodeTop + activeNodeHeight - listHeight;
    } else if (activeNodeTop < listScrollTop) {
      listNode.scrollTop = activeNodeTop;
    }
  }, [selectedIndex]);

  // Execute active command
  const handleExecute = (item: typeof commandItems[0]) => {
    onClose();
    if (item.type === 'nav') {
      const element = document.querySelector(item.target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (item.type === 'link') {
      window.open(item.target, item.target.startsWith('http') ? '_blank' : '_self');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh] px-4 select-none">
          {/* Frosted Glass Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-950/65 backdrop-blur-[6px]"
          />

          {/* Frosted Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-[#0c0c11]/90 border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.85)] flex flex-col"
          >
            {/* Search Input Container */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-neutral-900 bg-neutral-950/40">
              <Search className="text-neutral-500 flex-shrink-0" size={18} />
              <input
                ref={inputRef}
                value={query}
                onChange={e => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or search sections..."
                className="w-full bg-transparent border-0 outline-none text-white placeholder-neutral-500 font-mono text-sm"
              />
              <span className="text-[9px] font-mono text-neutral-600 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded uppercase tracking-wider">
                esc
              </span>
            </div>

            {/* List Results */}
            <div 
              ref={listRef}
              className="max-h-[340px] overflow-y-auto py-2 divide-y divide-transparent scrollbar-thin"
            >
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => {
                  const Icon = item.icon;
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={item.name}
                      onMouseEnter={() => setSelectedIndex(index)}
                      onClick={() => handleExecute(item)}
                      className={`flex items-center justify-between px-5 py-3 cursor-pointer transition-all duration-150 ${
                        isSelected 
                          ? 'bg-cyan-500/10 border-l-[3px] border-cyan-400 pl-[17px]' 
                          : 'border-l-[3px] border-transparent hover:bg-neutral-900/35'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`flex-shrink-0 ${isSelected ? 'text-cyan-400' : 'text-neutral-500'}`} size={16} />
                        <div>
                          <div className="text-white text-xs font-mono font-bold tracking-wide uppercase">{item.name}</div>
                          <div className="text-neutral-500 text-[10px] font-sans mt-0.5">{item.desc}</div>
                        </div>
                      </div>
                      
                      {isSelected && (
                        <div className="flex items-center gap-1 font-mono text-[9px] text-cyan-400 uppercase tracking-widest">
                          <span>Select</span>
                          <CornerDownLeft size={10} />
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                  <Sparkles className="text-neutral-700 mb-3 animate-pulse" size={24} />
                  <p className="text-neutral-500 font-mono text-xs uppercase tracking-wider">No matching systems found</p>
                </div>
              )}
            </div>

            {/* Footer accents */}
            <div className="px-5 py-3 border-t border-neutral-900 bg-neutral-950/20 flex justify-between items-center text-[9px] font-mono text-neutral-600 uppercase tracking-widest">
              <div className="flex gap-4">
                <span>↑↓ navigate</span>
                <span>↵ execute</span>
              </div>
              <span>CMD_PALETTE_V1.0</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
