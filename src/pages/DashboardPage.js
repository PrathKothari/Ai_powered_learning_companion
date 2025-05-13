import { motion } from 'framer-motion';
import Timer from '../components/Timer';
import Dashboard from '../components/Dashboard';
import MotivationalMessage from '../components/MotivationalMessage';
import { useTimer } from '../contexts/TimerContext';
import { useTask } from '../contexts/TaskContext';

const DashboardPage = () => {
  const { todayStudyTime } = useTimer();
  const { tasks } = useTask();
  
  const completedTasksPercentage = 
    tasks.length > 0 
      ? (tasks.filter(task => task.completed).length / tasks.length) * 100 
      : 0;
  
  // Calculate study time in minutes for the motivational message
  const studyTimeMinutes = Math.floor(todayStudyTime / 60);
  
  return (
    <div className="max-w-5xl mx-auto">
      <motion.h1 
        className="text-2xl md:text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Dashboard
      </motion.h1>
      
      <div className="mb-6">
        <MotivationalMessage 
          taskCompletion={completedTasksPercentage} 
          studyTime={studyTimeMinutes}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Timer />
        </motion.div>
        
        <motion.div 
          className="lg:col-span-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Dashboard />
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;