import { Link } from 'react-router-dom';
import { useModal } from '../../context/useModal';
import { useTheme } from '../../context/useTheme';
import './MobileMenu.css';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}
const mobileNavLinks = [
    { label: 'Home', href: '/', icon: '/Icons/Home Icon.svg', isRoute: true },
    { label: 'About Us', href: '/about', icon: '/Icons/Home Icon.svg', isRoute: true },
    { label: 'Team', href: '/team', icon: '/Icons/GroupIcon.svg', isRoute: true },
    { label: 'Projects', href: '/projects', icon: '/Icons/Projects.svg', isRoute: true },
    { label: 'Events', href: '/events', icon: '/Icons/Calender.svg', isRoute: true },
    { label: 'Follow Us', href: '#follow', icon: '/Icons/Social Icon.svg', isRoute: false },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const { openFollowModal } = useModal();
    const { theme, setTheme, availableThemes } = useTheme();

    const handleFollowClick = (e: React.MouseEvent) => {
        e.preventDefault();
        onClose();
        openFollowModal();
    };

    return (
        <>
            {/* Overlay */}
            <div className={`mobile-menu-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />

            {/* Sidebar */}
            <aside className={`mobile-menu ${isOpen ? 'open' : ''}`}>
                <div className="mobile-menu-content">
                    {/* Header with Close and Branding */}
                    <div className="mobile-menu-header">
                        <button className="close-button" onClick={onClose} aria-label="Close Menu">
                            <img src="/Icons/CloseIcon.svg" alt="Close" />
                        </button>
                        
                        <div className="mobile-branding">
                            <img src="/Logos/ClubLogo.png" alt="Logo" className="mobile-club-logo" />
                            <span className="mobile-brand-name">GSoC{"\n"}Innovators{"\n"}Club</span>
                        </div>
                    </div>

                    {/* Nav Links */}
                    <nav className="mobile-nav">
                        {mobileNavLinks.map((link) => (
                            <div key={link.label} className="mobile-nav-container">
                                {link.isRoute ? (
                                    <Link to={link.href} className="mobile-nav-item" onClick={onClose} viewTransition>
                                        <img src={link.icon} alt="" className="mobile-nav-icon" />
                                        <span className="mobile-nav-separator">//</span>
                                        <span className="mobile-nav-text">{link.label}</span>
                                    </Link>
                                ) : (
                                    <a 
                                        href={link.href} 
                                        className="mobile-nav-item" 
                                        onClick={link.label === 'Follow Us' ? handleFollowClick : onClose}
                                    >
                                        <img src={link.icon} alt="" className="mobile-nav-icon" />
                                        <span className="mobile-nav-separator">//</span>
                                        <span className="mobile-nav-text">{link.label}</span>
                                    </a>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Theme Picker */}
                    <div className="mobile-theme-section">
                        <span className="mobile-theme-heading">Theme</span>
                        <div className="mobile-theme-grid">
                            {availableThemes.map((t) => {
                                const isSelected = t.id === theme;
                                return (
                                    <button
                                        key={t.id}
                                        className={`mobile-theme-pill ${isSelected ? 'active' : ''}`}
                                        onClick={() => setTheme(t.id)}
                                    >
                                        <span className="mobile-theme-dot" style={{ background: t.gradient }} />
                                        <span className="mobile-theme-name">{t.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

