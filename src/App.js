import React, { useState } from "react";
import LoginForm from "./components/login-form/LoginForm.jsx";
import MultiStepForm from "./components/registeration-form/MultiStepForm.js";

function App() {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="App">
      {isRegistering ? (
        <MultiStepForm />
      ) : (
        <LoginForm onRegisterClick={() => setIsRegistering(true)} />
      )}
    </div>
  );
}

export default App;