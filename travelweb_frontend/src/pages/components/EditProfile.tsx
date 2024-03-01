import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/EditProfile.css';
import Header from "./Header.tsx";

interface UserData {
    fullName: string;
    username: string;
    email: string;
}

const EditProfile: React.FC = () => {
    const [userId, setUserId] = useState<string | null>(null);
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
                .catch(error => console.error('Error fetching user data:', error));
        }
    }, [setValue]);

    const onSubmit = async (data: UserData) => {
        if (userId) {
            try {
                await axios.put(`http://localhost:8080/users/${userId}`, data,{
                    headers:{authorization:"Bearer "+ localStorage.getItem("accessToken")}
                });
                navigate('/profile'); // Navigate to user profile page after successful update
            } catch (error) {
                console.error('Error updating user:', error);
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
        </div>
            </>
    );
};

export default EditProfile;
