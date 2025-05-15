import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation
} from 'react-router-dom';

import DashboardPage from './pages/DashboardPage';
import FlashcardPage from './pages/FlashcardPage';
import MultiStepForm from "./components/registeration-form/MultiStepForm"; // NOTE: registeration-form
import TaskPage from './pages/Taskpage';
import SummaryPage from './pages/SummaryPage';
import CommunityPage from './pages/CommunityPage';

function AppWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  // Check if the user is on login or registration page
  const isAuthPage = pathname === '/' || pathname.includes('register');

  // Component for auth landing
  const AuthPage = () => (
    showRegister ? (
      <MultiStepForm
        onFinishRegister={() => {
          setShowRegister(false);
          setIsLoggedIn(true);
          navigate('/dashboard');
        }}
      />
    ) : (
      <div className="text-center p-10">
        <h2 className="text-2xl font-bold mb-6 text-white">Welcome to ADHD Companion</h2>
        <button
          onClick={() => setShowRegister(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded m-2"
        >
          Register
        </button>
        <button
          onClick={() => {
            setIsLoggedIn(true);
            navigate('/dashboard');
          }}
          className="bg-green-600 text-white px-4 py-2 rounded m-2"
        >
          Login
        </button>
      </div>
    )
  );

  // Protect routes from unauthenticated users
  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/" />;
  };

  return (
    <div className={isAuthPage ? 'auth-background' : 'grey-bg'}>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage
                onLogout={() => {
                  setIsLoggedIn(false);
                  navigate('/');
                }}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <TaskPage />
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
          path="/summary"
          element={
            <ProtectedRoute>
              <SummaryPage />
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
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
