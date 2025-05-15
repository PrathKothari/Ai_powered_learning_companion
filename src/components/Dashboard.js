import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { motion } from 'framer-motion';
import 'react-circular-progressbar/dist/styles.css';
import { format } from 'date-fns';
import { FaListAlt, FaChartLine, FaCalendarAlt, FaFileAlt } from 'react-icons/fa';
import SectionHeading from './SectionHeading'; 
import Card from './Card';
import PB from './PB';
import TaskList from './TaskList';
import MotivationalMessage from './MotivationalMessage';
import StreakCalendar from './StreakCalendar';
import DocumentUploader from './DocumentUploader';

const Dashboard = ({ studyData = {}, taskData = [] }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const totalStudyTime = studyData.totalTimeSpent ?? 0;
  const studyProgress = (totalStudyTime / 120) * 100;

  const taskProgress = taskData.map((task) => ({
    taskName: task.name,
    progress: (task.completedTime / task.totalTime) * 100,
  }));

  const completedTasks = taskProgress.filter((task) => task.progress >= 100).length;
  const todayDate = format(new Date(), 'yyyy-MM-dd');
  const todayTasks = taskData.filter(task => task.dueDate === todayDate);
  const activityDates = [...new Set(
    taskData.filter(task => task.completedTime > 0).map(task => task.dueDate)
  )];

  const handleSummaryNavigation = () => {
    navigate("/summary");
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: <FaChartLine /> },
    { id: "tasks", label: "Tasks", icon: <FaListAlt /> },
    { id: "activity", label: "Activity", icon: <FaCalendarAlt /> },
    { id: "summary", label: "Doc Summary", icon: <FaFileAlt /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Tabs Navigation */}
        <div className="flex justify-center space-x-6 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              <Card title="Today’s Focus">
                <p className="text-2xl">⏱️ {totalStudyTime} min</p>
              </Card>
              <Card title="Tasks Due Today">
                <p className="text-2xl">📌 {todayTasks.length}</p>
              </Card>
              <Card title="Streak">
                <p className="text-2xl">🔥 4 days</p>
              </Card>
            </div>

            <motion.div
              className="bg-indigo-100 text-indigo-800 p-4 rounded-xl shadow mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              🎉 Keep going! You’re on a roll today!
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="Study Progress">
                <div className="flex items-center gap-4">
                  <div className="w-24">
                    <CircularProgressbar
                      value={studyProgress}
                      text={`${Math.round(studyProgress)}%`}
                      styles={buildStyles({
                        textColor: "#4A90E2",
                        pathColor: "#4A90E2",
                        trailColor: "#d6d6d6"
                      })}
                    />
                  </div>
                  <div>
                    <p className="text-gray-700">
                      Total Study Time: <span className="font-semibold">{totalStudyTime} mins</span>
                    </p>
                    {totalStudyTime >= 30 && (
                      <div className="text-green-600 font-medium mt-2">
                        🎉 Great work! Keep going!
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              <Card title="Task Progress">
                {taskProgress.length === 0 ? (
                  <p className="text-gray-500">No tasks added yet.</p>
                ) : (
                  taskProgress.map((task, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="mb-4"
                    >
                      <p className="font-medium text-gray-700">{task.taskName}</p>
                      <PB percentage={task.progress} />
                    </motion.div>
                  ))
                )}
                <MotivationalMessage tasksCompleted={completedTasks} />
              </Card>
            </div>
          </>
        )}

        {activeTab === "tasks" && (
          <Card title="✅ Your Task List">
            <TaskList />
          </Card>
        )}

        {activeTab === "activity" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="🧠 Suggested Action">
              {todayTasks.length > 0 ? (
                <p>Continue Task: <strong>{todayTasks[0].text}</strong></p>
              ) : (
                <p>Use Pomodoro Timer for 25 min session</p>
              )}
            </Card>

            <Card title="Activity Streak">
              <StreakCalendar activity={activityDates} />
            </Card>
          </div>
        )}

        {activeTab === "summary" && (
          <Card title="📄 Upload Document for Summary">
            <DocumentUploader />
          </Card>
        )}

        {/* Bottom Navigation Buttons */}
        <div className="text-center mt-10 space-x-4">
          <button
            onClick={handleSummaryNavigation}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Go to Summary
          </button>
          <Link
            to="/community"
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Join Community 💬
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
