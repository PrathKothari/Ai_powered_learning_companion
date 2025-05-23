'use client';

import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

interface Task {
  dueDate: string;
  completed: boolean;
}

interface Props {
  tasks: Task[];
}

const ActivityHeatmap: React.FC<Props> = ({ tasks }) => {
  // Aggregate completed tasks by date
  const values = tasks
    .filter(t => t.completed && t.dueDate)
    .reduce<Record<string, number>>((acc, t) => {
      acc[t.dueDate] = (acc[t.dueDate] || 0) + 1;
      return acc;
    }, {});

  // Convert to format required by heatmap
  const heatmapValues = Object.entries(values).map(([date, count]) => ({
    date,
    count,
  }));

  // Optional: Show past 90 days
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 90);

  const classForValue = (value: { date: Date; count: number } | null) => {
    if (!value) {
      return 'color-empty';
    }
    if (value.count > 0 && value.count <= 2) {
      return 'color-scale-1';
    }
    if (value.count > 2 && value.count <= 5) {
      return 'color-scale-2';
    }
    if (value.count > 5 && value.count <= 10) {
      return 'color-scale-3';
    }
    if (value.count > 10) {
      return 'color-scale-4';
    }
    return 'color-empty';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Activity Heatmap (Last 90 Days)</h2>
      <div className="overflow-x-auto">
        <CalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          values={heatmapValues}
          classForValue={classForValue}
          showWeekdayLabels
        />
      </div>
      {/* ... */}
    </div>
  );
};

export default ActivityHeatmap;