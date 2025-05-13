import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Timer, ListChecks, BarChart2, Moon } from 'lucide-react';

const features = [
  {
    icon: <Timer size={24} />,
    title: 'Pomodoro Timer',
    description: 'Customize focus and break sessions to match your optimal study rhythm.',
    color: 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400',
    link: '/dashboard'
  },
  {
    icon: <ListChecks size={24} />,
    title: 'Task Management',
    description: 'Create, prioritize, and complete tasks to stay organized and on track.',
    color: 'bg-success-500/20 text-success-600 dark:text-success-500',
    link: '/tasks'
  },
  {
    icon: <BarChart2 size={24} />,
    title: 'Progress Tracking',
    description: 'Visualize your productivity and celebrate your accomplishments.',
    color: 'bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400',
    link: '/summary'
  },
  {
    icon: <Moon size={24} />,
    title: 'Dark Mode',
    description: 'Customize your visual experience to reduce eye strain during long sessions.',
    color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    link: '/dashboard'
  }
];

const HomePage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          FocusFlow
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Your personalized ADHD learning companion to help you stay focused and organized.
        </p>
        <motion.button
          onClick={() => navigate('/dashboard')}
          className="mt-8 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Go to Dashboard
        </motion.button>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
            whileHover={{ y: -5 }}
            onClick={() => navigate(feature.link)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
          >
            <div className={`p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 ${feature.color}`}>
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-8 text-center mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-4">Why FocusFlow?</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Designed specifically for students with ADHD, FocusFlow combines proven productivity
          techniques with an intuitive interface to help you achieve your learning goals.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Structured Focus</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Break down study sessions into manageable chunks with our customizable timer.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Visual Progress</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              See your accomplishments through intuitive progress tracking and visualizations.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Positive Reinforcement</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Motivational messages and achievement tracking to keep you engaged.
            </p>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <p className="text-gray-600 dark:text-gray-300 italic mb-6">
          "The key is not to prioritize what's on your schedule, but to schedule your priorities."
          <br />
          <span className="font-medium">— Stephen Covey</span>
        </p>
        <motion.button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Start Using FocusFlow</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default HomePage;