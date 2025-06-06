import React, { useState, useRef, useEffect } from 'react';
import Part1 from './Part1';
import Part2 from './Part2';
import Part3 from './Part3';
import Part4 from './Part4';
import ProgressBar from './ProgressBar';

interface MultiStepFormProps {
  onFinishRegister: () => void;
}

interface FormData {
  [key: string]: any;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({ onFinishRegister }) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({});
  const [part3Score, setPart3Score] = useState<number>(0);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [step]);

  const submitToBackend = async (finalData: FormData) => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      const resultText = await response.text();
      let result;
      try {
        result = JSON.parse(resultText);
      } catch {
        result = { message: resultText };
      }

      if (!response.ok) {
        alert("Submission error: " + (result.message || "Unknown error"));
      } else {
        console.log("✅ Submission success:", result);
      }
    } catch (err) {
      console.error("❌ Network error:", err);
      alert("Failed to connect to backend.");
    }
  };

  const handleNext = async (data: FormData) => {
    const merged = { ...formData, ...data };
    setFormData(merged);

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
        await submitToBackend(merged);
        alert("Form submitted! (Previously Diagnosed)");
        onFinishRegister();
      }
    }
    else if (step === 3) {
      const score = Object.values(data).reduce((a, b) => a + parseInt(b), 0);
      setPart3Score(score);
      if (score >= 15) {
        setStep(4);
      } else {
        alert("You likely do not have ADHD.");
        await submitToBackend(merged);
        onFinishRegister();
      }
    }
    else if (step === 4) {
      await submitToBackend(merged);
      alert("Final submission complete!");
      onFinishRegister();
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
    <div className='form-wrapper'>
      <div className="form-container" ref={formRef}>
        <ProgressBar step={step} />
        <h2 className='text-blue-950'>ADHD Questionnaire</h2>
        {getStepComponent()}
      </div>
    </div>
  );
};

export default MultiStepForm;