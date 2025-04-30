import React from 'react';
import { motion } from 'framer-motion';
import PB from './PB'; 

const Dashboard = ({ studyData, taskData }) => {
  const taskProgress = taskData.map((task) => ({
    taskName: task.name,
    progress: (task.completedTime / task.totalTime) * 100,
  }));

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <h3>Study Progress</h3>
        <p>Total Time Spent: {studyData.totalTimeSpent} minutes</p>
        {/* Animated progress bar */}
        <PB percentage={(studyData.totalTimeSpent / 120) * 100} />
      </div>
      <div>
        <h3>Tasks</h3>
        {taskProgress.map((task, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            <p>{task.taskName}</p>
            <PB percentage={task.progress} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
