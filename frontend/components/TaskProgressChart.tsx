'use client';

import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

interface Task {
  id: number;
  completed: boolean;
}

interface Props {
  tasks: Task[];
}

const COLORS = ['#4A90E2', '#E0E0E0'];

const TaskProgressChart: React.FC<Props> = ({ tasks }) => {
  const completedCount = tasks.filter(t => t.completed).length;
  const incompleteCount = tasks.length - completedCount;

  const data = [
    { name: 'Completed', value: completedCount },
    { name: 'Incomplete', value: incompleteCount },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Task Completion</h2>
      <PieChart width={300} height={250}>
        <Pie
          data={data}
          cx={150}
          cy={120}
          innerRadius={50}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </div>
  );
};

export default TaskProgressChart;
