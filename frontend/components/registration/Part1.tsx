import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../../styles/FormStyles.css';

interface Part1Props {
  onNext: (data: FormData) => void;
}

interface FormData {
  Name: string;
  Age: string; // keeping as string since it's from input value
  Gender: string;
  Hobby: string;
  'Previously Diagnosed': string;
  Password: string;
  'Re-enter Password': string;
}

const Part1: React.FC<Part1Props> = ({ onNext }) => {
  const [data, setData] = useState<FormData>({
    Name: '',
    Age: '',
    Gender: '',
    Hobby: '',
    'Previously Diagnosed': '',
    Password: '',
    'Re-enter Password': ''
  });

  const [passwordError, setPasswordError] = useState('');
  const [ageError, setAgeError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let newValue: string | number = value;

    if (name === "Age") {
      // parseInt can return NaN, so fallback to ''
      const parsed = parseInt(value);
      newValue = isNaN(parsed) ? '' : Math.max(0, parsed);
      if (typeof newValue === 'number' && newValue < 18) {
        setAgeError("You must be at least 18 years old to register.");
      } else {
        setAgeError('');
      }
    }

    setData(prev => ({ ...prev, [name]: newValue.toString() }));

    // Password validation after setting data
    if ((name === "Password" || name === "Re-enter Password")) {
      const password = name === "Password" ? value : data.Password;
      const rePassword = name === "Re-enter Password" ? value : data["Re-enter Password"];

      if (password && rePassword && password !== rePassword) {
        setPasswordError("Passwords do not match.");
      } else {
        setPasswordError('');
      }
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const ageNum = parseInt(data.Age);
    if (isNaN(ageNum) || ageNum < 18) {
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
            min={0}
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
          <select name="Previously Diagnosed" value={data["Previously Diagnosed"]} onChange={handleChange} required>
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
