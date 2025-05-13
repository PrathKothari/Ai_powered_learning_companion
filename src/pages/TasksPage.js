import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import TaskList from '../components/TaskList';

const TasksPage = () => {
  return (
    <div className="max-w-3xl mx-auto">
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
          Task Management
        </motion.h1>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <TaskList />
      </motion.div>
      
      <motion.div 
        className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-lg font-semibold mb-4">Task Management Tips</h2>
        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
          <li className="flex items-start">
            <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 p-1 rounded-full mr-2 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </span>
            <span>Break large tasks into smaller, manageable subtasks</span>
          </li>
          <li className="flex items-start">
            <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 p-1 rounded-full mr-2 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </span>
            <span>Prioritize tasks based on due dates and importance</span>
          </li>
          <li className="flex items-start">
            <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 p-1 rounded-full mr-2 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </span>
            <span>Use the timer to focus on one task at a time</span>
          </li>
          <li className="flex items-start">
            <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 p-1 rounded-full mr-2 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </span>
            <span>Celebrate completing tasks, even small ones</span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default TasksPage;