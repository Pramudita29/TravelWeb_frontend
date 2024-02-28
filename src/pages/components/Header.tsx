// Header.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Header.css';
import { FaUserLock } from "react-icons/fa";

const Header: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        // Check for user data in localStorage
        const userData = localStorage.getItem('userId');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/'); // Use navigate for SPA behavior instead of reloading the page
    };

    const scrollToSection = (sectionId: string) => {
        return (e: React.MouseEvent) => {
            e.preventDefault(); // Prevent default anchor behavior
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };
    };

    return (
        <header className="header">
            <div className="logo" onClick={() => navigate('/')}>
                <h1>Nepal भ्रमण</h1>
            </div>
            <nav className="nav1">
                <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
                {/* Updated Destinations link to scroll to the section */}
                <a href="#best-value-trips" onClick={scrollToSection('best-value-trips')}>Destinations</a>
                {user ? (
                    <div className="dropdown-container"
                         onMouseEnter={() => setDropdownOpen(true)}
                         onMouseLeave={() => setDropdownOpen(false)}
                    >
                        <div className="dropdown-trigger">
                            <button onClick={() => navigate('/profile')}>
                                <FaUserLock style={{fontSize: "25px", backgroundColor: "transparent"}}/></button>
                        </div>
                        {dropdownOpen && (
                            <ul className="dropdown-menu">
                                <li><a onClick={(e) => { e.preventDefault(); navigate('/ChangePassword'); }}>Change Password</a></li>
                                <li><a onClick={(e) => { e.preventDefault(); navigate('/EditProfile'); }}>Update Profile</a></li>
                                <li><a onClick={(e) => { e.preventDefault(); handleLogout(); }}>Log Out</a></li>
                            </ul>
                        )}
                    </div>
                ) : (
                    <button onClick={() => navigate('/SignIn')}>Register</button>
                )}
            </nav>
        </header>
    );
};

export default Header;
