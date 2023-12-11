import React, { useState } from "react";

interface CodeInputProps {
  value: string;
  onChange: (newValue: string) => void;
}

const CodeInput: React.FC<CodeInputProps> = ({ value, onChange }) => {
  const [isCodeValid, setIsCodeValid] = useState(false);

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCode = event.target.value;
    onChange(newCode);
    setIsCodeValid(newCode.length === 6); // Example validation logic
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        className={`border border-gray-300 rounded px-2 py-1 focus:outline-none ${
          isCodeValid ? "border-green-500" : "border-red-500"
        }`}
        value={value}
        onChange={handleCodeChange}
      />
      {isCodeValid && <p className="text-green-500 text-sm">Valid code</p>}
      {!isCodeValid && <p className="text-red-500 text-sm">Invalid code</p>}
    </div>
  );
};

export default CodeInput;
