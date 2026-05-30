import { Github } from 'lucide-react';

export default function Projects() {
  const projects = [
    { 
      title: 'SoulSync', 
      role: 'Flutter, ML & Firebase', 
      description: 'Emotion-based music player built with Flutter, Dart, Firebase, ML, and YouTube API.',
      year: '2025',
      href: '#'
    },
    { 
      title: 'Mindrift', 
      role: 'Next.js & Firebase', 
      description: 'Real-time quiz platform built with Next.js, Firebase, TypeScript, and Tailwind CSS.',
      year: '2024',
      href: '#'
    },
    { 
      title: 'Spring PetClinic', 
      role: 'Spring Boot & MySQL', 
      description: 'Full-stack Java application built with Spring Boot, Spring MVC, Spring Data JPA, Thymeleaf, and Maven.',
      year: '2024',
      href: '#' 
    },
  ];

  return (
    <section className="relative z-20 bg-[#121212] py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold mb-16 text-white tracking-tighter">Selected Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div 
              key={i}
              className="group relative h-[420px] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 p-8 flex flex-col justify-end transition-all duration-500 hover:border-neutral-600 hover:bg-neutral-800/80 cursor-pointer"
            >
              {/* Soft inner glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-t from-white/5 to-transparent"></div>
              
              <div className="relative z-10 flex flex-col gap-4">
                <div>
                  <p className="text-neutral-400 mb-2 uppercase tracking-widest text-sm font-semibold">{project.role}</p>
                  <h3 className="text-3xl font-semibold text-white tracking-tight">{project.title}</h3>
                  <p className="text-neutral-300 mt-4 text-sm leading-relaxed">{project.description}</p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                   <div className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center bg-black/50 backdrop-blur-md group-hover:bg-white group-hover:text-black transition-all">
                    <Github size={18} />
                  </div>
                  <span className="text-neutral-500 text-sm font-mono">{project.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
