export const portfolioContext = {
  profile: {
    name: "Gaurav Singh",
    title: "Computer Science & Engineering Graduate",
    contact: {
      phone: "+91 930526484",
      email: "gauravsinghx2510@gmail.com",
      location: "Ghaziabad, India",
      github: "https://github.com/GauravSingh094",
      linkedin: "https://linkedin.com/in/gaurav-singh-276944292"
    },
    bio: "Computer Science and Engineering graduate with experience in Full-Stack Development, Backend Engineering, and AI Systems. Proficient in designing scalable web applications, distributed microservices, GraphRAG solutions, and multi-agent AI platforms using FastAPI, Spring Boot, Next.js, React, and LangGraph."
  },
  skills: [
    { category: "Languages", tools: ["Java", "Python", "JavaScript", "TypeScript", "Dart", "C"] },
    { category: "Frontend", tools: ["React.js", "Next.js", "Flutter", "Tailwind CSS", "Framer Motion", "Three.js"] },
    { category: "Backend & Systems", tools: ["FastAPI", "Spring Boot", "Node.js", "REST APIs", "SSE Streaming", "Redis", "RabbitMQ", "Apache Kafka", "Vercel"] },
    { category: "Databases & RAG", tools: ["MySQL", "MongoDB", "Firebase", "Neo4j", "ChromaDB", "Milvus"] },
    { category: "AI & Data", tools: ["LangGraph", "GraphRAG", "RAG", "Knowledge Graphs", "Legal-BERT", "Multi-Agent Systems", "Semantic Search", "Ollama"] }
  ],
  projects: [
    {
      id: "syntax_showdown",
      name: "Syntax Showdown – Multi-Agent AI Debate Platform",
      tagline: "Multi-Agent LangGraph Debate Platform",
      tech: ["FastAPI", "LangGraph", "Next.js", "TypeScript", "ChromaDB", "Tailwind CSS"],
      description: "Built a production-grade multi-agent AI platform leveraging autonomous agents, semantic memory, and real-time orchestration to simulate structured adversarial reasoning. Architected a LangGraph workflow coordinating 3 AI agents and 4 LLM providers with automated failover and fault-tolerant execution.",
      github: "https://github.com/GauravSingh094/Syntax-Showdown",
      live: "https://syntax-showdown-arena.vercel.app",
      challenges: "Coordinating multi-agent logic gates and reducing AI inference latency to sub-100ms SSE updates.",
      architecture: "LangGraph state machine orchestrating Gemini/Claude, ChromaDB long-term memory, FastAPI Server-Sent Events (SSE) streaming."
    },
    {
      id: "nyay_mitra",
      name: "NyayMitra – Sovereign Legal AI Ecosystem",
      tagline: "Sovereign Legal AI Ecosystem",
      tech: ["Next.js", "Spring Boot", "FastAPI", "Neo4j", "GraphRAG", "Legal-BERT", "Redis", "RabbitMQ"],
      description: "Built a legal intelligence platform leveraging GraphRAG and Knowledge Graphs for statutory analysis and judicial research automation. Engineered a GraphRAG retrieval pipeline using Neo4j and Legal-BERT, achieving sub-50ms multi-hop legal search.",
      github: "https://github.com/JAIKEYSINGH913/Nyay-mitra",
      live: "https://nyay-mitra-rho.vercel.app/",
      challenges: "Developing hallucination-free verification and precedent ranking systems for IPC-to-BNS transition workflows.",
      architecture: "Next.js frontend cockpit, Spring Boot core microservice, FastAPI NLP parser, Neo4j Knowledge Graph, RabbitMQ message brokers, and Redis caching."
    },
    {
      id: "mindrift",
      name: "Mindrift – Real-Time Quiz Platform",
      tagline: "High-Concurrency Real-Time Quiz Engine",
      tech: ["Next.js", "TypeScript", "Spring Boot", "PostgreSQL", "Redis", "Apache Kafka", "Clerk", "React Query", "Resilience4j", "Tailwind CSS"],
      description: "Built a scalable real-time quiz platform supporting competitive multiplayer assessments with event-driven architecture and enterprise-grade reliability. Engineered real-time leaderboards using Redis and Apache Kafka, enabling low-latency score synchronization for concurrent quiz sessions.",
      github: "https://github.com/GauravSingh094",
      live: "https://mindrift-quizz.vercel.app/",
      challenges: "Handling high-frequency concurrent score synchronization and maintaining sub-10ms latency loops.",
      architecture: "Spring Boot event stream controllers, PostgreSQL persistence layers, Resilience4j circuit breakers and retries, Redis cache states, Next.js frontend with Clerk auth."
    },
    {
      id: "kingsukh_guest_house",
      name: "King Sukh Guest House Website",
      tagline: "Commercial Hospitality Business Portal",
      tech: ["React.js", "TypeScript", "Tailwind CSS", "EmailJS", "Vercel", "Git", "GitHub"],
      description: "Delivered a client-facing hospitality platform featuring WhatsApp booking workflows, Google Maps integration, and mobile-first responsive design. Managed end-to-end deployment and version control workflows using Vercel, Git, and GitHub.",
      github: "https://github.com/GauravSingh094/kingsukh-guesthouse-website",
      live: "https://kingsukh-guesthouse-website.vercel.app/",
      challenges: "Optimizing Largest Contentful Paint (LCP) speeds and custom WhatsApp booking integrations.",
      architecture: "React.js frontend pages, tailwind utilities, and automated EmailJS contact triggers."
    }
  ],
  experience: [
    {
      role: "Web Developer Intern",
      company: "InnoByte Services Pvt. Ltd.",
      duration: "Jul 2025 – Aug 2025",
      type: "Remote",
      details: "Developed and deployed responsive web applications using React.js, TypeScript, and Tailwind CSS, delivering production-ready user experiences across desktop and mobile platforms. Engineered reusable UI components and integrated REST APIs, improving code maintainability. Delivered the King Sukh Guest House Website."
    }
  ],
  education: {
    degree: "Bachelor of Technology (B.Tech) in Computer Science and Engineering",
    institution: "NITRA Technical Campus, Ghaziabad (Affiliated with AKTU)",
    duration: "2022 – 2026",
    location: "Ghaziabad, Uttar Pradesh, India"
  },
  certifications: [
    { title: "Google Professional Cloud Developer: Google Cloud Compute Services", authority: "Infosys", status: "Completed" },
    { title: "Python Web Development", authority: "Anudip Foundation", status: "Completed" },
    { title: "Project Engineer – 5G Network", authority: "Ericsson", status: "Completed" }
  ],
  researchPaper: {
    title: "NyayMitra: A Proposed GraphRAG Architecture for IPC-BNS Transition",
    presentation: "Presented at National Level Conference, HRIT University, Apr 2026",
    details: [
      "Designed a hybrid GraphRAG architecture using Neo4j Knowledge Graphs and Legal-BERT embeddings to address statutory concept drift in IPC-to-BNS legal transition analysis.",
      "Engineered a semantic retrieval pipeline achieving sub-50ms multi-hop query latency while improving contextual relevance across interconnected legal provisions.",
      "Developed a deterministic verification framework with hallucination-free validation and a PageRank-based ranking algorithm for prioritizing landmark judicial precedents."
    ],
    link: "https://drive.google.com/file/d/1pjDSjjGYBP6ypI2n3-nnm3xEnQxiZxv_/view"
  }
};
