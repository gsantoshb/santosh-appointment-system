import React, { useState } from "react";

const EmailPrompt = ({ onSubmit }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <div className="flex flex-col p-4">
      <h2>Enter your email to book an appointment:</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email address"
          className="border rounded p-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2 shadow-md hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EmailPrompt;
