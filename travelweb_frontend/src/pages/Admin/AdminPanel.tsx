import {useEffect, useState} from "react";
import {FaCircleUser} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";
import TourList from "./TourList.tsx";
import './AdminPanel.css';
import UserList from "./UserList.tsx";
import BookingList from "./BookingList.tsx";

function AdminPanel() {

    const navigate = useNavigate();

    const [activeList, setActiveList] = useState('tours');

    const handleListChange = (listType) => {
        setActiveList(listType);
    };

    useEffect(() => {

    }, []);

    return (
        <>
            <div className="Admin">
            <header>
                <div className="logo">
                    <h1>
                        <a onClick={() => {
                            navigate("/") }}>Nepal <span>भ्रमण</span></a>
                    </h1>
                </div>
                <nav className="navigation flex">
                    <a href="#" onClick={() => handleListChange('tours')}>Tours</a>
                    <a href="#" onClick={() => handleListChange('users')}>Users</a>
                    <a href="#" onClick={() => handleListChange('bookings')}>Bookings</a>

                    <button onClick={() => navigate('/admin/TourForm')}>Upload</button>
                </nav>
                <a href="#"><FaCircleUser size="3rem" color="#464444"/></a>
            </header>
            </div>
            <main>
                <div className="container1">
                    {activeList === 'tours' && <TourList />}
                    {activeList === 'users' && <UserList />}
                    {activeList === 'bookings' && <BookingList />}
                </div>
            </main>

        </>
    );
}
export default AdminPanel