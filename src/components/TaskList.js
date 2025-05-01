import React, { useState } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Read a chapter', completed: false },
    { id: 2, text: 'Solve 3 math problems', completed: true },
    { id: 3, text: 'Revise yesterday’s notes', completed: false }
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
      <ul className="space-y-2">
        {tasks.map(task => (
          <li
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={`cursor-pointer p-2 rounded-lg transition duration-200 ${
              task.completed ? 'bg-green-100 line-through text-gray-500' : 'bg-gray-100'
            }`}
          >
            {task.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;