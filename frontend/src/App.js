import React, { useState } from "react";
import LoginForm from "./LoginForm";
import FeedbackForm from "./FeedbackForm";

function App() {
  const [student, setStudent] = useState(null);

  return (
    <div className="App">
      {student ? (
        <FeedbackForm student={student} />
      ) : (
        <LoginForm onLogin={setStudent} />
      )}
    </div>
  );
}

export default App;
