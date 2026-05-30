'use client';
import { useState } from 'react';
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

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

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
            </SmoothScroll>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
