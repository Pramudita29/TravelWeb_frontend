import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import Header from "./components/Header";
import TourDetails from "./components/TourDetails.tsx";
import TourBookingForm from "./components/TourBookingForm.tsx";
import './css/TourView.css';
import Footer from "./components/Footer.tsx";

// Assuming you have a type for the Tour
interface Tour {
    id: number;
    title: string;
    image: string;
}

const TourView: React.FC = () => {
    const location = useLocation();
    const [tour] = useState<Tour | null>(location.state?.tour || null);

    return (
        <>
            <div className="tourview-main">
            <Header />
            {tour && (
                <>
                    <div
                        className="view-img"
                        style={{ backgroundImage: `url(${tour.image})` }}
                    ></div>
                    <div className="view-info">
                        <h2 className="view-title">{tour.title}</h2>
                    </div>
                    <div className="tour-content"> {/* Container for side by side layout */}
                        <TourDetails />
                        <TourBookingForm />
                    </div>
                </>
            )}
            </div>

            <Footer/>
        </>
    );
};

export default TourView;
