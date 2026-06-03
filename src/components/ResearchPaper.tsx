'use client';

import { motion } from 'framer-motion';
import { FileText, ExternalLink, Sparkles, BookOpen } from 'lucide-react';

export default function ResearchPaper() {
  const paperDetails = [
    "Designed a hybrid GraphRAG architecture using Neo4j Knowledge Graphs and Legal-BERT embeddings to address statutory concept drift in IPC-to-BNS legal transition analysis.",
    "Engineered a semantic retrieval pipeline achieving sub-50ms multi-hop query latency while improving contextual relevance across interconnected legal provisions.",
    "Developed a deterministic verification framework with hallucination-free validation and a PageRank-based ranking algorithm for prioritizing landmark judicial precedents."
  ];

  const paperUrl = "https://drive.google.com/file/d/1pjDSjjGYBP6ypI2n3-nnm3xEnQxiZxv_/view";

  return (
    <section id="research" className="relative z-20 bg-[#050507] py-40 px-6 md:px-12 lg:px-24 border-t border-neutral-900 border-dashed overflow-hidden select-none">
      {/* Background radial spotlights */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(6,182,212,0.03),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          
          {/* Left Column: Heading */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 text-cyan-400 font-mono text-[10px] tracking-[0.45em] uppercase mb-8"
            >
              <span className="w-8 h-[1px] bg-cyan-950 inline-block" />
              [ PUBLICATIONS ]
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600 tracking-tighter uppercase leading-none"
            >
              RESEARCH<br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)' }}>PAPER</span>
            </motion.h2>
          </div>

          {/* Right Column: Premium Frosted Card Content */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-[#0c0c11]/70 border border-white/5 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl hover:border-cyan-500/20 transition-all duration-500 group"
              style={{
                boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
              }}
            >
              {/* Internal spotlight reflection */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.03),transparent_60%)] pointer-events-none" />

              {/* Status/Presentation Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                <div className="flex items-center gap-2.5 bg-neutral-950/80 border border-neutral-900 px-4 py-2 rounded-full w-fit">
                  <Sparkles size={12} className="text-cyan-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-semibold">
                    Conference Presentation // Apr 2026
                  </span>
                </div>
                <span className="text-[10.5px] font-mono text-cyan-400 uppercase tracking-wider font-bold">
                  HRIT UNIVERSITY
                </span>
              </div>

              {/* Paper Title & Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-snug group-hover:text-cyan-400 transition-colors duration-300">
                    NyayMitra: A Proposed GraphRAG Architecture for IPC-BNS Transition
                  </h3>
                  <p className="text-neutral-500 font-mono text-[11px] uppercase tracking-widest mt-2">
                    Presented at National Level Conference, HRIT University
                  </p>
                </div>

                <div className="h-[1px] w-full bg-neutral-900" />

                {/* Highlights List */}
                <div className="space-y-6">
                  {paperDetails.map((detail, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <span className="font-mono text-xs text-cyan-500/50 mt-1 select-none font-bold">
                        [0{index + 1}]
                      </span>
                      <p className="text-neutral-300 text-base leading-relaxed font-light font-sans">
                        {detail}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="h-[1px] w-full bg-neutral-900 pt-2" />

                {/* Paper PDF Action Button */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <a
                    href={paperUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-black font-mono text-xs font-bold tracking-widest uppercase hover:shadow-[0_0_25px_rgba(6,182,212,0.35)] transition-all flex items-center gap-3 cursor-pointer"
                  >
                    <FileText size={16} />
                    <span>View Research Paper</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-neutral-800 group-hover:border-cyan-400/50 transition-colors duration-300" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-neutral-800 group-hover:border-cyan-400/50 transition-colors duration-300" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
