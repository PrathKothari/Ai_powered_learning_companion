import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../../styles/FormStyles.css';
import { FaUserClock, FaUserMd, FaCheckSquare } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';

interface Part2Props {
  onNext: (data: FormData) => void;
}

interface FormData {
  'Age at diagnosis': string;
  'Which type of ADHD?': string;
  'Who diagnosed': string;
  'Diagnosis methods': string[];
}

const diagnosisOptions = [
  'Clinical interview and observation',
  'Checklists by you',
  'Checklists by parents',
  'Checklists by teachers',
  'Psycho-educational testing',
  'Computerized testing',
  'Other',
];

const Part2: React.FC<Part2Props> = ({ onNext }) => {
  const [data, setData] = useState<FormData>({
    'Age at diagnosis': '',
    'Which type of ADHD?': '',
    'Who diagnosed': '',
    'Diagnosis methods': [],
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setData((prev) => ({
      ...prev,
      'Diagnosis methods': checked
        ? [...prev['Diagnosis methods'], value]
        : prev['Diagnosis methods'].filter((v) => v !== value),
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit} className="form-section">
      <div className="question-group">
        <label>
          <FaUserClock className="question-icon" />
          How old were you when diagnosed?
          <input
            type="number"
            name="Age at diagnosis"
            placeholder="Enter your age at diagnosis"
            onChange={handleChange}
            required
            value={data['Age at diagnosis']}
            min={0}
          />
        </label>
      </div>

      <div className="question-group">
        <label>
          <MdCategory className="question-icon" />
          Which type of ADHD?
          <select
            name="Which type of ADHD?"
            onChange={handleChange}
            required
            value={data['Which type of ADHD?']}
          >
            <option value="">-- Select --</option>
            <option value="inattentive predominant type ADHD">Inattentive Predominant</option>
            <option value="combined type ADHD">Combined</option>
            <option value="hyperactive-impulsive predominant type">Hyperactive-Impulsive</option>
            <option value="No idea">No idea</option>
          </select>
        </label>
      </div>

      <div className="question-group">
        <label>
          <FaUserMd className="question-icon" />
          Who made the diagnosis?
          <select
            name="Who diagnosed"
            onChange={handleChange}
            required
            value={data['Who diagnosed']}
          >
            <option value="">-- Select --</option>
            <option value="Psychiatrist">Psychiatrist</option>
            <option value="Psychologist">Psychologist</option>
            <option value="Pediatrician">Pediatrician</option>
            <option value="Neurologist">Neurologist</option>
            <option value="General Physician">General Physician</option>
            <option value="School Counselor">School Counselor</option>
            <option value="Other">Other</option>
          </select>

          {data['Who diagnosed'] === 'Other' && (
            <input
              type="text"
              name="Who diagnosed"
              placeholder="Please specify"
              onChange={handleChange}
              required
              value={data['Who diagnosed']}
            />
          )}
        </label>
      </div>

      <div className="question-group">
        <label>
          <FaCheckSquare className="question-icon" />
          Which of the following were involved in making the diagnosis?
        </label>
        <div className="checkbox-grid">
          {diagnosisOptions.map((opt, idx) => (
            <label key={idx} className="checkbox-label">
              <input
                type="checkbox"
                value={opt}
                checked={data['Diagnosis methods'].includes(opt)}
                onChange={handleCheckboxChange}
              />
              {opt}
            </label>
          ))}
        </div>
      </div>

      <button type="submit" className="next-button">
        Next
      </button>
    </form>
  );
};

export default Part2;
