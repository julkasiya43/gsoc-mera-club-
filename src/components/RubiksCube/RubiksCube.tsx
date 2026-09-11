import './RubiksCube.css';

interface RubiksCubeProps {
    onClick?: () => void;
    isTwisting?: boolean;
}

export function RubiksCube({ onClick, isTwisting = false }: RubiksCubeProps) {
    return (
        <div className="rubiks-widget-container" onClick={onClick} title="Click to twist the Rubik's Cube!">
            <div className={`rubiks-3d-scene ${isTwisting ? 'twisting' : ''}`}>
                <div className="rubiks-3d-cube">
                    {/* Front Face (Cyan) */}
                    <div className="rubiks-face rubiks-face-front">
                        <span className="mini-facet f-cyan" />
                        <span className="mini-facet f-violet" />
                        <span className="mini-facet f-cyan" />
                        <span className="mini-facet f-emerald" />
                        <span className="mini-facet f-cyan core" />
                        <span className="mini-facet f-amber" />
                        <span className="mini-facet f-cyan" />
                        <span className="mini-facet f-ruby" />
                        <span className="mini-facet f-cyan" />
                    </div>
                    {/* Back Face (Violet) */}
                    <div className="rubiks-face rubiks-face-back">
                        <span className="mini-facet f-violet" />
                        <span className="mini-facet f-emerald" />
                        <span className="mini-facet f-violet" />
                        <span className="mini-facet f-cyan" />
                        <span className="mini-facet f-violet core" />
                        <span className="mini-facet f-amber" />
                        <span className="mini-facet f-violet" />
                        <span className="mini-facet f-ruby" />
                        <span className="mini-facet f-violet" />
                    </div>
                    {/* Right Face (Emerald) */}
                    <div className="rubiks-face rubiks-face-right">
                        <span className="mini-facet f-emerald" />
                        <span className="mini-facet f-cyan" />
                        <span className="mini-facet f-emerald" />
                        <span className="mini-facet f-amber" />
                        <span className="mini-facet f-emerald core" />
                        <span className="mini-facet f-violet" />
                        <span className="mini-facet f-emerald" />
                        <span className="mini-facet f-ruby" />
                        <span className="mini-facet f-emerald" />
                    </div>
                    {/* Left Face (Amber) */}
                    <div className="rubiks-face rubiks-face-left">
                        <span className="mini-facet f-amber" />
                        <span className="mini-facet f-ruby" />
                        <span className="mini-facet f-amber" />
                        <span className="mini-facet f-cyan" />
                        <span className="mini-facet f-amber core" />
                        <span className="mini-facet f-emerald" />
                        <span className="mini-facet f-amber" />
                        <span className="mini-facet f-violet" />
                        <span className="mini-facet f-amber" />
                    </div>
                    {/* Top Face (Ruby) */}
                    <div className="rubiks-face rubiks-face-top">
                        <span className="mini-facet f-ruby" />
                        <span className="mini-facet f-amber" />
                        <span className="mini-facet f-ruby" />
                        <span className="mini-facet f-cyan" />
                        <span className="mini-facet f-ruby core" />
                        <span className="mini-facet f-violet" />
                        <span className="mini-facet f-ruby" />
                        <span className="mini-facet f-emerald" />
                        <span className="mini-facet f-ruby" />
                    </div>
                    {/* Bottom Face (Indigo) */}
                    <div className="rubiks-face rubiks-face-bottom">
                        <span className="mini-facet f-indigo" />
                        <span className="mini-facet f-cyan" />
                        <span className="mini-facet f-indigo" />
                        <span className="mini-facet f-emerald" />
                        <span className="mini-facet f-indigo core" />
                        <span className="mini-facet f-ruby" />
                        <span className="mini-facet f-indigo" />
                        <span className="mini-facet f-amber" />
                        <span className="mini-facet f-indigo" />
                    </div>
                </div>
            </div>
            <span className="rubiks-widget-label">
                {isTwisting ? 'Twisting...' : 'Twist Rubik\'s'}
            </span>
        </div>
    );
}

export default RubiksCube;
