<div align="center">

<h1>
GSoC Innovators Club Website
</h1>

![React 18](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)

Official website of the **GSoC Innovators Club**, VIT Bhopal University.

**Live Website:** **https://gsoc-innovators-club-vitb.vercel.app/**

</div>

---

## About

The **GSoC Innovators Club** is a student-driven technical community at **VIT Bhopal University** dedicated to fostering innovation, open-source development, hackathons, competitive programming, and collaborative learning.

This repository contains the source code for the club's official website, designed to showcase:

- Club information
- Team members
- Projects
- Events
- Sponsors
- Open Source initiatives
- Contact information

---

## Features

- Responsive design
- Modern user interface
- Team showcase
- Projects section
- Events section
- Sponsors section
- Open Source page
- Smooth scroll animations
- Mobile navigation
- Optimized performance

---

## Tech Stack

| Category   | Technology |
|------------|------------|
| Frontend   | React      |
| Language   | TypeScript |
| Build Tool | Vite       |
| Styling    | CSS        |
| Deployment | Vercel     |

---

## Project Structure

```text
.
├── public/
├── src/
│   ├── components/
│   │   ├── AimSection/
│   │   ├── CommunitySection/
│   │   ├── EventsSection/
│   │   ├── FacultySection/
│   │   ├── FollowUsModal/
│   │   ├── Footer/
│   │   ├── Header/
│   │   ├── HeroSection/
│   │   ├── MobileMenu/
│   │   ├── OpenSourceEvents/
│   │   ├── PageLoader/
│   │   ├── SponsorsSection/
│   │   ├── TeamMemberCard/
│   │   ├── RevealOnScroll.tsx
│   │   └── ScrollToTop.tsx
│   │
│   ├── context/
│   │   ├── modal-context.ts
│   │   ├── ModalContext.tsx
│   │   └── useModal.ts
│   │
│   ├── data/
│   │
│   ├── pages/
│   │   ├── AboutPage.tsx
│   │   ├── AboutPage.css
│   │   ├── EventsPage.tsx
│   │   ├── EventsPage.css
│   │   ├── HomePage.tsx
│   │   ├── openSourcePage.tsx
│   │   ├── openSourcePage.css
│   │   ├── ProjectsPage.tsx
│   │   ├── ProjectsPage.css
│   │   ├── TeamPage.tsx
│   │   └── TeamPage.css
│   │
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/GSOC-Innovators-Club/GSoC-Innovators-Club-26.git
```

### Navigate to the project

```bash
cd GSoC-Innovators-Club-26
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## Build for Production

```bash
npm run build
```

---

## Preview Production Build

```bash
npm run preview
```

---

## Contributing

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature/your-feature
```

3. Commit your changes.

```bash
git commit -m "Add your feature"
```

4. Push to your branch.

```bash
git push origin feature/your-feature
```

5. Open a Pull Request.

---

## Contact

For suggestions or contributions, feel free to open an issue or submit a pull request.

---

## License

This project is licensed under the [MIT License](https://github.com/GSOC-Innovators-Club/GSoC-Innovators-Club-26/tree/dev?tab=MIT-1-ov-file) unless stated otherwise.