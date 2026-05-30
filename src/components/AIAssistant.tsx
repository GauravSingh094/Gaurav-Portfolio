'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles, Terminal } from 'lucide-react';

interface Message {
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: "Hi, I'm Gaurav's digital twin. Ask me anything about his projects, technical skills, certifications, or professional experience.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Grounded Knowledge Base Index (Local RAG)
  const knowledgeBase: Record<string, string> = {
    general: "Gaurav Singh is a Creative Systems & Client Engineer specializing in high-fidelity Next.js/Three.js frontends, async Python FastAPI/Spring Boot backends, and responsive cross-platform Flutter applications.",
    projects: "Gaurav has engineered four major projects: \n1. **AI Debate Arena**: Multi-agent graph using LangGraph & FastAPI.\n2. **SoulSync**: On-device face sentiment ML music recommender in Flutter.\n3. **Mindrift**: High-concurrency WebSockets quiz game engine.\n4. **Spring PetClinic**: Relational database administration service using JPA scopes.",
    debate: "Gaurav's flagship project, **AI Debate Arena**, leverages a multi-agent state graph built in **LangGraph**. It maps rebuttals and moderator evaluations, caching short-term sessions in **Redis**, storing semantic vectors in **ChromaDB**, and streaming responses over **FastAPI asynchronous SSE channels**.",
    flutter: "In **SoulSync**, Gaurav implemented offline **MLKit face mesh models** inside a native **Flutter/Dart** client layer to categorize user expressions, ensuring a consistent **$60\\text{fps}$** rendering and keeping user biometrics private.",
    backend: "Gaurav's backend expertise covers **Java & Spring Boot** (JPA optimizations, transaction scopes), **Node.js & WebSockets** (low-latency socket connections in Mindrift), and **FastAPI** (asynchronous streaming setups inside AI Debate Arena).",
    hire: "You should hire Gaurav because he possesses a rare combination of **pixel-perfect client engineering** (WebGL, Framer Motion) and **robust systems engineering** (Docker sandboxing, Docker container pooling, microservice architecture), alongside verified B.Tech CSE credits and hands-on remote web internship experience at InnoByte Services.",
    skills: "Gaurav's core capabilities include:\n- **Languages**: Java, Python, Dart, JavaScript, TypeScript\n- **Client Side**: Next.js, React, Flutter, Framer Motion, Three.js\n- **Backend & DB**: Spring Boot, Node.js, FastAPI, MySQL, MongoDB, Redis, ChromaDB\n- **DevOps**: Docker sandboxed isolation, dynamic container pooling, Git automation"
  };

  // Automated smart keyword router
  const matchQuery = (text: string): string => {
    const q = text.toLowerCase();
    if (q.includes('debate') || q.includes('arena') || q.includes('langgraph')) return knowledgeBase.debate;
    if (q.includes('flutter') || q.includes('mobile') || q.includes('soulsync') || q.includes('phone') || q.includes('mlkit')) return knowledgeBase.flutter;
    if (q.includes('backend') || q.includes('java') || q.includes('spring') || q.includes('fastapi') || q.includes('database') || q.includes('mysql') || q.includes('redis')) return knowledgeBase.backend;
    if (q.includes('projects') || q.includes('showcase') || q.includes('mindrift') || q.includes('petclinic')) return knowledgeBase.projects;
    if (q.includes('skills') || q.includes('technologies') || q.includes('use') || q.includes('stack')) return knowledgeBase.skills;
    if (q.includes('hire') || q.includes('why') || q.includes('benefit') || q.includes('suitable')) return knowledgeBase.hire;
    return knowledgeBase.general;
  };

