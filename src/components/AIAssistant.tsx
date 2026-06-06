'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { X, Send, Sparkles, Download, Minus, RotateCw, ThumbsUp, ThumbsDown, ShieldCheck } from 'lucide-react';
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
  const dragControls = useDragControls();
  const chatEndRef = useRef<HTMLDivElement>(null);

  // States
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Feedback record maps message index to 'like' or 'dislike'
  const [feedback, setFeedback] = useState<Record<number, 'like' | 'dislike'>>({});
  
  // Drag boundaries constraints for desktop dragging
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0, top: 0, bottom: 0 });

  // Responsive device checks
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update drag constraints dynamically depending on window dimensions
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDragConstraints({
        left: -window.innerWidth + 420,
        right: 20,
        top: -window.innerHeight + 620,
        bottom: 20
      });
    }
  }, [isOpen, isMobile]);

  // Scroll to bottom on updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isCollapsed]);

  // Track assistant open/close events & control Lenis scrolling
  useEffect(() => {
    if (isOpen && !isCollapsed) {
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
  }, [isOpen, isCollapsed, lenis]);

  // Support remote control custom events to trigger digital twin questions
  useEffect(() => {
    const handleRemoteQuery = (e: Event) => {
      const customEvent = e as CustomEvent;
      setIsOpen(true);
      setIsCollapsed(false);
      if (customEvent.detail?.query) {
        handleSend(undefined, customEvent.detail.query);
      }
    };
    window.addEventListener('open-digital-twin', handleRemoteQuery);
    return () => window.removeEventListener('open-digital-twin', handleRemoteQuery);
  }, [messages]);

  // Mobile Swipe down gesture trigger
  const handleDragEnd = (event: any, info: any) => {
    if (isMobile && info.offset.y > 150) {
      setIsOpen(false);
    }
  };

  // Trigger drag initialization only in header on desktop
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isMobile && !isCollapsed) {
      dragControls.start(e);
    }
  };

  // Check if response contains specific project names to render rich components
  const extractProjectCard = (text: string) => {
    const q = text.toLowerCase();
    if (q.includes('debate') || q.includes('arena') || q.includes('syntax') || q.includes('showdown')) {
      return {
        name: "Syntax Showdown",
        tech: ["FastAPI", "LangGraph", "Next.js", "TypeScript", "ChromaDB", "Tailwind CSS"],
        description: "Built a production-grade multi-agent AI platform leveraging autonomous agents, semantic memory, and real-time orchestration to simulate structured adversarial reasoning. Architected a LangGraph workflow coordinating 3 AI agents and 4 LLM providers with automated failover and fault-tolerant execution.",
        github: "https://github.com/GauravSingh094/Syntax-Showdown",
        live: "https://syntax-showdown-arena.vercel.app"
      };
    }
    if (q.includes('nyay') || q.includes('mitra') || q.includes('legal') || q.includes('law')) {
      return {
        name: "NyayMitra",
        tech: ["Next.js", "Spring Boot", "FastAPI", "Neo4j", "GraphRAG", "Legal-BERT", "Redis", "RabbitMQ"],
        description: "Built a legal intelligence platform leveraging GraphRAG and Knowledge Graphs for statutory analysis and judicial research automation. Engineered a GraphRAG retrieval pipeline using Neo4j and Legal-BERT, achieving sub-50ms multi-hop legal search.",
        github: "https://github.com/JAIKEYSINGH913/Nyay-mitra",
        live: "https://nyay-mitra-rho.vercel.app/"
      };
    }
    if (q.includes('mindrift') || q.includes('quiz')) {
      return {
        name: "Mindrift",
        tech: ["Next.js", "TypeScript", "Spring Boot", "PostgreSQL", "Redis", "Apache Kafka", "Clerk", "React Query", "Resilience4j", "Tailwind CSS"],
        description: "Built a scalable real-time quiz platform supporting competitive multiplayer assessments with event-driven architecture and enterprise-grade reliability. Engineered real-time leaderboards using Redis and Apache Kafka, enabling low-latency score synchronization for concurrent quiz sessions.",
        github: "https://github.com/GauravSingh094",
        live: "https://mindrift-quizz.vercel.app/"
      };
    }
    if (q.includes('kingsukh') || q.includes('guest house') || q.includes('resort')) {
      return {
        name: "King Sukh Guest House",
        tech: ["React.js", "TypeScript", "Tailwind CSS", "EmailJS", "Vercel", "Git", "GitHub"],
        description: "Delivered a client-facing hospitality platform featuring WhatsApp booking workflows, Google Maps integration, and mobile-first responsive design. Managed end-to-end deployment and version control workflows using Vercel, Git, and GitHub.",
        github: "https://github.com/GauravSingh094/kingsukh-guesthouse-website",
        live: "https://kingsukh-guesthouse-website.vercel.app/"
      };
    }
    return null;
  };

  const handleSend = async (e?: React.FormEvent, customText?: string, isRegenerate = false) => {
    if (e) e.preventDefault();
    const queryText = isRegenerate ? customText : (customText || input.trim());
    if (!queryText) return;

    let updatedMessages = [...messages];

    if (!isRegenerate) {
      trackEvent({ action: 'assistant_question_asked', category: 'ai_assistant', label: `Query: ${queryText}` });
      
      const userMsg: Message = {
        sender: 'user',
        text: queryText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        projectCard: null
      };

      updatedMessages = [...updatedMessages, userMsg];
      setMessages(updatedMessages);
      setInput('');
    }

    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({
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

  // Feedback Trigger
  const handleFeedback = (idx: number, type: 'like' | 'dislike') => {
    setFeedback(prev => ({ ...prev, [idx]: type }));
    trackEvent({
      action: type === 'like' ? 'assistant_message_liked' : 'assistant_message_disliked',
      category: 'ai_assistant',
      label: `Message index: ${idx}`
    });
  };

  // Regeneration Handler
  const handleRegenerate = async () => {
    const userMessages = messages.filter(m => m.sender === 'user');
    if (userMessages.length === 0) return;
    const lastUserQuery = userMessages[userMessages.length - 1].text;
    
    trackEvent({ action: 'assistant_response_regenerated', category: 'ai_assistant', label: `Query: ${lastUserQuery}` });
    
    // Discard last bot message to rerun query
    setMessages(prev => {
      const updated = [...prev];
      if (updated.length > 0 && updated[updated.length - 1].sender === 'bot') {
        updated.pop();
      }
      return updated;
    });
    
    await handleSend(undefined, lastUserQuery, true);
  };

  const suggestedPrompts = [
    { label: "Tell me about Syntax Showdown", query: "Tell me about your flagship project Syntax Showdown" },
    { label: "Show Flutter Projects", query: "Show me Flutter and mobile application projects" },
    { label: "Backend Experience", query: "Show me Gaurav's backend development experience" },
    { label: "Why hire Gaurav?", query: "Why should I hire Gaurav as a systems and full-stack developer?" },
    { label: "Download Resume", query: "Can you provide the link to download Gaurav's resume?", action: () => window.open("https://drive.google.com/file/d/1oF2tNQGojLN20D1zKeOYkf-FdVH9jdox/view?usp=drive_link", "_blank") },
    { label: "Show Tech Stack", query: "What technical skills and backend technologies do you use?" }
  ];

  const handleChipClick = (prompt: typeof suggestedPrompts[0]) => {
    if (prompt.action) {
      prompt.action();
    }
    handleSend(undefined, prompt.query);
  };

  const handleCategoryClick = (cat: string) => {
    let query = "";
    if (cat === "Projects") query = "Show me your featured projects";
    else if (cat === "Skills") query = "What technical skills and backend technologies do you use?";
    else if (cat === "Experience") query = "Tell me about your professional development experience";
    else if (cat === "Resume") query = "Tell me about your resume summary";
    else if (cat === "Education") query = "Tell me about your educational background";
    else if (cat === "AI Engineering") query = "Tell me about your AI engineering capabilities and LangGraph experience";
    
    if (query) {
      handleSend(undefined, query);
    }
  };

  const welcomeCategories = ["Projects", "Skills", "Experience", "Resume", "Education", "AI Engineering"];
  const emptyStateQuestions = [
    { label: "Tell me about Syntax Showdown", query: "Tell me about your flagship project Syntax Showdown" },
    { label: "Show Flutter Projects", query: "Show me Flutter and mobile application projects" },
    { label: "What technologies does Gaurav use?", query: "What technical skills and backend technologies do you use?" },
    { label: "Why should I hire Gaurav?", query: "Why should I hire Gaurav as a systems and full-stack developer?" }
  ];

  const scrollbarStyle = {
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(6, 182, 212, 0.2) transparent',
  } as React.CSSProperties;

  return (
    <>
      {/* Sticky Launcher Button with subtle floats & premium halo pulse */}
      <div className="fixed right-6 bottom-6 z-[9998] flex items-center justify-center">
        {/* Soft particle glow halo behind assistant button */}
        <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-2xl animate-pulse -z-10" />

        {/* Slow subtle idle pulse indicator ring every 6-8 seconds */}
        {!isOpen && (
          <motion.div
            animate={{
              scale: [1, 1.18, 1],
              opacity: [0.1, 0.45, 0.1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 rounded-full bg-cyan-500 blur-md -z-20 pointer-events-none"
          />
        )}

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
          onClick={() => {
            setIsOpen(prev => !prev);
            setIsCollapsed(false);
          }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          animate={isOpen ? { scale: 1 } : { y: [0, -6, 0] }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          transition={isOpen ? { duration: 0.2 } : { repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-neutral-900/95 to-neutral-950/95 border border-white/8 backdrop-blur-md flex items-center justify-center cursor-pointer shadow-[0_0_25px_rgba(6,182,212,0.2)] hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.45)] transition-shadow duration-300 relative group overflow-hidden"
        >
          <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
            <img 
              src="/images/bot-avatar.png" 
              alt="Gaurav Singh" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" 
            />
            {/* Pulsing online status indicator */}
            <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#050505] shadow-[0_0_10px_rgba(16,185,129,0.6)] animate-pulse z-10" />
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
              animate={{ 
                opacity: isCollapsed ? 0 : 1, 
                backdropFilter: isCollapsed ? "blur(0px)" : "blur(4px)",
                pointerEvents: isCollapsed ? "none" : "auto"
              }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/40 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />

            {/* Premium draggable side panel / Swipeable Mobile bottom sheet */}
            <motion.div
              drag={!isMobile && !isCollapsed}
              dragListener={false}
              dragControls={dragControls}
              dragConstraints={dragConstraints}
              dragElastic={0.08}
              dragMomentum={false}
              
              dragDirectionLock
              onDragEnd={handleDragEnd}
              
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                height: isCollapsed 
                  ? "60px" 
                  : (isMobile ? "80vh" : "600px")
              }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed z-[9999] bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/8 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col pointer-events-auto select-text overflow-hidden right-0 bottom-0 w-full rounded-t-3xl sm:right-6 sm:bottom-24 sm:w-[400px] sm:rounded-3xl"
            >
              {/* Screen grid visual overlays */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.06),transparent_65%)] pointer-events-none z-0" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:100%_15px] pointer-events-none z-0" />

              {/* Chat Panel Header - Acts as Drag Handle */}
              <div 
                onPointerDown={handlePointerDown}
                className={`relative z-10 h-[60px] px-5 border-b border-white/5 bg-neutral-950/20 flex items-center justify-between flex-shrink-0 shadow-[0_4px_20px_rgba(0,0,0,0.3)] ${
                  !isMobile && !isCollapsed ? 'cursor-grab active:cursor-grabbing' : ''
                }`}
              >
                {/* Visual drag handle pill on header on desktop */}
                {!isMobile && !isCollapsed && (
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-white/10" />
                )}

                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-full border border-cyan-500/35 overflow-hidden flex-shrink-0 bg-neutral-900">
                    <img src="/images/bot-avatar.png" alt="Gaurav Singh" className="w-full h-full object-cover grayscale" />
                    <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border border-[#0a0a0a]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 leading-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <h4 className="text-white text-xs font-mono font-bold uppercase tracking-wider">Gaurav Digital Twin</h4>
                    </div>
                    <span className="text-[8px] font-mono text-neutral-500 mt-1 inline-block uppercase tracking-wider">Powered by Gemini</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Reset/New Chat trigger when messages populated */}
                  {messages.length > 0 && !isCollapsed && (
                    <button
                      onClick={() => {
                        setMessages([]);
                        setFeedback({});
                      }}
                      className="text-[9px] font-mono text-neutral-500 hover:text-cyan-400 border border-white/5 bg-white/[0.02] px-2 py-0.5 rounded transition-colors mr-2 cursor-pointer"
                      title="Reset chat session"
                    >
                      NEW CHAT
                    </button>
                  )}

                  {/* Collapse Toggle */}
                  <button
                    onClick={() => setIsCollapsed(prev => !prev)}
                    className="text-neutral-500 hover:text-white transition-colors cursor-pointer p-1.5 border border-transparent hover:border-neutral-800 rounded-lg"
                    title={isCollapsed ? "Expand" : "Collapse"}
                  >
                    <Minus size={15} />
                  </button>

                  {/* Close panel */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-neutral-500 hover:text-white transition-colors cursor-pointer p-1.5 border border-transparent hover:border-neutral-800 rounded-lg"
                    title="Close"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>

              {/* Collapsible Viewport toggle */}
              {!isCollapsed && (
                <>
                  {/* Scrollable Conversation Buffer */}
                  <div 
                    data-lenis-prevent 
                    className="relative z-10 flex-1 overflow-y-auto p-5 space-y-5 scrollbar-none hover:scrollbar-thin scroll-smooth"
                    style={{ ...scrollbarStyle, overscrollBehavior: 'contain' }}
                  >
                    {/* Empty State Welcome Dashboard */}
                    {messages.length === 0 && (
                      <div className="space-y-5">
                        <motion.div 
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-4 shadow-xl"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center border border-cyan-500/30">
                              <Sparkles size={16} className="text-cyan-400 animate-pulse" />
                            </div>
                            <div>
                              <h5 className="text-white text-xs font-mono font-bold uppercase tracking-wider leading-none">Hi 👋</h5>
                              <p className="text-[10px] text-neutral-400 font-mono mt-1">I'm Gaurav's AI Digital Twin.</p>
                            </div>
                          </div>
                          <p className="text-neutral-300 text-xs font-light">I represent Gaurav virtually. Explore details grounding his skills, credentials, and work history directly.</p>
                        </motion.div>

                        {/* Suggested categories list */}
                        <div className="space-y-2">
                          <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">// Suggested Categories</span>
                          <div className="flex flex-wrap gap-1.5">
                            {welcomeCategories.map((cat, index) => (
                              <motion.button 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ delay: index * 0.04 }}
                                key={cat} 
                                onClick={() => handleCategoryClick(cat)}
                                className="text-[9px] font-mono border border-white/5 bg-white/[0.01] text-neutral-400 hover:text-cyan-300 hover:border-cyan-500/30 hover:bg-cyan-500/5 px-2.5 py-1 rounded-full cursor-pointer transition-colors duration-300"
                              >
                                {cat}
                              </motion.button>
                            ))}
                          </div>
                        </div>

                        {/* Premium suggestion cards layout */}
                        <div className="space-y-2.5">
                          <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">// Quick Questions</span>
                          <div className="grid grid-cols-2 gap-3.5">
                            {emptyStateQuestions.map((prompt, idx) => (
                              <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 + idx * 0.05 }}
                                key={prompt.label}
                                onClick={() => handleChipClick(prompt)}
                                className="p-4 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-md text-left hover:border-cyan-500/30 hover:bg-cyan-500/[0.02] transition-all duration-300 group shadow-lg hover:shadow-[0_0_15px_rgba(6,182,212,0.1)] active:scale-98 cursor-pointer flex flex-col justify-between h-[84px]"
                              >
                                <h6 className="text-white text-[10px] font-mono font-semibold tracking-tight group-hover:text-cyan-300 leading-snug transition-colors">{prompt.label}</h6>
                                <span className="text-[8px] text-neutral-600 font-mono group-hover:text-cyan-500/50 uppercase tracking-widest transition-colors mt-2">ASK TWIN →</span>
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Chat Conversation Turns */}
                    {messages.map((msg, index) => {
                      const isBot = msg.sender === 'bot';
                      return (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-2"
                        >
                          <div className={`flex items-start gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}>
                            {isBot ? (
                              <div className="w-7 h-7 rounded-full border border-cyan-500/25 overflow-hidden flex-shrink-0 bg-neutral-900">
                                <img src="/images/bot-avatar.png" alt="Gaurav Singh" className="w-full h-full object-cover grayscale" />
                              </div>
                            ) : (
                              /* visitor user avatar initials badge */
                              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center border border-cyan-500/30 text-[9px] font-mono font-bold text-cyan-300 flex-shrink-0">
                                R
                              </div>
                            )}
                            
                            <div className="max-w-[78%] flex flex-col">
                              <div className={`relative rounded-2xl px-4.5 py-3.5 text-xs leading-relaxed whitespace-pre-wrap ${
                                isBot 
                                  ? 'bg-neutral-900/50 border border-white/5 border-l-2 border-l-cyan-500 backdrop-blur-sm text-neutral-300 shadow-md' 
                                  : 'bg-gradient-to-r from-cyan-600 to-teal-600 text-black font-semibold shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                              }`}>
                                {msg.text}
                                <span className={`block text-[8px] text-right mt-2 ${isBot ? 'text-neutral-600' : 'text-cyan-950'}`}>
                                  {msg.timestamp}
                                </span>
                              </div>

                              {/* Small Helpful feedback & regenerate actions directly under message bubbles */}
                              {isBot && (
                                <div className="flex items-center gap-3.5 mt-2 ml-1 text-[9px] font-mono text-neutral-600">
                                  {feedback[index] ? (
                                    <motion.span 
                                      initial={{ scale: 0.9, opacity: 0 }}
                                      animate={{ scale: 1, opacity: 1 }}
                                      className="text-cyan-400 font-bold"
                                    >
                                      ✓ Thanks for feedback
                                    </motion.span>
                                  ) : (
                                    <>
                                      <button 
                                        onClick={() => handleFeedback(index, 'like')}
                                        className="hover:text-cyan-300 transition-colors flex items-center gap-0.5 active:scale-110 cursor-pointer"
                                      >
                                        👍 Helpful
                                      </button>
                                      <button 
                                        onClick={() => handleFeedback(index, 'dislike')}
                                        className="hover:text-cyan-300 transition-colors flex items-center gap-0.5 active:scale-110 cursor-pointer"
                                      >
                                        👎 Not Helpful
                                      </button>
                                    </>
                                  )}

                                  {/* Regenerate reply option - displayed under final bot message in index */}
                                  {index === messages.length - 1 && (
                                    <button 
                                      onClick={handleRegenerate}
                                      className="hover:text-cyan-300 transition-colors flex items-center gap-0.5 ml-auto text-cyan-400 font-bold cursor-pointer"
                                    >
                                      ↻ Regenerate
                                    </button>
                                  )}
                                </div>
                              )}
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
                          <img src="/images/bot-avatar.png" alt="Gaurav Singh" className="w-full h-full object-cover grayscale" />
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

                  {/* Horizontal Scroll Prompts Chips - Shown only when chats populated */}
                  {messages.length > 0 && (
                    <div className="relative z-10 px-5 py-3 border-t border-white/[0.04] bg-neutral-950/20 overflow-x-auto flex gap-2 scrollbar-none flex-shrink-0">
                      {suggestedPrompts.map((prompt, idx) => (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 + idx * 0.04 }}
                          key={prompt.label}
                          onClick={() => handleChipClick(prompt)}
                          className="font-mono text-[10px] text-neutral-400 border border-white/5 bg-white/[0.02] px-3.5 py-1.5 rounded-full hover:border-cyan-500/30 hover:bg-cyan-500/5 hover:text-cyan-300 hover:shadow-[0_0_10px_rgba(6,182,212,0.15)] whitespace-nowrap cursor-pointer transition-all duration-300 active:scale-95 flex-shrink-0"
                        >
                          {prompt.label}
                        </motion.button>
                      ))}
                    </div>
                  )}

                  {/* Sticky Chat Input form */}
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

                  {/* Grounding safety indicator */}
                  <div className="px-6 py-3 border-t border-neutral-900 bg-neutral-950/60 flex items-center gap-2 text-[8px] font-mono text-neutral-600 uppercase tracking-widest flex-shrink-0">
                    <ShieldCheck size={11} className="text-cyan-500/50" />
                    <span>grounded twin // professional representational agent</span>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
