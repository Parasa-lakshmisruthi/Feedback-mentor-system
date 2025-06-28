import React, { useState } from "react";

const questions = [
  "How well did the mentor explain the concepts?",
  "Was the mentor approachable for doubts?",
  "Did the mentor provide real-life examples?",
  "Was the mentor on time for sessions?",
  "Did you find the sessions interactive?",
  "Was the mentor’s communication clear?",
  "Were you encouraged to ask questions?",
  "Was the pace of the session appropriate?",
  "Did you receive helpful feedback?",
  "Would you recommend this mentor to others?"
];

const options = ["Excellent", "Good", "Average", "Poor"];

function FeedbackForm({ student }) {
  const [mentor, setMentor] = useState("");
  const [responses, setResponses] = useState(Array(questions.length).fill(""));

  const handleChange = (index, value) => {
    const updated = [...responses];
    updated[index] = value;
    setResponses(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mentor || responses.includes("")) {
      alert("Please fill all fields");
      return;
    }
    const feedback = {
      student,
      mentor,
      responses: responses.map((r, i) => ({ question: questions[i], answer: r })),
    };
    console.log("Submitted feedback:", feedback);
    alert("Feedback submitted!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Welcome, {student}</h2>
      <label>Choose Mentor:</label>
      <select value={mentor} onChange={(e) => setMentor(e.target.value)} required>
        <option value="">--Choose Mentor--</option>
        <option value="Saisathish">Saisathish</option>
        <option value="Anjali">Anjali</option>
        <option value="Rahul">Rahul</option>
        <option value="Priya">Priya</option>
      </select>

      {questions.map((q, i) => (
        <div key={i}>
          <label>{`Q${i + 1}. ${q}`}</label>
          <select value={responses[i]} onChange={(e) => handleChange(i, e.target.value)} required>
            <option value="">--Select--</option>
            {options.map(opt => <option key={opt}>{opt}</option>)}
          </select>
        </div>
      ))}

      <button type="submit">Submit Feedback</button>
    </form>
  );
}

export default FeedbackForm;
