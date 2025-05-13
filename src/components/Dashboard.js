// src/components/Dashboard.js
import React from 'react';
import './Dashboard.css';
import Timer from './Timer';
import TaskList from './TaskList';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome Back!</h1>
        <p className="dashboard-subtitle">"Small steps every day lead to big changes."</p>
        <nav className="dashboard-nav">
          <Link to="/dashboard">Home</Link>
          <Link to="/tasks">Tasks</Link>
          <Link to="/summary">Summary</Link>
        </nav>
      </header>

      <main className="dashboard-main">
        <section className="dashboard-card timer-section">
          <h2>Focus Timer</h2>
          <Timer
            focusTime={25}
            breakTime={5}
            onFocusComplete={() => console.log('Focus session completed')}
            onBreakComplete={() => console.log('Break session completed')}
          />
        </section>

        <section className="dashboard-card tasks-section">
          <h2>Your Tasks</h2>
          <TaskList />
        </section>

        <section className="dashboard-card summary-section">
          <h2>Daily Summary</h2>
          <p>Track how you’re doing today and check your progress.</p>
          <Link to="/summary" className="summary-link">View Summary</Link>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
