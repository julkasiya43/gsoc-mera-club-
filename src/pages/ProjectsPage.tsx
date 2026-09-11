import React, { useRef, useState } from 'react';
import './ProjectsPage.css';

interface ProjectData {
    id: string;
    name: string;
    description: string;
    techStack: string[];
    languages: { name: string; percentage: number; color: string }[];
    stars: number;
    forks: number;
    openIssues: number;
    githubLink: string;
    cloneUrl: string;
    sparkline: number[];
    imageUrl?: string;
}

const projects: ProjectData[] = [
    {
        id: 'talk-space',
        name: "Talk Space",
        description: "A decentralized peer-to-peer video calling and matchmaking application built with Go, TypeScript, and Kotlin. Features sub-50ms WebRTC connections, end-to-end streaming, and privacy-first routing.",
        techStack: ["Go", "Kotlin", "TypeScript", "WebRTC", "Docker"],
        languages: [
            { name: "Go", percentage: 52, color: "#00ADD8" },
            { name: "TypeScript", percentage: 31, color: "#3178C6" },
            { name: "Kotlin", percentage: 17, color: "#A97BFF" }
        ],
        stars: 38,
        forks: 14,
        openIssues: 5,
        githubLink: "https://github.com/GSOC-Innovators-Club/Talk-Space",
        cloneUrl: "git clone https://github.com/GSOC-Innovators-Club/Talk-Space.git",
        sparkline: [20, 35, 45, 30, 60, 85, 70, 95, 110, 130],
        imageUrl: "/Pictures/talkspace.png"
    },
    {
        id: 'gsoc-portal',
        name: "GSoC Innovators Official Web Ecosystem",
        description: "High-performance community web portal designed for open-source project showcasing, event registrations, and tenure governance. Built on Vite, React, and glassmorphic micro-interaction architecture.",
        techStack: ["TypeScript", "React", "Vite", "CSS3"],
        languages: [
            { name: "TypeScript", percentage: 64, color: "#3178C6" },
            { name: "CSS", percentage: 32, color: "#563d7c" },
            { name: "HTML", percentage: 4, color: "#e34c26" }
        ],
        stars: 45,
        forks: 19,
        openIssues: 3,
        githubLink: "https://github.com/GSOC-Innovators-Club/GSoC-Innovators-Club-New-Official-Website",
        cloneUrl: "git clone https://github.com/GSOC-Innovators-Club/GSoC-Innovators-Club-New-Official-Website.git",
        sparkline: [15, 25, 40, 55, 70, 90, 85, 115, 140, 160],
        imageUrl: "/Pictures/gsoc_bg.jpg"
    },
    {
        id: 'opensource-handbook',
        name: "GSoC & Open Source Blueprint",
        description: "Comprehensive student guide, proposal templates, organization evaluation criteria, and curated issue tracker designed to fast-track candidates into Google Summer of Code and premier open source cohorts.",
        techStack: ["Markdown", "Shell", "Python", "Automation"],
        languages: [
            { name: "Markdown", percentage: 78, color: "#083fa1" },
            { name: "Python", percentage: 14, color: "#3572A5" },
            { name: "Shell", percentage: 8, color: "#89e051" }
        ],
        stars: 52,
        forks: 22,
        openIssues: 2,
        githubLink: "https://github.com/GSOC-Innovators-Club",
        cloneUrl: "git clone https://github.com/GSOC-Innovators-Club/GSoC-Blueprint.git",
        sparkline: [30, 45, 40, 60, 75, 95, 110, 125, 145, 170]
    }
];

