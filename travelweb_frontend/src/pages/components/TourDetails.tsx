import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams } from 'react-router-dom';
import './css/TourDetails.css';
import {FaMapMarkerAlt, FaStar} from "react-icons/fa";
import { MdOutlineAccessTime, MdOutlineWarning } from "react-icons/md";
import {FaRegUser} from "react-icons/fa6";
import {CiCircleInfo} from "react-icons/ci";
import {FiMapPin} from "react-icons/fi";
import {IoMapOutline} from "react-icons/io5";
import {IoMdPricetag} from "react-icons/io";

interface tour {
    id: number;
    duration: string;
    minPax: number;
    difficulty: string;
    destination: string;
    image: string;
    description: string;
    province: string;
    district: string;
    region: string;
    title: string;
    category: string;
    price:number;
}
const initialRating = 0;
const TourDetails: React.FC = () => {
    const [tourData, setTourData] = useState<tour | null>(null);
    const { id } = useParams<{ id: string }>();
    const [userRating, setUserRating] = useState<number>(initialRating);

    const submitRating = async (rating: number) => {
        const token = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('userId');
        // Assuming a fixed tourId for demonstration. Replace with dynamic value as needed.

        if (!token) {
            alert('User is not logged in.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/rate/save', {
                userId,
                uploadId: id,
                rate: rating,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(response.data);
            alert('Rating submitted successfully!');
        } catch (error) {
            console.error('Error submitting rating:', error);
            alert('Failed to submit rating.');
        }
    };

    const handleRating = (index: number) => {
        const newRating = index + 1;
        setUserRating(newRating);
        submitRating(newRating);
    };

    const renderStars = (rating: number) => {
        return [...Array(5)].map((_, index) => (
            <span
                key={index}
                className={`star ${index < rating ? 'filled' : ''}`}
                onClick={() => handleRating(index)}
                style={{ cursor: 'pointer' }}
            >
                <FaStar />
            </span>
        ));
    };

    // Create a derived array of departures
    const departures = tourData ? [{
        title: tourData.title,
        category: tourData.category,
        district: tourData.district,
        province: tourData.province,
        region: tourData.region
    }] : [];

    useEffect(() => {
        const fetchTourData = async () => {
            try {
                const response = await axios.get<tour>(`http://localhost:8080/upload/${id}`);
                setTourData(response.data);
            } catch (error) {
                console.error('Error fetching tour data:', error);
            }
        };

        if (id) {
            fetchTourData();
        }
    }, [id]);

    if (!tourData) {
        return <div>Loading...</div>;
    }
    const iconStyle = {
        color: 'black',
        fontsize:'50px' // Adjust the size as needed
    };


    return (
        <>
            <div id="tabs-1" className="tab_wrapper ui-tabs-panel ui-widget-content ui-corner-bottom" aria-labelledby="tabs-button-1" role="tabpanel" aria-hidden="false" style={{ display: 'block' }}>
                <br className="clear" />
                <div className="single_tour_attribute_wrapper themeborder m-t-10">
                    <div className="one_fourth">
                        <div className="tour_attribute_icon">
                            <MdOutlineAccessTime style={iconStyle}/>
                        </div>
                        <div className="tour_attribute_content">Duration<br />{tourData.duration}</div>
                    </div>
                    <div className="one_fourth">
                        <div className="tour_attribute_icon">
                            <FaRegUser style={iconStyle}/>
                        </div>
                        <div className="tour_attribute_content">Min. Pax<br />{tourData.minPax}</div>
                    </div>
                    <div className="one_fourth">
                        <div className="tour_attribute_icon">
                            <MdOutlineWarning style={iconStyle}/>
                        </div>
                        <div className="tour_attribute_content">Difficulty<br />{tourData.difficulty}</div>
                    </div>
                    <div className="one_fourth last">
                        <div className="tour_attribute_icon" >
                            <FaMapMarkerAlt style={iconStyle}/>
                        </div>
                        <div className="tour_attribute_content">Destination<br />{tourData.destination}</div>
                    </div>

                </div>
                <br className="clear" />
                <div className="single_tour_content">
                    <div id="attachment_48" className="wp-caption alignnone">
                        <img className="wp-image-48 size-large" src={tourData.image} alt="Tour Image" />
                    </div>
                    <p className="p1">
                    <span style={{ color: 'rgb(51, 51, 51)', fontSize: 16 }}>
                        <p>{tourData.description}</p>
                    </span>
                        <br />
                    </p>
                </div>
                <ul className="single_tour_departure_wrapper">
                    {departures.map((departure, index) => (
                        <li key={index} className="single_tour_departure">
                            <div className="single_tour_departure_content">
                                <div className="departure_item">
                                    <span>District:</span>
                                    <div className="attribute" >
                                        <FiMapPin />
                                        {departure.district}
                                    </div>
                                </div>
                                <div className="departure_item">
                                    <span>Province: </span>
                                    <div className="attribute">
                                        <FiMapPin />
                                        {departure.province}
                                    </div>
                                </div>
                                <div className="departure_item">
                                    <span>Region: </span>
                                    <div className="attribute">
                                        <IoMapOutline />
                                        {departure.region}
                                    </div>
                                </div>
                                <div className="departure_item">
                                    <span>Category: </span>
                                    <div className="attribute">
                                        <CiCircleInfo />
                                        {departure.category}

                                    </div>
                                </div>
                                <div className="departure_item">
                                    <span>Price (Per Person):</span>
                                    <div className="attribute">
                                        <IoMdPricetag />
                                        {tourData.price}

                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                {/*{review part}*/}
                <div className="wrapper-box">
                    <div className="comment-title">
                        <h3>Review</h3>
                        <hr/> {/* HR below Review */}
                    </div>
                    <div className="overall-rating-box">
                        <span className="rate">Overall</span>
                    </div>
                    {renderStars(userRating)}
                </div>
            </div>
        </>
    );
};

export default TourDetails;

