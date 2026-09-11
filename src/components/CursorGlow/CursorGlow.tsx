import { useEffect, useState } from 'react';
import './CursorGlow.css';

export function CursorGlow() {
    const [pos, setPos] = useState({ x: -200, y: -200 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Disable on touch devices
        if (window.matchMedia('(pointer: coarse)').matches) {
            return;
        }

        const handleMouseMove = (e: MouseEvent) => {
            setPos({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div
            className="cursor-glow-spotlight"
            style={{
                transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`
            }}
            aria-hidden="true"
        />
    );
}

export default CursorGlow;
