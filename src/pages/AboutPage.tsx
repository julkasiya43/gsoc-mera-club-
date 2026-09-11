import React, { useRef, useState } from 'react';
import { AimSection } from '../components/AimSection/AimSection';
import { FacultySection } from '../components/FacultySection/FacultySection';
import { CommunitySection } from '../components/CommunitySection/CommunitySection';
import './AboutPage.css';

interface InfoCardData {
    icon: string;
    stat: string;
    label: string;
    description: string;
}

const infoCards: InfoCardData[] = [
    {
        icon: '/Icons/GroupIcon.svg',
        stat: '100+ Members',
        label: 'Active Community',
        description: 'A thriving network of motivated student developers, designers, and open-source contributors.'
    },
    {
        icon: '/Icons/Calender.svg',
        stat: '4+ Major Events',
        label: 'Flagship Initiatives',
        description: 'National hackathons, technical bootcamps, and open-source workshops conducted with high impact.'
    },
    {
        icon: '/Icons/Projects.svg',
        stat: '5+ Projects',
        label: 'Open Source Repos',
        description: 'Collaborative, real-world repositories built and maintained by our passionate club members.'
    }
];

// Interactive Spotlight Card Component
const SpotlightCard = ({ card }: { card: InfoCardData }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current || isFocused) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setIsFocused(true);
        setOpacity(1);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="spotlight-card"
        >
            {/* Outer border spotlight glow */}
            <div
                className="spotlight-card-border"
                style={{
                    opacity,
                    background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(159, 83, 255, 0.6), transparent 40%)`,
                }}
            />
            {/* Inner background spotlight glow */}
            <div
                className="spotlight-card-glow"
                style={{
                    opacity,
                    background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(159, 83, 255, 0.15), transparent 40%)`,
                }}
            />

            <div className="spotlight-card-content">
                <div className="spotlight-card-icon-wrapper">
                    <img src={card.icon} alt={card.stat} />
                </div>
                <div className="spotlight-card-text">
                    <span className="spotlight-card-stat">{card.stat}</span>
                    <span className="spotlight-card-label">{card.label}</span>
                    <p className="spotlight-card-description">{card.description}</p>
                </div>
            </div>
        </div>
    );
};

export function AboutPage() {
    return (
        <main className="about-page">
            {/* Background gradient overlay */}
            <div className="about-bg-gradient">
                <img src="/Components/Gradient.svg" alt="" aria-hidden="true" />
            </div>

            <div className="about-page-container">
                {/* Page Title */}
                <div className="about-page-header" data-reveal>
                    <div className="about-badge">
                        <span>Empowering Open Source Pioneers</span>
                    </div>
                    <h1 className="about-page-title">
                        About <span className="highlight">Us</span>
                    </h1>
                    <p className="about-page-subtitle">
                        We are a community of passionate builders, innovators, and developers at VIT Bhopal 
                        dedicated to open-source contributions, technical excellence, and Google Summer of Code preparation.
                    </p>
                </div>

                {/* Info Cards Grid */}
                <div className="about-cards-grid">
                    {infoCards.map((card, index) => (
                        <SpotlightCard key={index} card={card} />
                    ))}
                </div>

                {/* Expanded Story/Vision Section */}
                <div className="about-story-section" data-reveal>
                    <div className="about-story-glow" />
                    <div className="about-story-header">
                        <span className="about-story-tag">Our Philosophy</span>
                        <h2 className="about-story-title">Fueling Innovation Through <span className="highlight">Open Source</span></h2>
                    </div>
                    <p className="about-story-text">
                        The GSoC Innovators Club was founded with a singular conviction: real engineering skills are honed by building in public, collaborating on production codebases, and contributing to global open-source ecosystems. We guide students step-by-step from their first git commit to crafting winning proposals for prestigious programs like Google Summer of Code (GSoC), LFX Mentorship, and MLH Fellowship.
                    </p>
                </div>
            </div>

            {/* Core sections */}
            <AimSection />
            <FacultySection />
            <CommunitySection />
        </main>
    );
}