import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/EditProfile.css';
import Header from "./Header";

interface UserData {
    fullName: string;
    username: string;
    email: string;
}

const EditProfile: React.FC = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    const { register, handleSubmit, setValue } = useForm<UserData>();

    useEffect(() => {
        const fetchedUserId = localStorage.getItem('userId');
        setUserId(fetchedUserId);

        if (fetchedUserId) {
            axios.get(`http://localhost:8080/users/${fetchedUserId}`,{
                headers:{authorization:"Bearer "+ localStorage.getItem("accessToken")}
            })
                .then(response => {
                    const userData: UserData = response.data;
                    Object.keys(userData).forEach(key => {
                        setValue(key as keyof UserData, userData[key]);
                    });
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                    setErrorMessage('Failed to fetch user data.');
                });
        }
    }, [setValue]);

    const onSubmit = async (data: UserData) => {
        if (userId) {
            try {
                await axios.put(`http://localhost:8080/users/${userId}`, data,{
                    headers:{authorization:"Bearer "+ localStorage.getItem("accessToken")}
                });
                setSuccessMessage('Profile updated successfully!');
                setTimeout(() => setSuccessMessage(null), 5000);
            } catch (error) {
                console.error('Error updating user:', error);
                setErrorMessage('Failed to update profile.');
                setTimeout(() => setErrorMessage(null), 5000);
            }
        }
    };
    return (
        <>
            <Header/>

        <div className="edit-user-profile">
            <h3>Edit Your Profile</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="firstName">FullName</label>
                    <input type="text" id="fullName" {...register("fullName", { required: true })} />
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" {...register("username", { required: true })} />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" {...register("email", { required: true })} />
                </div>
                <button type="submit">Save Changes</button>
                <button className="btn" onClick={() => navigate(`/profile`)}> Back</button>
            </form>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
            </>
    );
};

export default EditProfile;
