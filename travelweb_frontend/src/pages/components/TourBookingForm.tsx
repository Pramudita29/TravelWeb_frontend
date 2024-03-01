import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Price from "./Price.tsx";
import './css/Booking.css';

interface FormState {
    fullName: string;
    email: string;
    phone: string;
    tourDate: string;
    tourName: string;
    numPersons: number;
}

interface TourData {
    title: string;
    id: number;
}

const TourBookingForm: React.FC = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormState>();
    const [tours, setTours] = useState<TourData[]>([]);
    const [normalPrice, setNormalPrice] = useState<string>('');
    const tourName = watch("tourName");
    const numPersons = watch("numPersons");

    useEffect(() => {
        axios.get('http://localhost:8080/upload')
            .then(response => {
                if (Array.isArray(response.data.data)) {
                    const fetchedTours = response.data.data.map((tour: any) => ({
                        title: tour.title,
                        id: tour.id,
                    }));
                    setTours(fetchedTours);
                } else {
                    console.error('Expected an array of tours, but received:', response.data.data);
                    setTours([]);
                }
            })
            .catch(error => {
                console.error('Error fetching tours:', error);
                setTours([]);
            });
    }, []);

    useEffect(() => {
        if (tourName) {
            const Tour = tours.find(tour => tour.title === tourName);
            if (Tour) {
                const url = `http://localhost:8080/upload/price/${Tour.id}`;
                axios.get(url)
                    .then(response => {
                        const price = response.data.data.price;
                        setNormalPrice(price);
                    })
                    .catch(error => {
                        console.error('Error fetching tour price:', error);
                        setNormalPrice('');
                    });
            }
        }
    }, [tourName, tours]);

    const onSubmit = (data: FormState) => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            const submissionData = {
                ...data,
                userId: Number(userId),
            };

            axios.post('http://localhost:8080/booking/save', submissionData)
                .then(response => {
                    console.log('Form submitted successfully');
                })
                .catch(error => {
                    console.error('Error submitting form:', error);
                });
        } else {
            console.error('UserId is not available. Make sure the user is logged in.');
        }
    };

    return (
        <>
            <div className="booking-container">
                <div className="book-title">
                    <h1>Book This Tour</h1>
                </div>
                <div className="booking">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label>
                            Full Name:
                            <input type="text" placeholder="Full Name" {...register("fullName", { required: true })} />
                            {errors.fullName && <p className="error">Full name is required.</p>}
                        </label>
                        <br />
                        <label>
                            Email Address:
                            <input type="email" placeholder="Email" {...register("email", { required: true })} />
                            {errors.email && <p className="error">Email address is required.</p>}
                        </label>
                        <br />
                        <label>
                            Phone Number:
                            <input type="tel" placeholder="Phone Number" {...register("phone", { required: true })} />
                            {errors.phone && <p className="error">Phone number is required.</p>}
                        </label>
                        <br />
                        <label>
                            Tour Date:
                            <input type="date" {...register("tourDate", { required: true })} />
                            {errors.tourDate && <p className="error">Tour date is required.</p>}
                        </label>
                        <br />
                        <label>
                            Title of the Tour:
                            <select {...register("tourName", { required: true })}>
                                <option value="">Select a tour</option>
                                {tours.map((tour, index) => (
                                    <option key={index} value={tour.title}>{tour.title}</option>
                                ))}
                            </select>
                            {errors.tourName && <p className="error">Tour name is required.</p>}
                        </label>
                        <br />
                        <label>
                            Number of Persons:
                            <input type="number" placeholder="1 person" {...register("numPersons", { required: true, min: 1 })} />
                            {errors.numPersons && <p className="error">Number of persons is required and must be at least 1.</p>}
                        </label>
                        <br />
                        <div className="price">
                            <Price normalPrice={normalPrice} numPersons={Number(numPersons || 1)} />
                        </div>
                        <input type="submit" value="Book This Tour" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default TourBookingForm;
