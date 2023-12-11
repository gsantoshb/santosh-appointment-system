import React, { useState } from "react";

interface EmailInputProps {
  value: string;
  onChange: (newValue: string) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ value, onChange }) => {
  const [isValidEmail, setIsValidEmail] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    onChange(newEmail);
    setIsValidEmail(/^\w+@\w+\.\w+$/.test(newEmail));
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type="email"
        className={`border border-gray-300 rounded px-2 py-1 focus:outline-none ${
          isValidEmail ? "border-green-500" : "border-red-500"
        }`}
        value={value}
        onChange={handleEmailChange}
      />
      {isValidEmail && <p className="text-green-500 text-sm">Valid email address</p>}
      {!isValidEmail && <p className="text-red-500 text-sm">Invalid email address</p>}
    </div>
  );
};

export default EmailInput;
