import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TourCard from "./TourCard";
import './css/ValueTrips.css'; 

const ValueTrips: React.FC = () => {
    const [tours, setTours] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/upload')
            .then(response => {
                if (response.data.status && Array.isArray(response.data.data)) {
                    const sortedTours = response.data.data
                        .map(tour => ({ ...tour, price: Number(tour.price.replace(/[^0-9.-]+/g, "")) }))
                        .sort((a, b) => a.price - b.price)
                        .slice(0, 7)
                        .reverse();
                    setTours(sortedTours);
                }
            })
            .catch(error => {
                console.error("Error fetching tours:", error);
            });
    }, []);

    return (
        <div className="values" id="best-value-trips">
            <div className="values-title">
                <h2>Best Value Trips</h2>
                <p>Best offers trips from us</p>
            </div>
            <div className="tour-cards-container">
                {tours.map((tour, index) => (
                    <div className="tour-card" key={index}>
                        <TourCard tour={tour} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ValueTrips;
