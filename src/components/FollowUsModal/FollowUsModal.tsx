import './FollowUsModal.css';

interface FollowUsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const platforms = [
    {
        name: 'WhatsApp Community',
        icon: '/Icons/Whatsapp_Logo.svg',
        url: 'https://chat.whatsapp.com/DQgyDQcimxoEfvKFRbZtQr'
    },
    {
        name: 'Instagram',
        icon: '/Icons/Instagram_Logo.svg',
        url: 'https://www.instagram.com/gsoc_innovators_club/'
    },
    {
        name: 'LinkedIn',
        icon: '/Icons/LinkedIn_Logo.svg',
        url: 'https://www.linkedin.com/company/gsoc-innovators/'
    },
    {
        name: 'Discord',
        icon: '/Icons/Discord_Logo.svg',
        url: 'https://discord.gg/dJAqk6xCZ'
    },
    {
        name: 'GitHub',
        icon: '/Icons/Github.svg',
        url: 'https://github.com/GSOC-Innovators-Club'
    }
];

export function FollowUsModal({ isOpen, onClose }: FollowUsModalProps) {
    return (
        <div
            className={`modal-overlay ${isOpen ? 'open' : ''}`}
            onClick={onClose}
            aria-hidden={!isOpen}
        >
            <div
                className="follow-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="follow-modal-title"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="modal-header">
                    <button className="modal-close" onClick={onClose} aria-label="Close Modal">
                        <img src="/Icons/CloseIcon.svg" alt="Close" />
                    </button>
                    
                    <div className="modal-branding">
                        <img src="/Logos/ClubLogo.png" alt="Logo" className="modal-logo" />
                        <span className="modal-brand-name">GSoC{"\n"}Innovators{"\n"}Club</span>
                    </div>
                </div>

                {/* Modal Title */}
                <h2 className="modal-title" id="follow-modal-title">
                    Connect with us on the following platforms
                </h2>

                {/* Platform Links */}
                <div className="platform-list">
                    {platforms.map((platform) => (
                        <a 
                            key={platform.name} 
                            href={platform.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="platform-item"
                        >
                            <img src={platform.icon} alt="" className="platform-icon" />
                            <span className="platform-separator">//</span>
                            <span className="platform-name">{platform.name}</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
