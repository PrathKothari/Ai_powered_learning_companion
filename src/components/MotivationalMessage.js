import React from 'react';

const MotivationalMessage = ({ tasksCompleted }) => {
  const messages = [
    "Great job! Keep going!",
    "You're doing amazing!",
    "Fantastic progress! Stay focused!",
  ];

  const message =
    tasksCompleted >= 5 ? messages[2] : tasksCompleted >= 3 ? messages[1] : messages[0];

  return <div>{message}</div>;
};

export default MotivationalMessage;