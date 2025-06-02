// app/register/page.tsx
'use client';

import MultiStepForm from '../../components/registration/MultiStepForm';

export default function RegisterPage() {
  return (
    <main>
      <MultiStepForm onFinishRegister={() => alert("Registration flow completed!")} />
    </main>
  );
}
