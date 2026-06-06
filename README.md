# Creative Developer Portfolio — High-End Personal Brand Ecosystem

A state-of-the-art personal developer portfolio website designed as an interactive professional platform. It features immersive scrollytelling, interactive 3D constellation systems, tactile mouse-tracking glass card overlays, an integrated AI Digital Twin, and an interactive developer terminal.

---

## 🌟 Visual Highlights & Interaction Architecture

### 1. Unified 3D Constellation Universe (R3F & Three.js)
* **Stable Geometric Constellations**: Technologies and AI platforms are mapped to beautiful, stationary 3D golden spiral constellation grids layered symmetrically across depth ranges in **Tech Stack** and **Vibe Coding** sections.
* **Spring-Damper Physics Loop**: Deployed a custom high-inertia physical spring return engine inside the React Three Fiber `useFrame` render routine. Nearby spheres calculate cursor coordinates and accelerate away dynamically (magnetic repulsion) on hover.
* **Cinematic Reassembly**: Leaving the section wrapper instantly deactivates repulsion, prompting the spring equations (`stiffness = 0.06`, `damping = 0.82`) to smoothly drift all displaced nodes back to their exact home coordinates without snapping.
* **Monospaced Role Tooltips**: Every sphere features a glassmorphic hover card showing both its brand title and active workflow role.

### 2. Conversational RAG AI Digital Twin
* **Grounded LLM Routing**: Features a full-scale AI Assistant panel integrated with Next.js route handlers and the Google Gemini API (`gemini-2.5-flash`).
* **On-Device Keyword RAG Engine**: Scans user query parameters dynamically and injects corresponding portfolio context structures (Syntax Showdown, NyayMitra, Mindrift, and King Sukh Guest House) to ensure hallucination-free professional answers.
* **Recruiter Action Pathways**: Houses suggested chips providing recruiters with fast answers regarding Gaurav's skills, credentials, certifications, and background.

### 3. Developer CLI Terminal & Command Palette
* **Full-Screen CLI Console (`/terminal`)**: An interactive command-line interface supporting commands like `help`, `about`, `skills`, `projects`, `research`, `resume`, `contact`, and `clear`.
* **Frosted Command Palette (`⌘+K` / `Ctrl+K`)**: Frost-styled global navigation hub enabling instant layout redirections and quick external URL navigation.

### 4. Optimized Resume Experience 2.0
* **Interactive 3D Card**: An interactive 3D tilted card of Gaurav's resume with a responsive custom magnifier glass lens that follows cursor movements.
* **Page 1 / Page 2 Toggle**: Integrated clickable page switching tabs located outside the interaction container to toggle between Page 1 and Page 2 of the resume preview seamlessly.
* **Direct Google Drive Access**: Pinned glass CTA cards configured to open/download the verified resume archive from Google Drive: `https://drive.google.com/file/d/1oF2tNQGojLN20D1zKeOYkf-FdVH9jdox/view?usp=drive_link`.

### 5. Sticky-Stacked Timeline Sections
* **Selected Works Showcase (`#work`)**: A horizontal-stacked scroll storytelling viewport (`min-h-[500vh]`) tracking scroll depths to translate project cards.
* **Academic Timeline (`#education`)**: Re-engineered vertical stacked scroll timeline (`min-h-[300vh]`) that transitions through academic milestones (B.Tech CSE, Intermediate, High School) sequentially with scroll-linked opacity, scale, and translation coordinates.
* **Mobile Fallback**: Renders clean chronological vertical lists on mobile/tablet viewports to ensure high-fidelity reading experiences.

### 6. Research & Publications Showcase
* **Judicial Telemetry Paper**: Houses a dedicated glassmorphic layout detailing *NyayMitra: A Proposed GraphRAG Architecture for IPC-BNS Transition* presented at National Level Conference, HRIT University (Apr 2026).
* Includes a direct call-to-action button linking to the publication file: `https://drive.google.com/file/d/1pjDSjjGYBP6ypI2n3-nnm3xEnQxiZxv_/view`.

---

## 🛠️ Technology Stack

* **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) with Turbopack compilation.
* **Runtime**: [React 19](https://react.dev/)
* **3D Render System**: [Three.js](https://threejs.org/) & [React Three Fiber (R3F)](https://r3f.docs.pmnd.rs/)
* **Helper Utilities**: [@react-three/drei](https://github.com/pmndrs/drei)
* **Animation & Transitions**: [Framer Motion](https://www.framer.com/motion/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS variables
* **Icons**: [Lucide React](https://lucide.dev/)
* **Scroll Engine**: [Lenis Smooth Scroll](https://lenis.darkroom.engineering/)

---

## 📦 Local Setup & Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/GauravSingh094/Gaurav-Portfolio.git
   cd Gaurav-Portfolio
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Local Development Server**:
   ```bash
   npm run dev
   ```
   *The application will boot up at `http://localhost:3000` or `http://localhost:3001`.*

4. **Verify TypeScript & Build**:
   ```bash
   npx tsc --noEmit
   npm run build
   ```

---

## 📁 Project Structure

```text
├── public/                 # Static vector brand icons & assets
│   └── images/             # Static mockups, bot avatars, and page previews
├── src/
│   ├── app/                # Next.js routes, layouts & global config
│   │   ├── api/chat/       # Conversational AI assistant route handler
│   │   ├── terminal/       # CLI developer command terminal page
│   │   ├── log/            # Technical log index page
│   │   ├── globals.css     # Base CSS configuration
│   │   ├── layout.tsx      # Core root layout container
│   │   └── page.tsx        # Main portfolio index page
│   ├── components/         # Premium custom interactive UI components
│   │   ├── AIAssistant.tsx # Floating interactive AI Digital Twin
│   │   ├── CommandPalette.tsx # Frost glass navigation overlay
│   │   ├── CustomCursor.tsx # Cursor spotlight tracking layer
│   │   ├── Loader.tsx      # Gating progress loader page
│   │   ├── ProjectCarousel.tsx # Work slider with stacked translations
│   │   ├── ResearchPaper.tsx # GraphRAG paper details & drive redirection
│   │   ├── ResumeJourney.tsx # Grayscale magnifier card and page toggles
│   │   ├── TechStack.tsx   # 3D interactive tech constellation & stats
│   │   ├── VibeCoding.tsx  # 3D AI-platform constellation & stats
│   │   ├── WhatIDo.tsx     # 3D hover services grid
│   │   └── Contact.tsx     # Footer, 12-hour IST Clock, availability HUD
│   ├── hooks/
│   │   └── useAnalytics.ts # Custom user telemetry hooks
│   └── lib/
│       └── portfolio-context.ts # RAG data catalog store
```
