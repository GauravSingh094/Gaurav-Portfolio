'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Check } from 'lucide-react';
import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Skill Data - 18 Major Technologies with Custom Hierarchical Sizes
// ---------------------------------------------------------------------------

const TECH_SPHERES = [
  { name: 'Python',          src: '/logos/python.svg',      level: 'Advanced',   size: 'large' },
  { name: 'Java',            src: '/logos/java.svg',        level: 'Advanced',   size: 'large' },
  { name: 'Flutter',         src: '/logos/flutter.svg',     level: 'Expert',     size: 'large' },
  { name: 'React.js',        src: '/logos/react.svg',       level: 'Advanced',   size: 'large' },
  { name: 'Spring Boot',     src: '/logos/springboot.svg',  level: 'Advanced',   size: 'medium' },
  { name: 'Node.js',         src: '/logos/nodejs.svg',      level: 'Advanced',   size: 'medium' },
  { name: 'Next.js',         src: '/logos/nextjs.svg',      level: 'Advanced',   size: 'medium' },
  { name: 'TypeScript',      src: '/logos/typescript.svg',  level: 'Advanced',   size: 'medium' },
  { name: 'JavaScript',      src: '/logos/javascript.svg',  level: 'Expert',     size: 'medium' },
  { name: 'Dart',            src: '/logos/dart.svg',        level: 'Proficient', size: 'medium' },
  { name: 'Git',             src: '/logos/git.svg',         level: 'Expert',     size: 'small' },
  { name: 'GitHub',          src: '/logos/github.svg',      level: 'Expert',     size: 'small' },
  { name: 'Firebase',        src: '/logos/firebase.svg',    level: 'Advanced',   size: 'small' },
  { name: 'MongoDB',         src: '/logos/mongodb.svg',     level: 'Proficient', size: 'small' },
  { name: 'Tailwind CSS',    src: '/logos/tailwindcss.svg', level: 'Expert',     size: 'small' },
  { name: 'MySQL',           src: '/logos/mysql.svg',       level: 'Advanced',   size: 'small' },
  { name: 'Spring MVC',      src: '/logos/spring.svg',      level: 'Proficient', size: 'small' },
  { name: 'Spring Data JPA', src: '/logos/spring.svg',      level: 'Advanced',   size: 'small' }
];

// ---------------------------------------------------------------------------
// Animated Stat Counter Component
// ---------------------------------------------------------------------------

function AnimatedCounter({ value, duration = 1.2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animationFrameId = requestAnimationFrame(animate);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [value, duration]);

  return <span ref={elementRef} className="tabular-nums">{count.toString().padStart(2, '0')}+</span>;
}

// ---------------------------------------------------------------------------
// Custom Vector Animated Icon Cores
// ---------------------------------------------------------------------------

const CodeOrb = (
  <svg className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" strokeDasharray="3 3" className="animate-[spin_12s_linear_infinite]" />
    <circle cx="12" cy="12" r="6" stroke="currentColor" />
    <circle cx="12" cy="12" r="2" fill="currentColor" className="animate-ping" style={{ animationDuration: '3s' }} />
  </svg>
);

const LayerStack = (
  <svg className="w-10 h-10 text-fuchsia-400 drop-shadow-[0_0_8px_rgba(240,79,240,0.4)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 17l8 4 8-4M4 12l8 4 8-4" stroke="currentColor" className="animate-pulse" style={{ animationDuration: '2s' }} />
    <path d="M12 2L4 6l8 4 8-4-8-4z" stroke="currentColor" className="animate-[bounce_3s_infinite_ease-in-out]" />
  </svg>
);

const DatabaseCore = (
  <svg className="w-10 h-10 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.4)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" className="animate-ping" style={{ animationDuration: '2.5s' }} />
  </svg>
);

const ToolMatrix = (
  <svg className="w-10 h-10 text-teal-400 drop-shadow-[0_0_8px_rgba(45,212,191,0.4)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" />
    <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" />
    <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" />
    <rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor" stroke="currentColor" className="animate-pulse" style={{ animationDuration: '1.5s' }} />
  </svg>
);

// ---------------------------------------------------------------------------
// Futuristic Intelligence StatCard Panel Redesign
// ---------------------------------------------------------------------------

interface StatCardProps {
  label: string;
  count: number;
  description: string;
  glowColor: string;
  icon: React.ReactNode;
}

