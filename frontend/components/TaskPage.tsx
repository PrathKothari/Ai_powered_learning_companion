'use client';

import { useState, useEffect } from 'react';
import TaskList from './TaskList';  // Your existing task list component
import TaskProgressChart from './TaskProgressChart';
import ActivityHeatmap from './ActivityHeatmap';

interface Task {
  id: number;
  text: string;
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High';
  completed: boolean;
}

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tasks');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">Your Tasks</h1>

      <TaskList tasks={tasks} setTasks={setTasks} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <TaskProgressChart tasks={tasks} />
        <ActivityHeatmap tasks={tasks} />
      </div>
    </div>
  );
};

export default TasksPage;
