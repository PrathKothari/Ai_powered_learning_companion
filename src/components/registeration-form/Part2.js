import React, { useState } from 'react';
import './FormStyles.css';

const Part2 = ({ onNext }) => {
  const [data, setData] = useState({
    'Age at diagnosis': '',
    'Which type of ADHD?': '',
    'Who diagnosed': '',
    'Diagnosis methods': []
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setData(prev => ({
      ...prev,
      'Diagnosis methods': checked
        ? [...prev['Diagnosis methods'], value]
        : prev['Diagnosis methods'].filter((v) => v !== value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(data);
  };

  const diagnosisOptions = [
    'Clinical interview and observation',
    'Checklists by you',
    'Checklists by parents',
    'Checklists by teachers',
    'Psycho-educational testing',
    'Computerized testing',
    'Other'
  ];

  return (
    <form onSubmit={handleSubmit} className="form-section">
      <input type="number" name="Age at diagnosis" placeholder="How old were you when diagnosed?" onChange={handleChange} required />
      
      <label>Which type of ADHD?</label>
      <select name="Which type of ADHD?" onChange={handleChange} required>
        <option value="">-- Select --</option>
        <option value="inattentive predominant type ADHD">Inattentive Predominant</option>
        <option value="combined type ADHD">Combined</option>
        <option value="hyperactive-impulsive predominant type">Hyperactive-Impulsive</option>
        <option value="No idea">No idea</option>
      </select>

      <input type="text" name="Who diagnosed" placeholder="Who made the diagnosis? (e.g. Psychiatrist)" onChange={handleChange} required />

      <label>Which of the following were involved in making the diagnosis?</label>
      {diagnosisOptions.map((opt, idx) => (
        <label key={idx}>
          <input type="checkbox" value={opt} onChange={handleCheckboxChange} />
          {opt}
        </label>
      ))}

      <button type="submit">Submit / Next</button>
    </form>
  );
};

export default Part2;