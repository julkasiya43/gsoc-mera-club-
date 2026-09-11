import React, { useRef, useState } from 'react';
import './FacultySection.css';

interface FacultyData {
    name: string;
    role: string;
    photo: string;
}

const facultyCoordinator: FacultyData = {
    name: 'Dr. Javed Sheikh',
    role: 'Faculty Coordinator',
    photo: '/Administration/Javed Sheikh.jpg',
};

const TiltedFacultyCard = ({ data }: { data: FacultyData }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        
        // Calculate mouse position relative to the card
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate rotation (max 15 degrees)
        const rotateX = ((mouseY / rect.height) - 0.5) * -30;
        const rotateY = ((mouseX / rect.width) - 0.5) * 30;

        // Calculate glare position
        const glareX = (mouseX / rect.width) * 100;
        const glareY = (mouseY / rect.height) * 100;

        setRotation({ x: rotateX, y: rotateY });
        setGlarePos({ x: glareX, y: glareY });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        // Reset rotation gracefully when mouse leaves
        setRotation({ x: 0, y: 0 });
        setGlarePos({ x: 50, y: 50 });
    };

    return (
        <div 
            className="tilted-card-wrapper"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
        >
            <div 
                ref={cardRef}
                className="tilted-card"
                style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${isHovered ? 1.05 : 1}, ${isHovered ? 1.05 : 1}, ${isHovered ? 1.05 : 1})`,
                    transition: isHovered 
                        ? 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)' 
                        : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
                }}
            >
                {/* Dynamic Mouse Glare Layer */}
                <div 
                    className="tilted-card-glare"
                    style={{
                        opacity: isHovered ? 1 : 0,
                        background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.15), transparent 60%)`,
                        transition: isHovered ? 'none' : 'opacity 0.6s ease'
                    }}
                />

                {/* 3D Parallax Content */}
                <div className="tilted-card-content">
                    <div className="faculty-photo-ring">
                        <img 
                            src={data.photo} 
                            alt={data.name} 
                            className="tilted-photo" 
                        />
                        <div className="faculty-badge">
                            <img src="/Icons/GSOC-Icon.svg" alt="GSoC" />
                        </div>
                    </div>
                    
                    <div className="tilted-text-content">
                        <span className="tilted-role">{data.role}</span>
                        <h3 className="tilted-name">{data.name}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export function FacultySection() {
    return (
        <section className="faculty-section" id="faculty">
            <div className="faculty-container">
                {/* Title */}
                <div className="faculty-title-container">
                    <h2 className="faculty-title">
                        Faculty <span className="highlight">Coordinator</span>
                    </h2>
                    <p className="faculty-subtitle">
                        Guided by an inspiring mentor who bridges academia and the open-source world.
                    </p>
                </div>

                {/* Interactive Tilted Card */}
                <TiltedFacultyCard data={facultyCoordinator} />
            </div>
        </section>
    );
}