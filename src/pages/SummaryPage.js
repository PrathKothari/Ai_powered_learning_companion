import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SummaryPage = ({ studyData = {}, taskData = [] }) => {
  const navigate = useNavigate();

  const totalTasks = taskData.length;
  const completedTasks = taskData.filter(task => task.completedTime >= task.totalTime).length;
  const averageTaskCompletion = taskData.length
    ? taskData.reduce((sum, task) => sum + (task.completedTime / task.totalTime) * 100, 0) / taskData.length
    : 0;

  const totalStudyTime = studyData.totalTimeSpent ?? 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Your Study Summary</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
          <motion.div
            className="bg-indigo-50 rounded-lg p-4 shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="text-lg font-semibold">Total Study Time</h4>
            <p className="text-2xl mt-2">{totalStudyTime} minutes</p>
          </motion.div>

          <motion.div
            className="bg-indigo-50 rounded-lg p-4 shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h4 className="text-lg font-semibold">Tasks Completed</h4>
            <p className="text-2xl mt-2">
              {completedTasks}/{totalTasks}
            </p>
          </motion.div>

          <motion.div
            className="bg-indigo-50 rounded-lg p-4 shadow md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h4 className="text-lg font-semibold">Average Task Completion</h4>
            <p className="text-2xl mt-2">{averageTaskCompletion.toFixed(1)}%</p>
          </motion.div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;

