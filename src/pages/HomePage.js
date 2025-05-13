import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-purple-900 text-white">
      <h1 className="text-4xl font-bold mb-6">AI Learning Companion</h1>
      <Link to="/dashboard" className="bg-white text-black px-4 py-2 rounded shadow">
        Go to Dashboard
      </Link>
    </div>
  );
}

export default HomePage;
