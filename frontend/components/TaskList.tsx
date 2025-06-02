'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Task } from './DashboardWrapper';

interface TaskListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks }) => {
  const [filter, setFilter] = useState('All');
  const [newTask, setNewTask] = useState({
    text: '',
    dueDate: '',
    priority: 'Medium' as 'Low' | 'Medium' | 'High'
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const addTask = () => {
    if (!newTask.text.trim()) return;

    const task: Task = {
      id: Date.now(),
      text: newTask.text,
      dueDate: newTask.dueDate,
      priority: newTask.priority,
      completed: false
    };

    setTasks(prev => [...prev, task]);
    setNewTask({ text: '', dueDate: '', priority: 'Medium' });
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Completed') return task.completed;
    if (filter === 'Incomplete') return !task.completed;
    return true;
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl w-full space-y-6 text-gray-800">
      {/* Added text-gray-800 here */}
      <h2 className="text-2xl font-bold text-indigo-700">Task Manager</h2>

      {/* Task Input */}
      <div className="space-y-3">
        <input
          name="text"
          value={newTask.text}
          onChange={handleInputChange}
          placeholder="Enter task..."
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-800"
        />
        <div className="flex gap-3">
          <input
            name="dueDate"
            type="date"
            value={newTask.dueDate}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-lg w-1/2 text-gray-800"
          />
          <select
            name="priority"
            value={newTask.priority}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-lg w-1/2 text-gray-800"
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

      {/* Filter */}
      <div className="flex justify-between items-center mt-4 text-gray-700">
        <label className="text-sm font-medium">Filter:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded-lg text-sm text-gray-800"
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
        </select>
      </div>

      {/* Task Display */}
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
            } text-gray-800`}
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