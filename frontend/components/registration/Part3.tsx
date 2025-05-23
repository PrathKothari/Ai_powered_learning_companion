import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../../styles/FormStyles.css';
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

interface Part3Props {
  onNext: (answers: Answers) => void;
}

type Answers = {
  [key: number]: number;
};

const Part3: React.FC<Part3Props> = ({ onNext }) => {
  const [answers, setAnswers] = useState<Answers>({});

  const handleChange = (e: ChangeEvent<HTMLSelectElement>, i: number) => {
    setAnswers((prev) => ({
      ...prev,
      [i]: parseInt(e.target.value, 10),
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (Object.keys(answers).length !== questions.length) {
      alert('Please answer all questions.');
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
            value={answers[i] ?? ''}
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
      <button type="submit" className="next-button">
        Next
      </button>
    </form>
  );
};

export default Part3;
