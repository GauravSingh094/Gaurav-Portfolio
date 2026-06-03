'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowLeft, BookOpen, Clock, Tag, ExternalLink, Sparkles } from 'lucide-react';

export default function KnowledgeLogPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Initial Article Roadmap placeholders with complete metadata
  const articles = [
    {
      id: 'syntax-showdown-langgraph',
      title: 'Building Syntax Showdown with LangGraph: A Deep Systems Dive',
      category: 'AI Engineering',
      tags: ['LangGraph', 'Generative AI', 'State Machine'],
      readTime: '12 min',
      date: 'May 2026',
      description: 'An architectural analysis of constructing a multi-agent debate sandbox. Explains graph state transitions, agent handovers, and conditional turn moderation rules.',
      featured: true,
      linkedProject: 'Syntax Showdown'
    },
    {
      id: 'multi-agent-architecture',
      title: 'Multi-Agent Architecture Design: Orchestrating Complex LLM Handovers',
      category: 'AI Engineering',
      tags: ['Multi-Agent', 'LLM', 'FastAPI'],
      readTime: '9 min',
      date: 'April 2026',
      description: 'Evaluates orchestration models for concurrent LLM systems. Discusses thread routing, task division, and low-latency API handshakes.',
      featured: false,
      linkedProject: 'Syntax Showdown'
    },
    {
      id: 'flutter-performance-lessons',
      title: 'Flutter Performance Lessons: Reaching 60FPS in High-Fidelity Mobile Clients',
      category: 'Mobile Engineering',
      tags: ['Flutter', 'Dart', 'Performance'],
      readTime: '10 min',
      date: 'March 2026',
      description: 'Practical profiling tips to resolve mobile UI lag. Explains rasterization bounds, pixel stream caching, and avoiding CPU custom paint locks.',
      featured: false,
      linkedProject: 'NyayMitra'
    },
    {
      id: 'fastapi-production-setup',
      title: 'FastAPI Production Setup: Async SSE Token Streaming and Connection Pools',
      category: 'Backend Systems',
      tags: ['FastAPI', 'Python', 'Asynchronous'],
      readTime: '8 min',
      date: 'Feb 2026',
      description: 'Configuring concurrent Python microservices. Details async event handlers, database connections scaling, and streaming chunks over Server-Sent Events.',
      featured: false,
      linkedProject: 'Syntax Showdown'
    },
    {
      id: 'springboot-backend-architecture',
      title: 'Spring Boot Enterprise Architecture: JPA Lazy Fetching and Transaction Boundaries',
      category: 'Backend Systems',
      tags: ['Spring Boot', 'Java', 'JPA'],
      readTime: '11 min',
      date: 'Jan 2026',
      description: 'Deep architectural best practices for relational database schemas in high-concurrency quiz platforms. Solves N+1 hibernate fetch blocks, transaction isolation states, and database pool sizing.',
      featured: false,
      linkedProject: 'Mindrift'
    },
    {
      id: 'designing-ai-systems-memory',
      title: 'Designing AI Systems with Memory: Integrating Redis and Vector Databases',
      category: 'AI Engineering',
      tags: ['Redis', 'Vector DB', 'ChromaDB'],
      readTime: '10 min',
      date: 'Dec 2025',
      description: 'How to manage double-tier memory caches for AI systems. Details Redis short-term token indexing and semantic long-term vectors ChromaDB integration.',
      featured: true,
      linkedProject: 'Syntax Showdown'
    }
  ];

  const categories = ['All', 'AI Engineering', 'Mobile Engineering', 'Backend Systems'];

  // Filter articles based on search & category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="relative min-h-screen w-full bg-[#050507] text-neutral-300 font-sans p-6 md:p-12 lg:p-20 overflow-hidden select-none selection:bg-cyan-900 selection:text-white">
      {/* Visual cyber mesh overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(6,182,212,0.02),transparent_60%)] pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl w-full mx-auto">
        
        {/* Navigation back and header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-900 pb-8 mb-12 gap-6">
          <div>
            <button 
              onClick={() => router.push('/')}
              className="flex items-center gap-2 text-cyan-400 font-mono text-[10px] tracking-[0.4em] uppercase mb-4 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft size={12} />
              <span>[ Return Dashboard ]</span>
            </button>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
              TECHNICAL LOG
            </h1>
            <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest mt-3">
              // ARCHITECTURAL WRITE-UPS & SYSTEMS ENGINEERING ARCHIVES
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
            <Sparkles size={14} className="animate-spin" style={{ animationDuration: '3s' }} />
            <span>SYNTAX SHOWDOWN STUDY IN FOREGROUND ACTIVE</span>
          </div>
        </div>

        {/* Filter Toolbar HUD */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center mb-12">
          {/* Categories select row */}
          <div className="flex flex-wrap gap-2.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`font-mono text-xs tracking-wider uppercase py-2 px-4 rounded-full border transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-cyan-500/10 border-cyan-400/50 text-cyan-300'
                    : 'border-neutral-900 bg-neutral-950/40 text-neutral-500 hover:text-white hover:border-neutral-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar widget */}
          <div className="relative w-full lg:max-w-xs flex items-center gap-3 bg-[#0c0c11]/80 border border-neutral-900 rounded-full px-5 py-2.5 focus-within:border-cyan-500/30 transition-all duration-300">
            <Search className="text-neutral-500 flex-shrink-0" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search logs or tags..."
              className="w-full bg-transparent border-0 outline-none text-white font-mono text-xs placeholder-neutral-500"
            />
          </div>
        </div>

        {/* Dynamic Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.length > 0 ? (
            filteredArticles.map(article => (
              <article
                key={article.id}
                className={`relative group bg-[#0c0c11]/80 border border-neutral-900 rounded-3xl p-8 overflow-hidden hover:border-cyan-500/20 transition-all duration-500 shadow-2xl flex flex-col justify-between ${
                  article.featured ? 'md:col-span-2 border-cyan-500/10 bg-cyan-950/2' : ''
                }`}
              >
                {/* Laser scanline border hover decoration */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-neutral-900 group-hover:border-cyan-400/50 transition-colors duration-300" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-neutral-900 group-hover:border-cyan-400/50 transition-colors duration-300" />

                <div>
                  {/* Article Metadata Header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-[9px] text-cyan-400 bg-cyan-950/40 border border-cyan-900 px-3 py-1 rounded-full uppercase tracking-widest font-bold">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-3 text-[10px] text-neutral-500 font-mono">
                      <span>{article.date}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock size={11} />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Title & Body */}
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight leading-tight group-hover:text-cyan-300 transition-colors mb-4">
                    {article.title}
                  </h3>
                  <p className="text-neutral-400 text-sm font-light leading-relaxed mb-6">
                    {article.description}
                  </p>
                </div>

                {/* Footer and dynamic tag bindings */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-neutral-900 pt-6 mt-4 gap-4">
                  {/* Tags list */}
                  <div className="flex flex-wrap gap-1.5">
                    {article.tags.map(tag => (
                      <span key={tag} className="flex items-center gap-1 font-mono text-[9px] text-neutral-500 bg-neutral-950/60 border border-neutral-900 px-2.5 py-0.5 rounded">
                        <Tag size={8} />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>

                  {/* Cross-case direct navigation link */}
                  {article.linkedProject && (
                    <button
                      onClick={() => router.push(`/#projects`)}
                      className="flex items-center gap-1 font-mono text-[10px] text-cyan-400 uppercase tracking-widest hover:text-white transition-colors cursor-pointer ml-auto sm:ml-0"
                    >
                      <BookOpen size={11} />
                      <span>Case: {article.linkedProject}</span>
                      <ExternalLink size={10} className="text-neutral-500" />
                    </button>
                  )}
                </div>
              </article>
            ))
          ) : (
            <div className="md:col-span-2 text-center py-20 bg-[#0c0c11]/40 border border-neutral-900 border-dashed rounded-3xl">
              <BookOpen className="text-neutral-700 mb-4 mx-auto animate-pulse" size={32} />
              <p className="text-neutral-500 font-mono text-sm uppercase tracking-wider">No matching logs found in index</p>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
