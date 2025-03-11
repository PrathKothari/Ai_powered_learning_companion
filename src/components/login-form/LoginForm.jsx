import React, { useState } from "react";
import "../login-form/LoginForm.css"; // Ensure folder name is correct
import { FaUser, FaLock } from "react-icons/fa";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Logging in with username: ${username}`);
    };

    const handleForgotPassword = () => {
        alert("Redirect to forgot password page!");
    };

    const handleRegister = () => {
        alert("Redirect to register page!");
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="input-box">
                    <input 
                        type="text" 
                        placeholder="Username" 
                        required 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input 
                        type="password" 
                        placeholder="Password" 
                        required 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <FaLock className="icon" />
                </div>
                <div className="remember-forgot">
                    <label>
                        <input type="checkbox" /> Remember me
                    </label>
                    <button 
                        type="button" 
                        onClick={handleForgotPassword} 
                        className="link-button"
                        aria-label="Forgot password"
                    >
                        Forgot password?
                    </button>
                </div>
                <button type="submit">Login</button>
                <div className="register-link">
                    <p>
                        Don't have an account? 
                        <button 
                            type="button" 
                            onClick={handleRegister} 
                            className="link-button"
                            aria-label="Register a new account"
                        >
                            Register
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
