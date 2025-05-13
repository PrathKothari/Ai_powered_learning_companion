import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ProgressBar from './PB';
import { useTimer } from '../contexts/TimerContext';
import { useTask } from '../contexts/TaskContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { totalStudyTime, todayStudyTime, studySessions } = useTimer();
  const { tasks } = useTask();

  const completedTasks = useMemo(() =>
    tasks.filter(task => task.completed), [tasks]
  );

  const completionPercentage = useMemo(() =>
    tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0,
    [tasks.length, completedTasks.length]
  );

  const formatStudyTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div className="space-y-6">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Total Study Time Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Study Time</p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
                {formatStudyTime(totalStudyTime)}
              </p>
            </div>
            <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
              <Clock size={24} />
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Across {studySessions.length} study sessions
          </p>
        </div>

        {/* Today's Study Time Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Today's Study Time</p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
                {formatStudyTime(todayStudyTime)}
              </p>
            </div>
            <div className="p-3 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400">
              <Clock size={24} />
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {todayStudyTime > 0 ? 'Great progress today!' : 'Start your first session!'}
          </p>
        </div>

        {/* Task Completion Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tasks Completed</p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
                {completedTasks.length}/{tasks.length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-success-500/20 text-success-600 dark:text-success-500">
              <CheckCircle size={24} />
            </div>
          </div>
          <div className="mt-4">
            <ProgressBar percentage={completionPercentage} color="success" size="sm" />
          </div>
        </div>
      </motion.div>

      {/* Progress Section */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl shadow p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-lg font-semibold mb-4">Your Progress</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm font-medium mb-1">
              <span>Task Completion</span>
              <span>{Math.round(completionPercentage)}%</span>
            </div>
            <ProgressBar 
              percentage={completionPercentage} 
              color="success" 
              size="md" 
              showPercentage={false} 
            />
          </div>

          <div>
            <div className="flex justify-between text-sm font-medium mb-1">
              <span>Daily Study Goal</span>
              <span>{Math.min(Math.round((todayStudyTime / 3600) * 100), 100)}%</span>
            </div>
            <ProgressBar 
              percentage={Math.min((todayStudyTime / 3600) * 100, 100)} 
              color="primary" 
              size="md" 
              showPercentage={false} 
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Goal: 1 hour of focused study time
            </p>
          </div>
        </div>
      </motion.div>

      {/* Actions Section */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <button
          onClick={() => navigate('/tasks')}
          className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 rounded-xl shadow border-2 border-transparent hover:border-primary-200 dark:hover:border-primary-900 transition-colors"
        >
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mr-4">
              <CheckCircle size={24} />
            </div>
            <div>
              <h3 className="font-medium">Manage Tasks</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Add or complete your study tasks
              </p>
            </div>
          </div>
          <ArrowRight className="text-gray-400" size={20} />
        </button>

        <button
          onClick={() => navigate('/summary')}
          className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 rounded-xl shadow border-2 border-transparent hover:border-accent-200 dark:hover:border-accent-900 transition-colors"
        >
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">View Summary</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Check your study statistics
              </p>
            </div>
          </div>
          <ArrowRight className="text-gray-400" size={20} />
        </button>
      </motion.div>
    </div>
  );
};

export default Dashboard;