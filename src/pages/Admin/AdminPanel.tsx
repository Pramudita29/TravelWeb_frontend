import { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import TourList from "./TourList";
import './css/AdminPanel.css';
import UserList from "./UserList";
import BookingList from "./BookingList";

function AdminPanel() {
    const navigate = useNavigate();

    const [activeList, setActiveList] = useState('tours');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleListChange = (listType) => {
        setActiveList(listType);
    };

    const clearMessages = () => {
        setSuccessMessage('');
        setErrorMessage('');
    };

    return (
        <>
            <div className="Admin">
                <header>
                    <div className="logo1">
                        <h1 onClick={() => {
                            navigate("/");
                            clearMessages();
                        }}>Nepal <span>भ्रमण</span></h1>
                    </div>
                    <nav className="navigation flex">
                        <a href="#!" onClick={(e) => {e.preventDefault(); handleListChange('tours'); clearMessages();}}>Tours</a>
                        <a href="#!" onClick={(e) => {e.preventDefault(); handleListChange('users'); clearMessages();}}>Users</a>
                        <a href="#!" onClick={(e) => {e.preventDefault(); handleListChange('bookings'); clearMessages();}}>Bookings</a>
                        <button onClick={() => {navigate('/admin/TourForm'); clearMessages();}}>Upload</button>
                    </nav>
                    <FaCircleUser size="3rem" color="#464444" style={{ cursor: 'pointer' }} onClick={() => navigate('/profile')}/>
                </header>
            </div>
            <main>
                <div className="container1">
                    {successMessage && <div className="success-message">{successMessage}</div>}
                    {errorMessage && <div className="error-message">{errorMessage}</div>}

                    {activeList === 'tours' && <TourList />}
                    {activeList === 'users' && <UserList />}
                    {activeList === 'bookings' && <BookingList />}
                </div>
            </main>
        </>
    );
}

export default AdminPanel;
