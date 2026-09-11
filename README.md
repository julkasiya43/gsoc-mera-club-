# 🚀 GSoC Innovators Club — Official Website

Welcome to the official repository of the **Google Summer of Code (GSoC) Innovators Club** at VIT Bhopal University. This website serves as the central hub for student open-source contributors, featuring club events, projects, community resources, and team member directories.

---

## ✨ Features & Visual Highlights

- **🎨 Creative Campus Community Design**: High-contrast editorial typography, crisp modern cards, and ambient glassmorphism.
- **🌗 4 Dynamic Theme Palettes**:
  - **Cyber Neon** (Cyan / Purple / Deep Navy)
  - **Obsidian Emerald** (Terminal Mint / Dark Slate)
  - **Sunset Amber** (Warm Orange / Rose / Midnight Gold)
  - **Midnight Sapphire** (Royal Blue / Electric Indigo)
- **🔍 ⌘K / Ctrl+K Command Palette**: Instant navigation and full-site search for pages, projects, and events.
- **👥 3D Rubik's Cube Team Roster**: Interactive 3D twist-flip cards, tenure filter tabs (2024–25, 2025–26, 2026–27), and real-time member search.
- **📂 Open Source & Projects Showcase**: GitHub repository cards with live language breakdown bars, activity sparklines, and copyable clone commands.
- **📅 Events & Workshops Timeline**: Filterable event listings, countdown timers, and flagship event teaser ribbons.
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile with floating navigation and hamburger menu.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite](https://vite.dev/)
- **Styling**: Vanilla CSS with custom semantic design tokens and CSS variables
- **Icons**: Lucide React + Custom SVG Assets
- **Routing**: Client-side single-page routing

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- `npm` or `pnpm` or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/julkasiya43/gsoc-mera-club-.git
   cd gsoc-mera-club-
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser to view the website.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```
gsoc-frontend/
├── public/                  # Static assets, icons, sponsor logos, member photos
├── src/
│   ├── assets/              # Logos and graphics
│   ├── components/          # Reusable UI components
│   │   ├── AimSection/      # Bento mission & club pillars
│   │   ├── CommandPalette/  # ⌘K quick switcher
│   │   ├── CommunitySection/# Social platform links & metrics
│   │   ├── CursorGlow/      # Interactive cursor spotlight
│   │   ├── EventsSection/   # Homepage event previews
│   │   ├── FacultySection/  # Faculty advisor tilted card
│   │   ├── Footer/          # Campus links & copyright
│   │   ├── Header/          # Floating glass navbar & theme toggle
│   │   ├── HeroSection/     # Hero title, status beacon & metrics
│   │   ├── TeamMemberCard/  # 3D twist-flip member card
│   │   ├── TechMarquee/     # Scrolling tech stack ticker
│   │   ├── TerminalCTA/     # Interactive git clone terminal
│   │   └── ThemeSwitcher/   # Multi-theme dropdown
│   ├── context/             # Theme and Modal React context
│   ├── data/                # Team roster (team.json) & events (events.json)
│   ├── pages/               # Route pages (Home, About, Team, Projects, Events, OpenSource)
│   ├── App.tsx              # Main application router
│   ├── index.css            # Global CSS variables, themes & resets
│   └── main.tsx             # React DOM root entrypoint
├── package.json
└── vite.config.ts
```

---

## 🤝 Community & Connect

- **Website**: [Local Dev / Staging]
- **GitHub**: [julkasiya43/gsoc-mera-club-](https://github.com/julkasiya43/gsoc-mera-club-)
- **Club**: GSoC Innovators Club — VIT Bhopal University

---

© 2026 GSoC Innovators Club. All rights reserved.
