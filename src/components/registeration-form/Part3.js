import React, { useState } from 'react';
import './FormStyles.css';
import { FaQuestionCircle } from 'react-icons/fa';

const questions = [
  "How often do you struggle to stay focused when reading, listening, or working?",
  "How often do you get easily distracted by unrelated thoughts or surroundings?",
  "How often do you forget important tasks or appointments, even with reminders?",
  "How often do you lose things (keys, phone, assignments) or leave them in unusual places?",
  "How often do you find it difficult to start or complete long tasks?",
  "How often do you feel restless, fidgety, or unable to sit still for extended periods?",
  "How often do you speak or act impulsively (interrupting, blurting out, or making quick decisions)?",
  "How often do you struggle with time management and underestimate how long tasks will take?",
  "Do your attention difficulties significantly impact your work, studies, or relationships?",
  "Have you experienced these challenges since childhood (before age 12)?"
];

const Part3 = ({ onNext }) => {
  const [answers, setAnswers] = useState({});

  const handleChange = (e, i) => {
    setAnswers({ ...answers, [i]: parseInt(e.target.value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions.");
      return;
    }
    onNext(answers);
  };

  return (
    <form onSubmit={handleSubmit} className="form-section">
      {questions.map((q, i) => (
        <div className="question-block" key={i}>
          <label className="question-label">
            <FaQuestionCircle className="question-icon" />
            {q}
          </label>
          <select
            className="dropdown-select"
            onChange={(e) => handleChange(e, i)}
            required
          >
            <option value="">-- Select --</option>
            <option value="0">Never (0)</option>
            <option value="1">Rarely (1)</option>
            <option value="2">Sometimes (2)</option>
            <option value="3">Often (3)</option>
            <option value="4">Very Often (4)</option>
          </select>
        </div>
      ))}
      <button type="submit" className="next-button">Next</button>
    </form>
  );
};

export default Part3;