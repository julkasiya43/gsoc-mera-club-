import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { RevealOnScroll } from './components/RevealOnScroll';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { PageLoader } from './components/PageLoader/PageLoader';
import { CursorGlow } from './components/CursorGlow/CursorGlow';
import { ScrollProgress } from './components/ScrollProgress/ScrollProgress';
import { CommandPalette } from './components/CommandPalette/CommandPalette';
import { ModalProvider } from './context/ModalContext';
import { ThemeProvider } from './context/ThemeContext';
import { useModal } from './context/useModal';
import './App.css';

const HomePage = lazy(() => import('./pages/HomePage').then((module) => ({ default: module.HomePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((module) => ({ default: module.AboutPage })));
const TeamPage = lazy(() => import('./pages/TeamPage').then((module) => ({ default: module.TeamPage })));
const EventsPage = lazy(() => import('./pages/EventsPage').then((module) => ({ default: module.EventsPage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then((module) => ({ default: module.ProjectsPage })));
const OpenSourcePage = lazy(() => import('./pages/openSourcePage'));

function AppMain() {
  const { isCommandPaletteOpen, closeCommandPalette } = useModal();

  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <ScrollProgress />
        <CursorGlow />
        <ScrollToTop />
        <RevealOnScroll />
        <Header />
        <div className="route-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/opensource" element={<OpenSourcePage />} />
          </Routes>
        </div>
        <Footer />
        <CommandPalette isOpen={isCommandPaletteOpen} onClose={closeCommandPalette} />
      </Suspense>
    </BrowserRouter>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ModalProvider>
        <AppMain />
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;