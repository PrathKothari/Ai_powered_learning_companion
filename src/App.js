import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/login-form/LoginForm.jsx";
import MultiStepForm from "./components/registeration-form/MultiStepForm.js";
import TaskList from "./components/TaskList.js";
import SummaryPage from "./pages/SummaryPage.js"; 
import FlashcardPage from './pages/FlashcardPage';
import CommunityPage from './pages/CommunityPage';
import DashboardPage from './pages/DashboardPage';
import TaskPage from './pages/Taskpage';



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
                <DashboardPage />
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
                  <SummaryPage />
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/flashcards"
            element={
              <ProtectedRoute>
                <FlashcardPage />
              </ProtectedRoute>
            }
          />  

          <Route
            path="/community"
            element={
              <ProtectedRoute>
                <CommunityPage />
              </ProtectedRoute>
            }
          /> 
          <Route 
            path="/tasks" 
            element={
            <ProtectedRoute>
              <TaskPage />
            </ProtectedRoute>} 
          />
          <Route 
            path="/flashcards" 
            element={
            <ProtectedRoute>
              <FlashcardPage />
            </ProtectedRoute>} 
          />
          <Route 
            path="/community" 
            element={
            <ProtectedRoute>
                <CommunityPage />
            </ProtectedRoute>} 
            />

        </Routes>
      </Router>
    </TimerProvider>
  );
}

export default App;
