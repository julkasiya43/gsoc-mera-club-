import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../context/useTheme';
import './ThemeSwitcher.css';

export function ThemeSwitcher() {
    const { theme, setTheme, availableThemes } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const activeTheme = availableThemes.find((t) => t.id === theme) || availableThemes[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    return (
        <div className="theme-switcher-container" ref={dropdownRef}>
            <button
                className={`theme-trigger-btn ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen((prev) => !prev)}
                title="Change website theme"
                aria-label="Change website theme"
                aria-expanded={isOpen}
            >
                <span className="theme-icon-indicator" style={{ background: activeTheme.gradient }} />
                <span className="theme-current-label">{activeTheme.name}</span>
                <svg
                    className={`theme-chevron ${isOpen ? 'rotated' : ''}`}
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        d="M6 9l6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="theme-dropdown-menu">
                    <div className="theme-dropdown-header">
                        <span className="theme-dropdown-title">Select Color Theme</span>
                        <span className="theme-count-badge">{availableThemes.length} Themes</span>
                    </div>

                    <div className="theme-options-list">
                        {availableThemes.map((t) => {
                            const isSelected = t.id === theme;
                            return (
                                <button
                                    key={t.id}
                                    className={`theme-option-item ${isSelected ? 'selected' : ''}`}
                                    onClick={() => {
                                        setTheme(t.id);
                                        setIsOpen(false);
                                    }}
                                >
                                    <div
                                        className="theme-swatch-ring"
                                        style={{
                                            background: t.gradient,
                                            boxShadow: isSelected ? `0 0 16px ${t.primaryColor}88` : 'none',
                                        }}
                                    >
                                        <div className="theme-swatch-inner" />
                                    </div>
                                    <div className="theme-info-wrap">
                                        <span className="theme-name-text">
                                            {t.name}
                                            {isSelected && <span className="active-theme-tag">Active</span>}
                                        </span>
                                        <span className="theme-desc-text">{t.description}</span>
                                    </div>
                                    {isSelected && (
                                        <div className="theme-check-icon">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                                <path
                                                    d="M20 6L9 17l-5-5"
                                                    stroke="currentColor"
                                                    strokeWidth="2.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
