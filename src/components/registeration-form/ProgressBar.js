import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ step }) => {
  const steps = ['Basic Info', 'Diagnosis Info', 'Symptoms Check', 'ADHD Type'];

  return (
    <div className="progress-bar-container">
      {steps.map((label, index) => {
        const active = step === index + 1;
        const completed = step > index + 1;
        return (
          <div
            key={index}
            className={`progress-step ${active ? 'active' : ''} ${completed ? 'completed' : ''}`}
          >
            <div className="circle">{completed ? '✓' : index + 1}</div>
            <span>{label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBar;