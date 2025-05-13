import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import TasksPage from './pages/TasksPage';
import SummaryPage from './pages/SummaryPage';
import Layout from './components/Layout';
import { useTheme } from './contexts/ThemeContext';
import LoginForm from './components/login-form/LoginForm';
import MultiStepForm from './components/registeration-form/MultiStepForm';

function App() {
  const { theme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const AuthPage = () =>
    isRegistering ? (
      <MultiStepForm onFinishRegister={() => setIsRegistering(false)} />
    ) : (
      <LoginForm
        onLoginSuccess={() => {
          setIsLoggedIn(true);
          navigate('/'); // Navigate to HomePage after login
        }}
        onRegisterClick={() => setIsRegistering(true)}
      />
    );

  const ProtectedRoute = ({ children }) =>
    isLoggedIn ? children : <Navigate to="/login" replace />;

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<AuthPage />} />
      <Route path="/register" element={<AuthPage />} />

      {/* Protected Layout */}
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="tasks"
          element={
            <ProtectedRoute>
              <TasksPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="summary"
          element={
            <ProtectedRoute>
              <SummaryPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;