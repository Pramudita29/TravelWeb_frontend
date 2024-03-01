import React from 'react';
import './css/HeroSection.css';

const Hero: React.FC = () => {
    return (
        <div className="hero-section">
            <div className="hero-content">
                <h1>Explore the Unexplored</h1>
                <p>Nepal's Beauty Awaits You</p>
                <button>Discover More</button>
            </div>
        </div>

    );
};

export default Hero;
