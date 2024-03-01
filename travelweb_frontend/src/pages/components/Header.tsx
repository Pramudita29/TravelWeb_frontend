import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Header.css';
import {FaUserLock} from "react-icons/fa";


const Header: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);


    useEffect(() => {
        // Example of checking for a specific user data item in localStorage
        // Adjust according to how you're storing user data or authentication status
        const userData = localStorage.getItem('userId');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);


    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

       const navigateTo = (path: string) => {
        navigate(path);
    };


    return (
        <header className="header">
            <div className="logo" onClick={() => navigateTo('/')}>
                <h1>Nepal भ्रमण</h1>
            </div>
            <nav className="nav">
                <a href="/" onClick={() => navigateTo('/')}>Home</a>
                <a href="/GalleryItem.tsx" onClick={() => navigateTo('/GalleryItem')}>Destinations</a>
                <a href="/AdminPanel" onClick={() => navigateTo('/AdminPanel')}>Admin</a>

                    {user ? (
                        <div className="dropdown-container"
                             onMouseEnter={() => setDropdownOpen(true)}
                             onMouseLeave={() => setDropdownOpen(false)}
                        >
                            <div className="dropdown-trigger">
                                <button onClick={()=> navigate('/profile')}>
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