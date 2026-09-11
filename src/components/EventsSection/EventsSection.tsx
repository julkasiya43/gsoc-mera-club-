import { useNavigate } from 'react-router-dom';
import eventsData from '../../data/events.json';
import './EventsSection.css';

interface EventData {
    id: string;
    name: string;
    date: string;
    venue: string;
    highlights?: string[];
    posterUrl?: string;
    registerLink?: string;
    socialLink?: string;
}

const upcomingList = eventsData.upcomingEvents as EventData[];
const pastList = eventsData.pastEvents as EventData[];
const displayList = upcomingList.length > 0 ? upcomingList : pastList.slice(0, 1);
const isShowingUpcoming = upcomingList.length > 0;

export function EventsSection() {
    const navigate = useNavigate();

    return (
        <section className="events-section" id="events">
            <div className="events-container">
                {/* Section Title */}
                <div className="events-title-container" data-reveal>
                    <h2 className="events-title">
                        {isShowingUpcoming ? 'Upcoming' : 'Featured'} <span className="highlight">Events</span>
                    </h2>
                    <p className="events-subtitle">
                        {isShowingUpcoming 
                            ? 'Here are Our Upcoming Events, buckle up for challenges and rewards'
                            : 'Explore our flagship hackathons, technical bootcamps, and community milestones'}
                    </p>
                </div>

                {/* Event Display */}
                <div className="events-display">
                    {displayList.map((event, index) => (
                        <article key={index} className="event-card" data-reveal>
                            <div className="event-card-inner">
                                {/* Event Content */}
                                <div className="event-content">
                                    {/* Timeline Element */}
                                    <div className="event-element">
                                        <img src="/Icons/Event-DownMark.svg" alt="Event marker" className="event-element-dot" />
                                        <div className="event-element-line" />
                                        <div className="event-element-line-bg" />
                                    </div>

                                    {/* Event Texts */}
                                    <div className="event-texts">
                                        <div className="event-header">
                                            <h3 className="event-name">{event.name}</h3>
                                            <p className="event-meta">Date: {event.date}</p>
                                            <p className="event-meta">Venue: {event.venue}</p>
                                        </div>

                                        {event.highlights && event.highlights.length > 0 && (
                                            <div className="event-highlights">
                                                {event.highlights.map((highlight, hIndex) => (
                                                    <div key={hIndex} className="event-highlight">
                                                        <img src="/Icons/Event-TickMark.svg" alt="Check" className="highlight-icon" />
                                                        <p className="highlight-text">{highlight}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="event-register">
                                            {event.registerLink ? (
                                                <a
                                                    href={event.registerLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-primary event-register-btn"
                                                >
                                                    Register Now
                                                </a>
                                            ) : (
                                                <button
                                                    className="btn btn-primary event-register-btn"
                                                    onClick={() => navigate('/events', { viewTransition: true })}
                                                >
                                                    Explore All Events
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Event Poster */}
                                <div className="event-poster">
                                    {event.posterUrl ? (
                                        <img src={event.posterUrl} alt={`${event.name} poster`} className="event-poster-img" />
                                    ) : (
                                        <span className="poster-placeholder">Event Poster</span>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="events-view-more" data-reveal>
                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate('/events', { viewTransition: true })}
                    >
                        View All Events
                    </button>
                </div>
            </div>
        </section>
    );
}

export default EventsSection;
