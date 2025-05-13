// src/components/TaskList.js
import React, { useState } from 'react';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete assignment', done: false },
    { id: 2, title: 'Read for 20 mins', done: true },
  ]);
  const [newTask, setNewTask] = useState('');

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks((prev) => [
        ...prev,
        { id: Date.now(), title: newTask.trim(), done: false },
      ]);
      setNewTask('');
    }
  };

  return (
    <div className="tasklist-container">
      <h3>Your To-Do List</h3>
      <div className="tasklist-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul className="tasklist-ul">
        {tasks.map((task) => (
          <li key={task.id} className={task.done ? 'done' : ''}>
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              {task.title}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;