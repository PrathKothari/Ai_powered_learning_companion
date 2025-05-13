import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useMemo } from 'react';

const TimerContext = createContext(null);

export const TimerProvider = ({ children }) => {
  // Timer settings
  const [focusTime, setFocusTime] = useState(() => {
    const saved = localStorage.getItem('focusTime');
    return saved ? parseInt(saved) : 25;
  });

  const [breakTime, setBreakTime] = useState(() => {
    const saved = localStorage.getItem('breakTime');
    return saved ? parseInt(saved) : 5;
  });

  // Study sessions tracking
  const [studySessions, setStudySessions] = useState(() => {
    const saved = localStorage.getItem('studySessions');
    return saved ? JSON.parse(saved) : [];
  });

  // Calculate total study time (in seconds)
  const totalStudyTime = studySessions.reduce(
    (total, session) => total + session.duration,
    0
  );

  // Calculate today's study time
  const todayStudyTime = useMemo(() => {
    const today = new Date().setHours(0, 0, 0, 0);
    return studySessions
      .filter(session => new Date(session.date).setHours(0, 0, 0, 0) === today)
      .reduce((total, session) => total + session.duration, 0);
  }, [studySessions]);

  // Calculate weekly study time
  const weeklyStudyTime = useMemo(() => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    oneWeekAgo.setHours(0, 0, 0, 0);

    return studySessions
      .filter(session => new Date(session.date) >= oneWeekAgo)
      .reduce((total, session) => total + session.duration, 0);
  }, [studySessions]);

  // Add a new study session
  const addStudySession = useCallback((duration) => {
    const newSession = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      duration: duration,
    };

    setStudySessions(prev => {
      const updatedSessions = [...prev, newSession];
      localStorage.setItem('studySessions', JSON.stringify(updatedSessions)); // Directly update localStorage here
      return updatedSessions;
    });
  }, []);

  // Persist timer settings to localStorage (only when they change)
  useEffect(() => {
    if (focusTime !== parseInt(localStorage.getItem('focusTime'))) {
      localStorage.setItem('focusTime', focusTime.toString());
    }
    if (breakTime !== parseInt(localStorage.getItem('breakTime'))) {
      localStorage.setItem('breakTime', breakTime.toString());
    }
  }, [focusTime, breakTime]);

  return (
    <TimerContext.Provider
      value={{
        focusTime,
        breakTime,
        totalStudyTime,
        todayStudyTime,
        weeklyStudyTime,
        studySessions,
        setFocusTime,
        setBreakTime,
        addStudySession,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

// Custom hook for using the timer context
export const useTimer = () => {
  const context = useContext(TimerContext);

  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }

  return context;
};