import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TaskList = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("All");

  const [newTask, setNewTask] = useState({
    text: '',
    dueDate: '',
    priority: 'Medium'
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const addTask = () => {
    if (!newTask.text.trim()) return;
    const task = {
      id: Date.now(),
      ...newTask,
      completed: false
    };
    setTasks(prev => [...prev, task]);
    setNewTask({ text: '', dueDate: '', priority: 'Medium' });
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "Completed") return task.completed;
    if (filter === "Incomplete") return !task.completed;
    return true;
  });

  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl w-full max-w-xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-indigo-700">Task Manager</h2>

      {/* Add Task Form */}
      <div className="space-y-3">
        <input
          name="text"
          value={newTask.text}
          onChange={handleInputChange}
          placeholder="Enter task..."
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <div className="flex gap-3">
          <input
            name="dueDate"
            type="date"
            value={newTask.dueDate}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-lg w-1/2"
          />
          <select
            name="priority"
            value={newTask.priority}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-lg w-1/2"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <button
          onClick={addTask}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Add Task
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex justify-between items-center mt-4">
        <label className="text-sm font-medium text-gray-700">Filter Tasks:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded-lg text-sm"
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
        </select>
      </div>

      {/* Task List */}
      <ul className="space-y-3 mt-2">
        {filteredTasks.map(task => (
          <motion.li
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex justify-between items-center p-4 rounded-xl shadow-sm cursor-pointer transition-all duration-200 ${
              task.completed ? 'bg-green-100 line-through text-gray-500' :
              {
                Low: 'bg-gray-100',
                Medium: 'bg-yellow-100',
                High: 'bg-red-100',
              }[task.priority]
            }`}
          >
            <div>
              <div className="font-semibold text-lg">{task.text}</div>
              <div className="text-sm text-gray-600">
                📅 Due: {task.dueDate || 'No due date'}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  task.priority === 'High' ? 'bg-red-500 text-white' :
                  task.priority === 'Medium' ? 'bg-yellow-500 text-white' :
                  'bg-gray-400 text-white'
                }`}
              >
                {task.priority}
              </span>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="h-5 w-5 accent-indigo-600"
              />
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
