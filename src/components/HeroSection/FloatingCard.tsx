import './FloatingCard.css';

interface FloatingCardProps {
    title: string;
    subtitle: string;
    icon: string;
    position: 'ml' | 'events' | 'github' | 'gsoc';
}

export function FloatingCard({ title, subtitle, icon, position }: FloatingCardProps) {
    return (
        <div className={`floating-card ${position}`}>
            <div className="floating-card-inner">
                <div className="floating-card-icon">
                    <img src={icon} alt={title} />
                </div>
                <div className="floating-card-text">
                    <span className="floating-card-title">{title}</span>
                    <span className="floating-card-subtitle">{subtitle}</span>
                </div>
            </div>
        </div>
    );
}
