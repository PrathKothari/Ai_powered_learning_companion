'use client';

import { Task } from './DashboardWrapper';
import { useRouter } from 'next/navigation';

interface DashboardProps {
  taskData: Task[];
}

const Dashboard: React.FC<DashboardProps> = ({ taskData }) => {
  const router = useRouter();

  const completedTasks = taskData.filter(task => task.completed).length;
  const totalTasks = taskData.length;
  const progressPercent = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/login');
  };

  const goToTasks = () => {
    router.push('/tasks'); // Adjust if your task list is under a different route
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-md space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-indigo-700">Welcome to Your Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      <div className="bg-indigo-50 p-6 rounded-lg shadow space-y-4">
        <p className="text-lg font-semibold">You have completed <span className="text-indigo-700">{completedTasks}</span> out of <span className="text-indigo-700">{totalTasks}</span> tasks.</p>
        <p className="text-indigo-600 font-medium text-xl">{progressPercent}% done!</p>
        {progressPercent >= 80 ? (
          <p className="text-green-600 font-semibold">🎉 Amazing work, keep it up!</p>
        ) : (
          <p className="text-yellow-700 font-semibold">Keep pushing, you’re getting there!</p>
        )}
      </div>

      <button
        onClick={goToTasks}
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
      >
        View Your Tasks
      </button>
    </div>
  );
};

export default Dashboard;
