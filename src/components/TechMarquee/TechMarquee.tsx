import React from 'react';
import './TechMarquee.css';

const techItems = [
    { name: 'Google Summer of Code', tag: 'Program', icon: '/Icons/GSOC-Icon.svg' },
    { name: 'Git & GitHub', tag: 'VCS', icon: '/Icons/Github.svg' },
    { name: 'Linux Foundation', tag: 'Ecosystem', icon: '/Icons/Projects.svg' },
    { name: 'CNCF & Cloud', tag: 'Infra', icon: '/Icons/GroupIcon.svg' },
    { name: 'Python', tag: 'Language', icon: '/Icons/Event-TickMark.svg' },
    { name: 'Rust', tag: 'Systems', icon: '/Icons/Event-TickMark.svg' },
    { name: 'TypeScript', tag: 'Web', icon: '/Icons/Event-TickMark.svg' },
    { name: 'Docker & K8s', tag: 'DevOps', icon: '/Icons/Projects.svg' },
    { name: 'LFX Mentorship', tag: 'Program', icon: '/Icons/GSOC-Icon.svg' },
    { name: 'MLH Fellowship', tag: 'Fellowship', icon: '/Icons/GroupIcon.svg' },
];

export const TechMarquee: React.FC = () => {
    return (
        <section className="tech-marquee-section">
            <div className="tech-marquee-header">
                <span className="marquee-pretitle">Technologies & Open-Source Ecosystem</span>
            </div>
            
            <div className="marquee-container">
                <div className="marquee-track">
                    {[...techItems, ...techItems].map((item, index) => (
                        <div key={`${item.name}-${index}`} className="marquee-chip">
                            <div className="marquee-chip-icon">
                                <img src={item.icon} alt="" />
                            </div>
                            <span className="marquee-chip-name">{item.name}</span>
                            <span className="marquee-chip-tag">{item.tag}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechMarquee;
