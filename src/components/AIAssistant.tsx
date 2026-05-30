'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles, Terminal, Code, Award, ExternalLink, ShieldCheck } from 'lucide-react';
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

  // Initialize welcome message
  useEffect(() => {
    setMessages([
      {
        sender: 'bot',
        text: "Hi 👋 I'm Gaurav's AI Digital Twin. I am grounded specifically on his verified projects, skills, education, and career experience. Ask me anything to explore his professional portfolio.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        projectCard: null
      }
    ]);
  }, []);

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
        throw new Error('Failed to retrieve streaming response');
      }

      const data = await response.json();
      const botText = data.text || "I experienced a context coordinate error. Please try again.";

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
        text: "I couldn't establish a secure server connection to the Gemini API. Please ensure GEMINI_API_KEY is configured in your environment or contact Gaurav at gauravsinghx2510@gmail.com.",
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
    { label: "What technologies do you use?", query: "What technical skills and backend technologies do you use?" },
    { label: "Why should I hire you?", query: "Why should I hire you as a Systems & Client developer?" }
  ];

  return (
    <>
      {/* Infosys-style sticky vertical tab on the right edge */}
      <div 
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[9998] flex flex-row items-center"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              className="mr-3 bg-neutral-950/90 border border-cyan-500/20 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-mono text-cyan-300 uppercase tracking-widest pointer-events-none shadow-[0_0_20px_rgba(6,182,212,0.15)] whitespace-nowrap"
            >
              Ask me about Gaurav
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(true)}
          className="w-12 h-36 rounded-l-3xl bg-[#0c0c11]/90 border-y border-l border-cyan-500/35 backdrop-blur-md flex flex-col items-center justify-center gap-3 cursor-pointer shadow-[0_0_25px_rgba(6,182,212,0.25)] hover:border-cyan-400 hover:pl-2.5 transition-all duration-300 group overflow-hidden"
        >
          {/* Circular avatar wrapper with pulsing live dot */}
          <div className="relative w-8 h-8 rounded-full border border-cyan-500/30 overflow-hidden flex-shrink-0">
            <img src="/images/profile.png" alt="Gaurav Singh" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border border-neutral-900 animate-pulse" />
          </div>
          {/* Vertical monospaced text */}
          <div className="flex flex-col items-center justify-center gap-1 select-none">
            <span className="text-[10px] font-mono text-cyan-300 tracking-widest uppercase font-black select-none" style={{ writingMode: 'vertical-rl' }}>
              ASK AI
            </span>
          </div>
        </button>
      </div>

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

            {/* Desktop side panel (440px/480px) / Mobile Full-width sheet */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[440px] md:w-[480px] h-screen bg-[#07070a]/98 border-l border-white/10 sm:rounded-l-[2.5rem] shadow-[-15px_0_50px_rgba(0,0,0,0.80)] flex flex-col pointer-events-auto select-text overflow-hidden"
            >
              {/* Screen grid visual overlays */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.06),transparent_65%)] pointer-events-none z-0" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:100%_15px] pointer-events-none z-0" />

              {/* Chat Panel Header */}
              <div className="relative z-10 px-6 py-5 border-b border-neutral-900 bg-neutral-950/40 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-cyan-500/30 overflow-hidden flex-shrink-0">
                    <img src="/images/profile.png" alt="Gaurav Singh" className="w-full h-full object-cover grayscale" />
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-mono font-black uppercase tracking-wider leading-none">DIGITAL_TWIN // GAURAV</h4>
                    <span className="text-[8px] font-mono text-cyan-400 uppercase tracking-widest mt-1.5 inline-block">gemini-2.5-flash online</span>
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
                className="relative z-10 flex-1 overflow-y-auto p-6 space-y-5 scrollbar-thin"
                style={{ overscrollBehavior: 'contain' }}
              >
                {messages.map((msg, index) => {
                  const isBot = msg.sender === 'bot';
                  return (
                    <div key={index} className="space-y-3">
                      <div className={`flex items-start gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}>
                        {isBot && (
                          <div className="w-7 h-7 rounded-full border border-cyan-500/25 overflow-hidden flex-shrink-0">
                            <img src="/images/profile.png" alt="Gaurav Singh" className="w-full h-full object-cover grayscale" />
                          </div>
                        )}
                        <div className={`max-w-[80%] rounded-2xl px-4.5 py-3.5 text-xs leading-relaxed whitespace-pre-wrap ${
                          isBot 
                            ? 'bg-neutral-950/80 border border-neutral-900 text-neutral-300' 
                            : 'bg-cyan-600 border border-cyan-500 text-black font-semibold shadow-[0_0_15px_rgba(6,182,212,0.15)]'
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
                    </div>
                  );
                })}

                {/* Typing Loader animation */}
                {isTyping && (
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full border border-cyan-500/25 overflow-hidden flex-shrink-0">
                      <img src="/images/profile.png" alt="Gaurav Singh" className="w-full h-full object-cover grayscale" />
                    </div>
                    <div className="bg-neutral-950/80 border border-neutral-900 rounded-2xl px-5 py-3.5 flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* suggested prompts chips */}
              <div className="relative z-10 px-6 py-4 border-t border-neutral-900/50 bg-neutral-950/20 overflow-x-auto flex gap-2 scrollbar-none flex-shrink-0">
                {suggestedPrompts.map(prompt => (
                  <button
                    key={prompt.label}
                    onClick={() => handleSend(undefined, prompt.query)}
                    className="font-mono text-[9px] text-neutral-400 border border-neutral-800 bg-neutral-950/60 px-4 py-2 rounded-full hover:border-cyan-500/30 hover:text-cyan-300 whitespace-nowrap cursor-pointer transition-colors"
                  >
                    {prompt.label}
                  </button>
                ))}
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSend} className="relative z-10 px-6 py-5 border-t border-neutral-900 bg-neutral-950/40 flex items-center gap-3 flex-shrink-0">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask about skills, work, or credentials..."
                  className="flex-1 bg-transparent border-0 outline-none text-white font-mono text-xs placeholder-neutral-500"
                />
                <button
                  type="submit"
                  className="w-9 h-9 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black flex items-center justify-center cursor-pointer transition-all duration-300 shadow-md flex-shrink-0"
                >
                  <Send size={12} strokeWidth={2.5} />
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
