import React, { useState, useRef, useEffect } from 'react';
import Part1 from './Part1.js';
import Part2 from './Part2.js';
import Part3 from './Part3.js';
import Part4 from './Part4.js';
import ProgressBar from './ProgressBar.js';

const MultiStepForm = ({ onFinishRegister }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [part3Score, setPart3Score] = useState(0);
  const formRef = useRef(null);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [step]);

  const handleNext = (data) => {
    setFormData(prev => ({ ...prev, ...data }));

    if (step === 1) {
      if (data['Password'] !== data['Re-enter Password']) {
        alert("Passwords do not match");
        return;
      }
      if (data.Age < 18) {
        alert("You must be 18 or older to proceed.");
        return;
      }
      setStep(data['Previously Diagnosed'] === "Yes" ? 2 : 3);
    }

    else if (step === 2) {
      if (data['Which type of ADHD?'] === "No idea") {
        setStep(4);
      } else {
        alert("Form submitted! (Previously Diagnosed)");
        console.log("Final data:", { ...formData, ...data });
        onFinishRegister(); // Success
      }
    }

    else if (step === 3) {
      const score = Object.values(data).reduce((a, b) => a + parseInt(b), 0);
      setPart3Score(score);
      if (score >= 15) {
        setStep(4);
      } else {
        alert("You likely do not have ADHD.");
        console.log("Form data:", { ...formData, ...data });
        onFinishRegister(); // still allow entry for testing/demo
      }
    }

    else if (step === 4) {
      alert("Final submission complete! (Undiagnosed flow)");
      console.log("All data submitted:", { ...formData, ...data });
      onFinishRegister(); // Notify App
    }
  };

  const getStepComponent = () => {
    switch (step) {
      case 1: return <Part1 onNext={handleNext} />;
      case 2: return <Part2 onNext={handleNext} />;
      case 3: return <Part3 onNext={handleNext} />;
      case 4: return <Part4 onNext={handleNext} />;
      default: return null;
    }
  };

  return (
    <div className="form-container" ref={formRef}>
      <ProgressBar step={step} />
      <h2>ADHD Questionnaire</h2>
      {getStepComponent()}
    </div>
  );
};

export default MultiStepForm;