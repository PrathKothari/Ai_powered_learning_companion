import React, { useState } from 'react';
import './FormStyles.css';
import { FaQuestionCircle } from 'react-icons/fa'; // Import icon for questions

const Part4 = ({ onNext }) => {
  const [data, setData] = useState({
    typeA: [],
    academicImpact: '', socialImpact: '', taskImpact: '',
    timeMgmt: '', distractions: '', planning: '',
    moodSwings: '', exhaustion: '', hyperfocus: '', timeMgmtAgain: ''
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    setData(prev => ({
      ...prev,
      typeA: checked
        ? [...prev.typeA, value]
        : prev.typeA.filter(item => item !== value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit} className="form-section">
      <h3>Part 4: Self-Assessment</h3>

      {/* A. ADHD Type */}
      <div className="question-group">
        <label className="question-label">
          <FaQuestionCircle className="question-icon" />
          What ADHD traits do you identify with?
        </label>

        <div>
          <label>
            <input type="checkbox" value="Inattentive" onChange={handleCheckbox} />
            Trouble with attention & focus
          </label>
        </div>

        <div>
          <label>
            <input type="checkbox" value="Hyperactive" onChange={handleCheckbox} />
            Impulsive, hyperactive, or restless
          </label>
        </div>

        <div>
          <label>
            <input type="checkbox" value="Combined" onChange={handleCheckbox} />
            Both focus & impulsivity
          </label>
        </div>
      </div>

      {/* B. Functional Impact */}
      <div className="question-group">
        <label className="question-label">
          <FaQuestionCircle className="question-icon" />
          How much does ADHD affect these areas? (0 = Not at all, 3 = Severely)
        </label>

        <div>
          <label>
            Academic/Work Impact:
            <input type="number" name="academicImpact" min="0" max="3" onChange={handleChange} required />
          </label>
        </div>

        <div>
          <label>
            Social Relationship Impact:
            <input type="number" name="socialImpact" min="0" max="3" onChange={handleChange} required />
          </label>
        </div>

        <div>
          <label>
            Daily Task Impact:
            <input type="number" name="taskImpact" min="0" max="3" onChange={handleChange} required />
          </label>
        </div>
      </div>

      {/* C. Executive Function */}
      <div className="question-group">
        <label className="question-label">
          <FaQuestionCircle className="question-icon" />
          Executive Functioning Challenges (0 = Never, 4 = Very Often)
        </label>

        <div>
          <label>
            Struggle with time management:
            <input type="number" name="timeMgmt" min="0" max="4" onChange={handleChange} required />
          </label>
        </div>

        <div>
          <label>
            Easily distracted:
            <input type="number" name="distractions" min="0" max="4" onChange={handleChange} required />
          </label>
        </div>

        <div>
          <label>
            Trouble planning ahead:
            <input type="number" name="planning" min="0" max="4" onChange={handleChange} required />
          </label>
        </div>
      </div>

      {/* D. Emotional & Energy */}
      <div className="question-group">
        <label className="question-label">
          <FaQuestionCircle className="question-icon" />
          Emotional and Energy Patterns (0 = Never, 4 = Very Often)
        </label>

        <div>
          <label>
            Do you experience mood swings?
            <input type="number" name="moodSwings" min="0" max="4" onChange={handleChange} required />
          </label>
        </div>

        <div>
          <label>
            Do you feel mentally exhausted often?
            <input type="number" name="exhaustion" min="0" max="4" onChange={handleChange} required />
          </label>
        </div>

        <div>
          <label>
            Do you hyperfocus on certain tasks?
            <input type="number" name="hyperfocus" min="0" max="4" onChange={handleChange} required />
          </label>
        </div>

        <div>
          <label>
            Do you struggle with time even when reminded?
            <input type="number" name="timeMgmtAgain" min="0" max="4" onChange={handleChange} required />
          </label>
        </div>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Part4;