import React from 'react';
import TaskList from '../components/TaskList';
import { Link } from 'react-router-dom';

function TasksPage() {
  return (
    <div className="p-8 bg-purple-900 min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-4">Tasks</h2>
      <TaskList />
      <Link to="/dashboard" className="mt-6 inline-block bg-white text-black px-4 py-2 rounded shadow">
        Back to Dashboard
      </Link>
    </div>
  );
}

export default TasksPage;
