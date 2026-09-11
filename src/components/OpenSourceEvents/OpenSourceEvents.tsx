import React, { useRef, useState } from 'react';
import './OpenSourceEvents.css';

interface EventData {
  name: string;
  description: string;
  deadline: string;
  duration: string;
  organization: string;
  link: string;
}

const events: EventData[] = [
  {
    name: 'Nexus Spring of Code',
    description: 'A month-long open-source event by Nexus that helps students to get started with open source.',
    deadline: 'March 30, 2026',
    duration: '1st April - 30th April',
    organization: 'Nexus',
    link: 'https://www.nsoc.in/',
  },
  {
    name: 'Google Summer of Code',
    description: 'A global, online program focused on bringing new contributors into open source software development.',
    deadline: 'April 15, 2026',
    duration: 'May - August',
    organization: 'Google',
    link: 'https://summerofcode.withgoogle.com/',
  },
  {
    name: 'Social Summer of Code',
    description: 'A program for students to contribute to open-source projects under the guidance of mentors.',
    deadline: 'May 1, 2026',
    duration: 'June - August',
    organization: 'Social',
    link: 'https://www.socialsummerofcode.com/',
  },
];

const OpenSourceSpotlightCard = ({ event }: { event: EventData }) => {
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
      className="open-source-spotlight-card"
      data-reveal
    >
      {/* Outer border spotlight glow */}
      <div
          className="open-source-spotlight-border"
          style={{
              opacity,
              background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(159, 83, 255, 0.6), transparent 40%)`,
          }}
      />
      {/* Inner background spotlight glow */}
      <div
          className="open-source-spotlight-glow"
          style={{
              opacity,
              background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(159, 83, 255, 0.15), transparent 40%)`,
          }}
      />

      <div className="open-source-spotlight-content">
        <div className="open-source-card-header">
          <div className="open-source-event-icon">
            <img src="/Icons/GSOC-Icon.svg" alt="" />
          </div>
          <div>
            <p className="open-source-card-label">Open Source Program</p>
            <h2 className="open-source-event-name">{event.name}</h2>
          </div>
        </div>

        <div className="open-source-card-content-inner">
          <div className="open-source-detail open-source-description">
            <h3>
              <img src="/Icons/Home Icon.svg" alt="" />
              Description
            </h3>
            <p>{event.description}</p>
          </div>

          <div className="open-source-meta-grid">
            <div className="open-source-detail">
              <h3>
                <img src="/Icons/Calender.svg" alt="" />
                Registration
              </h3>
              <p>{event.deadline}</p>
            </div>
            <div className="open-source-detail">
              <h3>
                <img src="/Icons/Calender.svg" alt="" />
                Duration
              </h3>
              <p>{event.duration}</p>
            </div>
            <div className="open-source-detail">
              <h3>
                <img src="/Icons/GroupIcon.svg" alt="" />
                Organization
              </h3>
              <p>{event.organization}</p>
            </div>
          </div>
        </div>

        <a
          href={event.link}
          target="_blank"
          rel="noopener noreferrer"
          className="open-source-register-button"
        >
          Register Now
        </a>
      </div>
    </article>
  );
};

const OpenSourceEvents: React.FC = () => {
  return (
    <main className="open-source-page">
      {/* Background gradient overlay to make the transparency pop */}
      <div className="open-source-bg-gradient">
          <img src="/Components/Gradient.svg" alt="" aria-hidden="true" />
      </div>

      <div className="open-source-page-container">
        <div className="open-source-page-header" data-reveal>
          <h1 className="open-source-page-title">
            <span className="highlight">Open Source</span>
          </h1>
          <p className="open-source-page-subtitle">
            Participate in leading open source events, contribute to impactful projects, and accelerate your skills.
          </p>
        </div>

        <div className="open-source-list">
          {events.map((event) => (
            <OpenSourceSpotlightCard key={event.name} event={event} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default OpenSourceEvents;