'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Sparkles, Terminal, Code, Award, ExternalLink, ShieldCheck, Download } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useLenis } from 'lenis/react';

interface Message {
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  projectCard?: {
    name: string;
    tech: string[];
    description: string;
    github: string;
    live: string;
  } | null;
}

export default function AIAssistant() {
  const { trackEvent } = useAnalytics();
  const lenis = useLenis();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Track assistant open/close events & control Lenis scrolling
  useEffect(() => {
    if (isOpen) {
      trackEvent({ action: 'assistant_opened', category: 'ai_assistant', label: 'Visitor opened digital twin panel' });
      document.body.style.overflow = 'hidden';
      if (lenis) {
        lenis.stop();
      }
    } else {
      trackEvent({ action: 'assistant_closed', category: 'ai_assistant', label: 'Visitor closed digital twin panel' });
      document.body.style.overflow = '';
      if (lenis) {
        lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = '';
      if (lenis) {
        lenis.start();
      }
    };
  }, [isOpen, lenis]);

  // Scroll to bottom on updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Check if response contains specific project names to render rich components
  const extractProjectCard = (text: string) => {
    const q = text.toLowerCase();
    if (q.includes('debate') || q.includes('arena')) {
      return {
        name: "AI Debate Arena",
        tech: ["LangGraph", "FastAPI", "Redis", "ChromaDB", "SSE Streaming"],
        description: "Real-time competitive LLM debate graph state machine featuring async Server-Sent Events token streamings.",
        github: "https://github.com/GauravSingh094",
        live: "https://github.com/GauravSingh094"
      };
    }
    if (q.includes('soulsync') || q.includes('music')) {
      return {
        name: "SoulSync",
        tech: ["Flutter", "Dart", "MLKit Face Mesh", "Firebase"],
        description: "On-device emotion expression analysis classifying facial sentiments to recommend customized audio tracks.",
        github: "https://github.com/GauravSingh094",
        live: "https://github.com/GauravSingh094"
      };
    }
    if (q.includes('mindrift') || q.includes('quiz')) {
      return {
        name: "Mindrift",
        tech: ["React.js", "Node.js", "Socket.io", "MongoDB"],
        description: "Sub-10ms synchronized quiz game engine driving multiplayer game rooms under high connections.",
        github: "https://github.com/GauravSingh094",
        live: "https://github.com/GauravSingh094"
      };
    }
    if (q.includes('kingsukh') || q.includes('guest house') || q.includes('resort')) {
      return {
        name: "King Sukh Guest House",
        tech: ["Next.js", "Tailwind CSS", "Framer Motion", "EmailJS"],
        description: "Commercial responsive web catalog featuring localized SEO index configurations and static assets compile.",
        github: "https://github.com/GauravSingh094",
        live: "https://github.com/GauravSingh094"
      };
    }
    if (q.includes('petclinic') || q.includes('spring')) {
      return {
        name: "Spring PetClinic",
        tech: ["Spring Boot", "Java", "Spring Data JPA", "MySQL"],
        description: "Enterprise administration portal implementing lazy fetching query boundaries and custom transaction scopes.",
        github: "https://github.com/GauravSingh094",
        live: "https://github.com/GauravSingh094"
      };
    }
    return null;
  };

  const handleSend = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const queryText = customText || input.trim();
    if (!queryText) return;

    // Track analytics questions
    trackEvent({ action: 'assistant_question_asked', category: 'ai_assistant', label: `Query: ${queryText}` });
    const qLower = queryText.toLowerCase();
    if (qLower.includes('debate') || qLower.includes('soulsync') || qLower.includes('mindrift') || qLower.includes('kingsukh') || qLower.includes('petclinic')) {
      trackEvent({ action: 'assistant_project_requested', category: 'ai_assistant', label: `Project query: ${queryText}` });
    }
    if (qLower.includes('resume') || qLower.includes('cv') || qLower.includes('experience') || qLower.includes('intern')) {
      trackEvent({ action: 'assistant_resume_requested', category: 'ai_assistant', label: `Resume query: ${queryText}` });
    }
    if (qLower.includes('skills') || qLower.includes('technologies') || qLower.includes('stack')) {
      trackEvent({ action: 'assistant_skills_requested', category: 'ai_assistant', label: `Skills query: ${queryText}` });
    }

    const userMsg: Message = {
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      projectCard: null
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Direct POST request to the Next.js App Router Route Handler /api/chat
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({
            sender: m.sender,
            text: m.text
          }))
        })
      });

      if (!response.ok) {
        throw new Error('Failed to retrieve response');
      }

      const data = await response.json();
      const botText = data.text || "I couldn't find that information in Gaurav's portfolio.";

      // Extract rich project card if mentioned
      const matchedCard = extractProjectCard(queryText + " " + botText);

      const botMsg: Message = {
        sender: 'bot',
        text: botText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        projectCard: matchedCard
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: Message = {
        sender: 'bot',
        text: "I couldn't establish a secure server connection. Please ensure GEMINI_API_KEY is configured in your environment or contact Gaurav directly.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        projectCard: null
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const suggestedPrompts = [
    { label: "Tell me about AI Debate Arena", query: "Tell me about your flagship project AI Debate Arena" },
    { label: "Show Flutter Projects", query: "Show me Flutter and mobile application projects" },
    { label: "Show Backend Experience", query: "Show me Gaurav's backend development experience" },
    { label: "Why should I hire Gaurav?", query: "Why should I hire Gaurav as a full-stack or mobile engineer?" },
    { label: "Download Resume", query: "Can you provide the link to download Gaurav's resume?", action: () => window.open("https://drive.google.com/file/d/1zxa1Co29lOq7zD1bm-5sdHRpOVuzmimH/view?usp=drivesdk", "_blank") },
    { label: "Show Tech Stack", query: "What technical skills and backend technologies do you use?" }
  ];

  const handleChipClick = (prompt: typeof suggestedPrompts[0]) => {
    if (prompt.action) {
      prompt.action();
    }
    handleSend(undefined, prompt.query);
  };

  const welcomeCard = (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-4 shadow-xl"
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center border border-cyan-500/30">
          <Sparkles size={16} className="text-cyan-400 animate-pulse" />
        </div>
        <div>
          <h5 className="text-white text-xs font-mono font-bold uppercase tracking-wider leading-none">Hi 👋</h5>
          <p className="text-[10px] text-neutral-400 font-mono mt-1">I'm Gaurav's AI Portfolio Assistant.</p>
        </div>
      </div>
      
      <div className="space-y-2.5">
        <p className="text-neutral-300 text-xs font-light">I can help you explore:</p>
        <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-neutral-400">
          <div className="flex items-center gap-1.5 bg-neutral-900/40 p-2 rounded-lg border border-white/5">
            <span className="text-cyan-400">●</span> Projects
          </div>
          <div className="flex items-center gap-1.5 bg-neutral-900/40 p-2 rounded-lg border border-white/5">
            <span className="text-cyan-400">●</span> Skills
          </div>
          <div className="flex items-center gap-1.5 bg-neutral-900/40 p-2 rounded-lg border border-white/5">
            <span className="text-cyan-400">●</span> Experience
          </div>
          <div className="flex items-center gap-1.5 bg-neutral-900/40 p-2 rounded-lg border border-white/5">
            <span className="text-cyan-400">●</span> Resume
          </div>
          <div className="flex items-center gap-1.5 bg-neutral-900/40 p-2 rounded-lg border border-white/5">
            <span className="text-cyan-400">●</span> Education
          </div>
          <div className="flex items-center gap-1.5 bg-neutral-900/40 p-2 rounded-lg border border-white/5">
            <span className="text-cyan-400">●</span> Case Studies
          </div>
        </div>
      </div>
    </motion.div>
  );

  const scrollbarStyle = {
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(6, 182, 212, 0.2) transparent',
  } as React.CSSProperties;

  return (
    <>
      {/* Sticky Assistant Button */}
      <div className="fixed right-6 bottom-6 z-[9998] flex items-center justify-center">
        {/* Soft particle glow behind assistant button */}
        <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-2xl animate-pulse -z-10" />

        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 5, x: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: -10 }}
              exit={{ opacity: 0, scale: 0.9, y: 5, x: -10 }}
              className="absolute right-20 bg-neutral-950/90 border border-cyan-500/20 backdrop-blur-md px-3.5 py-1.5 rounded-lg text-[10px] font-mono text-cyan-300 uppercase tracking-widest pointer-events-none shadow-[0_0_20px_rgba(6,182,212,0.15)] whitespace-nowrap"
            >
              Ask AI Assistant
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(prev => !prev)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          animate={isOpen ? { scale: 1 } : { y: [0, -6, 0] }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          transition={isOpen ? { duration: 0.2 } : { repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-neutral-900/95 to-neutral-950/95 border border-white/8 backdrop-blur-md flex items-center justify-center cursor-pointer shadow-[0_0_25px_rgba(6,182,212,0.2)] hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.45)] transition-shadow duration-300 relative group overflow-hidden"
        >
          {/* Grayscale profile pic that reveals full color on hover */}
          <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
            <img 
              src="/images/profile.png" 
              alt="Gaurav Singh" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" 
            />
            {/* Pulsing online status dot */}
            <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#050505] shadow-[0_0_10px_rgba(16,185,129,0.6)] animate-pulse z-10" />
            {/* Inner glass highlight overlay */}
            <div className="absolute inset-0 rounded-full border border-white/10 pointer-events-none" />
          </div>
        </motion.button>
      </div>

      {/* Floating Panel overlay wrapper */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-end md:items-stretch justify-end pointer-events-none select-none">
            {/* Click-away backdrop overlay with glass blur fade-in */}
            <motion.div 
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              className="absolute inset-0 bg-black/40 pointer-events-auto cursor-pointer"
              onClick={() => setIsOpen(false)}
            />

            {/* Desktop side panel (400px) / Mobile bottom sheet */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed z-[9999] bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/8 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col pointer-events-auto select-text overflow-hidden right-0 bottom-0 w-full h-[80vh] rounded-t-3xl sm:right-6 sm:bottom-24 sm:w-[400px] sm:h-[600px] sm:rounded-3xl"
            >
              {/* Screen grid visual overlays */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.06),transparent_65%)] pointer-events-none z-0" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:100%_15px] pointer-events-none z-0" />

              {/* Chat Panel Header */}
              <div className="relative z-10 h-[60px] px-5 border-b border-white/5 bg-neutral-950/20 flex items-center justify-between flex-shrink-0 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-full border border-cyan-500/35 overflow-hidden flex-shrink-0 bg-neutral-900">
                    <img src="/images/profile.png" alt="Gaurav Singh" className="w-full h-full object-cover grayscale" />
                    <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border border-neutral-900" />
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-mono font-bold uppercase tracking-wider leading-none">AI Portfolio Assistant</h4>
                    <span className="text-[9px] font-mono text-cyan-400 mt-1.5 inline-block">Ask me about Gaurav</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-neutral-500 hover:text-white transition-colors cursor-pointer p-1.5 border border-transparent hover:border-neutral-800 rounded-lg"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Message Screen Buffer */}
              <div 
                data-lenis-prevent 
                className="relative z-10 flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scroll-smooth"
                style={{ ...scrollbarStyle, overscrollBehavior: 'contain' }}
              >
                {/* Welcome Card always visible at the top */}
                {welcomeCard}

                {/* Turn elements */}
                {messages.map((msg, index) => {
                  const isBot = msg.sender === 'bot';
                  return (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="space-y-3"
                    >
                      <div className={`flex items-start gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}>
                        {isBot && (
                          <div className="w-7 h-7 rounded-full border border-cyan-500/25 overflow-hidden flex-shrink-0 bg-neutral-900">
                            <img src="/images/profile.png" alt="Gaurav Singh" className="w-full h-full object-cover grayscale" />
                          </div>
                        )}
                        <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed whitespace-pre-wrap ${
                          isBot 
                            ? 'bg-neutral-900/50 border border-white/5 border-l-2 border-l-cyan-500 backdrop-blur-sm text-neutral-300' 
                            : 'bg-gradient-to-r from-cyan-600 to-teal-600 text-black font-semibold shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                        }`}>
                          {msg.text}
                          <span className={`block text-[8px] text-right mt-2 ${isBot ? 'text-neutral-600' : 'text-cyan-950'}`}>
                            {msg.timestamp}
                          </span>
                        </div>
                      </div>

                      {/* Rich Project Card Rendering */}
                      {isBot && msg.projectCard && (
                        <div className="ml-10 max-w-[80%] bg-neutral-950 border border-cyan-500/20 rounded-2xl p-5 shadow-xl space-y-4">
                          <div>
                            <span className="font-mono text-[8px] text-cyan-400 uppercase tracking-widest font-bold">// FEATURED CASE</span>
                            <h5 className="text-white text-sm font-black uppercase font-mono mt-1">{msg.projectCard.name}</h5>
                            <p className="text-neutral-400 text-[10px] leading-relaxed mt-2 font-light">{msg.projectCard.description}</p>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {msg.projectCard.tech.map(t => (
                              <span key={t} className="text-[8px] font-mono bg-neutral-900 border border-neutral-800 text-neutral-500 px-2 py-0.5 rounded">
                                {t}
                              </span>
                            ))}
                          </div>

                          <div className="flex gap-2.5 pt-2">
                            <a
                              href={msg.projectCard.github}
                              target="_blank"
                              rel="noreferrer"
                              className="flex-1 font-mono text-[9px] text-center border border-neutral-800 hover:border-neutral-500 text-neutral-400 hover:text-white py-2 rounded-lg cursor-pointer uppercase tracking-wider transition-colors"
                            >
                              GitHub
                            </a>
                            <button
                              onClick={() => { setIsOpen(false); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                              className="flex-1 font-mono text-[9px] text-center bg-cyan-600 hover:bg-cyan-500 text-black font-bold py-2 rounded-lg cursor-pointer uppercase tracking-wider transition-colors"
                            >
                              View Project
                            </button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}

                {/* Typing Loader animation */}
                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-7 h-7 rounded-full border border-cyan-500/25 overflow-hidden flex-shrink-0 bg-neutral-900">
                      <img src="/images/profile.png" alt="Gaurav Singh" className="w-full h-full object-cover grayscale" />
                    </div>
                    {/* Glowing cyan three-dot typing indicator */}
                    <div className="flex gap-1.5 items-center px-4 py-3 rounded-2xl bg-neutral-900/50 border border-white/5 border-l-2 border-l-cyan-500 max-w-[80px]">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </motion.div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Pinned Suggested Prompts Chips */}
              <div className="relative z-10 px-5 py-3 border-t border-white/[0.04] bg-neutral-950/20 overflow-x-auto flex gap-2 scrollbar-none flex-shrink-0">
                {suggestedPrompts.map((prompt, idx) => (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + idx * 0.05 }}
                    key={prompt.label}
                    onClick={() => handleChipClick(prompt)}
                    className="font-mono text-[10px] text-neutral-400 border border-white/5 bg-white/[0.02] px-3.5 py-1.5 rounded-full hover:border-cyan-500/30 hover:bg-cyan-500/5 hover:text-cyan-300 hover:shadow-[0_0_10px_rgba(6,182,212,0.15)] whitespace-nowrap cursor-pointer transition-all duration-300 active:scale-95 flex-shrink-0"
                  >
                    {prompt.label}
                  </motion.button>
                ))}
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSend} className="relative z-10 px-5 py-4 border-t border-white/[0.04] bg-neutral-950/40 flex items-center gap-3 flex-shrink-0">
                <div className="flex-1 h-[52px] rounded-full bg-white/[0.02] border border-white/8 backdrop-blur-md px-5 flex items-center gap-3 focus-within:border-cyan-500/40 transition-colors duration-300">
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Ask me anything about Gaurav..."
                    className="flex-1 bg-transparent border-0 outline-none text-white font-mono text-xs placeholder-neutral-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-11 h-11 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 text-black flex items-center justify-center cursor-pointer hover:scale-105 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300 flex-shrink-0 shadow-md"
                >
                  <Send size={15} strokeWidth={2.5} className="ml-0.5" />
                </button>
              </form>

              {/* Safety Grounding indicator footer */}
              <div className="px-6 py-3 border-t border-neutral-900 bg-neutral-950/60 flex items-center gap-2 text-[8px] font-mono text-neutral-600 uppercase tracking-widest flex-shrink-0">
                <ShieldCheck size={11} className="text-cyan-500/50" />
                <span>grounded career representational twin // no overrides</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
