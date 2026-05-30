'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Check } from 'lucide-react';
import * as THREE from 'three';

// ---------------------------------------------------------------------------
// AI Platform Data - 13 Major AI Tools with Detailed Contextual Metrics
// ---------------------------------------------------------------------------

const VIBE_SPHERES = [
  { name: 'ChatGPT',         src: '/logos/chatgpt.svg',   subtitle: 'AI Assistant',           size: 'large',  details: ['Prompt Engineering', 'Daily Workflow Tasks', 'High-speed Text Drafts'] },
  { name: 'Claude',          src: '/logos/claude.svg',    subtitle: 'Advanced Reasoning',     size: 'large',  details: ['Architecture Planning', 'Technical Research Labs', 'Complex Reasoning Models'] },
  { name: 'Cursor',          src: '/logos/cursor.svg',    subtitle: 'IDE Companion',          size: 'large',  details: ['AI Coding Assistant', 'Rapid Prototype Builds', 'Inline Refactor Flows'] },
  { name: 'Gemini',          src: '/logos/gemini.svg',    subtitle: 'Multimodal Analysis',    size: 'medium', details: ['Multimodal Analysis', 'Token Engine Integrations', 'Codebase Summarizations'] },
  { name: 'GitHub Copilot',  src: '/logos/copilot.svg',   subtitle: 'In-Editor Assistant',    size: 'medium', details: ['In-Editor Assistant', 'Contextual Autocompletes', 'Syntax Accelerations'] },
  { name: 'Windsurf',        src: '/logos/windsurf.svg',  subtitle: 'Accelerated Dev',        size: 'medium', details: ['Accelerated Dev Environments', 'Agentic Workflows', 'Dynamic Scaffolding'] },
  { name: 'v0 by Vercel',    src: '/logos/v0.svg',        subtitle: 'Generative UI Design',   size: 'medium', details: ['Generative UI Design', 'Tailwind Synthesis', 'Modular Component Mocks'] },
  { name: 'Bolt.new',        src: '/logos/bolt.svg',      subtitle: 'Instant Scaffolding',    size: 'small',  details: ['Instant App Scaffolding', 'Full-Stack Prototypes', 'Browser Sandbox Runtimes'] },
  { name: 'Lovable',         src: '/logos/lovable.svg',   subtitle: 'Rapid Prototyping',      size: 'small',  details: ['Rapid Prototyping', 'Interactive Synthesis', 'SaaS App Mockups'] },
  { name: 'Replit AI',       src: '/logos/replit.svg',    subtitle: 'Quick hosting & dev',    size: 'small',  details: ['Quick Hosting & Sandbox', 'Collaborative Coding Hubs', 'Instant Web Deployments'] },
  { name: 'Ollama',          src: '/logos/ollama.svg',    subtitle: 'Local LLM Runtime',      size: 'small',  details: ['Local LLM Runtimes', 'Offline Vector Models', 'Model Fine-Tune Tests'] },
  { name: 'OpenRouter',      src: '/logos/openrouter.svg',subtitle: 'API Router',              size: 'small',  details: ['Unified API Routing', 'Router Balance Systems', 'Model Performance Routing'] },
  { name: 'Perplexity',      src: '/logos/perplexity.svg',subtitle: 'Research Engine',        size: 'small',  details: ['Deep Research Engine', 'Factual Verification', 'Information Gathering'] }
];

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
  item: typeof VIBE_SPHERES[0] & { homeX: number; homeY: number; homeZ: number };
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

          {/* Core platform logo */}
          <div className="w-[50%] h-[50%] flex items-center justify-center">
            <img 
              src={item.src} 
              alt={item.name} 
              className={`w-full h-full object-contain transition-all duration-300 ${isHovered ? 'brightness-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]' : 'brightness-90 opacity-80'}`}
            />
          </div>

          {/* Hover Tooltip display - Contextual detailed rows */}
          <div className={`absolute -bottom-24 left-1/2 -translate-x-1/2 bg-black/95 border border-cyan-500/20 px-4 py-3 rounded-xl text-center backdrop-blur-md pointer-events-none transition-all duration-300 z-[100] min-w-[180px] shadow-[0_12px_32px_rgba(6,182,212,0.18)] ${isHovered ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2'}`}>
            <div className="text-white text-xs font-black font-mono tracking-wider whitespace-nowrap uppercase mb-1">{item.name}</div>
            <div className="h-[1px] w-full bg-neutral-900 my-1.5" />
            <div className="space-y-0.5">
              {item.details.map((detail, dIdx) => (
                <div key={dIdx} className="text-[9px] font-mono text-neutral-400 tracking-wide whitespace-nowrap">
                  {detail}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Html>
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// Main VibeCoding Component
// ---------------------------------------------------------------------------

export default function VibeCoding() {
  const [mounted, setMounted] = useState(false);
  const [activeHover, setActiveHover] = useState<number | null>(null);
  const [isMouseActive, setIsMouseActive] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const VIBE_SPHERES_LAYOUT = useMemo(() => {
    return VIBE_SPHERES.map((item, idx) => {
      const theta = idx * 2.39996; 
      const radius = 1.3 + (idx * 0.14); 
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
      id="vibe-coding"
      className="relative z-20 bg-[#050507] py-40 md:py-48 px-6 md:px-12 lg:px-24 border-t border-neutral-900 border-dashed overflow-hidden select-none"
    >
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
              [ AI-Powered Development ]
            </motion.div>

            {/* Title Header */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-800 tracking-tighter uppercase leading-none mb-10"
            >
              My Vibe<br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>Coding</span>
            </motion.h2>

            {/* Brief description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-neutral-400 text-lg font-light leading-relaxed mb-12 max-w-lg"
            >
              How AI models, local runtimes, and IDE companions accelerate development, prototyping, debugging, and software delivery.
            </motion.p>

            {/* Philosophy highlights checklist */}
            <div className="space-y-4">
              {[
                'Prompt Engineering',
                'Rapid Prototyping',
                'Codebase Orchestration',
                'LLM Context Optimization',
                'Autonomous Workflows'
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

            {/* Neural AI Central Energy Core underneath R3F Canvas */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[380px] h-[380px] z-0">
              <svg className="absolute inset-0 w-full h-full animate-[spin_30s_linear_infinite]" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" stroke="rgba(34,211,238,0.12)" strokeWidth="0.5" strokeDasharray="3, 3" fill="none" />
                <circle cx="50" cy="50" r="35" stroke="rgba(20,184,166,0.08)" strokeWidth="0.5" strokeDasharray="5, 2" fill="none" />
                <circle cx="50" cy="50" r="25" stroke="rgba(34,211,238,0.04)" strokeWidth="0.5" fill="none" />
              </svg>
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
                  
                  {VIBE_SPHERES_LAYOUT.map((item, idx) => (
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
              NEURAL_ENGINE_V2.01 // ACTIVE
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
