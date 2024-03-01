import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "axios";
import './css/SignIn.css';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);
    const handleToggle = () => setIsActive(!isActive);

    const saveData = useMutation(data => axios.post("http://localhost:8080/users/save", data), {
        onSuccess: () => {
            alert("Registration Successful!");
            navigate('/SignIn');
        },
        onError: () => alert('Registration Failed! Please try again.')
    });

    const loginUser = useMutation(data => axios.post("http://localhost:8080/authenticate", data), {
        onSuccess: ({data}) => {
            const { token, userId, role } = data;
            if (token) {
                localStorage.setItem("accessToken", token);
                localStorage.setItem("userId", userId);
                role === "admin" ? navigate('/AdminPanel') : navigate('/');
            }
        },
        onError: () => alert('Login Failed! Please try again.')
    });

    const { register: registerSignUp, handleSubmit: handleSignUpSubmit } = useForm();
    const { register: registerSignIn, handleSubmit: handleSignInSubmit } = useForm();

    const onSubmitSignUp = data => saveData.mutate(data);
    const onSubmitSignIn = data => loginUser.mutate(data);
    const navigateBack = () => navigate(-1);

    return (
        <div className={`main ${isActive ? 'active' : ''}`} id="container">
            <div className="form-container sign-up">
                <form onSubmit={handleSignUpSubmit(onSubmitSignUp)}>
                    <h1>Create Account</h1>
                    <input type="text" placeholder="Full Name" required {...registerSignUp("fullName")} />
                    <input type="text" placeholder="Username" required {...registerSignUp("username")} />
                    <input type="email" placeholder="Email" required {...registerSignUp("email")} />
                    <input type="password" placeholder="Password" required {...registerSignUp("password")} />
                    <input type="password" placeholder="Confirm Password" required {...registerSignUp("cpassword")} />
                    <div className="form-actions">
                        <button type="submit">Sign Up</button>
                        <button type="button" onClick={navigateBack} className="back-button">← Back</button>
                    </div>
                </form>
            </div>
            <div className="form-container sign-in">
                <form onSubmit={handleSignInSubmit(onSubmitSignIn)}>
                    <h1>Sign In</h1>
                    <input type="email" placeholder="Email" {...registerSignIn("email")} />
                    <input type="password" placeholder="Password" {...registerSignIn("password")} />
                    <div className="form-actions">
                        <button type="submit">Sign In</button>
                        <button type="button" onClick={navigateBack} className="back-button">← Back</button>
                    </div>
                </form>
            </div>
            <div className="toggle-container1">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button className="hidden" id="login" onClick={handleToggle}>Sign In</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Hello, Wanderers!</h1>
                        <p>Register with your personal details and start journey with us</p>
                        <button className="hidden" id="register" onClick={handleToggle}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
