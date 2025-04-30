import React, { useState } from "react";
import LoginForm from "./components/login-form/LoginForm.jsx";
import MultiStepForm from "./components/registeration-form/MultiStepForm.js";
import Dashboard from "./components/Dashboard.js";

function App() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Renders login or registration form if user is not logged in
  const renderAuthScreen = () => {
    return isRegistering ? (
      <MultiStepForm onFinishRegister={() => setIsLoggedIn(true)} />
    ) : (
      <LoginForm
        onLoginSuccess={() => setIsLoggedIn(true)}
        onRegisterClick={() => setIsRegistering(true)}
      />
    );
  };

 /* // Renders main dashboard with Pomodoro and theme toggle
  const renderDashboard = () => (
    <TimerProvider>
      <div className="App">
        <h1>AI Learning Companion</h1>
        <DarkModeToggle />
        <Timer
          focusTime={25}
          breakTime={5}
          onFocusComplete={() => console.log("Focus time complete")}
          onBreakComplete={() => console.log("Break complete")}
        />
        <Dashboard />
      </div>
    </TimerProvider>
  );
*/
  return (
    <div className="App">
      {renderAuthScreen()}
    </div>
  );
}

export default App;