function StatCard({ label, count, description, glowColor, icon }: StatCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative bg-[#0c0c11]/85 border border-white/5 rounded-2xl p-6 overflow-hidden transition-all duration-500 hover:border-white/15 select-none"
      style={{
        boxShadow: isHovered 
          ? `0 15px 35px rgba(0,0,0,0.8), 0 0 25px ${glowColor}25, inset 0 0 12px ${glowColor}20` 
          : '0 8px 30px rgba(0,0,0,0.5)',
        transform: isHovered ? 'scale(1.04) translateY(-4px)' : 'scale(1) translateY(0px)'
      }}
    >
      {/* Background Soft Glow Spotlight */}
      <div 
        className="absolute inset-0 opacity-30 transition-opacity duration-500 pointer-events-none z-0" 
        style={{
          background: `radial-gradient(circle at 50% 20%, ${glowColor}20, transparent 65%)`
        }}
      />

      {/* Floating micro particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25 z-0">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white animate-[particleFloat_4s_infinite_ease-in-out]"
            style={{
              left: `${15 + i * 22}%`,
              top: `${30 + (i % 2) * 35}%`,
              animationDelay: `${i * -0.7}s`
            }}
          />
        ))}
      </div>

      {/* Top: Animated Icon Core */}
      <div className="relative z-10 flex justify-between items-center mb-6">
        <div className="flex items-center justify-center bg-white/[0.02] border border-white/[0.04] p-3.5 rounded-xl transition-all duration-500">
          <div className={`transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}>
            {icon}
          </div>
        </div>
        <span className="font-mono text-[9px] text-neutral-600 tracking-widest uppercase">
          SYS_MONITOR
        </span>
      </div>

      {/* Middle: Large Animated Counter */}
      <div className="relative z-10 mb-4">
        <h4 className="text-4xl md:text-5xl font-black text-white font-mono tracking-tight flex items-baseline gap-1">
          <AnimatedCounter value={count} />
        </h4>
      </div>

      {/* Bottom: Short Description */}
      <div className="relative z-10">
        <div className="text-white font-mono text-[11px] uppercase tracking-widest font-semibold mb-1">
          {label}
        </div>
        <p className="text-neutral-500 text-xs leading-relaxed font-light">
          {description}
        </p>
      </div>

      {/* Base Flowing Energy Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden pointer-events-none rounded-b-2xl">
        <div 
          className="w-[200%] h-full opacity-35 animate-[energyWave_3s_linear_infinite]"
          style={{ 
            background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)`,
            animationDuration: isHovered ? '1.5s' : '3s'
          }}
        />
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Ambient Drifting Dust Particles Background
// ---------------------------------------------------------------------------

function AmbientParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2.5 + 1.2,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * -10,
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0.08, 0.3, 0.08],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: 'rgba(6, 182, 212, 0.2)',
            boxShadow: '0 0 6px rgba(6, 182, 212, 0.4)',
          }}
        />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// 3D Sphere Component with Spring return physics & interactive repulsion
// ---------------------------------------------------------------------------

interface FloatingSphereProps {
  item: typeof TECH_SPHERES[0] & { homeX: number; homeY: number; homeZ: number };
  index: number;
  activeHover: number | null;
  setActiveHover: (i: number | null) => void;
  isMouseActive: boolean;
}

