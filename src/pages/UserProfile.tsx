import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Profiler from "./components/Profiler.tsx";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import './css/userProfile.css';
import { FaTrash } from 'react-icons/fa';

interface Booking {
    id: string;
    tourName: string;
    tourDate: string;
    numPersons: number;
}

const UserProfile: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            axios.get(`http://localhost:8080/booking/user/${userId}`)
                .then(response => {
                    setBookings(response.data);
                })
                .catch(error => {
                    console.error('Error fetching bookings:', error);
                });
        } else {
            console.log('No user ID found in local storage.');
        }
    }, []);

    const deleteBooking = (bookingId: string) => {
        axios.delete(`http://localhost:8080/booking/${bookingId}`)
            .then(() => {
                setBookings(bookings.filter(booking => booking.id !== bookingId));
            })
            .catch(error => {
                console.error('Error deleting booking:', error);
            });
    };

    return (
        <>
            <Header />
            <Profiler />
            <div className="user-bookings">
                <h2>Your Bookings:</h2>
                {bookings.length > 0 ? (
                    <ul>
                        {bookings.map((booking) => (
                            <li key={booking.id}>
                                {`${booking.tourName} on ${booking.tourDate} for ${booking.numPersons} persons.`}
                                <button onClick={() => deleteBooking(booking.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                    <FaTrash style={{ width: '20px', height: '20px', marginLeft: '150px' , color:"black"}} />
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No bookings found.</p>
                )}
            </div>
            <Footer />
        </>
    );
};

export default UserProfile;
