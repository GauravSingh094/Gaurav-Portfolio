export const portfolioContext = {
  profile: {
    name: "Gaurav Singh",
    title: "Creative Systems & Client Engineer",
    contact: {
      email: "gauravsinghx2510@gmail.com",
      location: "New Delhi, India",
      github: "https://github.com/GauravSingh094",
      linkedin: "https://linkedin.com/in/gaurav-singh-276944292"
    },
    bio: "Final-year Computer Science B.Tech student with hands-on experience in full-stack, backend microservices, and cross-platform mobile development. Specializes in custom WebGL interactive frontends and secure, isolated backend sandboxes."
  },
  skills: [
    { category: "Client Frameworks", tools: ["React.js", "Next.js", "Flutter", "Framer Motion", "Three.js", "Tailwind CSS"] },
    { category: "Backend & Systems", tools: ["Java", "Spring Boot", "Spring Data JPA", "Node.js", "FastAPI", "Docker", "WebSockets"] },
    { category: "Databases & RAG", tools: ["MySQL", "MongoDB", "Redis caching", "ChromaDB vectors"] }
  ],
  projects: [
    {
      id: "ai_debate_arena",
      name: "AI Debate Arena",
      tagline: "Multi-Agent LangGraph Debate Platform",
      tech: ["LangGraph", "FastAPI", "Redis", "ChromaDB", "SSE Streaming"],
      description: "A real-time competitive LLM debate arena where multi-agent state graphs dictate conversation flow, rebuttals, and moderator scoreboards. Implements async token streaming and double-tier context caching.",
      github: "https://github.com/GauravSingh094",
      live: "https://github.com/GauravSingh094",
      challenges: "Handling thread-safe session concurrency and high-frequency context vector retrieval latency under concurrent users.",
      architecture: "LangGraph state flowcharts orchestrating Gemini/Claude, Redis short-term caching, ChromaDB long-term vector embeddings, and FastAPI Server-Sent Events."
    },
    {
      id: "soulsync",
      name: "SoulSync",
      tagline: "On-Device ML Sentiment Recommender",
      tech: ["Flutter", "Dart", "MLKit Face Mesh", "Firebase", "YouTube API"],
      description: "A cross-platform mobile ecosystem utilizing on-device computer vision to perform real-time facial expression analysis, feeding classified sentiment metrics into a custom recommendation algorithm that surfaces contextual audio tracks.",
      github: "https://github.com/GauravSingh094",
      live: "https://github.com/GauravSingh094",
      challenges: "Maintaining a consistent 60fps rendering during computer vision camera tracking on lower-end smartphones.",
      architecture: "BLoC state management, offline MLKit TensorFlow models, and native hardware camera frames pipelines."
    },
    {
      id: "mindrift",
      name: "Mindrift",
      tagline: "High-Concurrency Real-Time Quiz Engine",
      tech: ["React.js", "Node.js", "Socket.io", "MongoDB"],
      description: "A real-time multiplayer quiz engine featuring dynamically synchronized game rooms and instant live leaderboard updates under high-concurrency connection loops.",
      github: "https://github.com/GauravSingh094",
      live: "https://github.com/GauravSingh094",
      challenges: "Sub-10ms state synchronizations and preventing database write locking under bursty socket streams.",
      architecture: "Sub-10ms state reconciliation layers, Firebase JWT socket handshakes, and concurrent MongoDB memory indices."
    },
    {
      id: "kingsukh_guest_house",
      name: "King Sukh Guest House",
      tagline: "Commercial Hospitality Business Portal",
      tech: ["Next.js", "Tailwind CSS", "Framer Motion", "EmailJS"],
      description: "A client-facing local hospitality business platform offering responsive room catalogs, visual high-res galleries, and asynchronous reservation inquiries.",
      github: "https://github.com/GauravSingh094",
      live: "https://github.com/GauravSingh094",
      challenges: "Reaching sub-500ms Largest Contentful Paint (LCP) speeds and localized SEO indexing conversions.",
      architecture: "Next.js App Router, layout Cumulative Layout Shift (CLS) optimizations, and localized semantic HTML5 SEO indices."
    },
    {
      id: "spring_petclinic",
      name: "Spring PetClinic",
      tagline: "Enterprise Database Administration Service",
      tech: ["Spring Boot", "Java", "Spring Data JPA", "MySQL"],
      description: "An enterprise-grade administration portal implementing strict Spring Data JPA lazy fetching, custom query boundaries, and robust microservice transactional scopes.",
      github: "https://github.com/GauravSingh094",
      live: "https://github.com/GauravSingh094",
      challenges: "Hibernate N+1 query execution bottlenecks and connection pool exhaustions under high database volumes.",
      architecture: "Standard MVC layers (Controller-Service-Repository), custom lazy-load boundaries, and connection pooling settings."
    }
  ],
  experience: [
    {
      role: "Web Developer Intern",
      company: "InnoByte Services",
      duration: "2025",
      type: "Remote",
      details: "Collaborated in structured developer squads to ship responsive web modules, refactor legacy layout parameters, and validate cross-device rendering fidelity."
    }
  ],
  education: {
    degree: "B.Tech in Computer Science and Engineering",
    institution: "NITRA Technical Campus (Affiliated with AKTU)",
    duration: "2022 – 2026",
    location: "Ghaziabad, UP, India"
  }
};
