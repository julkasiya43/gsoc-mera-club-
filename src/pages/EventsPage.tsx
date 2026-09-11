import React, { useRef, useState } from 'react';
import eventsData from '../data/events.json';
import { useModal } from '../context/useModal';
import './EventsPage.css';

interface EventData {
    id: string;
    name: string;
    category?: string;
    status?: string;
    date: string;
    venue: string;
    time?: string;
    description: string;
    highlights?: string[];
    posterUrl?: string;
    socialLink?: string;
    registerLink?: string;
}

const upcomingEvents = eventsData.upcomingEvents as EventData[];
const pastEvents = eventsData.pastEvents as EventData[];

const EventSpotlightCard = ({ event, isUpcoming = false }: { event: EventData; isUpcoming?: boolean }) => {
    const divRef = useRef<HTMLElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        if (!divRef.current || isFocused) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <article
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={() => { setIsFocused(true); setOpacity(1); }}
            onBlur={() => { setIsFocused(false); setOpacity(0); }}
            onMouseEnter={() => setOpacity(1)}
            onMouseLeave={() => setOpacity(0)}
            className={`event-spotlight-card ${isUpcoming ? 'event-upcoming-card' : ''}`}
            data-reveal
        >
            {/* Outer border spotlight glow */}
            <div
                className="event-spotlight-border"
                style={{
                    opacity,
                    background: isUpcoming
                        ? `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0, 200, 255, 0.7), transparent 40%)`
                        : `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(159, 83, 255, 0.6), transparent 40%)`,
                }}
            />
            {/* Inner background spotlight glow */}
            <div
                className="event-spotlight-glow"
                style={{
                    opacity,
                    background: isUpcoming
                        ? `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0, 200, 255, 0.18), transparent 40%)`
                        : `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(159, 83, 255, 0.15), transparent 40%)`,
                }}
            />

            <div className="event-card-inner">
                <div className="event-content">
                    {/* Header Badges */}
                    <div className="event-badge-row">
                        <span className={`event-status-tag ${isUpcoming ? 'status-upcoming' : 'status-completed'}`}>
                            <span className="status-dot" />
                            {event.status ?? (isUpcoming ? 'Upcoming' : 'Completed')}
                        </span>
                        {event.category && (
                            <span className="event-category-tag">{event.category}</span>
                        )}
                    </div>

                    {/* Event Details */}
                    <div className="event-texts">
                        <div className="event-header">
                            <h3 className="event-name">{event.name}</h3>
                            <div className="event-meta-grid">
                                <p className="event-meta">
                                    <img src="/Icons/Calender.svg" alt="" className="meta-icon"/> 
                                    <span>{event.date}</span>
                                </p>
                                <p className="event-meta">
                                    <img src="/Icons/Home Icon.svg" alt="" className="meta-icon"/> 
                                    <span>{event.venue}</span>
                                </p>
                                {event.time && (
                                    <p className="event-meta">
                                        <img src="/Icons/Event-TickMark.svg" alt="" className="meta-icon"/> 
                                        <span>{event.time}</span>
                                    </p>
                                )}
                            </div>
                        </div>
                        
                        {event.description && (
                            <p className="event-description">{event.description}</p>
                        )}

                        {event.highlights && event.highlights.length > 0 && (
                            <div className="event-highlights-box">
                                <span className="highlights-title">Key Highlights:</span>
                                <ul className="highlights-list">
                                    {event.highlights.map((item, idx) => (
                                        <li key={idx} className="highlight-item">
                                            <span className="bullet-point">▸</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="event-social-links">
                            {event.registerLink ? (
                                <a
                                    href={event.registerLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="event-link-button event-register-button"
                                >
                                    <span>Register Now</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </a>
                            ) : null}

                            {event.socialLink && (
                                <a
                                    href={event.socialLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`event-link-button ${!event.registerLink ? 'event-primary-action' : 'event-secondary-button'}`}
                                >
                                    <span>{isUpcoming ? 'Event Details' : 'View Post & Gallery'}</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Event Poster */}
                <div className="event-poster-wrapper">
                    {event.posterUrl ? (
                        <img
                            src={event.posterUrl}
                            alt={`${event.name} Poster`}
                            className="event-poster-image"
                            loading="lazy"
                            decoding="async"
                        />
                    ) : (
                        <div className="poster-placeholder">
                            <span>{event.name}</span>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
};

export function EventsPage() {
    const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
    const { openFollowModal } = useModal();

    return (
        <main className="events-page">
            {/* Background gradient overlay */}
            <div className="events-bg-gradient">
                <img src="/Components/Gradient.svg" alt="" aria-hidden="true" />
            </div>

            <div className="events-page-container">
                {/* Page Title */}
                <div className="events-page-header" data-reveal>
                    <div className="events-header-badge">
                        <span>GSoC Innovators Club Events</span>
                    </div>
                    <h1 className="events-page-title">
                        Our <span className="highlight">Events</span>
                    </h1>
                    <p className="events-page-subtitle">
                        From national hackathons and open-source bootcamps to cultural screenings, 
                        explore our landmark events and milestones.
                    </p>

                    {/* Filter Tabs */}
                    <div className="events-filter-bar">
                        <button
                            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            All Events ({upcomingEvents.length + pastEvents.length})
                        </button>
                        <button
                            className={`filter-btn ${filter === 'upcoming' ? 'active' : ''}`}
                            onClick={() => setFilter('upcoming')}
                        >
                            Upcoming ({upcomingEvents.length})
                        </button>
                        <button
                            className={`filter-btn ${filter === 'past' ? 'active' : ''}`}
                            onClick={() => setFilter('past')}
                        >
                            Past Events ({pastEvents.length})
                        </button>
                    </div>
                </div>

                {/* UPCOMING EVENTS SECTION */}
                {(filter === 'all' || filter === 'upcoming') && (
                    <section className="events-section-block upcoming-section" data-reveal>
                        <div className="section-title-wrap">
                            <div className="section-title-badge upcoming-badge">
                                <span className="pulsing-dot" />
                                <span>Upcoming Hackathons</span>
                            </div>
                            <h2 className="events-section-title">
                                Next <span className="highlight-cyan">Hackathon</span>
                            </h2>
                            <p className="events-section-desc">
                                We are currently planning our next flagship hackathon and tech workshops.
                            </p>
                        </div>

                        {upcomingEvents.length > 0 ? (
                            <div className="events-list">
                                {upcomingEvents.map((event) => (
                                    <EventSpotlightCard key={event.id} event={event} isUpcoming={true} />
                                ))}
                            </div>
                        ) : (
                            <div className="no-upcoming-card">
                                {/* Holographic Flagship Teaser Ribbon */}
                                <div className="flagship-teaser-ribbon">
                                    <div className="teaser-pill-badge">
                                        <span className="teaser-sparkle">✨</span>
                                        <span>FLAGSHIP HACKATHON R&D</span>
                                    </div>
                                    <span className="teaser-announcement-tag">Summer Of CodeFest 3.0 & Open Source Sprints</span>
                                </div>

                                <div className="no-upcoming-content">
                                    <div className="no-upcoming-icon-wrap">
                                        <img src="/Icons/Calender.svg" alt="Calendar" />
                                    </div>
                                    <div className="no-upcoming-texts">
                                        <h3 className="no-upcoming-title">Summer Of CodeFest 3.0 is in the Works!</h3>
                                        <p className="no-upcoming-desc">
                                            Our technical and event operations teams are architecting the next flagship multi-track hackathon, GSoC mentorship sprints, and open-source bootcamps. Join our Discord or follow on LinkedIn to receive early-bird access as soon as registrations launch.
                                        </p>
                                    </div>
                                    <div className="no-upcoming-actions">
                                        <button className="btn btn-primary" onClick={openFollowModal}>
                                            🔔 Get Notified First
                                        </button>
                                        <a
                                            href="https://discord.gg/9k5p9U8z"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-secondary"
                                        >
                                            💬 Join Hackathon Discord
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>
                )}

                {/* PAST EVENTS SECTION */}
                {(filter === 'all' || filter === 'past') && (
                    <section className="events-section-block past-section" data-reveal>
                        <div className="section-title-wrap">
                            <div className="section-title-badge past-badge">
                                <span>Archive & Milestones ({pastEvents.length})</span>
                            </div>
                            <h2 className="events-section-title">
                                Past <span className="highlight">Events</span>
                            </h2>
                            <p className="events-section-desc">
                                Highlights and memories from our previous hackathons, talks, and community gatherings.
                            </p>
                        </div>

                        <div className="events-list">
                            {pastEvents.map((event) => (
                                <EventSpotlightCard key={event.id} event={event} isUpcoming={false} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
}

export default EventsPage;