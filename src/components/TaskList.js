import React, { useState, useEffect } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

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

  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl w-full max-w-xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Task Manager</h2>

      {/* Add Task Form */}
      <div className="space-y-2">
        <input
          name="text"
          value={newTask.text}
          onChange={handleInputChange}
          placeholder="Enter task..."
          className="w-full p-2 border rounded"
        />
        <div className="flex gap-2">
          <input
            name="dueDate"
            type="date"
            value={newTask.dueDate}
            onChange={handleInputChange}
            className="p-2 border rounded w-1/2"
          />
          <select
            name="priority"
            value={newTask.priority}
            onChange={handleInputChange}
            className="p-2 border rounded w-1/2"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <button
          onClick={addTask}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Task
        </button>
      </div>

      {/* Task List */}
      <ul className="space-y-3">
        {tasks.map(task => (
          <li
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={`p-3 rounded-xl border-l-4 cursor-pointer transition duration-200 ${
              task.completed
                ? 'bg-green-100 text-gray-500 line-through border-green-500'
                : {
                    Low: 'bg-gray-100 border-gray-400',
                    Medium: 'bg-yellow-100 border-yellow-500',
                    High: 'bg-red-100 border-red-500',
                  }[task.priority]
            }`}
          >
            <div className="font-semibold">{task.text}</div>
            <div className="text-sm text-gray-600">
              Due: {task.dueDate || 'No due date'} | Priority: {task.priority}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;

