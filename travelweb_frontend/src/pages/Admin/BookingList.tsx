import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { FaCircleUser } from "react-icons/fa6";
import './css/BookingList.css';

interface Booking {
    id: number;
    fullName: string;
    email: string;
    tourName: string;
    tourDate: string;
    numPersons: number;
}

const BookingList: React.FC = () => {
    const { data: bookings, error, isError, isLoading } = useQuery<Booking[], Error>('BOOKING', () =>
        axios.get('http://localhost:8080/booking/all').then(res => res.data)
    );

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error?.message}</div>;

    return (
        <>
            <div className="booked-tour">
                <h1>Booking Details</h1>
                <div className="booking-list">
                {bookings?.map((booking) => (
                    <div key={booking.id} className="booking-list-card flex">
                        <span>
                            <FaCircleUser />
                        </span>
                        <div className="booking-list-info">
                            <label className="user-name">
                                Booking for {booking.fullName}, email: {booking.email}
                            </label>
                            <p>Booking Details: On {booking.tourName} for {booking.tourDate} - {booking.numPersons} persons</p>
                        </div>
                    </div>
                ))}
        </div>
            </div>
            </>
    );
};

export default BookingList;
