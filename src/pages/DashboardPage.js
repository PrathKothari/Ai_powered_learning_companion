import React from 'react';
import Timer from '../components/Timer';
import Dashboard from '../components/Dashboard';
import { Link } from 'react-router-dom';

function DashboardPage() {
  return (
    <div className="p-8 bg-purple-900 min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
      <Timer focusTime={25} breakTime={5} />
      <Dashboard />
      <Link to="/tasks" className="mt-6 inline-block bg-white text-black px-4 py-2 rounded shadow">
        Go to Tasks
      </Link>
    </div>
  );
}

export default DashboardPage;
