'use client';

import { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import TaskList from './TaskList';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import TaskProgressChart from './TaskProgressChart';
import Link from 'next/link'; // Import the Link component

export interface Task {
  id: number;
  text: string;
  priority: 'Low' | 'Medium' | 'High';
  completed: boolean;
  dueDate: string;
}

interface Props {
  tasks: Task[];
}

export const ActivityHeatmap: React.FC<Props> = ({ tasks }) => {
  const values = tasks
    .filter((t) => t.completed && t.dueDate)
    .reduce<Record<string, number>>((acc, t) => {
      acc[t.dueDate] = (acc[t.dueDate] || 0) + 1;
      return acc;
    }, {});

  const heatmapValues = Object.entries(values).map(([date, count]) => ({
    date,
    count,
  }));

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 90);

  return (
    <>
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={heatmapValues}
        classForValue={(value: { date: string; count?: number } | null) => {
          if (!value || value.count === undefined) return 'color-empty';
          if (value.count >= 4) return 'color-scale-4';
          if (value.count === 3) return 'color-scale-3';
          if (value.count === 2) return 'color-scale-2';
          return 'color-scale-1';
        }}
        showWeekdayLabels
      />
      <style jsx global>{`
        .color-empty {
          fill: #ebedf0;
        }
        .color-scale-1 {
          fill: #c6e48b;
        }
        .color-scale-2 {
          fill: #7bc96f;
        }
        .color-scale-3 {
          fill: #239a3b;
        }
        .color-scale-4 {
          fill: #196127;
        }
      `}</style>
    </>
  );
};

const DashboardWrapper: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('tasks');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const completionPercent = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <section className="max-w-6xl mx-auto px-4 py-6 space-y-6 bg-black text-white min-h-screen">
      {/* Header */}
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
        <p>
          You have completed {completedCount} out of {totalCount} tasks.
        </p>
        <p className="text-sm text-gray-400">
          {completionPercent}% done! Keep pushing, you're getting there!
        </p>
      </header>

      {/* Links */}
      <div className="flex justify-between items-center">
        <Link href="/tasks" className="text-blue-500 underline">
          View Your Tasks
        </Link>
        <Link href="/tasks" className="text-blue-500 underline">
          Task Completion
        </Link>
        <Link href="/summary" className="text-blue-500 underline">
          Summarize PDF
        </Link>
        <Link href="/timer" className="text-blue-500 underline">
          Focus Timer
        </Link>
        <Link href="/flashcards" className="text-blue-500 underline"> {/* New Link for Flashcards */}
          Flashcards
        </Link>
      </div>

      {/* Legend */}
      <div className="flex gap-4 items-center text-sm">
        <span className="text-blue-500">● Completed</span>
        <span className="text-gray-400">● Incomplete</span>
      </div>

      {/* Dashboard Component */}
      <Dashboard taskData={tasks} />

      {/* Grid for Progress Chart and Heatmap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TaskProgressChart tasks={tasks} />
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-black">Activity Heatmap (Last 90 Days)</h2>
          <ActivityHeatmap tasks={tasks} />
        </div>
      </div>

      {/* Task List */}
      <div className="mt-10">
        <TaskList tasks={tasks} setTasks={setTasks} />
      </div>
    </section>
  );
};

export default DashboardWrapper;