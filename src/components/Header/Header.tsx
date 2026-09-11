import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MobileMenu } from '../MobileMenu/MobileMenu';
import { FollowUsModal } from '../FollowUsModal/FollowUsModal';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import { useModal } from '../../context/useModal';
import './Header.css';

const navLinks = [
    { label: 'About Us', href: '/about', isRoute: true },
    { label: 'Team', href: '/team', isRoute: true },
    { label: 'Projects', href: '/projects', isRoute: true },
    { label: 'Open Source', href: '/opensource', isRoute: true },
    { label: 'Events', href: '/events', isRoute: true },
    { label: 'Follow Us', href: '#follow', isRoute: false },
];

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const { isFollowModalOpen, openFollowModal, closeFollowModal, openCommandPalette } = useModal();
    const location = useLocation();
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Don't hide if mobile menu or modal is active
            if (isMenuOpen || isFollowModalOpen) {
                setIsHidden(false);
                return;
            }

            // Always show header near the top of the page
            if (currentScrollY < 50) {
                setIsHidden(false);
                lastScrollY.current = currentScrollY;
                return;
            }

            const scrollDelta = currentScrollY - lastScrollY.current;

            // Scrolling down -> hide header (with 8px threshold to prevent jitter)
            if (scrollDelta > 8 && currentScrollY > 80) {
                setIsHidden(true);
            } 
            // Scrolling up -> show header
            else if (scrollDelta < -8) {
                setIsHidden(false);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMenuOpen, isFollowModalOpen]);

    const handleFollowClick = (e: React.MouseEvent) => {
        e.preventDefault();
        openFollowModal();
    };

    return (
        <header className={`header ${isHidden ? 'header-hidden' : ''}`}>
            <nav className="navbar">
                {/* Mobile Hamburger */}
                <button 
                    className="mobile-hamburger" 
                    onClick={() => setIsMenuOpen(true)}
                    aria-label="Open Menu"
                >
                    <img src="/Icons/Hamburger.svg" alt="" />
                </button>

                {/* Club Branding */}
                <div className="branding">
                    <Link to="/" className="branding-logo-link" viewTransition>
                        <div className="logo-glow-wrap">
                            <img
                                src="/Logos/ClubLogo.png"
                                alt="GSoC Innovators Club Logo"
                                className="club-logo"
                                decoding="async"
                            />
                        </div>
                    </Link>
                    <Link to="/" className="brand-name" viewTransition>
                        <span className="brand-gsoc">GSoC</span>
                        <span className="brand-sub">Innovators Club</span>
                    </Link>
                </div>

                {/* Navigation Links, Theme Switcher & Command Palette Trigger */}
                <div className="nav-center-group">
                    <div className="navigation">
                        {navLinks.map((link) => {
                            const isActive = link.isRoute && location.pathname === link.href;
                            return (
                                <div key={link.label} className="nav-item">
                                    {link.isRoute ? (
                                        <Link 
                                            to={link.href} 
                                            className={`nav-link ${isActive ? 'active' : ''}`} 
                                            viewTransition
                                        >
                                            {link.label}
                                            {isActive && <span className="active-glow-bar" />}
                                        </Link>
                                    ) : (
                                        <button 
                                            className="nav-link nav-btn-follow"
                                            onClick={handleFollowClick}
                                        >
                                            {link.label}
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Dynamic Theme Switcher */}
                    <ThemeSwitcher />

                    {/* Quick Command Palette Trigger (⌘K) */}
                    <button
                        className="cmd-trigger-btn"
                        onClick={openCommandPalette}
                        title="Open Quick Navigator (⌘K or Ctrl+K)"
                        aria-label="Open Command Palette"
                    >
                        <svg className="cmd-icon-mini" width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span className="cmd-trigger-kbd">⌘K</span>
                    </button>
                </div>

                {/* University Branding & Action CTA */}
                <div className="header-right-group">
                    <a 
                        href="https://vitbhopal.ac.in/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="vitb-logo-link"
                        title="VIT Bhopal University"
                    >
                        <img
                            src="/Logos/VITB_White_No_BG.png"
                            alt="VIT Bhopal University"
                            className="vitb-logo"
                            decoding="async"
                        />
                    </a>
                    <a 
                        href="https://discord.gg" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-join-pill"
                    >
                        <span>Join Club</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </a>
                </div>
            </nav>

            {/* Mobile Navigation Menu */}
            <MobileMenu 
                isOpen={isMenuOpen} 
                onClose={() => setIsMenuOpen(false)} 
            />

            {/* Follow Us Modal */}
            <FollowUsModal 
                isOpen={isFollowModalOpen} 
                onClose={closeFollowModal} 
            />
        </header>
    );
}

export default Header;
