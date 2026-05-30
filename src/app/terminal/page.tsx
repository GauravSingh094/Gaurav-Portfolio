'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Terminal as TerminalIcon, ShieldAlert, ArrowLeft } from 'lucide-react';

export default function TerminalPage() {
  const router = useRouter();
  const [history, setHistory] = useState<string[]>([
    'gaurav-shell v1.04 // active',
    'type "help" for a list of operational terminal nodes.',
    ''
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Command Responses database
  const commands: Record<string, () => void | string[]> = {
    help: () => [
      'Operational Commands:',
      '  about      - Display Gaurav\'s structural summary',
      '  skills     - List certified core technical domains',
      '  projects   - Showcase active flagship engineering platforms',
      '  resume     - Open verified resume document parameters',
      '  contact    - Retrieve active dispatch communication nodes',
      '  github     - Redirect directly to GitHub code repository',
      '  linkedin   - Redirect directly to LinkedIn professional network',
      '  clear      - Wipe screen buffers',
      '  exit       - Return to cinematic homepage dashboard'
    ],
    about: () => [
      'Gaurav Singh // Creative Systems & Client Engineer',
      '------------------------------------------------',
      'Final-year Computer Science B.Tech student at NITRA (AKTU).',
      'Specializing in dynamic Next.js/Three.js interfaces, high-concurrency',
      'FastAPI/Spring Boot backends, and responsive native Flutter mobile systems.'
    ],
    skills: () => [
      'Technical Capability Matrix:',
      '  Frontend : React.js, Next.js, Framer Motion, HTML5, CSS3, Tailwind CSS',
      '  Mobile   : Flutter, Dart, Firebase, local MLKit sentiment models',
      '  Backend  : Java, Spring Boot, Spring Data JPA, Node.js, WebSockets',
      '  Databases: MySQL, MongoDB, Redis caching, ChromaDB vectors',
      '  Systems  : Docker untrusted compile isolation, dynamic container pooling'
    ],
    projects: () => [
      'Active Showcase Initiatives:',
      '  - AI Debate Arena  : LangGraph multi-agent backend using memory and SSE triggers.',
      '  - SoulSync         : On-device ML sentiment Flutter music recommendation engine.',
      '  - Mindrift         : High-concurrency WebSocket multiplayer quiz platform.',
      '  - Spring PetClinic : Relational enterprise database service using JPA scopes.'
    ],
    resume: () => {
      window.open('/Gaurav_Resume.pdf', '_blank');
      return ['Retrieving verified secure resume archive...', 'Action executed successfully in background browser tab.'];
    },
    contact: () => [
      'Direct Communication Channels:',
      '  Email    : gauravsinghx2510@gmail.com',
      '  LinkedIn : https://linkedin.com/in/gaurav-singh-276944292',
      '  GitHub   : https://github.com/GauravSingh094',
      '  Location : Ghaziabad, UP, India'
    ],
    github: () => {
      window.open('https://github.com/GauravSingh094', '_blank');
      return ['Routing to GitHub repositories...'];
    },
    linkedin: () => {
      window.open('https://linkedin.com/in/gaurav-singh-276944292', '_blank');
      return ['Routing to LinkedIn network...'];
    },
    clear: () => {
      setHistory([]);
      return [];
    },
    exit: () => {
      router.push('/');
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const query = input.trim();
    if (!query) return;

    const cmdKey = query.toLowerCase();
    const newHistory = [...history, `gaurav@portfolio:~$ ${query}`];

    if (commands[cmdKey]) {
      const response = commands[cmdKey]();
      if (response) {
        newHistory.push(...response);
      }
    } else {
      newHistory.push(`shell: command not found: "${query}". Type "help" for a list of operational nodes.`);
    }

    newHistory.push(''); // spacing row
    setHistory(newHistory);
    setInput('');
  };

  // Scroll to bottom on updates
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Keep input focused
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <main 
      onClick={() => inputRef.current?.focus()}
      className="relative min-h-screen w-full bg-[#050507] text-[#06b6d4] font-mono text-sm p-6 md:p-12 overflow-hidden flex flex-col justify-between selection:bg-cyan-900 selection:text-white"
    >
      {/* Mesh Overlay background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.015)_1px,transparent_1px)] bg-[size:35px_35px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.02),transparent_70%)] pointer-events-none z-0" />

      {/* Terminal Interface Container */}
      <div className="relative z-10 max-w-4xl w-full mx-auto flex-1 flex flex-col justify-start">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-cyan-950 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <TerminalIcon size={18} className="animate-pulse" />
            <h1 className="text-xs uppercase tracking-widest font-black text-white">GAURAV_COCKPIT // SYSTEM_SHELL</h1>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); router.push('/'); }} 
            className="flex items-center gap-1 text-[10px] text-neutral-500 hover:text-white transition-colors cursor-pointer border border-neutral-800 hover:border-neutral-500 px-3 py-1 rounded-full uppercase tracking-wider"
          >
            <ArrowLeft size={10} />
            <span>Return Home</span>
          </button>
        </div>

        {/* Output Screen */}
        <div className="flex-1 overflow-y-auto space-y-1 scrollbar-thin pr-2 max-h-[70vh]">
          {history.map((line, idx) => (
            <div 
              key={idx} 
              className={`whitespace-pre-wrap ${
                line.startsWith('gaurav@portfolio') 
                  ? 'text-white font-bold' 
                  : line.startsWith('shell: command not found') 
                    ? 'text-red-400/80 flex items-center gap-2' 
                    : 'text-neutral-300'
              }`}
            >
              {line.startsWith('shell: command not found') && <ShieldAlert size={12} className="text-red-400" />}
              {line}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleCommand} className="flex items-center gap-2 border-t border-cyan-950/40 pt-4 mt-6">
          <span className="text-white font-bold">gaurav@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-0 outline-none text-white font-mono text-sm"
            placeholder="type your commands here..."
            autoFocus
          />
        </form>
      </div>

      {/* Terminal Footer Info */}
      <div className="relative z-10 max-w-4xl w-full mx-auto mt-8 flex justify-between items-center text-[9px] text-neutral-600 uppercase tracking-widest border-t border-cyan-950/20 pt-4">
        <span>SYS_STATUS // SECURE_SHELL_ACTIVE</span>
        <span>gauravsingh.in</span>
      </div>
    </main>
  );
}
