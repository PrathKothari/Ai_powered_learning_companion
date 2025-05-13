import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import LoginForm from "./components/login-form/LoginForm.jsx";
import MultiStepForm from "./components/registeration-form/MultiStepForm.js";
import Dashboard from "./components/Dashboard.js";
import Timer from "./components/Timer.js";
import TaskList from "./components/TaskList.js";
import SummaryPage from "./pages/SummaryPage.js";

import DarkModeToggle from "./components/DarkModeToggle.js";
import { TimerProvider } from "./context/TimerContext.js";
import "./App.css";

function AppWrapper() {
  return (
    <TimerProvider>
      <Router>
        <App />
      </Router>
    </TimerProvider>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Apply theme class to body
    document.documentElement.className = theme;
  }, [theme]);

  const AuthPage = () => {
    return isRegistering ? (
      <MultiStepForm onFinishRegister={() => setIsRegistering(false)} />
    ) : (
      <LoginForm
        onLoginSuccess={() => {
          setIsLoggedIn(true);
          navigate("/dashboard");
          navigate('/'); // Navigate to HomePage after login
          navigate('/dashboard');
        }}
        onRegisterClick={() => setIsRegistering(true)}
      />
    );
  };

  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/" />;
  };

  return (
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
        path="/summary"
        element={
          <ProtectedRoute>
            <div className="App">
      {/* Public Routes */}
      <Route path="/" element={<AuthPage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/register" element={<AuthPage />} />
      
      <Route path="/" element={<Layout />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <TasksPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/summary"
          element={
            <ProtectedRoute>
              <SummaryPage />
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppWrapper;
