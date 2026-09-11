import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/useModal';
import { useTheme } from '../../context/useTheme';
import './CommandPalette.css';

interface CommandItem {
    id: string;
    title: string;
    category: 'Navigation' | 'Actions' | 'Themes' | 'Community' | 'Shortcuts';
    icon: string;
    shortcut?: string;
    action: () => void;
}

interface CommandPaletteProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
    const [search, setSearch] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [copiedNotification, setCopiedNotification] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { openFollowModal } = useModal();
    const { setTheme, availableThemes } = useTheme();

    const handleCopyCLI = () => {
        navigator.clipboard.writeText('npx @gsoc-innovators/join-community');
        setCopiedNotification(true);
        setTimeout(() => {
            setCopiedNotification(false);
            onClose();
        }, 800);
    };

    const commands: CommandItem[] = [
        // Navigation
        {
            id: 'nav-home',
            title: 'Go to Home',
            category: 'Navigation',
            icon: '🏠',
            shortcut: 'H',
            action: () => { navigate('/'); onClose(); }
        },
        {
            id: 'nav-team',
            title: 'Go to Team Directory',
            category: 'Navigation',
            icon: '👥',
            shortcut: 'T',
            action: () => { navigate('/team'); onClose(); }
        },
        {
            id: 'nav-events',
            title: 'Explore Events & Hackathons',
            category: 'Navigation',
            icon: '⚡',
            shortcut: 'E',
            action: () => { navigate('/events'); onClose(); }
        },
        {
            id: 'nav-projects',
            title: 'Browse Open Source Projects',
            category: 'Navigation',
            icon: '📦',
            shortcut: 'P',
            action: () => { navigate('/projects'); onClose(); }
        },
        {
            id: 'nav-opensource',
            title: 'Open Source Programs & GSoC Guide',
            category: 'Navigation',
            icon: '🌐',
            shortcut: 'O',
            action: () => { navigate('/opensource'); onClose(); }
        },
        {
            id: 'nav-about',
            title: 'About GSoC Innovators Club',
            category: 'Navigation',
            icon: '📖',
            shortcut: 'A',
            action: () => { navigate('/about'); onClose(); }
        },
        // Themes
        ...availableThemes.map((t) => ({
            id: `theme-${t.id}`,
            title: `Switch Theme: ${t.name} (${t.description})`,
            category: 'Themes' as const,
            icon: t.icon,
            action: () => { setTheme(t.id); onClose(); }
        })),
        // Actions
        {
            id: 'act-copy-cli',
            title: 'Copy CLI Join Command (npx @gsoc-innovators/join-community)',
            category: 'Actions',
            icon: '💻',
            action: handleCopyCLI
        },
        {
            id: 'act-follow',
            title: 'Open Social Channels & Connect Modal',
            category: 'Actions',
            icon: '✨',
            action: () => { onClose(); openFollowModal(); }
        },
        // Community Links
        {
            id: 'com-github',
            title: 'Open GitHub Organization (GSOC-Innovators-Club)',
            category: 'Community',
            icon: '🐙',
            action: () => { window.open('https://github.com/GSOC-Innovators-Club', '_blank'); onClose(); }
        },
        {
            id: 'com-discord',
            title: 'Join Discord Server',
            category: 'Community',
            icon: '💬',
            action: () => { window.open('https://discord.gg/9k5p9U8z', '_blank'); onClose(); }
        },
        {
            id: 'com-linkedin',
            title: 'Follow on LinkedIn',
            category: 'Community',
            icon: '💼',
            action: () => { window.open('https://linkedin.com/company/gsoc-innovators-club', '_blank'); onClose(); }
        },
        {
            id: 'com-instagram',
            title: 'Follow on Instagram',
            category: 'Community',
            icon: '📸',
            action: () => { window.open('https://instagram.com/gsoc_innovators_club', '_blank'); onClose(); }
        }
    ];

    const filteredCommands = commands.filter((cmd) =>
        cmd.title.toLowerCase().includes(search.toLowerCase()) ||
        cmd.category.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        if (isOpen) {
            setSearch('');
            setSelectedIndex(0);
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [isOpen]);

    useEffect(() => {
        setSelectedIndex(0);
    }, [search]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (filteredCommands[selectedIndex]) {
                filteredCommands[selectedIndex].action();
            }
        } else if (e.key === 'Escape') {
            e.preventDefault();
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="cmd-backdrop" onClick={onClose}>
            <div
                className="cmd-modal"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={handleKeyDown}
            >
                {/* Search Bar Input */}
                <div className="cmd-input-bar">
                    <svg className="cmd-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                        <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Type a command or jump to page..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="cmd-search-input"
                    />
                    <kbd className="cmd-kbd-esc" onClick={onClose}>ESC</kbd>
                </div>

                {copiedNotification && (
                    <div className="cmd-copied-banner">
                        <span>✓ Copied CLI command to clipboard!</span>
                    </div>
                )}

                {/* Commands List */}
                <div className="cmd-list" ref={listRef}>
                    {filteredCommands.length === 0 ? (
                        <div className="cmd-empty">
                            <span>No commands matching "{search}"</span>
                        </div>
                    ) : (
                        filteredCommands.map((cmd, index) => {
                            const isSelected = index === selectedIndex;
                            return (
                                <div
                                    key={cmd.id}
                                    className={`cmd-item ${isSelected ? 'selected' : ''}`}
                                    onClick={() => cmd.action()}
                                    onMouseEnter={() => setSelectedIndex(index)}
                                >
                                    <div className="cmd-item-left">
                                        <span className="cmd-item-icon">{cmd.icon}</span>
                                        <div className="cmd-item-info">
                                            <span className="cmd-item-title">{cmd.title}</span>
                                            <span className="cmd-item-cat">{cmd.category}</span>
                                        </div>
                                    </div>
                                    {cmd.shortcut && (
                                        <kbd className="cmd-shortcut">{cmd.shortcut}</kbd>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Footer Keys hint */}
                <div className="cmd-footer">
                    <div className="cmd-footer-keys">
                        <span><kbd>↑</kbd><kbd>↓</kbd> to navigate</span>
                        <span><kbd>↵</kbd> to select</span>
                        <span><kbd>ESC</kbd> to exit</span>
                    </div>
                    <span className="cmd-footer-brand">✦ GSoC Innovators</span>
                </div>
            </div>
        </div>
    );
}

export default CommandPalette;
