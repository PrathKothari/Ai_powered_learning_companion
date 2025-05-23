'use client';

import React, { useState, useEffect, useRef } from 'react';

const defaultTime = 25 * 60; // 25 minutes in seconds

export default function TimerPage() {
  const [seconds, setSeconds] = useState(defaultTime);
  const [isRunning, setIsRunning] = useState(false);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;

  const startTimer = () => {
    setIsRunning(true);
    if (!timerInterval.current) {
      timerInterval.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
    if (timerInterval.current) {
      clearInterval(timerInterval.current as NodeJS.Timeout); // Type assertion here
      timerInterval.current = null;
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    if (timerInterval.current) {
      clearInterval(timerInterval.current as NodeJS.Timeout); // Type assertion here
      timerInterval.current = null;
    }
    setSeconds(defaultTime);
  };

  useEffect(() => {
    if (seconds < 0) {
      clearInterval(timerInterval.current as NodeJS.Timeout); // Type assertion here
      timerInterval.current = null;
      setIsRunning(false);
      alert('Focus session over!');
      setSeconds(defaultTime); // Optionally reset after completion
    }
  }, [seconds]);

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-md mx-auto bg-gray-800 rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-indigo-400 text-center">Focus Timer</h1>
        <div className="text-center text-4xl font-bold mb-4 text-white">{formattedTime}</div>
        <div className="flex justify-center gap-4">
          <button
            onClick={startTimer}
            disabled={isRunning}
            className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Start
          </button>
          <button
            onClick={pauseTimer}
            disabled={!isRunning}
            className={`bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Pause
          </button>
          <button
            onClick={resetTimer}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}