import React, { useState } from 'react';
import './css/ChangePassword.css';

const ChangePasswordForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const response = await fetch('http://localhost:8080/users/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, oldPassword, newPassword }),
            });

            if (!response.ok) {
                // If the server responds with a status code that indicates failure
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to change password');
            }

            // Assuming the response includes a message upon success
            const responseData = await response.json();
            setSuccessMessage(responseData.message || 'Password changed successfully!');
        } catch (error) {
            setErrorMessage(error.message || 'An error occurred while changing the password.');
        }
    };

    return (
        <div className="change-pwd">
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label>Old Password:</label>
                <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
                <label>New Password:</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                <button type="submit">Change Password</button>
            </form>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    );
};

export default ChangePasswordForm;
