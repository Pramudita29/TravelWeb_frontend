import { useState} from 'react';
import {useForm} from "react-hook-form";
import {useMutation} from "react-query";
import axios from "axios";
import './css/SignIn.css'; // Make sure to import your stylesheet
import '../App.css';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate(); // Create an instance of useNavigate


    const handleToggle = () => {
        setIsActive(!isActive);
    };
    const saveData = useMutation({
        mutationKey: "SAVEDATA",
        mutationFn: (requestData: any) => {
            return axios.post("http://localhost:8080/users/save", requestData, {

            });
        },
    });

    const loginUser = useMutation(loginData => axios.post("http://localhost:8080/authenticate", loginData), {
        onSuccess: (response) => {
            // Log the response to ensure we're accessing the data correctly
            console.log('Login response:', response);

            // Assuming the backend correctly returns a structure like { token: "value", userId: "value" }
            const { token, userId } = response.data;

            if (token && userId !== undefined) {
                localStorage.setItem("accessToken", token);
                localStorage.setItem("userId", String(userId)); // Ensuring userId is stored as a string
                navigate('/');
            } else {
                console.error('Token or userId is missing from the response:', response);
            }
        },
        // Add onError to handle possible errors
        onError: (error) => {
            console.log('Login error:', error);
        }
    });


    const { register: registerSignUp, handleSubmit: handleSignUpSubmit } = useForm();
    const { register: registerSignIn, handleSubmit: handleSignInSubmit } = useForm();

    const onSubmitSignUp = (values) => {
        saveData.mutate(values);
    };

    const onSubmitSignIn = (values) => {
        loginUser.mutate(values)
    };

    return (

        <div className={`main ${isActive ? 'active' : ''}`} id="container">
            <div className="form-container sign-up">
                <form onSubmit={handleSignUpSubmit(onSubmitSignUp)}>
                    <h1>Create Account</h1>
                    <input type="text" placeholder={"Full Name"} required{...registerSignUp("fullName")}/>
                    <input type="text" placeholder="Username" required{...registerSignUp("username")}/>
                    <input type="email" placeholder="Email" required{...registerSignUp("email")}/>
                    <input type="password" placeholder="Password" required{...registerSignUp("password")}/>
                    <input type="password" placeholder="Confirm Password" required{...registerSignUp("cpassword")}/>
                    <button>Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in">
                <form onSubmit={handleSignInSubmit(onSubmitSignIn)}>
                    <h1>Sign In</h1>
                    <input type="email" placeholder="Email"{...registerSignIn("email")}/>
                    <input type="password" placeholder="Password"{...registerSignIn("password")}/>
                    <a href="ResetPassword">Forget Your Password?</a>
                    <button>Sign In</button>
                </form>
            </div>
            <div className="toggle-container1">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal details to use all of the site features</p>
                        <button className="hidden" id="login" onClick={handleToggle}>Sign In</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Hello, Wanderers!</h1>
                        <p>Register with your personal details to use all of the site features</p>
                        <button className="hidden" id="register" onClick={handleToggle}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;


