import { useState, useMemo, useCallback } from 'react';
import { TeamMemberCard } from '../components/TeamMemberCard/TeamMemberCard';
import { RubiksCube } from '../components/RubiksCube/RubiksCube';
import teamData from '../data/team.json';
import './TeamPage.css';

type SocialPlatform = 'github' | 'linkedin' | 'instagram' | 'x';

interface SocialLink {
    platform: SocialPlatform;
    url: string;
}

interface RawMember {
    name: string;
    role: string;
    image: string;
    socials: SocialLink[];
}

interface RawDepartment {
    title: string;
    members: RawMember[];
}

interface RawTenure {
    id: string;
    name: string;
    badge: string;
    subtitle: string;
    departments: RawDepartment[];
}

interface ProcessedMember {
    id: string;
    name: string;
    role: string;
    image: string;
    department: string;
    tenure: string;
    tenureId: string;
    socials: SocialLink[];
}

interface ProcessedSection {
    id: string;
    title: string;
    badge: string;
    subtitle: string;
    members: ProcessedMember[];
}

// Parse team data into 3 distinct tenure sections with flattened members (no sub-team division)
const buildTenureSections = (): ProcessedSection[] => {
    const rawTenures = teamData.tenures as RawTenure[];

    return rawTenures.map((tenure) => {
        const flattenedMembers: ProcessedMember[] = [];
        const seenNames = new Set<string>();

        tenure.departments.forEach((dept) => {
            dept.members.forEach((m) => {
                const key = `${m.name.trim().toLowerCase()}-${dept.title}`;
                if (!seenNames.has(key)) {
                    seenNames.add(key);
                    flattenedMembers.push({
                        id: `${tenure.id}-${dept.title}-${m.name}`,
                        name: m.name,
                        role: m.role,
                        image: m.image || '/Icons/UserPIC.svg',
                        department: dept.title,
                        tenure: tenure.name,
                        tenureId: tenure.id,
                        socials: m.socials || []
                    });
                }
            });
        });

        return {
            id: tenure.id,
            title: tenure.name,
            badge: tenure.badge,
            subtitle: tenure.subtitle,
            members: flattenedMembers
        };
    });
};

const tenureSectionsData = buildTenureSections();

const filterOptions = [
    { id: 'all', label: 'All Innovators' },
    { id: '2026-27', label: '2026-27 Present Members' },
    { id: '2025-26', label: '2025-26 Leadership' },
    { id: 'founding-members', label: 'Founders' }
];

export function TeamPage() {
    const [selectedTenureFilter, setSelectedTenureFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isShuffling, setIsShuffling] = useState<boolean>(false);

    // Trigger Rubik's twist animation on all cards
    const handleTwistRubiks = useCallback(() => {
        setIsShuffling(true);
        setTimeout(() => {
            setIsShuffling(false);
        }, 950);
    }, []);

    const handleFilterChange = (filterId: string) => {
        setSelectedTenureFilter(filterId);
        handleTwistRubiks();
    };

    // Filter members within each tenure section
    const displayedSections = useMemo(() => {
        return tenureSectionsData
            .filter((section) => {
                if (selectedTenureFilter === 'all') return true;
                return section.id === selectedTenureFilter;
            })
            .map((section) => {
                if (!searchQuery.trim()) return section;
                const filteredMembers = section.members.filter((m) =>
                    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    m.department.toLowerCase().includes(searchQuery.toLowerCase())
                );
                return {
                    ...section,
                    members: filteredMembers
                };
            })
            .filter((section) => section.members.length > 0);
    }, [selectedTenureFilter, searchQuery]);

    const totalDisplayedMembers = useMemo(() => {
        return displayedSections.reduce((acc, s) => acc + s.members.length, 0);
    }, [displayedSections]);

    return (
        <main className="team-page">
            {/* Background ambient lighting */}
            <div className="team-bg-gradient">
                <img src="/Components/Gradient.svg" alt="" aria-hidden="true" />
            </div>

            <div className="team-container">
                {/* Page Header */}
                <div className="team-header" data-reveal>
                    <div className="team-badge">
                        <span>✦ GSoC Innovators Directory</span>
                    </div>

                    <h1 className="team-title">
                        Our <span className="highlight">Team</span>
                    </h1>

                    <p className="team-subtitle">
                        Explore the present members, past leadership council, and founding pioneers driving our open-source movement.
                    </p>

                    {/* Rubik's Interactive Widget & CTA */}
                    <div className="rubiks-action-bar">
                        <RubiksCube onClick={handleTwistRubiks} isTwisting={isShuffling} />
                        <span className="rubiks-hint-text">Interactive 3D Grid • Click cards to flip</span>
                    </div>
                </div>

                {/* Filter Tabs & Search Bar */}
                <div className="team-control-card" data-reveal>
                    <div className="team-stats-box">
                        <span className="team-stats-count">{totalDisplayedMembers}</span>
                        <span className="team-stats-label">
                            {selectedTenureFilter === 'all' ? 'Total Innovators' : 'Filtered Members'}
                        </span>
                    </div>

                    {/* Live Search Input */}
                    <div className="team-search-wrap">
                        <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search by name, role, or domain..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="team-search-input"
                        />
                        {searchQuery && (
                            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>×</button>
                        )}
                    </div>
                </div>

                {/* Tenure Quick Filter Tabs */}
                <div className="category-filter-scroll" data-reveal>
                    <div className="category-filter-pills">
                        {filterOptions.map((opt) => (
                            <button
                                key={opt.id}
                                className={`category-pill ${selectedTenureFilter === opt.id ? 'active' : ''}`}
                                onClick={() => handleFilterChange(opt.id)}
                            >
                                <span className="category-pill-facet-dot" />
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 3 Ordered Sections: 2026-27 -> 2025-26 -> Founding Members */}
                <div className="tenure-sections-container">
                    {displayedSections.length === 0 ? (
                        <div className="no-members-state">
                            <div className="no-members-icon">🔍</div>
                            <h3>No Innovators Found</h3>
                            <p>We couldn't find any members matching "{searchQuery}".</p>
                            <button
                                className="btn btn-secondary"
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedTenureFilter('all');
                                    handleTwistRubiks();
                                }}
                            >
                                Reset Filters
                            </button>
                        </div>
                    ) : (
                        displayedSections.map((section) => (
                            <section
                                key={section.id}
                                className={`tenure-block-section tenure-${section.id}`}
                            >
                                {/* Section Header */}
                                <div className="tenure-block-header" data-reveal>
                                    <div className="tenure-block-header-left">
                                        <div className="tenure-title-row">
                                            <h2 className="tenure-block-title">{section.title}</h2>
                                            <span className="tenure-block-badge">{section.badge}</span>
                                            <span className="tenure-block-count">({section.members.length} Members)</span>
                                        </div>
                                        <p className="tenure-block-subtitle">{section.subtitle}</p>
                                    </div>
                                </div>

                                {/* All members under this tenure in ONE single Rubik's grid (no sub-team division) */}
                                <div className="unified-rubiks-grid">
                                    {section.members.map((member, index) => (
                                        <TeamMemberCard
                                            key={member.id}
                                            name={member.name}
                                            role={member.role}
                                            image={member.image}
                                            department={member.department}
                                            tenure={member.tenure}
                                            socials={member.socials}
                                            colorIndex={index}
                                            isShuffling={isShuffling}
                                            animationDelay={`${(index % 8) * 0.05}s`}
                                        />
                                    ))}
                                </div>
                            </section>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}

export default TeamPage;

