import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Coffee } from 'lucide-react';
import { useTimer } from '../contexts/TimerContext';

const Timer = ({ onFocusComplete, onBreakComplete }) => {
  const { 
    focusTime, 
    breakTime, 
    setFocusTime, 
    setBreakTime,
    addStudySession
  } = useTimer();

  const [timeLeft, setTimeLeft] = useState(focusTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const timerRef = useRef(null);
  const sessionStartTimeRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);

            if (isBreak) {
              onBreakComplete?.();
              setTimeLeft(focusTime * 60);
              setIsBreak(false);
            } else {
              onFocusComplete?.();
              if (sessionStartTimeRef.current) {
                const duration = Math.floor((Date.now() - sessionStartTimeRef.current) / 1000);
                addStudySession(duration);
              }
              setTimeLeft(breakTime * 60);
              setIsBreak(true);
            }
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      if (!isBreak && !sessionStartTimeRef.current) {
        sessionStartTimeRef.current = Date.now();
      }
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, isBreak, focusTime, breakTime, onFocusComplete, onBreakComplete, addStudySession]);

  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(isBreak ? breakTime * 60 : focusTime * 60);
    }
  }, [focusTime, breakTime, isBreak]);

  const toggleTimer = () => {
    if (isRunning) {
      if (!isBreak && sessionStartTimeRef.current) {
        const duration = Math.floor((Date.now() - sessionStartTimeRef.current) / 1000);
        if (duration > 30) {
          addStudySession(duration);
        }
        sessionStartTimeRef.current = null;
      }
    } else {
      if (!isBreak) {
        sessionStartTimeRef.current = Date.now();
      }
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(isBreak ? breakTime * 60 : focusTime * 60);
    sessionStartTimeRef.current = null;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = isBreak 
    ? 100 - (timeLeft / (breakTime * 60)) * 100 
    : 100 - (timeLeft / (focusTime * 60)) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {isBreak ? 'Break Time' : 'Focus Time'}
        </h2>
        <button
          onClick={() => setSettingsOpen(!settingsOpen)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0..." />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      {settingsOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
        >
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Timer Settings</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="focusTime" className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Focus Time (min)
              </label>
              <input
                type="number"
                id="focusTime"
                min="1"
                max="60"
                value={focusTime}
                onChange={(e) => setFocusTime(parseInt(e.target.value) || 25)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                disabled={isRunning}
              />
            </div>
            <div>
              <label htmlFor="breakTime" className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Break Time (min)
              </label>
              <input
                type="number"
                id="breakTime"
                min="1"
                max="30"
                value={breakTime}
                onChange={(e) => setBreakTime(parseInt(e.target.value) || 5)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                disabled={isRunning}
              />
            </div>
          </div>
        </motion.div>
      )}

      <div className="relative mb-8">
        <svg className="w-full" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke={isBreak ? "#ddd6fe" : "#bfdbfe"} strokeWidth="6" className="dark:opacity-30" />
          <motion.circle
            cx="50" cy="50"
            r="45"
            fill="none"
            stroke={isBreak ? "#8b5cf6" : "#3b82f6"}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="282.7"
            strokeDashoffset={282.7 - (282.7 * progress) / 100}
            initial={false}
            animate={{ strokeDashoffset: 282.7 - (282.7 * progress) / 100 }}
            transition={{ duration: 0.5, ease: "linear" }}
            className="origin-center -rotate-90"
          />
          <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" fontSize="18" fontWeight="bold" fill="currentColor" className="text-gray-900 dark:text-gray-100">
            {formatTime(timeLeft)}
          </text>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold">{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <motion.button
          onClick={toggleTimer}
          className={`p-3 rounded-full ${
            isRunning 
              ? 'bg-error-500 hover:bg-error-600 text-white' 
              : 'bg-primary-500 hover:bg-primary-600 text-white'
          }`}
          whileTap={{ scale: 0.95 }}
          aria-label={isRunning ? 'Pause Timer' : 'Start Timer'}
        >
          {isRunning ? <Pause size={20} /> : <Play size={20} />}
        </motion.button>

        <motion.button
          onClick={resetTimer}
          className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
          whileTap={{ scale: 0.95 }}
          disabled={isRunning}
          aria-label="Reset Timer"
        >
          <RotateCcw size={20} />
        </motion.button>

        {!isBreak && (
          <motion.button
            onClick={() => {
              setIsRunning(false);
              setIsBreak(true);
              setTimeLeft(breakTime * 60);
              if (isRunning && sessionStartTimeRef.current) {
                const duration = Math.floor((Date.now() - sessionStartTimeRef.current) / 1000);
                addStudySession(duration);
                sessionStartTimeRef.current = null;
              }
            }}
            className="p-3 rounded-full bg-accent-100 hover:bg-accent-200 dark:bg-accent-900/30 dark:hover:bg-accent-800/50 text-accent-600 dark:text-accent-400"
            whileTap={{ scale: 0.95 }}
            aria-label="Take a Break"
          >
            <Coffee size={20} />
          </motion.button>
        )}
      </div>

      <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
        {isBreak ? 'Take a well-deserved break!' : 'Stay focused, you got this!'}
      </div>
    </div>
  );
};

export default Timer;