const ProjectSparkline = ({ data }: { data: number[] }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const width = 120;
    const height = 32;

    const points = data.map((val, idx) => {
        const x = (idx / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * (height - 6) - 3;
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg className="repo-sparkline-svg" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            <polyline
                fill="none"
                stroke="url(#sparklineGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
            />
            <defs>
                <linearGradient id="sparklineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00d2ff" />
                    <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
            </defs>
        </svg>
    );
};

const ProjectSpotlightCard = ({ project }: { project: ProjectData }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);
    const [copied, setCopied] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current || isFocused) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleCopyClone = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(project.cloneUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={() => { setIsFocused(true); setOpacity(1); }}
            onBlur={() => { setIsFocused(false); setOpacity(0); }}
            onMouseEnter={() => setOpacity(1)}
            onMouseLeave={() => setOpacity(0)}
            className="project-spotlight-card"
            data-reveal
        >
            {/* Outer border spotlight glow */}
            <div
                className="project-spotlight-card-border"
                style={{
                    opacity,
                    background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(168, 85, 247, 0.6), transparent 40%)`,
                }}
            />
            {/* Inner background spotlight glow */}
            <div
                className="project-spotlight-card-glow"
                style={{
                    opacity,
                    background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(168, 85, 247, 0.12), transparent 40%)`,
                }}
            />

            {/* Project Image Header */}
            {project.imageUrl && (
                <div className="project-image-wrapper">
                    <img src={project.imageUrl} alt={project.name} loading="lazy" decoding="async" />
                    <div className="project-image-gradient" />
                </div>
            )}

            <div className="project-spotlight-card-content">
                {/* Header Row: Title & Stats Sparkline */}
                <div className="project-card-header-row">
                    <div>
                        <span className="project-repo-badge">✦ Open Source Repo</span>
                        <h3 className="project-card-title">{project.name}</h3>
                    </div>
                    <div className="project-sparkline-wrap" title="Commit Activity Pulse">
                        <span className="sparkline-label">Activity</span>
                        <ProjectSparkline data={project.sparkline} />
                    </div>
                </div>

                <p className="project-card-desc">{project.description}</p>
                
                {/* Language Breakdown Bar */}
                <div className="project-lang-bar-wrap">
                    <div className="project-lang-bar">
                        {project.languages.map((lang) => (
                            <div
                                key={lang.name}
                                className="project-lang-segment"
                                style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                                title={`${lang.name} ${lang.percentage}%`}
                            />
                        ))}
                    </div>
                    <div className="project-lang-legend">
                        {project.languages.map((lang) => (
                            <span key={lang.name} className="project-lang-item">
                                <span className="project-lang-dot" style={{ backgroundColor: lang.color }} />
                                {lang.name} <span className="lang-percent">{lang.percentage}%</span>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="project-card-tags">
                    {project.techStack.map((tech, index) => (
                        <span key={index} className="project-tag">{tech}</span>
                    ))}
                </div>

                {/* Clone Command Box */}
                <div className="project-clone-box">
                    <span className="clone-prompt">$</span>
                    <span className="clone-cmd">{project.cloneUrl}</span>
                    <button
                        className={`clone-copy-btn ${copied ? 'copied' : ''}`}
                        onClick={handleCopyClone}
                        aria-label="Copy clone command"
                    >
                        {copied ? '✓ Copied' : 'Copy'}
                    </button>
                </div>

                {/* GitHub & Metrics Row */}
                <div className="project-card-footer">
                    <div className="project-metrics">
                        <span className="metric-pill">⭐ {project.stars}</span>
                        <span className="metric-pill">🍴 {project.forks}</span>
                        <span className="metric-pill">🐛 {project.openIssues} issues</span>
                    </div>

                    <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                    >
                        <img src="/Icons/Github.svg" alt="" className="project-link-icon" />
                        Explore Repo ↗
                    </a>
                </div>
            </div>
        </div>
    );
};

export function ProjectsPage() {
    return (
        <main className="projects-page">
            {/* Background gradient overlay */}
            <div className="projects-bg-gradient">
                <img src="/Components/Gradient.svg" alt="" aria-hidden="true" />
            </div>

            <div className="projects-page-container">
                {/* Page Title */}
                <div className="projects-page-header" data-reveal>
                    <div className="projects-badge">
                        <span>✦ Engineering & Open Source</span>
                    </div>
                    <h1 className="projects-page-title">
                        Featured <span className="highlight">Projects</span>
                    </h1>
                    <p className="projects-page-subtitle">
                        Discover open-source applications, development blueprints, and tooling maintained by GSoC Innovators Club.
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="projects-grid">
                    {projects.map((project) => (
                        <ProjectSpotlightCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </main>
    );
}

export default ProjectsPage;