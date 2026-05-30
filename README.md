# Creative Developer Portfolio — High-End 3D Constellation Experience

A state-of-the-art personal developer portfolio website designed with scrollytelling, interactive 3D constellation systems, tactile mouse-tracking glass card overlays, and high-inertia physics simulations.

---

## 🌟 Visual Highlights & Interaction Architecture

### 1. Unified 3D Constellation Universe (R3F & Three.js)
* **Stable Geometric Constellations**: Technologies and AI platforms are mapped to beautiful, stationary 3D golden spiral constellation grids layered symmetrically across depth ranges.
* **Spring-Damper Physics Loop**: Deployed a custom high-inertia physical spring return engine inside the React Three Fiber `useFrame` render routine. Nearby spheres calculate cursor coordinates and accelerate away dynamically (magnetic repulsion) on hover.
* **Cinematic Reassembly**: Leaving the section wrapper instantly deactivates repulsion, prompting the spring equations (`stiffness = 0.06`, `damping = 0.82`) to smoothly drift all displaced nodes back to their exact home coordinates without snapping.
* **Monospaced Role Tooltips**: Every sphere features a glassmorphic hover card showing both its brand title and active workflow role.

### 2. Futuristic Intelligence Statistics Panels
* **Frosted Glassmorphism**: Cards use frosted dark acrylic bases (`bg-[#0c0c11]/85`, `backdrop-blur-xl`, and `border border-white/5`) with custom inner reflections and deep shadows.
* **Dynamic Color-Coded Radial Glows**: Custom spotlights glow behind the glass boundary when hovered (Cyan for Languages, Purple-Cyan for Frameworks, Blue for Databases, Teal/Green for Tools and AI Agents).
* **Animated Icon Cores**: Embeds high-fidelity vector cores rotating organically (nested spinning Code Orbs, floating layered stacks, pulsing server cylinders, spinning crosshair AI assistants, and rotating interlocking gears).
* **Scroll-Triggered Counter**: Statistics animate dynamically from `0` to final values using scroll-triggered `IntersectionObserver` counters.
* **Base Energy Waves & Micro Dust**: Base borders house a continuous glowing horizontal wave, paired with floating micro-particles drifting in the background.

### 3. Tactile Services & Agency Footer Redesign
* **3D Card Hover Tilts**: Service panels tilt up to 12 degrees along relative X and Y mouse axes with custom cursor spotlight highlights.
* **India Standard Time Clock (IST)**: Displays a real-time digital clock (GMT+5:30) with hydration-safe mounts.
* **Emerald Pulse Status Badge**: High-contrast indicator signaling active availability status for internships.
* **CSS Kinetic Link Rollers**: Rolling typography text animations where social and email links slide vertically on hover to reveal duplicate colored assets.

### 4. Gated Loader & Projects Carousel HUD
* **Gated Pacing**: Progress bar completes in ~1.1 seconds. Halts at "Welcome" prompting for manual click, triggering an expanding black circle transition.
* **Work Carousel terminal HUD**: Interactive developer terminal showing secure node containers, live deployment states, and automated key capabilities panels.

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
   git clone https://github.com/GauravSingh094/[repo-name].git
   cd [repo-name]
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Local Development Server**:
   ```bash
   npm run dev
   ```
   *The application will boot up at `http://localhost:3000` (or `http://localhost:3001` if port 3000 is occupied).*

4. **Verify TypeScript & Build**:
   ```bash
   npx tsc --noEmit
   npm run build
   ```

---

## 📁 Project Structure

```text
├── public/                 # Static vector SVG brand assets
├── src/
│   ├── app/                # Main Next.js routes & global styling config
│   │   ├── globals.css     # Tailwind CSS base theme settings
│   │   ├── layout.tsx      # Core root layout container
│   │   └── page.tsx        # Main portfolio scrollytelling index
│   └── components/         # Premium custom interactive components
│       ├── Loader.tsx      # Snappy gating progress page
│       ├── ProjectCarousel.tsx # Work slider with terminal capabilities
│       ├── TechStack.tsx   # 3D interactive tech constellation & stats
│       ├── VibeCoding.tsx  # 3D AI-platform constellation & stats
│       ├── WhatIDo.tsx     # 3D hover services grid
│       ├── Contact.tsx     # Studio footer, IST Clock, and kinetic roller links
│       └── CustomCursor.tsx # Cursor spotlight tracking layer
```
