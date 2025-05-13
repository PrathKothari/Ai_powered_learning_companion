import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, Trash2, CheckCircle, Circle, Clock } from 'lucide-react';
import { useTask } from '../contexts/TaskContext';

const TaskList = () => {
  const { tasks, addTask, removeTask, toggleTask, updateTask } = useTask();
  const [newTask, setNewTask] = useState({
    title: '',
    dueDate: '',
    priority: 'medium',
  });
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.title.trim()) {
      addTask({
        ...newTask,
        title: newTask.title.trim(),
      });
      setNewTask({ title: '', dueDate: '', priority: 'medium' });
      setIsAdding(false);
    }
  };

  const priorityColors = {
    low: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };

  const filterOptions = ['All', 'Active', 'Completed'];
  const [filter, setFilter] = useState('All');

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Active') return !task.completed;
    if (filter === 'Completed') return task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;

    if (!a.completed && !b.completed) {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }

    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }

    if (a.dueDate && !b.dueDate) return -1;
    if (!a.dueDate && b.dueDate) return 1;

    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">My Tasks</h2>
        <motion.button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PlusCircle size={18} />
          <span>Add Task</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Task
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="What do you need to study?"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-800"
                  autoFocus
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    id="dueDate"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-800"
                  />
                </div>

                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Priority
                  </label>
                  <select
                    id="priority"
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-800"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                >
                  Add Task
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
        {filterOptions.map((option) => (
          <button
            key={option}
            onClick={() => setFilter(option)}
            className={`px-4 py-2 text-sm font-medium ${
              filter === option
                ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500 dark:border-primary-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {sortedTasks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No tasks to show.</p>
          {filter !== 'All' && (
            <button
              onClick={() => setFilter('All')}
              className="mt-2 text-primary-500 dark:text-primary-400 hover:underline"
            >
              Show all tasks
            </button>
          )}
        </div>
      ) : (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          <AnimatePresence>
            {sortedTasks.map((task) => (
              <motion.li
                key={task.id}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className={`py-4 px-1 ${task.completed ? 'opacity-60' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`mt-0.5 flex-shrink-0 ${
                      task.completed
                        ? 'text-success-500 dark:text-success-400'
                        : 'text-gray-400 dark:text-gray-600 hover:text-primary-500 dark:hover:text-primary-400'
                    }`}
                    aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                  >
                    {task.completed ? <CheckCircle size={22} /> : <Circle size={22} />}
                  </button>

                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-base ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
                        {task.title}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[task.priority]}`}>
                        {task.priority}
                      </span>
                    </div>

                    {task.dueDate && (
                      <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                        <Clock size={14} className="mr-1" />
                        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => removeTask(task.id)}
                    className="flex-shrink-0 text-gray-400 hover:text-error-500 dark:text-gray-600 dark:hover:text-error-400"
                    aria-label="Delete task"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
};

export default TaskList;