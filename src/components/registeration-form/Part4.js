import React, { useState } from 'react';
import './FormStyles.css';

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
      <h4>A. ADHD Type Identification</h4>
      <label>
        <input type="checkbox" value="Inattentive" onChange={handleCheckbox} />
        Trouble with attention & focus
      </label>
      <label>
        <input type="checkbox" value="Hyperactive" onChange={handleCheckbox} />
        Impulsive, hyperactive, or restless
      </label>
      <label>
        <input type="checkbox" value="Combined" onChange={handleCheckbox} />
        Both focus & impulsivity
      </label>

      <h4>B. Functional Impact</h4>
      <input type="number" name="academicImpact" placeholder="Academic/Work Impact (0-3)" onChange={handleChange} required />
      <input type="number" name="socialImpact" placeholder="Social Relationship Impact (0-3)" onChange={handleChange} required />
      <input type="number" name="taskImpact" placeholder="Daily Task Impact (0-3)" onChange={handleChange} required />

      <h4>C. Executive Function</h4>
      <input type="number" name="timeMgmt" placeholder="Time Mgmt Struggles (0-4)" onChange={handleChange} required />
      <input type="number" name="distractions" placeholder="Easily Distracted (0-4)" onChange={handleChange} required />
      <input type="number" name="planning" placeholder="Planning Trouble (0-4)" onChange={handleChange} required />

      <h4>D. Emotional & Energy</h4>
      <input type="number" name="moodSwings" placeholder="Mood Swings? (0-4)" onChange={handleChange} required />
      <input type="number" name="exhaustion" placeholder="Mental Exhaustion? (0-4)" onChange={handleChange} required />
      <input type="number" name="hyperfocus" placeholder="Hyperfocus? (0-4)" onChange={handleChange} required />
      <input type="number" name="timeMgmtAgain" placeholder="Time Mgmt Despite Reminders (0-4)" onChange={handleChange} required />

      <button type="submit">Submit</button>
    </form>
  );
};

export default Part4;