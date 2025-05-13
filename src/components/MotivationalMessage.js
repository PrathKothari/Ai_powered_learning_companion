import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MotivationalMessage = ({ taskCompletion, studyTime }) => {
  const [message, setMessage] = useState('');

  const messages = {
    start: [
      "Let's focus on one task at a time!",
      "Small steps lead to big achievements.",
      "Today is a great day to make progress!",
      "Your brain is capable of amazing things.",
      "Remember to celebrate small victories!"
    ],
    progress: [
      "You're making great progress!",
      "Keep up the good work!",
      "Your focus is paying off!",
      "You're doing better than you think!",
      "Each minute of focus builds your success!"
    ],
    achievement: [
      "Incredible work today!",
      "You're crushing it!",
      "Your dedication is inspiring!",
      "Look at all you've accomplished!",
      "You've made amazing progress today!"
    ]
  };

  const getCategory = () => {
    if (taskCompletion < 30 || studyTime < 15) return 'start';
    if (taskCompletion < 70 || studyTime < 45) return 'progress';
    return 'achievement';
  };

  const generateMessage = () => {
    const category = getCategory();
    const categoryMessages = messages[category];
    const randomIndex = Math.floor(Math.random() * categoryMessages.length);
    return categoryMessages[randomIndex];
  };

  useEffect(() => {
    setMessage(prev => {
      const newCategory = getCategory();
      const currentCategoryMessages = messages[newCategory];
      // Avoid changing if already in the same category
      if (currentCategoryMessages.includes(prev)) return prev;
      return generateMessage();
    });
  }, [taskCompletion, studyTime]);

  const refreshMessage = () => {
    setMessage(generateMessage());
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={message}
          className="bg-white dark:bg-gray-800 border-l-4 border-accent-500 p-4 rounded-r-lg shadow-sm"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-gray-700 dark:text-gray-300">{message}</p>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={refreshMessage}
        className="absolute top-2 right-2 text-xs text-accent-600 dark:text-accent-400 hover:underline"
      >
        Refresh
      </button>
    </div>
  );
};

export default MotivationalMessage;