  const handleSend = (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const queryText = customText || input.trim();
    if (!queryText) return;

    // Add user message
    const userMsg: Message = {
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate thinking delay
    setTimeout(() => {
      const responseText = matchQuery(queryText);
      const botMsg: Message = {
        sender: 'bot',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 750);
  };

  // Scroll bottom on update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickChips = [
    { label: "Explain AI Debate Arena", query: "Explain the AI Debate Arena project in detail" },
    { label: "Show Flutter Projects", query: "Show me Flutter and mobile application projects" },
    { label: "Why hire Gaurav?", query: "Why should a technical recruiter or startup hire Gaurav?" },
    { label: "What are his skills?", query: "What technical skills and databases does he use?" }
  ];

  return (
    <>
      {/* Floating launcher bubble */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[9998] bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-black p-4 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center border border-cyan-400/30"
      >
        <MessageSquare size={22} strokeWidth={2.5} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-end justify-end p-6 pointer-events-none select-none">
            {/* Click-away dismiss panel */}
            <div className="absolute inset-0 pointer-events-auto" onClick={() => setIsOpen(false)} />

            {/* Chat overlay card */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm h-[580px] bg-[#0c0c11]/95 border border-white/10 rounded-3xl overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.9)] flex flex-col pointer-events-auto"
            >
              {/* Internal spotlight reflections */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.08),transparent_70%)] pointer-events-none z-0" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:100%_15px] pointer-events-none z-0" />

              {/* Chat Header */}
              <div className="relative z-10 px-5 py-4 border-b border-neutral-900 bg-neutral-950/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Bot size={18} className="animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-mono font-black uppercase tracking-wider leading-none">DIGITAL_TWIN // GAURAV</h4>
                    <span className="text-[8px] font-mono text-cyan-400 uppercase tracking-widest mt-0.5 inline-block">Online & Grounded</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-neutral-500 hover:text-white transition-colors cursor-pointer p-1"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Message History Screen */}
              <div className="relative z-10 flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin max-h-[350px]">
                {messages.map((msg, index) => {
                  const isBot = msg.sender === 'bot';
                  return (
                    <div key={index} className={`flex items-start gap-2.5 ${isBot ? 'justify-start' : 'justify-end'}`}>
                      {isBot && (
                        <div className="w-6 h-6 rounded-full bg-neutral-900 border border-cyan-500/25 flex items-center justify-center text-cyan-400 text-[10px] flex-shrink-0">
                          <Bot size={12} />
                        </div>
                      )}
                      <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-xs leading-relaxed whitespace-pre-wrap ${
                        isBot 
                          ? 'bg-neutral-950/80 border border-neutral-900 text-neutral-300' 
                          : 'bg-cyan-600 border border-cyan-500 text-black font-semibold'
                      }`}>
                        {msg.text}
                        <span className={`block text-[8px] text-right mt-1.5 ${isBot ? 'text-neutral-600' : 'text-cyan-950'}`}>
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Active Typing Animation */}
                {isTyping && (
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-neutral-900 border border-cyan-500/25 flex items-center justify-center text-cyan-400 text-[10px]">
                      <Bot size={12} />
                    </div>
                    <div className="bg-neutral-950/80 border border-neutral-900 rounded-2xl px-4 py-3 flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Quick action chips selection */}
              <div className="relative z-10 px-5 py-2.5 border-t border-neutral-900/50 bg-neutral-950/20 overflow-x-auto flex gap-1.5 scrollbar-none flex-shrink-0">
                {quickChips.map(chip => (
                  <button
                    key={chip.label}
                    onClick={() => handleSend(undefined, chip.query)}
                    className="font-mono text-[9px] text-neutral-400 border border-neutral-800 bg-neutral-950/60 px-3 py-1.5 rounded-full hover:border-cyan-500/30 hover:text-cyan-300 whitespace-nowrap cursor-pointer transition-colors"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSend} className="relative z-10 px-5 py-4 border-t border-neutral-900 bg-neutral-950/40 flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask about skills, work, or debate..."
                  className="flex-1 bg-transparent border-0 outline-none text-white font-mono text-xs placeholder-neutral-500"
                />
                <button
                  type="submit"
                  className="w-8 h-8 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black flex items-center justify-center cursor-pointer transition-all duration-300 flex-shrink-0"
                >
                  <Send size={12} strokeWidth={2.5} />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
