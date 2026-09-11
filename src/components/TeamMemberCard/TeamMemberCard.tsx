import React, { useState } from 'react';
import './TeamMemberCard.css';

type SocialPlatform = 'github' | 'linkedin' | 'instagram' | 'x';

interface SocialLink {
    platform: SocialPlatform;
    url: string;
}

interface TeamMemberCardProps {
    name: string;
    role: string;
    image?: string;
    department?: string;
    tenure?: string;
    socials?: SocialLink[];
    colorIndex?: number;
    isShuffling?: boolean;
    animationDelay?: string;
}

const socialIcons: Record<string, string> = {
    github: '/Icons/Github.svg',
    linkedin: '/Icons/LinkedIn_Logo.svg',
    instagram: '/Icons/Instagram_Logo.svg',
    x: '/Icons/X_Logo.svg'
};

// 6 Classic vibrant Rubik's facet accent colors
const rubiksColors = [
    { name: 'cyan', glow: 'rgba(0, 210, 255, 0.45)', border: '#00d2ff', text: '#38bdf8' },
    { name: 'violet', glow: 'rgba(168, 85, 247, 0.45)', border: '#a855f7', text: '#c084fc' },
    { name: 'emerald', glow: 'rgba(16, 185, 129, 0.45)', border: '#10b981', text: '#34d399' },
    { name: 'amber', glow: 'rgba(245, 158, 11, 0.45)', border: '#f59e0b', text: '#fbbf24' },
    { name: 'ruby', glow: 'rgba(236, 72, 153, 0.45)', border: '#ec4899', text: '#f472b6' },
    { name: 'indigo', glow: 'rgba(99, 102, 241, 0.45)', border: '#6366f1', text: '#818cf8' }
];

export function TeamMemberCard({
    name,
    role,
    image = '/Icons/UserPIC.svg',
    department,
    tenure,
    socials = [],
    colorIndex = 0,
    isShuffling = false,
    animationDelay = '0s'
}: TeamMemberCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [imgError, setImgError] = useState(false);
    const color = rubiksColors[colorIndex % rubiksColors.length];

    const handleFlip = () => {
        setIsFlipped((prev) => !prev);
    };

    const getInitials = (fullName: string) => {
        const parts = fullName.trim().split(/\s+/);
        if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

    const hasCustomImage = image && image !== '/Icons/UserPIC.svg' && !imgError;

    return (
        <div
            className={`rubiks-card-wrapper ${isShuffling ? 'rubiks-shuffling' : ''}`}
            style={{ animationDelay }}
            onClick={handleFlip}
        >
            <div className={`rubiks-card-inner ${isFlipped ? 'flipped' : ''}`}>
                {/* ===== FRONT FACE (ONLY PHOTO & NAME) ===== */}
                <div
                    className="rubiks-card-face rubiks-card-front"
                    style={{
                        '--facet-color': color.border,
                        '--facet-glow': color.glow,
                        '--facet-text': color.text
                    } as React.CSSProperties}
                >
                    {/* Rubik's corner facet accents */}
                    <div className="rubiks-facet-corner top-left" />
                    <div className="rubiks-facet-corner top-right" />
                    <div className="rubiks-facet-corner bottom-left" />
                    <div className="rubiks-facet-corner bottom-right" />

                    {/* Member photo / monogram with 3D bezel */}
                    <div className="rubiks-avatar-frame front-avatar-large">
                        {hasCustomImage ? (
                            <img
                                src={image}
                                alt={name}
                                loading="lazy"
                                onError={() => setImgError(true)}
                            />
                        ) : (
                            <div className="rubiks-initials-fallback">
                                <span>{getInitials(name)}</span>
                            </div>
                        )}
                        <span className="rubiks-avatar-glow" />
                    </div>

                    {/* Member Name ONLY on Front */}
                    <div className="rubiks-info-block front-only-name">
                        <h3 className="rubiks-name">{name}</h3>
                    </div>

                    {/* Subtle Flip Hint */}
                    <div className="rubiks-flip-hint">
                        <span>↻ Click to twist</span>
                    </div>
                </div>

                {/* ===== BACK FACE (ALL DETAILS & SOCIALS) ===== */}
                <div
                    className="rubiks-card-face rubiks-card-back"
                    style={{
                        '--facet-color': color.border,
                        '--facet-glow': color.glow,
                        '--facet-text': color.text
                    } as React.CSSProperties}
                >
                    <div className="rubiks-facet-grid-bg" />

                    {/* Back header */}
                    <div className="rubiks-back-header">
                        <span className="rubiks-cube-mini-icon">⚄</span>
                        <h4 className="rubiks-back-name">{name}</h4>
                        <span className="rubiks-back-tenure">{tenure || 'GSoC Innovator'}</span>
                    </div>

                    {/* Back Details Body */}
                    <div className="rubiks-back-body">
                        <div className="rubiks-stat-row">
                            <span className="rubiks-stat-label">Role</span>
                            <span className="rubiks-stat-value role-highlight">{role}</span>
                        </div>
                        {department && (
                            <div className="rubiks-stat-row">
                                <span className="rubiks-stat-label">Domain</span>
                                <span className="rubiks-stat-value">{department}</span>
                            </div>
                        )}
                    </div>

                    {/* Socials on back */}
                    <div className="rubiks-back-socials" onClick={(e) => e.stopPropagation()}>
                        {socials.length > 0 ? (
                            socials.map((social) => (
                                <a
                                    key={social.platform}
                                    href={social.url}
                                    className="rubiks-social-btn"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.platform}
                                >
                                    <img src={socialIcons[social.platform]} alt={social.platform} />
                                </a>
                            ))
                        ) : (
                            <span className="rubiks-no-socials">✦ Open Source Contributor</span>
                        )}
                    </div>

                    <div className="rubiks-back-footer">
                        <span>↻ Click to return</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamMemberCard;