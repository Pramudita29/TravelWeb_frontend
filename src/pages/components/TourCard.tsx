import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/TourCard.css';
import axios from 'axios';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

interface TourCardProps {
    tour: {
        id: number;
        image: string;
        title: string;
        description: string;
        price: string;
        duration: string;
    };
}

const TourCard: FC<TourCardProps> = ({ tour }) => {
    const navigate = useNavigate();
    const [averageRating, setAverageRating] = useState<number | null>(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/rate/${tour.id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setAverageRating(response.data);
            })
            .catch(error => console.error('Error fetching average rating:', error));
    }, [tour.id]);

    const renderStars = (rating: number | null) => {
        if (rating === null) return 'Loading...';
        const totalStars = 5;
        const output = [];
        const fullStars = Math.floor(rating || 0);
        const halfStar = (rating || 0) % 1 >= 0.5 ? 1 : 0;
        const emptyStars = totalStars - fullStars - halfStar;

        for (let i = 0; i < fullStars; i++) {
            output.push(<FaStar className="yellow-star star-size" key={`full-${i}`} />);
        }

        if (halfStar) {
            output.push(<FaStarHalfAlt className="yellow-star star-size" key="half" />);
        }

        for (let i = 0; i < emptyStars; i++) {
            output.push(<FaRegStar className="gray-star star-size" key={`empty-${i}`} />);
        }

        return output;
    };




    const handleNavigate = () => {
        navigate(`/tourview/${tour.id}`, { state: { tour } });
    };

    return (
        <div className="t-card" onClick={handleNavigate}>
            <div className="t-card-img">
                <img src={tour.image} alt={tour.title} />
            </div>
            <div className="t-card-info flex">
                <label className="t-label">{tour.title}</label>
                <p>Duration: {tour.duration}</p>
                <p>NPR {tour.price}</p>
                <div className="t-card-rating">
                    {renderStars(averageRating)}
                </div>
            </div>
        </div>
    );
};

export default TourCard;
