import React, { useState } from "react";

const VerifyOtp = ({ otp, onVerify }) => {
  const [userOtp, setUserOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onVerify(userOtp);
  };

  return (
    <div className="flex flex-col p-4">
      <h2>Verify OTP sent to your email:</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        className="border rounded p-2 mb-4"
        value={userOtp}
        onChange={(e) => setUserOtp(e.target.value)}
      />
      <button type="submit" onClick={handleSubmit} className="bg-blue-500 text-white rounded px-4 py-2 shadow-md hover:bg-blue-700">
        Verify
      </button>
    </div>
  );
};

export default VerifyOtp;
