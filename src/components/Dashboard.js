import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PB from './PB';
import TaskList from "./TaskList";

const Dashboard = ({ studyData = {}, taskData = [] }) => {
  const navigate = useNavigate();

  const taskProgress = taskData.map((task) => ({
    taskName: task.name,
    progress: (task.completedTime / task.totalTime) * 100,
  }));

  const handleSummaryNavigation = () => {
    navigate("/summary");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-indigo-600">Dashboard</h2>
        <button
          onClick={handleSummaryNavigation}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Go to Summary
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Study Progress */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Study Progress</h3>
          <p className="text-gray-600 mb-4">
            Total Time Spent: <span className="font-medium">{studyData.totalTimeSpent ?? 0}</span> minutes
          </p>
          <PB percentage={(studyData.totalTimeSpent ?? 0) / 120 * 100} />
        </div>

        {/* Task Progress */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Task Progress</h3>
          {taskProgress.map((task, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="mb-4"
            >
              <p className="font-medium text-gray-700">{task.taskName}</p>
              <PB percentage={task.progress} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Task List</h3>
        <TaskList />
      </div>
    </div>
  );
};

export default Dashboard;
