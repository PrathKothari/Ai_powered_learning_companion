import React, { useState } from 'react';
import './FormStyles.css';

const Part1 = ({ onNext }) => {
  const [data, setData] = useState({
    Name: '', Age: '', Gender: '', Hobby: '',
    'Previously Diagnosed': '', Password: '', 'Re-enter Password': ''
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit} className="form-section">
      <input type="text" name="Name" placeholder="Name" onChange={handleChange} required />
      <input type="number" name="Age" placeholder="Age" onChange={handleChange} required />
      <input type="text" name="Gender" placeholder="Gender" onChange={handleChange} required />
      <input type="text" name="Hobby" placeholder="Hobby / Interest" onChange={handleChange} required />

      <label>
        Previously Diagnosed?
        <select name="Previously Diagnosed" onChange={handleChange} required>
          <option value="">-- Select --</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </label>

      <input type="password" name="Password" placeholder="Password" onChange={handleChange} required />
      <input type="password" name="Re-enter Password" placeholder="Re-enter Password" onChange={handleChange} required />

      <button type="submit">Next</button>
    </form>
  );
};

export default Part1;