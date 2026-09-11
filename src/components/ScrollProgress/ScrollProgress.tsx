import { useState, useEffect } from 'react';
import './ScrollProgress.css';

export function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const currentScroll = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (maxScroll > 0) {
                setProgress((currentScroll / maxScroll) * 100);
            }
        };

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();

        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return (
        <div className="scroll-progress-track" aria-hidden="true">
            <div
                className="scroll-progress-bar"
                style={{ width: `${progress}%` }}
            >
                <div className="scroll-progress-glow-tip" />
            </div>
        </div>
    );
}

export default ScrollProgress;
