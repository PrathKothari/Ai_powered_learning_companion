import React from 'react';
import { TimerProvider } from './contexts/TimerContext';
import Timer from './components/Timer';
import Dashboard from './components/Dashboard';
import DarkModeToggle from './components/DarkModeToggle';
function App() {
  return (
    <TimerProvider>
      <div>
        <h1>AI Learning Companion</h1>
        <DarkModeToggle />
        <Timer 
          focusTime={25} 
          breakTime={5} 
          onFocusComplete={() => console.log("Focus time complete")} 
          onBreakComplete={() => console.log("Break complete")} 
        />
        <Dashboard />
      </div>
    </TimerProvider>
  );
}

export default App;


