import React, { useState, useEffect } from 'react';

const Hero = ({ onYesClick, showNoButton }) => {
    const [noPos, setNoPos] = useState(null); // null means it's in its natural flow

    const handleNoHover = () => {
        const randomTop = Math.floor(Math.random() * (window.innerHeight - 50));
        const randomLeft = Math.floor(Math.random() * (window.innerWidth - 100));
        setNoPos({ top: `${randomTop}px`, left: `${randomLeft}px` });
    };

    return (
        <div className="hero-section">
            <h1 className="hero-title">Are you ready for Miriam's Bach?</h1>
            <div className="button-container">
                <button className="btn btn-yes" onClick={onYesClick}>Yes</button>
                {showNoButton && (
                    <button
                        id="btn-no"
                        className="btn btn-no"
                        onMouseEnter={handleNoHover}
                        style={noPos ? {
                            position: 'fixed',
                            top: noPos.top,
                            left: noPos.left
                        } : {}}
                    >
                        No
                    </button>
                )}
            </div>
        </div>
    );
};

export default Hero;
