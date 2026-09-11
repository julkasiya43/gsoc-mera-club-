import React, { useState } from 'react';
import { useModal } from '../../context/useModal';
import './TerminalCTA.css';

const socialPills = [
    { name: 'WhatsApp', icon: '/Icons/Whatsapp_Logo.svg', url: 'https://chat.whatsapp.com/DQgyDQcimxoEfvKFRbZtQr' },
    { name: 'Discord', icon: '/Icons/Discord_Logo.svg', url: 'https://discord.gg/dJAqk6xCZ' },
    { name: 'LinkedIn', icon: '/Icons/LinkedIn_Logo.svg', url: 'https://www.linkedin.com/company/gsoc-innovators/' },
    { name: 'Instagram', icon: '/Icons/Instagram_Logo.svg', url: 'https://www.instagram.com/gsoc_innovators_club/' },
    { name: 'GitHub', icon: '/Icons/Github.svg', url: 'https://github.com/GSOC-Innovators-Club' },
];

export const TerminalCTA: React.FC = () => {
    const { openFollowModal } = useModal();
    const [copied, setCopied] = useState(false);
    const commandText = 'npx @gsoc-innovators/join-community';

    const handleCopy = () => {
        navigator.clipboard.writeText(commandText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
    };

    return (
        <section className="terminal-cta-section" data-reveal>
            <div className="terminal-cta-container">
                <div className="terminal-cta-card">
                    {/* Ambient Glow */}
                    <div className="cta-ambient-glow" />

                    <div className="terminal-cta-content">
                        <div className="terminal-cta-badge">
                            <span className="cta-dot" />
                            <span>Step Into Open Source</span>
                        </div>

                        <h2 className="terminal-cta-title">
                            Ready to make your <span className="highlight">first commit?</span>
                        </h2>

                        <p className="terminal-cta-subtitle">
                            Join over 100+ passionate student developers, participate in upcoming hackathons, and kickstart your open-source journey today.
                        </p>

                        {/* Interactive Command Box */}
                        <div className="terminal-command-box">
                            <span className="terminal-prompt">$</span>
                            <code className="terminal-cmd-text">{commandText}</code>
                            <button className="terminal-copy-button" onClick={handleCopy} title="Copy command">
                                {copied ? (
                                    <span className="cmd-copied">✓ Copied!</span>
                                ) : (
                                    <span className="cmd-copy-label">Copy Command</span>
                                )}
                            </button>
                        </div>

                        {/* Quick Social Pills */}
                        <div className="social-pills-row">
                            {socialPills.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-pill-btn"
                                >
                                    <img src={item.icon} alt={item.name} />
                                    <span>{item.name}</span>
                                </a>
                            ))}
                        </div>

                        <div className="cta-direct-action">
                            <button className="btn btn-primary" onClick={openFollowModal}>
                                Open Community Directory
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TerminalCTA;
