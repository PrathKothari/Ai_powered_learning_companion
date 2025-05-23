'use client';

import { useEffect, useState } from 'react';
import TaskList from '../../components/TaskList';
import TaskProgressChart from '../../components/TaskProgressChart';
import ActivityHeatmap from '../../components/ActivityHeatmap';
import { useRouter } from 'next/navigation';

export interface Task {
  id: number;
  text: string;
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High';
  completed: boolean;
}

export default function TasksPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.replace('/login');
      return;
    }

    const stored = localStorage.getItem('tasks');
    setTasks(stored ? JSON.parse(stored) : []);
  }, [router]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks, isClient]);

  if (!isClient) return <div className="p-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold text-indigo-700">Task Manager</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <TaskProgressChart tasks={tasks} />
        <ActivityHeatmap tasks={tasks} />
      </div>

      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
