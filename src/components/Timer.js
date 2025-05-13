import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';  // Import motion from framer-motion

const Timer = ({ focusTime, breakTime, onFocusComplete, onBreakComplete }) => {
  const [timeLeft, setTimeLeft] = useState(focusTime * 60);
  const [isFocusTime, setIsFocusTime] = useState(true);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft === 0) {
      if (isFocusTime) {
        onFocusComplete();
        setIsFocusTime(false);
        setTimeLeft(breakTime * 60);
      } else {
        onBreakComplete();
        setIsFocusTime(true);
        setTimeLeft(focusTime * 60);
      }
    }
  }, [timeLeft, isFocusTime, focusTime, breakTime, onFocusComplete, onBreakComplete]);

  const startPauseTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => setTimeLeft(focusTime * 60);

  return (
    <div>
      <h2>{isFocusTime ? "Focus Time" : "Break Time"}</h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, scale: 1.1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span>{Math.floor(timeLeft / 60)}:{timeLeft % 60}</span>
      </motion.div>
      <button onClick={startPauseTimer}>{isRunning ? "Pause" : "Start"}</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default Timer;