'use client';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import BackgroundGlows from '@/components/BackgroundGlows';
import Navbar from '@/components/Navbar';
import FixedSocials from '@/components/FixedSocials';

import ScrollyCanvas from '@/components/ScrollyCanvas';
import About from '@/components/About';
import WhatIDo from '@/components/WhatIDo';
import CareerTimeline from '@/components/CareerTimeline';
import ProjectCarousel from '@/components/ProjectCarousel';
import TechStack from '@/components/TechStack';
import VibeCoding from '@/components/VibeCoding';
import Certifications from '@/components/Certifications';
import Achievements from '@/components/Achievements';
import Education from '@/components/Education';
import ResumeJourney from '@/components/ResumeJourney';
import Contact from '@/components/Contact';
import Loader from '@/components/Loader';
import CommandPalette from '@/components/CommandPalette';
import AIAssistant from '@/components/AIAssistant';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Styled Console Welcome Log on mount
  useEffect(() => {
    console.log(
      "%cWelcome Developer 👋 %c\n\n" +
      "You've opened the console cockpit of Gaurav Singh's Creative Portfolio.\n" +
      "This application is engineered with Next.js v16, React v19, Tailwind CSS v4, and hardware-accelerated Framer Motion.\n\n" +
      "🚀 Current Status: Available for Internships & Full-Stack/Flutter Opportunities.\n" +
      "📂 Codebase Repositories: https://github.com/GauravSingh094\n" +
      "💼 Connected Networks: https://linkedin.com/in/gaurav-singh-276944292\n" +
      "✉️ Contact Direct: gauravsinghx2510@gmail.com\n\n" +
      "Happy debugging! // systems operational",
      "font-size: 20px; font-weight: bold; color: #06b6d4; font-family: monospace;",
      "font-size: 12px; color: #a3a3a3; font-family: monospace;"
    );
  }, []);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle command palette
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
        return;
      }

      // Check if user is typing in an input field
      const activeTag = document.activeElement?.tagName;
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA' || document.activeElement?.getAttribute('contenteditable') === 'true') {
        return;
      }

      // Hotkey routing (ensure it's keypresses without modifiers)
      if (!e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey) {
        const key = e.key.toLowerCase();
        if (key === 'g') {
          e.preventDefault();
          window.open('https://github.com/GauravSingh094', '_blank');
        } else if (key === 'l') {
          e.preventDefault();
          window.open('https://linkedin.com/in/gaurav-singh-276944292', '_blank');
        } else if (key === 'r') {
          e.preventDefault();
          document.querySelector('#resume')?.scrollIntoView({ behavior: 'smooth' });
        } else if (key === 'p') {
          e.preventDefault();
          document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
        } else if (key === 'c') {
          e.preventDefault();
          document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <SmoothScroll>
              <CustomCursor />
              <BackgroundGlows />
              <Navbar />
              <FixedSocials />
              
              <main className="relative bg-[#050505] min-h-screen selection:bg-cyan-900 selection:text-white">
                <header className="relative w-full">
                  <ScrollyCanvas />
                </header>

                <About />
                <WhatIDo />
                <CareerTimeline />
                <ProjectCarousel />
                <TechStack />
                <VibeCoding />
                <Certifications />
                <Achievements />
                <Education />
                <ResumeJourney />
                <Contact />
              </main>

              {/* Command Palette Overlay */}
              <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} />
              
              {/* Grounded Conversational AI Assistant */}
              <AIAssistant />
            </SmoothScroll>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

