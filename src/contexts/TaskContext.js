import { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext(undefined);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const addTask = (task) => {
    const newTask = {
      id: Date.now().toString(),
      title: task.title,
      dueDate: task.dueDate,
      priority: task.priority,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const removeTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const updateTask = (id, updates) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        removeTask,
        toggleTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);

  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }

  return context;
};