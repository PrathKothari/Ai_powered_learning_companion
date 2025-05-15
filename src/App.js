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
import MultiStepForm from "./components/registeration-form/MultiStepForm";
import TaskPage from './pages/Taskpage';
import SummaryPage from './pages/SummaryPage';
import CommunityPage from './pages/CommunityPage';

function AppWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const isAuthPage = pathname === '/' || pathname.includes('register');

  const AuthPage = () => (
  <div className="auth-background w-screen h-screen flex items-center justify-center">
    {showRegister ? (
      <MultiStepForm
        onFinishRegister={() => {
          setShowRegister(false);
          setIsLoggedIn(true);
          navigate('/dashboard');
        }}
      />
    ) : (
      <div className="bg-black bg-opacity-50 rounded-xl p-10 text-center text-white max-w-xl w-full">
        <h2 className="text-3xl font-bold mb-6">Welcome to ADHD Companion</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => setShowRegister(true)}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
          >
            Register
          </button>
          <button
            onClick={() => {
              setIsLoggedIn(true);
              navigate('/dashboard');
            }}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Login
          </button>
        </div>
      </div>
    )}
  </div>
);

 

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
