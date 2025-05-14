import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

const SummaryPage = ({ studyData = {}, taskData = [] }) => {
  const navigate = useNavigate();

  const totalTasks = taskData.length;
  const completedTasks = taskData.filter(task => task.completedTime >= task.totalTime).length;
  const averageTaskCompletion = taskData.length
    ? taskData.reduce((sum, task) => sum + (task.completedTime / task.totalTime) * 100, 0) / taskData.length
    : 0;

  const totalStudyTime = studyData.totalTimeSpent ?? 0;

  const performanceTag = averageTaskCompletion >= 75
    ? { text: 'Excellent!', color: 'bg-green-100 text-green-700' }
    : averageTaskCompletion >= 50
    ? { text: 'Good', color: 'bg-yellow-100 text-yellow-700' }
    : { text: 'Needs Improvement', color: 'bg-red-100 text-red-700' };

  const chartData = taskData.map(task => ({
    name: task.name || 'Task',
    completion: Math.min(
      Math.round((task.completedTime / task.totalTime) * 100),
      100
    )
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <motion.div
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Your Study Summary</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
          <motion.div
            className="bg-indigo-50 rounded-lg p-6 shadow text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h4 className="text-lg font-semibold">Total Study Time</h4>
            <p className="text-3xl font-bold mt-2 text-indigo-700">
              {totalStudyTime} minutes
            </p>
          </motion.div>

          <motion.div
            className="bg-indigo-50 rounded-lg p-6 shadow text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <h4 className="text-lg font-semibold">Tasks Completed</h4>
            <p className="text-3xl font-bold mt-2 text-indigo-700">
              {completedTasks}/{totalTasks}
            </p>
          </motion.div>

          <motion.div
            className="bg-indigo-50 rounded-lg p-6 shadow md:col-span-2 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <h4 className="text-lg font-semibold">Average Task Completion</h4>
            <p className="text-3xl font-bold mt-2 text-indigo-700">
              {averageTaskCompletion.toFixed(1)}%
            </p>
            <span className={`inline-block mt-3 px-4 py-1 rounded-full text-sm font-medium ${performanceTag.color}`}>
              {performanceTag.text}
            </span>
          </motion.div>
        </div>

        {/* Chart Section */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold text-indigo-700 mb-4">Task Completion Overview</h3>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis unit="%" />
                <Tooltip />
                <Bar dataKey="completion" fill="#4A90E2" radius={[6, 6, 0, 0]}>
                  <LabelList dataKey="completion" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500">No task data to display.</p>
          )}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SummaryPage;
