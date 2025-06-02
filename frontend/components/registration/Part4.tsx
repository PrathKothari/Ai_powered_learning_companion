import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../../styles/FormStyles.css';
import { FaQuestionCircle } from 'react-icons/fa';

interface FormData {
  typeA: string[];
  academicImpact: string;
  socialImpact: string;
  taskImpact: string;
  timeMgmt: string;
  distractions: string;
  planning: string;
  moodSwings: string;
  exhaustion: string;
  hyperfocus: string;
}

interface Part4Props {
  onNext: (data: FormData) => void;
}

const Part4: React.FC<Part4Props> = ({ onNext }) => {
  const [data, setData] = useState<FormData>({
    typeA: [],
    academicImpact: '',
    socialImpact: '',
    taskImpact: '',
    timeMgmt: '',
    distractions: '',
    planning: '',
    moodSwings: '',
    exhaustion: '',
    hyperfocus: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    let clampedValue = value;
    if (type === 'number') {
      const min = Number(e.target.min);
      const max = Number(e.target.max);
      let num = Number(value);
      if (num > max) num = max;
      if (num < min) num = min;
      clampedValue = num.toString();
    }

    setData((prev) => ({ ...prev, [name]: clampedValue }));
  };

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setData((prev) => ({
      ...prev,
      typeA: checked
        ? [...prev.typeA, value]
        : prev.typeA.filter((item) => item !== value),
    }));
  };

  const handleSubmit = (e: FormEvent) => {e.preventDefault();

    const invalidFields: string[] = [];

    const impactFields = ['academicImpact', 'socialImpact', 'taskImpact'] as const;
    const execFuncFields = ['timeMgmt', 'distractions', 'planning'] as const;
    const emotionalFields = ['moodSwings', 'exhaustion', 'hyperfocus'] as const;

    impactFields.forEach((field) => {
        const val = data[field];
        if (typeof val === 'string' && parseInt(val, 10) > 3) {
        invalidFields.push(field);
        }
    });

    [...execFuncFields, ...emotionalFields].forEach((field) => {
        const val = data[field];
        if (typeof val === 'string' && parseInt(val, 10) > 4) {
        invalidFields.push(field);
        }
    });

    if (invalidFields.length > 0) {
        alert(
        `Please enter valid values (0–3 or 0–4) for: ${invalidFields.join(', ')}`
        );
        return;
    }

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
            <input
              type="checkbox"
              value="Inattentive"
              checked={data.typeA.includes('Inattentive')}
              onChange={handleCheckbox}
            />
            Trouble with attention & focus
          </label>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              value="Hyperactive"
              checked={data.typeA.includes('Hyperactive')}
              onChange={handleCheckbox}
            />
            Impulsive, hyperactive, or restless
          </label>
        </div>
      </div>

      {/* B. Functional Impact */}
      <div className="question-group">
        <label className="question-label">
          <FaQuestionCircle className="question-icon" />
          How much does ADHD affect these areas? (0 = Not at all, 3 = Severely)
        </label>

        {['academicImpact', 'socialImpact', 'taskImpact'].map((field) => (
          <div key={field}>
            <label>
              {field === 'academicImpact' && 'Academic/Work Impact:'}
              {field === 'socialImpact' && 'Social Relationship Impact:'}
              {field === 'taskImpact' && 'Daily Task Impact:'}
              <input
                type="number"
                name={field}
                min={0}
                max={3}
                value={data[field as keyof FormData]}
                onChange={handleChange}
                required
              />
            </label>
          </div>
        ))}
      </div>

      {/* C. Executive Function */}
      <div className="question-group">
        <label className="question-label">
          <FaQuestionCircle className="question-icon" />
          Executive Functioning Challenges (0 = Never, 4 = Very Often)
        </label>

        {['timeMgmt', 'distractions', 'planning'].map((field) => (
          <div key={field}>
            <label>
              {field === 'timeMgmt' && 'Struggle with time management:'}
              {field === 'distractions' && 'Easily distracted:'}
              {field === 'planning' && 'Trouble planning ahead:'}
              <input
                type="number"
                name={field}
                min={0}
                max={4}
                value={data[field as keyof FormData]}
                onChange={handleChange}
                required
              />
            </label>
          </div>
        ))}
      </div>

      {/* D. Emotional & Energy */}
      <div className="question-group">
        <label className="question-label">
          <FaQuestionCircle className="question-icon" />
          Emotional and Energy Patterns (0 = Never, 4 = Very Often)
        </label>

        {['moodSwings', 'exhaustion', 'hyperfocus'].map((field) => (
          <div key={field}>
            <label>
              {field === 'moodSwings' && 'Do you experience mood swings?'}
              {field === 'exhaustion' && 'Do you feel mentally exhausted often?'}
              {field === 'hyperfocus' && 'Do you hyperfocus on certain tasks?'}
              <input
                type="number"
                name={field}
                min={0}
                max={4}
                value={data[field as keyof FormData]}
                onChange={handleChange}
                required
              />
            </label>
          </div>
        ))}
      </div>

      <button type="submit" className="next-button">
        Submit
      </button>
    </form>
  );
};

export default Part4;
