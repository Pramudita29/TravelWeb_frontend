import React from 'react';
import ChangePasswordForm from './components/ChangePasswordForm';
import Header from "./components/Header.tsx";

const ChangePassword: React.FC = () => {
    return (
        <div className="container">
            <Header/>
            <h2>Change Password</h2>
            <ChangePasswordForm />
        </div>
    );
};

export default ChangePassword;
