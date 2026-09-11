import { Link } from 'react-router-dom';
import './Footer.css';

const VitLinks = [
    { name: 'Instagram', icon: '/Icons/Instagram_Logo.svg', url: 'https://www.instagram.com/gsoc_innovators_club/' },
    { name: 'LinkedIn', icon: '/Icons/LinkedIn_Logo.svg', url: 'https://www.linkedin.com/company/gsoc-innovators/' },
    { name: 'Discord', icon: '/Icons/Discord_Logo.svg', url: 'https://discord.gg/dJAqk6xCZ' },
    { name: 'GitHub', icon: '/Icons/Github.svg', url: 'https://github.com/GSOC-Innovators-Club' },
];

export function Footer() {
    return (
        <footer className="footer">
            <div className="footer-glow" />
            <div className="footer-container">
                {/* Footer Main */}
                <div className="footer-top">
                    {/* Brand Left */}
                    <div className="footer-brand-left">
                        <div className="footer-logo-container">
                            <div className="footer-logo-glow">
                                <img
                                    src="/Logos/ClubLogo.png"
                                    alt="GSoC Innovators Club"
                                    className="footer-logo"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                            <div className="footer-brand-texts">
                                <span className="footer-brand-name">GSoC Innovators Club</span>
                                <span className="footer-brand-tag">VIT Bhopal University</span>
                            </div>
                        </div>
                        <p className="footer-desc">
                            Empowering student developers to contribute to open-source, build impactful projects, and excel in global programs.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-links-col">
                        <span className="footer-col-title">Navigation</span>
                        <div className="footer-nav-list">
                            <Link to="/about" className="footer-nav-link">About Us</Link>
                            <Link to="/team" className="footer-nav-link">Team & Cohorts</Link>
                            <Link to="/projects" className="footer-nav-link">Projects</Link>
                            <Link to="/events" className="footer-nav-link">Events & Hackathons</Link>
                            <Link to="/opensource" className="footer-nav-link">Open Source Programs</Link>
                        </div>
                    </div>

                    {/* Contact & Socials */}
                    <div className="footer-contact-col">
                        <span className="footer-col-title">Connect With Us</span>
                        <a href="mailto:gsocinnovators.queries@gmail.com" className="footer-email-link">
                            <img src="/Icons/email-logo (1).svg" alt="Email" />
                            <span>gsocinnovators.queries@gmail.com</span>
                        </a>
                        <div className="footer-social-row">
                            {VitLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    className="footer-social-btn"
                                    aria-label={social.name}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img src={social.icon} alt={social.name} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* VIT Bhopal Logo */}
                    <div className="footer-vitb-col">
                        <a 
                            href="https://vitbhopal.ac.in/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="footer-vitb-link"
                        >
                            <img
                                src="/Logos/VITB_White_No_BG.png"
                                alt="VIT Bhopal University"
                                className="footer-vitb-logo"
                                loading="lazy"
                                decoding="async"
                            />
                        </a>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <p className="footer-copyright">
                        © {new Date().getFullYear()} GSoC Innovators Club, VIT Bhopal. Built with passion by the student community.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
