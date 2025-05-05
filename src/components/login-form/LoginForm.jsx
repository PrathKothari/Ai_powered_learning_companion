import React, { useState } from "react";
import "../login-form/LoginForm.css";
import { FaUser, FaLock } from "react-icons/fa";
import Dashboard from "../Dashboard";

const LoginForm = ({ onRegisterClick, onLoginSuccess }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const response = await fetch("http://localhost:3001/login", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
          alert(data.message);
      } else {
          alert(`Login failed: ${data.message}`);
      }
  };  
  
    const handleForgotPassword = () => {
      alert("Redirect to forgot password page!");
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
              Don't have an account?{" "}
              <button 
                type="button" 
                onClick={onRegisterClick} 
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