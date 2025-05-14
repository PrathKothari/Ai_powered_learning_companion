import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { subDays, format } from 'date-fns';

const StreakCalendar = ({ activity = [] }) => {
  const today = new Date();

  const values = Array(90).fill(0).map((_, i) => {
    const date = format(subDays(today, 89 - i), 'yyyy-MM-dd');
    return {
      date,
      count: activity.includes(date) ? 1 : 0,
    };
  });

  return (
    <div className="mt-4">
      <h3 className="text-md font-medium mb-2 text-indigo-700 dark:text-indigo-300">Last 90 Days</h3>
      <CalendarHeatmap
        startDate={subDays(today, 89)}
        endDate={today}
        values={values}
        classForValue={(value) => {
          if (!value || value.count === 0) return 'color-empty';
          return 'color-filled';
        }}
        tooltipDataAttrs={(value) => ({
          'data-tip': `${value.date}: ${value.count > 0 ? 'Active' : 'No activity'}`
        })}
        showWeekdayLabels
      />

      <style>{`
        body:not(.dark) .color-empty {
          fill: #ebedf0;
        }
        body:not(.dark) .color-filled {
          fill: #4a90e2;
        }

        body.dark .color-empty {
          fill: #2c2c2c;
        }
        body.dark .color-filled {
          fill: #90cdf4;
        }
      `}</style>
    </div>
  );
};

export default StreakCalendar;