function FloatingSphere({ item, index, activeHover, setActiveHover, isMouseActive }: FloatingSphereProps) {
  const ref = useRef<any>(null);
  
  const currentPos = useRef(new THREE.Vector3(item.homeX, item.homeY, item.homeZ));
  const velocity = useRef(new THREE.Vector3(0, 0, 0));

  const isHovered = activeHover === index;

  useFrame((state, delta) => {
    if (!ref.current) return;
    
    const time = state.clock.getElapsedTime();
    const dt = Math.min(delta, 0.05);

    const floatX = Math.sin(time * 0.8 + index) * 0.08;
    const floatY = Math.cos(time * 0.6 + index * 1.3) * 0.08;
    const floatZ = Math.sin(time * 1.1 + index * 1.8) * 0.05;

    const baseHomeX = item.homeX + floatX;
    const baseHomeY = item.homeY + floatY;
    const baseHomeZ = item.homeZ + floatZ;

    let targetX = baseHomeX;
    let targetY = baseHomeY;
    let targetZ = baseHomeZ;

    if (isMouseActive) {
      const mx = state.pointer.x * 6;
      const my = state.pointer.y * 3.5;
      
      const dx = baseHomeX - mx;
      const dy = baseHomeY - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      const repulsionRadius = 2.0;
      if (dist < repulsionRadius) {
        const force = (repulsionRadius - dist) / repulsionRadius;
        const repulsionStrength = 1.8;
        
        targetX += (dx / dist) * force * repulsionStrength;
        targetY += (dy / dist) * force * repulsionStrength;
        targetZ += 0.8 * force;
      }
    }

    const k = 0.06;
    const damping = 0.82;

    const ax = (targetX - currentPos.current.x) * k;
    const ay = (targetY - currentPos.current.y) * k;
    const az = (targetZ - currentPos.current.z) * k;

    velocity.current.x = (velocity.current.x + ax) * damping;
    velocity.current.y = (velocity.current.y + ay) * damping;
    velocity.current.z = (velocity.current.z + az) * damping;

    currentPos.current.x += velocity.current.x;
    currentPos.current.y += velocity.current.y;
    currentPos.current.z += velocity.current.z;

    let currentScale = ref.current.scale.x;
    const targetScale = isHovered ? 1.15 : 1.0;
    const scaleSpeed = 0.15;
    const newScale = currentScale + (targetScale - currentScale) * scaleSpeed;
    ref.current.scale.setScalar(newScale);

    ref.current.position.copy(currentPos.current);
  });

  const sizeClasses = {
    large: 'w-20 h-20 md:w-24 md:h-24',
    medium: 'w-16 h-16 md:w-20 md:h-20',
    small: 'w-12 h-12 md:w-16 md:h-16'
  }[item.size];

  const levelColor = {
    Expert: 'text-cyan-400',
    Advanced: 'text-emerald-400',
    Proficient: 'text-amber-400'
  }[item.level as 'Expert' | 'Advanced' | 'Proficient'] || 'text-cyan-400';

  return (
    <mesh ref={ref}>
      <Html center distanceFactor={11} scale={1}>
        <div 
          onMouseEnter={() => setActiveHover(index)}
          onMouseLeave={() => setActiveHover(null)}
          className={`relative rounded-full border border-white/10 backdrop-blur-md bg-white/[0.02] flex items-center justify-center cursor-pointer transition-all duration-300 select-none shadow-[0_4px_24px_rgba(0,0,0,0.6)] ${sizeClasses} ${isHovered ? 'border-cyan-400/40 shadow-[0_0_30px_rgba(34,211,238,0.2)] -translate-y-2' : ''}`}
        >
          {/* Sphere light reflections */}
          <div className="absolute inset-0.5 rounded-full bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
          <div className="absolute inset-1 rounded-full bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />

          {/* Core tech logo */}
          <div className="w-[50%] h-[50%] flex items-center justify-center">
            <img 
              src={item.src} 
              alt={item.name} 
              className={`w-full h-full object-contain transition-all duration-300 ${isHovered ? 'brightness-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]' : 'brightness-90 opacity-80'}`}
            />
          </div>

          {/* Hover Tooltip display */}
          <div className={`absolute -bottom-16 left-1/2 -translate-x-1/2 bg-black/90 border border-neutral-800 px-4 py-2 rounded-lg text-center backdrop-blur-md pointer-events-none transition-all duration-300 z-[100] min-w-[120px] ${isHovered ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2'}`}>
            <div className="text-white text-xs font-bold font-mono tracking-tight whitespace-nowrap">{item.name}</div>
            <div className={`text-[8px] font-mono uppercase tracking-widest mt-0.5 ${levelColor}`}>{item.level}</div>
          </div>
        </div>
      </Html>
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// Main TechStack Component
// ---------------------------------------------------------------------------

export default function TechStack() {
  const [mounted, setMounted] = useState(false);
  const [activeHover, setActiveHover] = useState<number | null>(null);
  const [isMouseActive, setIsMouseActive] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const TECH_SPHERES_LAYOUT = useMemo(() => {
    return TECH_SPHERES.map((item, idx) => {
      const theta = idx * 2.39996; 
      const radius = 1.3 + (idx * 0.12);
      const homeX = Math.cos(theta) * radius * 1.5;
      const homeY = Math.sin(theta) * radius * 0.95;
      const homeZ = -1.5 + (idx % 3) * 1.0; 
      
      return {
        ...item,
        homeX,
        homeY,
        homeZ
      };
    });
  }, []);

  return (
    <section
      id="tech-stack"
      className="relative z-20 bg-[#050507] py-32 md:py-40 px-6 md:px-12 lg:px-24 border-t border-neutral-900 border-dashed overflow-hidden select-none"
    >
      {/* Local keyframe styles for intelligence panels */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes energyWave {
          0% { transform: translateX(-50%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes particleFloat {
          0% { transform: translateY(0px) scale(0.8); opacity: 0.15; }
          50% { transform: translateY(-12px) scale(1.1); opacity: 0.7; }
          100% { transform: translateY(0px) scale(0.8); opacity: 0.15; }
        }
      `}} />

      {/* Background spotlights & meshes */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.03),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
      
      {/* Ambient Drifting Star Dust */}
      <AmbientParticles />

      <div className="max-w-screen-2xl mx-auto relative z-10">
        
        {/* Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          {/* Left Column: Premium Content & Philosophy details */}
          <div className="lg:col-span-5 flex flex-col">
            
            {/* Monospaced system subtitle */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 text-cyan-400 font-mono text-[10px] tracking-[0.45em] uppercase mb-8"
            >
              <span className="w-8 h-[1px] bg-cyan-950 inline-block" />
              [ System Architecture ]
            </motion.div>

            {/* Title Header */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-800 tracking-tighter uppercase leading-none mb-10"
            >
              My Tech<br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>Stack</span>
            </motion.h2>

            {/* Brief description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-neutral-400 text-lg font-light leading-relaxed mb-12 max-w-lg"
            >
              Languages, frameworks, databases, and tools that power my scalable software products.
            </motion.p>

            {/* Philosophy highlights checklist */}
            <div className="space-y-4 mb-16">
              {[
                'Full-Stack Development',
                'Mobile Engineering',
                'Backend Systems',
                'Database Architecture',
                'Cloud-Ready Solutions'
              ].map((point, idx) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + idx * 0.08 }}
                  className="flex items-center gap-4 text-white text-base group"
                >
                  <span className="w-6 h-6 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-colors">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span className="font-light tracking-wide text-neutral-300 group-hover:text-white transition-colors">
                    {point}
                  </span>
                </motion.div>
              ))}
            </div>

          </div>

          {/* Right Column: 3D Universe */}
          <div 
            onMouseEnter={() => setIsMouseActive(true)}
            onMouseLeave={() => setIsMouseActive(false)}
            className="lg:col-span-7 relative h-[500px] lg:h-[650px] flex items-center justify-center bg-[#060608]/40 border border-neutral-900 rounded-3xl overflow-hidden shadow-2xl cursor-crosshair"
          >
            {/* Grid mesh backdrop inside the 3D pane */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.02),transparent_75%)] pointer-events-none" />

            {/* Central energy core overlay underneath R3F Canvas */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[380px] h-[380px] z-0">
              <div className="absolute inset-0 rounded-full border border-cyan-500/10 animate-pulse" style={{ animationDuration: '4s' }} />
              <div className="absolute inset-8 rounded-full border border-teal-500/5 animate-ping" style={{ animationDuration: '7s' }} />
              <div className="absolute inset-16 rounded-full border border-cyan-400/5" />
              <div className="absolute inset-20 rounded-full bg-gradient-to-tr from-cyan-500/10 to-teal-500/5 blur-[70px] animate-pulse" />
            </div>

            {/* React Three Fiber Canvas */}
            {mounted && (
              <div className="absolute inset-0 z-10">
                <Canvas
                  camera={{ position: [0, 0, 7.5], fov: 60 }}
                  gl={{ antialias: true }}
                >
                  <ambientLight intensity={1.5} />
                  <pointLight position={[10, 10, 10]} intensity={1} />
                  
                  {TECH_SPHERES_LAYOUT.map((item, idx) => (
                    <FloatingSphere 
                      key={item.name} 
                      item={item} 
                      index={idx}
                      activeHover={activeHover}
                      setActiveHover={setActiveHover}
                      isMouseActive={isMouseActive}
                    />
                  ))}
                </Canvas>
              </div>
            )}

            {/* Overlay cyber status */}
            <div className="absolute bottom-6 right-8 font-mono text-[9px] text-neutral-700 tracking-wider z-20">
              ORBITAL_ENGINE_V1.04 // ACTIVE
            </div>
          </div>

        </div>

        {/* Bottom Statistics Panel - Frosted Intelligence Panels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20 pt-16 border-t border-neutral-900 border-dashed relative z-10">
          <StatCard 
            label="Languages" 
            count={6} 
            description="Core programming languages powering multi-tier architectures." 
            glowColor="#22d3ee" 
            icon={CodeOrb} 
          />
          <StatCard 
            label="Frameworks" 
            count={8} 
            description="High-efficiency server frameworks and dynamic UI libraries." 
            glowColor="#e879f9" 
            icon={LayerStack} 
          />
          <StatCard 
            label="Databases" 
            count={3} 
            description="Robust persistence engines and secure layered data repositories." 
            glowColor="#3b82f6" 
            icon={DatabaseCore} 
          />
          <StatCard 
            label="Tools & Others" 
            count={5} 
            description="Collaboration workflow tools, package wrappers, and dev systems." 
            glowColor="#2dd4bf" 
            icon={ToolMatrix} 
          />
        </div>

      </div>
    </section>
  );
}
