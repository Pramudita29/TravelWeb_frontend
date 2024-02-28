import React from 'react';
import './css/Footer.css';

const Footer: React.FC = () => {
    return (
        <footer style={{ background: 'rgba(0, 0, 0, 0.5)',color:'white', padding: '20px', textAlign: 'center' }}>
            <div className="footer">
                <h3>Nepal भ्रमण</h3>
                <p>Explore the beauty of Nepal with us.</p>
            </div>
            <div className="footer-link">
                <a href="/">Home</a> |
                <a href="/destinations">Destinations</a> |
                <a href="/profile">Profile</a>
            </div>
            <div className="footer-date">
                <p>&copy; {new Date().getFullYear()} Nepal भ्रमण. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
