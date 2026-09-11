import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/useModal';
import { CodeLab } from './CodeLab';
import './HeroSection.css';

export function HeroSection() {
    const { openFollowModal } = useModal();
    const navigate = useNavigate();

    return (
        <section className="hero-section">
            {/* Background Ambient Beams */}
            <div className="hero-aurora-glow glow-left" />
            <div className="hero-aurora-glow glow-right" />
            <div className="hero-grid-pattern" />

            <div className="hero-container">
                {/* Left Column: Narrative & Action */}
                <div className="hero-text-col" data-reveal>
                    {/* Live Status Badge */}
                    <div className="hero-status-badge">
                        <span className="pulsing-badge-dot" />
                        <span className="badge-text">GSoC Innovators Club • VIT Bhopal</span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="hero-headline">
                        Where <span className="highlight-gradient">Open-Source</span> <br />
                        Excellence Begins.
                    </h1>

                    {/* Subtitle */}
                    <p className="hero-subtext">
                        We are a student-led collective building real software in public, guiding developers through Google Summer of Code (GSoC), and hosting national hackathons.
                    </p>

                    {/* Metrics Quick Strip */}
                    <div className="hero-metrics-strip">
                        <div className="metric-unit">
                            <span className="metric-val">100+</span>
                            <span className="metric-label">Active Members</span>
                        </div>
                        <div className="metric-divider" />
                        <div className="metric-unit">
                            <span className="metric-val">4+</span>
                            <span className="metric-label">Major Events</span>
                        </div>
                        <div className="metric-divider" />
                        <div className="metric-unit">
                            <span className="metric-val">5+</span>
                            <span className="metric-label">Public Repos</span>
                        </div>
                    </div>

                    {/* Call to Actions */}
                    <div className="hero-cta-group">
                        <button 
                            className="btn btn-primary hero-btn-primary"
                            onClick={openFollowModal}
                        >
                            <span>Join Community</span>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                        <button
                            className="btn btn-secondary hero-btn-secondary"
                            onClick={() => navigate('/events', { viewTransition: true })}
                        >
                            View Past Events
                        </button>
                    </div>
                </div>

                {/* Right Column: Interactive Code Lab */}
                <div className="hero-code-col" data-reveal>
                    <CodeLab />
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
