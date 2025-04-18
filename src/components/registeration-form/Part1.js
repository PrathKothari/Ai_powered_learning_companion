import React, { useState } from 'react';
import './FormStyles.css';

const Part1 = ({ onNext }) => {
  const [data, setData] = useState({
    Name: '', Age: '', Gender: '', Hobby: '',
    'Previously Diagnosed': '', Password: '', 'Re-enter Password': ''
  });

  const [passwordError, setPasswordError] = useState('');
  const [ageError, setAgeError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "Age") {
      newValue = Math.max(0, parseInt(value) || '');
      if (newValue < 18) {
        setAgeError("You must be at least 18 years old to register.");
      } else {
        setAgeError('');
      }
    }

    setData(prev => ({ ...prev, [name]: newValue }));

    if ((name === "Password" || name === "Re-enter Password") && data.Password && data["Re-enter Password"]) {
      if (name === "Password" && value !== data["Re-enter Password"]) {
        setPasswordError("Passwords do not match.");
      } else if (name === "Re-enter Password" && value !== data.Password) {
        setPasswordError("Passwords do not match.");
      } else {
        setPasswordError('');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (parseInt(data.Age) < 18) {
      setAgeError("You must be at least 18 years old to register.");
      return;
    }

    if (data.Password !== data["Re-enter Password"]) {
      setPasswordError("Passwords must match before continuing.");
      return;
    }

    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit} className="form-section">

      <div className="question-group">
        <label>
          1. What is your name?
          <input type="text" name="Name" onChange={handleChange} required />
        </label>
      </div>

      <div className="question-group">
        <label>
          2. What is your age?
          <input
            type="number"
            name="Age"
            min="0"
            value={data.Age}
            onChange={handleChange}
            required
          />
        </label>
        {ageError && <p className="error-text">{ageError}</p>}
      </div>

      <div className="question-group">
        <label>
          3. What is your gender?
          <select name="Gender" value={data.Gender} onChange={handleChange} required>
            <option value="">-- Select Gender --</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </label>
      </div>

      <div className="question-group">
        <label>
          4. What is a hobby or interest of yours?
          <input type="text" name="Hobby" onChange={handleChange} required />
        </label>
      </div>

      <div className="question-group">
        <label>
          5. Have you been previously diagnosed with ADHD?
          <select name="Previously Diagnosed" onChange={handleChange} required>
            <option value="">-- Select --</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
      </div>

      <div className="question-group">
        <label>
          6. Create a password:
          <input type="password" name="Password" onChange={handleChange} required />
        </label>
      </div>

      <div className="question-group">
        <label>
          7. Re-enter your password:
          <input type="password" name="Re-enter Password" onChange={handleChange} required />
        </label>
        {passwordError && <p className="error-text">{passwordError}</p>}
      </div>

      <button
        type="submit"
        className="next-button"
        disabled={parseInt(data.Age) < 18 || passwordError !== ''}
      >
        Next
      </button>
    </form>
  );
};

export default Part1;