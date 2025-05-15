// DashboardPage.js (Updated with scroll support and layout fix)
import React from 'react';
import Timer from '../components/Timer';
import Dashboard from '../components/Dashboard';
import { Link, useNavigate } from 'react-router-dom';
import DarkModeToggle from '../components/DarkModeToggle';

function DashboardPage({ onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    if (onLogout) onLogout();
    navigate('/');
  };

  return (
    <div className="main-container bg-gradient-to-br from-indigo-100 to-purple-200 text-gray-900 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-indigo-700">AI-Powered Learning Companion</h1>
        <div className="flex items-center gap-4">
          <DarkModeToggle />
          <button
            onClick={handleLogoutClick}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Timer Section */}
      <section className="px-6 py-8">
        <h2 className="text-xl font-semibold text-indigo-700 mb-2">Focus Timer</h2>
        <Timer
          focusTime={25}
          breakTime={5}
          onFocusComplete={() => console.log("Focus session complete")}
          onBreakComplete={() => console.log("Break session complete")}
        />
      </section>

      {/* Dashboard Cards */}
      <section className="px-6 py-4">
        <Dashboard />
      </section>

      {/* Footer Navigation */}
      <footer className="text-center py-6 flex flex-wrap justify-center gap-4">
        <Link
          to="/tasks"
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
        >
          Go to Tasks
        </Link>
        <Link
          to="/summary"
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
        >
          View Summary
        </Link>
        <Link
          to="/flashcards"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Flashcards
        </Link>
        <Link
          to="/community"
          className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 transition"
        >
          Join Community
        </Link>
      </footer>
    </div>
  );
}

export default DashboardPage;
