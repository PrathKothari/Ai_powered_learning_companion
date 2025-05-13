import { motion } from 'framer-motion';

const ProgressBar = ({ 
  percentage, 
  color = 'primary', 
  size = 'md', 
  showPercentage = true 
}) => {
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const colorClasses = {
    primary: 'bg-primary-500',
    accent: 'bg-accent-500',
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    error: 'bg-error-500',
  };

  const bgColorClasses = {
    primary: 'bg-primary-100 dark:bg-primary-900/30',
    accent: 'bg-accent-100 dark:bg-accent-900/30',
    success: 'bg-success-500/20',
    warning: 'bg-warning-500/20',
    error: 'bg-error-500/20',
  };

  const colorClass = colorClasses[color] || colorClasses.primary;
  const bgColorClass = bgColorClasses[color] || bgColorClasses.primary;
  const heightClass = sizeClasses[size] || sizeClasses.md;

  // Ensure percentage is between 0 and 100
  const safePercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <div className="w-full">
      {showPercentage && (
        <div className="flex justify-between mb-1 text-sm font-medium">
          <span>Progress</span>
          <span>{Math.round(safePercentage)}%</span>
        </div>
      )}
      <div className={`w-full ${heightClass} rounded-full overflow-hidden ${bgColorClass}`}>
        <motion.div 
          className={`${heightClass} ${colorClass} rounded-full`}
          initial={{ width: '0%' }}
          animate={{ width: `${safePercentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;