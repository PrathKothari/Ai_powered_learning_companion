import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, CheckCircle, BarChart2, Calendar } from 'lucide-react';
import { useTimer } from '../contexts/TimerContext';
import { useTask } from '../contexts/TaskContext';
import ProgressBar from '../components/PB';

const SummaryPage = () => {
  const { totalStudyTime, todayStudyTime, weeklyStudyTime, studySessions } = useTimer();
  const { tasks } = useTask();
  
  const completedTasks = tasks.filter(task => task.completed);
  const completionRate = tasks.length > 0 
    ? Math.round((completedTasks.length / tasks.length) * 100) 
    : 0;
  
  // Format time helpers
  const formatHours = (seconds) => {
    const hours = seconds / 3600;
    return hours.toFixed(1);
  };
  
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };
  
  // Calculate statistics
  const averageSessionLength = studySessions.length > 0
    ? Math.round(totalStudyTime / studySessions.length)
    : 0;
  
  const averageTasksPerDay = completedTasks.length > 0
    ? (completedTasks.length / (Math.max(1, studySessions.length / 2))).toFixed(1)
    : 0;
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Link 
          to="/dashboard"
          className="mr-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Back to dashboard"
        >
          <ArrowLeft size={20} />
        </Link>
        <motion.h1 
          className="text-2xl md:text-3xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Study Summary
        </motion.h1>
      </div>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {/* Total Study Time */}
        <motion.div variants={item} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Study Time</p>
              <p className="mt-2 text-3xl font-bold">{formatHours(totalStudyTime)}h</p>
            </div>
            <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
              <Clock size={24} />
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Across {studySessions.length} sessions
          </p>
        </motion.div>
        
        {/* Tasks Completed */}
        <motion.div variants={item} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tasks Completed</p>
              <p className="mt-2 text-3xl font-bold">{completedTasks.length}</p>
            </div>
            <div className="p-3 rounded-full bg-success-500/20 text-success-600 dark:text-success-500">
              <CheckCircle size={24} />
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {completionRate}% completion rate
          </p>
        </motion.div>
        
        {/* Weekly Study Time */}
        <motion.div variants={item} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Weekly Study</p>
              <p className="mt-2 text-3xl font-bold">{formatHours(weeklyStudyTime)}h</p>
            </div>
            <div className="p-3 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400">
              <Calendar size={24} />
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {formatTime(todayStudyTime)} today
          </p>
        </motion.div>
        
        {/* Average Session */}
        <motion.div variants={item} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Session</p>
              <p className="mt-2 text-3xl font-bold">{formatTime(averageSessionLength)}</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
              <BarChart2 size={24} />
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {averageTasksPerDay} tasks per day
          </p>
        </motion.div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
      >
        {/* Weekly Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Weekly Progress</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm font-medium mb-1">
                <span>Study Goal (10h / week)</span>
                <span>{Math.min(Math.round((weeklyStudyTime / 36000) * 100), 100)}%</span>
              </div>
              <ProgressBar 
                percentage={Math.min((weeklyStudyTime / 36000) * 100, 100)} 
                color="primary" 
                showPercentage={false} 
              />
            </div>
            
            <div>
              <div className="flex justify-between text-sm font-medium mb-1">
                <span>Task Completion</span>
                <span>{completionRate}%</span>
              </div>
              <ProgressBar 
                percentage={completionRate} 
                color="success" 
                showPercentage={false} 
              />
            </div>
            
            <div>
              <div className="flex justify-between text-sm font-medium mb-1">
                <span>Daily Goal Progress</span>
                <span>{Math.min(Math.round((todayStudyTime / 7200) * 100), 100)}%</span>
              </div>
              <ProgressBar 
                percentage={Math.min((todayStudyTime / 7200) * 100, 100)} 
                color="accent" 
                showPercentage={false} 
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Goal: 2 hours of focused study time per day
              </p>
            </div>
          </div>
        </div>
        
        {/* Study Insights */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Study Insights</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Optimal Study Time</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Your average focus session lasts {formatTime(averageSessionLength)}. Consider setting your timer to this length for best results.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-success-500/20 text-success-600 dark:text-success-500 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 011.745-.723z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Task Completion Rate</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  You're on track! With {completionRate}% tasks completed, try setting a target for next week to reach 100%!
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SummaryPage;