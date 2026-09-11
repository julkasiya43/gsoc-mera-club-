import { HeroSection } from '../components/HeroSection/HeroSection';
import { TechMarquee } from '../components/TechMarquee/TechMarquee';
import { AimSection } from '../components/AimSection/AimSection';
import { EventsSection } from '../components/EventsSection/EventsSection';
import { TerminalCTA } from '../components/TerminalCTA/TerminalCTA';
import { FacultySection } from '../components/FacultySection/FacultySection';
import { CommunitySection } from '../components/CommunitySection/CommunitySection';

export function HomePage() {
    return (
        <main className="homepage-main">
            <HeroSection />
            <TechMarquee />
            <AimSection />
            <EventsSection />
            <TerminalCTA />
            <FacultySection />
            <CommunitySection />
        </main>
    );
}

export default HomePage;