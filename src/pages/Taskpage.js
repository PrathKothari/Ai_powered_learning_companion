import React from 'react';
import TaskList from '../components/TaskList';
import { Link } from 'react-router-dom';
import DarkModeToggle from '../components/DarkModeToggle';

const TaskPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-blue-700">Task Manager</h1>
        <DarkModeToggle />
      </header>

      {/* Task List */}
      <main className="px-6 py-8">
        <TaskList />
      </main>

      {/* Footer Navigation */}
      <footer className="text-center py-6">
        <Link
          to="/dashboard"
          className="inline-block bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
        >
          Back to Dashboard
        </Link>
      </footer>
    </div>
  );
};

export default TaskPage;
