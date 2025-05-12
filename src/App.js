import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/login-form/LoginForm.jsx";
import MultiStepForm from "./components/registeration-form/MultiStepForm.js";
import Dashboard from "./components/Dashboard.js";
import Timer from "./components/Timer.js";
import TaskList from "./components/TaskList.js";
import SummaryPage from "./pages/SummaryPage.js"; 

import DarkModeToggle from "./components/DarkModeToggle.js";
import { TimerProvider } from "./context/TimerContext.js";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  // Auth Page (login/register)
  const AuthPage = () => {
    return isRegistering ? (
      <MultiStepForm onFinishRegister={() => setIsLoggedIn(true)} />
    ) : (
      <LoginForm
        onLoginSuccess={() => setIsLoggedIn(true)}
        onRegisterClick={() => setIsRegistering(true)}
      />
    );
  };

  // Protected Route Wrapper
  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/" />;
  };

  return (
    <TimerProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div className="App">
                  <h1>AI Learning Companion</h1>
                  <DarkModeToggle />
                  <Timer
                    focusTime={25}
                    breakTime={5}
                    onFocusComplete={() => console.log("Focus time complete")}
                    onBreakComplete={() => console.log("Break complete")}
                  />
                  <Dashboard />
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <div className="App">
                  <h1>Tasks</h1>
                  <TaskList />
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/summary" // ✅ Step 2: Add Summary route
            element={
              <ProtectedRoute>
                <div className="App">
                  <SummaryPage />
                </div>
              </ProtectedRoute>
            }
          />
          
        </Routes>
      </Router>
    </TimerProvider>
  );
}

export default App;
