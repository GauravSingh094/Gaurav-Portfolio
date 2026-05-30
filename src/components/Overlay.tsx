'use client';
import { motion, useTransform, type MotionValue } from 'framer-motion';

interface OverlayProps {
  progress: MotionValue<number>;
}

export default function Overlay({ progress }: OverlayProps) {
  // Section 1: 0% scroll
  const opacity1 = useTransform(progress, [0, 0.1, 0.2], [1, 1, 0]);
  const y1 = useTransform(progress, [0, 0.2], [0, -100]);

  // Section 2: 30% scroll
  const opacity2 = useTransform(progress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(progress, [0.2, 0.5], [100, -100]);

  // Section 3: 60% scroll
  const opacity3 = useTransform(progress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
  const y3 = useTransform(progress, [0.5, 0.8], [100, -100]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      <motion.div
        style={{ opacity: opacity1, y: y1 }}
        className="absolute inset-0 flex items-center justify-center p-8"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white text-center drop-shadow-lg">
          Gaurav Singh. <br/><span className="text-neutral-400">Flutter & Web Developer.</span>
        </h1>
      </motion.div>

      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="absolute inset-0 flex items-center justify-start p-8 md:p-24"
      >
        <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white drop-shadow-lg max-w-2xl">
          Final-Year B.Tech CSE Student.
        </h2>
      </motion.div>

      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-0 flex items-center justify-end p-8 md:p-24"
      >
        <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white text-right drop-shadow-lg max-w-2xl">
          Building scalable, user-friendly applications.
        </h2>
      </motion.div>
    </div>
  );
}
